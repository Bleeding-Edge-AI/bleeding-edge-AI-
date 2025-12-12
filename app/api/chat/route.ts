import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType, Tool } from '@google/generative-ai';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

// Initialize Clients
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

// Tool Definition (Updated for Hybrid Model extraction)
const tools: Tool[] = [
    {
        functionDeclarations: [
            {
                name: "capture_lead",
                description: "Extract lead details when the user provides them. Always call this if the email is provided.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        email: { type: SchemaType.STRING, description: "The user's email address." },
                        name: { type: SchemaType.STRING, description: "The user's name if provided." },
                        company: { type: SchemaType.STRING, description: "The user's company name if provided." },
                        service_requested: { type: SchemaType.STRING, description: "The service they are interested in (e.g., 'Build', 'Colo', 'AI Cloud')." },
                        summary: { type: SchemaType.STRING, description: "Brief summary of the request." }
                    },
                    required: ["email"]
                }
            }
        ]
    }
];

export async function POST(req: NextRequest) {
    try {
        const { message, history, leadId } = await req.json();

        // ---------------------------------------------------------
        // 1. Session Initialization / Logging (Hybrid Model)
        // ---------------------------------------------------------
        let currentLeadId = leadId;
        let dbStatus = 'pending';
        let dbError = null;

        const userMessageObject = { role: 'user', content: message, timestamp: new Date().toISOString() };

        try {
            if (!currentLeadId) {
                // NEW SESSION: Insert new row
                const { data, error } = await supabase
                    .from('leads')
                    .insert({
                        transcript: [userMessageObject],
                        email: null
                    })
                    .select('id')
                    .single();

                if (error) throw error;
                currentLeadId = data.id;
                dbStatus = 'success (new)';
            } else {
                // EXISTING SESSION: Update row, append to transcript
                // We use a raw SQL query or fetch-modify-update pattern. 
                // Using Postgres JSONB concat operator ( || ) via rpc would be atomic, but simple fetch-update is fine for this traffic.
                // Or simpler: supabase.rpc() if we had a function.
                // Let's do a Fetch -> Append -> Update for clarity and simplicity without custom SQL functions.

                const { data: leadData, error: fetchError } = await supabase
                    .from('leads')
                    .select('transcript')
                    .eq('id', currentLeadId)
                    .single();

                if (fetchError) {
                    // Fallback: If ID not found, treat as new (safety net)
                    const { data: newData, error: newError } = await supabase
                        .from('leads')
                        .insert({ transcript: [userMessageObject] }).select('id').single();
                    if (newError) throw newError;
                    currentLeadId = newData.id;
                } else {
                    const newTranscript = [...(leadData.transcript || []), userMessageObject];
                    const { error: updateError } = await supabase
                        .from('leads')
                        .update({ transcript: newTranscript })
                        .eq('id', currentLeadId);
                    if (updateError) throw updateError;
                }
                dbStatus = 'success (updated)';
            }
        } catch (e: any) {
            console.error("DB Log Error:", e);
            dbStatus = 'error';
            dbError = e.message;
        }


        // ---------------------------------------------------------
        // 2. Gemini AI Processing
        // ---------------------------------------------------------
        const systemInstruction = `
      You are 'Edge', an AI Sales Engineer for Bleeding Edge Infrastructure.
      
      CORE BEHAVIOR:
      1. Be extremely CONCISE. Use short sentences. Avoid fluff.
      2. If a user implies interest in ANY product/pricing/docs -> IMMEDIATELY ask for their business email.
      
      Use this exact format for the first response:
      "[Acknowledgement]. Could you share your business email so I can send the details?"
      
      Example:
      User: "I need H100s."
      You: "I can help with H100 availability. What is your business email address?"

      Once they provide data, use the 'capture_lead' tool.
      
      AFTER the 'capture_lead' tool is called:
      1. ACKNOWLEDGE: Confirm the request was sent.
      2. VERIFY IDENTITY (Mandatory):
         - IF email domain is corporate (e.g. @nvidia.com): Ask "I see you are with [Company]. Is that correct?"
         - IF email domain is generic (e.g. @gmail.com): Ask "Thanks. What company are you representing?"
      3. STOP. Do not ask qualification questions yet. Wait for the user to confirm their company.
      
      Only AFTER they confirm company:
      - Start qualification (Density? Location? Volume?).
    `;

        const chatHistory = history.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            tools: tools,
            systemInstruction: systemInstruction
        });

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const functionCalls = response.functionCalls();
        const call = functionCalls?.[0];

        let finalResponseText = response.text();

        // ---------------------------------------------------------
        // 3. Tool Handling (Extraction)
        // ---------------------------------------------------------
        if (call && call.name === "capture_lead") {
            const { email, name, company, service_requested, summary } = call.args as any;
            console.log("Extracting Lead Data:", call.args);

            // A. Update Lead Metadata in DB
            if (currentLeadId) {
                const { error: upError } = await supabase
                    .from('leads')
                    .update({
                        email: email,
                        name: name,
                        company: company,
                        service_requested: service_requested,
                        status: 'CAPTURED'
                    })
                    .eq('id', currentLeadId);

                if (upError) console.error("Lead Update Error:", upError);
            }

            // B. Send Email Notification
            if (process.env.RESEND_API_KEY) {
                await resend.emails.send({
                    from: 'Bleeding Edge AI <onboarding@resend.dev>',
                    to: ['sales@bleedingedge.group'],
                    subject: `[LEAD] ${service_requested || 'Inquiry'}`,
                    html: `
                        <h1>Lead Captured</h1>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Name:</strong> ${name || 'N/A'}</p>
                        <p><strong>Company:</strong> ${company || 'N/A'}</p>
                        <p><strong>Service:</strong> ${service_requested || 'N/A'}</p>
                        <p><strong>DB ID:</strong> ${currentLeadId}</p>
                    `
                }).catch(e => console.error("Email failed:", e));
            }

            const toolResponsePart = {
                functionResponse: {
                    name: "capture_lead",
                    response: { status: "success", message: "Details saved. NOW ASK FOR COMPANY/IDENTITY VERIFICATION." }
                }
            };
            const finalResult = await chat.sendMessage([toolResponsePart]);
            finalResponseText = finalResult.response.text();
        }

        // ---------------------------------------------------------
        // 4. Log AI Response (Append to Transcript)
        // ---------------------------------------------------------
        if (currentLeadId && dbStatus !== 'error') {
            const aiMessageObject = { role: 'assistant', content: finalResponseText, timestamp: new Date().toISOString() };

            // Fetch current again to append (safe for low volume). 
            // Ideally we'd optimize to just one update at the end for both user+ai messages, but logic is split.
            // Let's just do an atomic append if possible, but for JSONB here we re-fetch.
            const { data: leadData } = await supabase.from('leads').select('transcript').eq('id', currentLeadId).single();
            if (leadData) {
                const newTranscript = [...(leadData.transcript || []), aiMessageObject];
                await supabase.from('leads').update({ transcript: newTranscript }).eq('id', currentLeadId);
            }
        }

        return NextResponse.json({
            text: finalResponseText,
            leadId: currentLeadId,
            db_status: dbStatus,
            db_error: dbError
        });

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
