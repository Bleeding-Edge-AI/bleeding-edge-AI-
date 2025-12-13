import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType, Tool } from '@google/generative-ai';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

// Initialize Clients
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

// Tool Definition (Updated for Strict Slot Filling)
const tools: Tool[] = [
    {
        functionDeclarations: [
            {
                name: "capture_lead",
                description: "Extract lead details. Call this IMMEDIATELY when the user provides ANY of these fields. Do not wait for all of them.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        email: { type: SchemaType.STRING, description: "The user's email address." },
                        name: { type: SchemaType.STRING, description: "The user's name." },
                        company: { type: SchemaType.STRING, description: "The user's company name." },
                        service_requested: { type: SchemaType.STRING, description: "The service they are interested in (e.g., 'Build', 'Colo', 'AI Cloud')." },
                        summary: { type: SchemaType.STRING, description: "Brief summary of the request." }
                    },
                    required: [] // Allow partial updates
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

      CORE LOGIC - STATE MACHINE:
      
      STATE 1: IDENTIFICATION (Highest Priority)
      Your PRIMARY goal is to fill these "Data Slots": [Email, Name, Company, Service Request].
      
      RULES:
      1. If you receive ANY of these fields, call the 'capture_lead' tool IMMEDIATELY. Save partial data.
      2. If you have Email but not Name -> Ask for Name.
      3. If you have Email and Name but not Company -> Ask for Company.
      4. DO NOT proceed to technical consulting until you have at least Email and Company.
      
      Example Flow:
      User: "I need servers."
      You: "I can help. What is your business email?"
      User: "vlad@nvidia.com"
      -> CALL TOOL capture_lead({ email: "vlad@nvidia.com" })
      You: "Got it. And what is your name?"
      User: "Jensen"
      -> CALL TOOL capture_lead({ name: "Jensen" })
      You: "Thanks Jensen. Assuming you are with Nvidia based on the email?"
      
      STATE 2: ADVISORY (Only after Identification)
      - Once identified, discuss [Density, Location, Volume].
      - Be extremely CONCISE. Short sentences.
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

            // LOGGING FOR VERIFICATION
            console.log("Saving Lead Data:", call.args);

            // A. Update Lead Metadata in DB (Partial Updates)
            if (currentLeadId) {
                const updates: any = {};
                // Only add fields if they exist in the args
                if (email) updates.email = email;
                if (name) updates.name = name;
                if (company) updates.company = company;
                if (service_requested) updates.service_requested = service_requested; // Correct column name

                const { error: upError } = await supabase
                    .from('leads')
                    .update(updates)
                    .eq('id', currentLeadId);

                if (upError) console.error("Lead Update Error:", upError);
            }

            // B. Send Email Notification
            /* 
            // DISABLED: Saving to Supabase only for now
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
            */

            const toolResponsePart = {
                functionResponse: {
                    name: "capture_lead",
                    response: { status: "success", message: "Details saved. NOW ASK FOR COMPANY/IDENTITY VERIFICATION." }
                }
            };
            const finalResult = await chat.sendMessage([toolResponsePart]);
            try {
                finalResponseText = finalResult.response.text();
            } catch (e) {
                console.warn("Gemini produced no text after tool call, using fallback.");
            }

            if (!finalResponseText) {
                finalResponseText = "I've saved your details. To ensure I get you the right information, could you please confirm your company name?";
            }
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
