
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
        // System Instruction to enforce tool use
        const systemInstruction = `
      You are 'Edge', an AI Sales Engineer for Bleeding Edge Infrastructure.
      Your goal is to answer technical questions about our data center hardware, colocation, and AI tooling.
      
      CRITICAL RULE: If a user expresses interest in buying, pricing, deploying, or getting specific documents (like spec sheets), you MUST acknowledge their interest and IMMEDIATELY ask for their business email address in the very first response.
      
      Do NOT ask clarifying questions (like "which specs?" or "how many units?") until you have captured their email.
      
      Example:
      User: "I want to deploy a H100 cluster."
      You: "Excellent choice. I can help you with that deployment. Could you please provide your business email address so I can send you the capacity details?"

      Once they provide it, you MUST IMMEDIATELY call the 'send_lead_to_sales' tool.
      
      AFTER calling the tool:
      1. Confirm to the user that the request has been sent.
      2. If you can infer their Name and Company from the email (e.g. bernardo@google.com -> Name: Bernardo, Company: Google), ask them to confirm if that is correct. If you cannot infer it, ask them for their name and company.
      3. Ask a follow-up qualification question to keep the conversation going, such as "Could you tell me a bit more about the scale of deployment you are looking for?" or "Are you interested in liquid cooling solutions?".
      
      Do NOT stop the conversation. Keep engaging.
    `;

        // Construct history for Gemini
        const chatHistory = history.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
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

                // Construct Chat Transcript for Email
                const transcriptHtml = history.map((msg: any) =>
                    `<p><strong>${msg.role === 'user' ? 'User' : 'Edge'}:</strong> ${msg.text}</p>`
                ).join('') + `<p><strong>User:</strong> ${message}</p>`;

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
                        <hr/>
                        <h3>Full Chat Transcript</h3>
                        ${transcriptHtml}
                    `
                        });
                    } else {
                        console.warn("RESEND_API_KEY missing, skipping actual email send.");
                    }
                } catch (emailError) {
                    console.error("Email dispatch failed:", emailError);
                }

                // Return tool output to model so it can generate final response
                // Fix: The SDK expects an array of parts, and 'functionResponse' is a direct property of a Part.
                const toolResponsePart = {
                    functionResponse: {
                        name: "send_lead_to_sales",
                        response: { status: "success", message: "Email dispatched successfully" }
                    }
                };

                // Re-prompting model with tool output:
                const finalResult = await chat.sendMessage([
                    toolResponsePart
                ]);

                return NextResponse.json({ text: finalResult.response.text() });
            }
        }

        return NextResponse.json({ text: response.text() });

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
