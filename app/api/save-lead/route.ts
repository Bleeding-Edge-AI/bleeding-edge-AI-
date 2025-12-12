import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

// In-memory "DB" for demonstration (In prod, use Postgres/Prisma)
// We use a Map to track if we've already sent a "Welcome" email to a user in this session (or roughly).
// Since this is serverless, this Map might clear, but it serves the purpose for this session-based logic.
const sentEmailsCache = new Set<string>();

export async function POST(req: NextRequest) {
    try {
        // Use clone() to prevent body stream issues if read multiple times
        let body;
        try {
            body = await req.json();
        } catch (e) {
            // If Beacon sends text/plain or blob, next/server might struggle with standard .json() sometimes?
            // Usually Beacon sends POST with configurable type. We'll assume application/json or text/plain JSON.
            return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const { user_email, user_name, company, lead_intent, history, status } = body;

        console.log(`[SAVE-LEAD] Status: ${status}, Email: ${user_email}, Intent: ${lead_intent}`);

        if (!user_email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 });
        }

        // --- LOGIC: Handle Two-Pulse Strategy ---

        // PULSE 1: INITIAL CAPTURE (Immediate)
        if (status === 'INITIAL_CAPTURE') {
            const subject = `[NEW LEAD] ${user_email}`;
            // Simple dedup using cache to avoid spamming if frontend retries
            if (!sentEmailsCache.has(user_email)) {
                await sendSalesEmail(user_email, user_name, company, lead_intent, history, subject);
                sentEmailsCache.add(user_email);
                console.log(`[SAVE-LEAD] Initial pulse sent for ${user_email}`);
            } else {
                console.log(`[SAVE-LEAD] Skipping initial email for ${user_email}, already sent.`);
            }
        }

        // PULSE 2: ABANDONED (Beacon / Final Transcript)
        else if (status === 'ABANDONED') {
            const subject = `[CHAT TRANSCRIPT] ${user_email}`;
            await sendSalesEmail(user_email, user_name, company, lead_intent, history, subject);
            console.log(`[SAVE-LEAD] Abandonment transcript sent for ${user_email}`);
        }

        // Handle generic updates if any (optional, but keeping for safety)
        else if (status === 'updated') {
            const subject = `[LEAD UPDATE] ${user_email}`;
            await sendSalesEmail(user_email, user_name, company, lead_intent, history, subject);
            console.log(`[SAVE-LEAD] Silent update logged for ${user_email}`);
        }

        return NextResponse.json({ status: "success", message: "Lead processed" });

    } catch (error: any) {
        console.error("[SAVE-LEAD] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function sendSalesEmail(email: string, name: string, company: string, intent: string, history: any[], subjectLine: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("[SAVE-LEAD] No RESEND_API_KEY, skipping email.");
        return;
    }

    // Construct Transcript
    const transcriptHtml = history && Array.isArray(history)
        ? history.map((msg: any) =>
            `<p><strong>${msg.role === 'user' ? 'User' : 'Edge'}:</strong> ${msg.text}</p>`
        ).join('')
        : '<p>No history available.</p>';

    try {
        await resend.emails.send({
            from: 'Bleeding Edge AI <onboarding@resend.dev>',
            to: ['sales@bleedingedge.group'], // Replace with real sales email
            subject: subjectLine,
            html: `
            <div style="font-family: sans-serif; padding: 20px;">
                <h1 style="color: #10b981">${subjectLine}</h1>
                <hr/>
                <h3>Lead Details</h3>
                <ul>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Name:</strong> ${name || 'N/A'}</li>
                    <li><strong>Company:</strong> ${company || 'N/A'}</li>
                    <li><strong>Intent:</strong> ${intent || 'N/A'}</li>
                </ul>
                <hr/>
                <h3>Chat Transcript</h3>
                <div style="background: #f1f5f9; padding: 15px; border-radius: 8px;">
                    ${transcriptHtml}
                </div>
            </div>
        `
        });
    } catch (e) {
        console.error("[SAVE-LEAD] Failed to send email via Resend:", e);
    }
}
