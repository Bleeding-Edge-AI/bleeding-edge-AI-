
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType, Tool } from '@google/generative-ai';
import { Resend } from 'resend';

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY or API_KEY is missing from environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);
// Initialize Resend Client
const resend = new Resend(process.env.RESEND_API_KEY || 're_123'); // Fallback for dev without key

// Tool Definition (Standard SDK format)
const tools: Tool[] = [
    {
        functionDeclarations: [
            {
                name: "send_lead_to_sales",
                description: "Send a sales lead email when a user provides their email address and expresses interest.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        user_email: {
                            type: SchemaType.STRING,
                            description: "The user's email address."
                        },
                        user_name: {
                            type: SchemaType.STRING,
                            description: "The user's name if provided."
                        },
                        lead_intent: {
                            type: SchemaType.STRING,
                            description: "What the user is interested in (e.g., 'Requesting Spec Sheet', 'Colocation Pricing')."
                        },
                        summary: {
                            type: SchemaType.STRING,
                            description: "A brief summary of the conversation context."
                        }
                    },
                    required: ["user_email", "lead_intent"]
                }
            }
        ]
    }
];

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        // System Instruction to enforce tool use
        const systemInstruction = `
      You are 'Edge', an AI Sales Engineer for Bleeding Edge Infrastructure.
      Your goal is to answer technical questions about our data center hardware, colocation, and AI tooling.
      
      CRITICAL RULE: If a user expresses interest in buying, pricing, or getting specific documents (like spec sheets), you MUST ask for their business email address.
      Once they provide it, you MUST IMMEDIATELY call the 'send_lead_to_sales' tool.
      
      Do not hallucinate that you sent an email. Call the tool.
      After calling the tool, confirm to the user that the information is on its way.
    `;

        // Construct history for Gemini
        const chatHistory = history.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            tools: tools,
            systemInstruction: systemInstruction
        });

        const chat = model.startChat({
            history: chatHistory,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const functionCalls = response.functionCalls();
        const call = functionCalls?.[0];

        if (call) {
            if (call.name === "send_lead_to_sales") {
                const { user_email, user_name, lead_intent, summary } = call.args as any;

                // Execute Email Sending via Resend
                console.log("dispatching-email", { user_email, lead_intent });

                try {
                    if (process.env.RESEND_API_KEY) {
                        await resend.emails.send({
                            from: 'Bleeding Edge AI <onboarding@resend.dev>', // Verify domain in prod
                            to: ['sales@bleedingedge.group'],
                            subject: `[LEAD] ${lead_intent}`,
                            html: `
                        <h1>New Lead Captured</h1>
                        <p><strong>Email:</strong> ${user_email}</p>
                        <p><strong>Name:</strong> ${user_name || 'N/A'}</p>
                        <p><strong>Intent:</strong> ${lead_intent}</p>
                        <hr/>
                        <h3>Summary</h3>
                        <p>${summary || 'No summary provided.'}</p>
                    `
                        });
                    } else {
                        console.warn("RESEND_API_KEY missing, skipping actual email send.");
                    }
                } catch (emailError) {
                    console.error("Email dispatch failed:", emailError);
                }

                // Return tool output to model so it can generate final response
                const toolResult = {
                    functionResponses: [{
                        functionResponse: {
                            name: "send_lead_to_sales",
                            response: { status: "success", message: "Email dispatched successfully" }
                        }
                    }]
                };

                // Re-prompting model with tool output:
                const finalResult = await chat.sendMessage([
                    toolResult
                ] as any);

                return NextResponse.json({ text: finalResult.response.text() });
            }
        }

        return NextResponse.json({ text: response.text() });

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
