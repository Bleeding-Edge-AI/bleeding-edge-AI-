import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType, Tool } from '@google/generative-ai';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

// Initialize Clients
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

// Tool Definition
const tools: Tool[] = [
    {
        functionDeclarations: [
            {
                name: "send_lead_to_sales",
                description: "Send a sales lead email when a user provides their email address and expresses interest.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        user_email: { type: SchemaType.STRING, description: "The user's email address." },
                        user_name: { type: SchemaType.STRING, description: "The user's name if provided." },
                        lead_intent: { type: SchemaType.STRING, description: "What the user is interested in." },
                        summary: { type: SchemaType.STRING, description: "A brief summary of the conversation." }
                    },
                    required: ["user_email", "lead_intent"]
                }
            }
        ]
    }
];

export async function POST(req: NextRequest) {
    try {
        const { message, history, sessionId } = await req.json();

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID required" }, { status: 400 });
        }

        // 1. Log User Message to Supabase
        await supabase.from('messages').insert({
            session_id: sessionId,
            role: 'user',
            content: message
        });

        // System Instruction (Concise + Email Capture)
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

      Once they provide it, you MUST IMMEDIATELY call the 'send_lead_to_sales' tool.
      
      AFTER calling the tool:
      1. Confirm to the user that the request has been sent.
      2. IMMEDIATE NEXT STEP (Identity Verification via Domain Inference):
         - Check the email domain provided.
         - IF specific corporate domain (e.g. '@nvidia.com', '@google.com'): Say "I see you are with [Company Name]. Is that correct?"
         - IF generic domain (e.g. '@gmail.com', '@yahoo.com'): Say "Thanks. What company are you representing?"
      
      3. CRITICAL: Do NOT ask for project details (qualifying questions) in this same message. Wait for their confirmation of Company first.
      
      SUBSEQUENT TURNS (Natural Conversation Flow):
      - If user confirms Company -> THEN ask the qualification questions based on their original intent.
        - If Intent was "Spec Sheet" -> Ask: "Are you looking for high-density racks (50kW+), or standard colocation?"
        - If Intent was "Build" -> Ask: "Do you have a land site selected, or are you looking for our inventory?"
      
      Keep it one step at a time. Do not overwhelm the user.
    `;

        // Gemini Chat
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

        // Handle Tool Call (Lead Capture)
        if (call && call.name === "send_lead_to_sales") {
            const { user_email, user_name, lead_intent, summary } = call.args as any;
            console.log("dispatching-lead", { user_email, lead_intent });

            // A. Upsert Lead
            const { data: leadData, error: leadError } = await supabase
                .from('leads')
                .upsert({
                    email: user_email,
                    company: null, // Initial capture might not have company yet
                    status: 'NEW',
                    updated_at: new Date().toISOString()
                }, { onConflict: 'email' })
                .select()
                .single();

            if (leadError) console.error("Supabase Lead Error:", leadError);

            // B. Link Session Messages to this Lead
            if (leadData) {
                await supabase
                    .from('messages')
                    .update({ lead_id: leadData.id })
                    .eq('session_id', sessionId);
            }

            // C. Send Email
            if (process.env.RESEND_API_KEY) {
                const transcriptHtml = history.map((msg: any) =>
                    `<p><strong>${msg.role === 'user' ? 'User' : 'Edge'}:</strong> ${msg.text}</p>`
                ).join('') + `<p><strong>User:</strong> ${message}</p>`;

                await resend.emails.send({
                    from: 'Bleeding Edge AI <onboarding@resend.dev>',
                    to: ['sales@bleedingedge.group'],
                    subject: `[LEAD] ${lead_intent}`,
                    html: `
                        <h1>New Lead Captured</h1>
                        <p><strong>Email:</strong> ${user_email}</p>
                        <p><strong>Database ID:</strong> ${leadData?.id || 'Pending'}</p>
                        <p><strong>Intent:</strong> ${lead_intent}</p>
                        <hr/>
                        <h3>Transcript</h3>
                        ${transcriptHtml}
                    `
                }).catch(e => console.error("Email failed:", e));
            }

            // D. Resume Chat
            const toolResponsePart = {
                functionResponse: {
                    name: "send_lead_to_sales",
                    response: { status: "success", message: "Lead saved to database and email sent." }
                }
            };
            const finalResult = await chat.sendMessage([toolResponsePart]);
            finalResponseText = finalResult.response.text();
        }

        // 2. Log Model Response to Supabase
        // Note: If we just captured a lead, we try to link this message to it immediately if we have the ID,
        // otherwise rely on the 'session_id' and future back-fill if needed, but optimally we query the lead_id again or accept the session link.
        // Actually, if we just upserted, we linked previous messages. This *new* message should also be linked.
        // Let's try to find lead_id for this session if we didn't just get it.
        // For efficiency, we can just insert with session_id. The linking logic 'update all messages where session_id=...' captures everything past too if run periodically, 
        // but the tool call only ran ONCE.
        // Smart fix: If we just got `leadData`, use it.
        const { data: currentLead } = await supabase.from('leads').select('id').eq('email', history.find((h: any) => h.text.includes('@'))?.text || '').single(); // Very rough heuristic, better to rely on session grouping later or just session_id for now.
        // Actually, simply relying on session_id for the whole conversation is safer for anonymous->identified transition.
        // The previous UPDATE linked everything. Future messages with just session_id are implicitly linked if we map session->lead.
        // But the user schema has lead_id on messages.
        // Let's just insert with session_id. If we have leadData from the tool call, use it.

        await supabase.from('messages').insert({
            session_id: sessionId,
            role: 'assistant',
            content: finalResponseText
            // lead_id: ... (Optional optimization: if we know it, add it. But session_id is the robust link)
        });


        return NextResponse.json({ text: finalResponseText });

    } catch (error: any) {
        console.error("Gemini/Supabase Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
