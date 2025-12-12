
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(req: NextRequest) {
    try {
        // use sendBeacon so body is likely text/plain or blob, depending on browser implementation, 
        // but Next.js usually parses JSON body if content-type is correct.
        // However, sendBeacon sends as text/plain often.
        // Let's safe parse.
        const text = await req.text();
        const { user_email, lead_intent, summary } = JSON.parse(text);

        console.log("Processing Abandoned Draft:", { user_email });

        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: 'Bleeding Edge AI <onboarding@resend.dev>',
                to: ['sales@bleedingedge.group'],
                subject: `[DRAFT LEAD] ${lead_intent}`,
                html: `
                    <h1>⚠️ Abandoned Draft Captured</h1>
                    <p>User typed an email but left the site before completing.</p>
                    <p><strong>Email:</strong> ${user_email}</p>
                    <p><strong>Intent:</strong> ${lead_intent}</p>
                    <hr/>
                    <h3>Context</h3>
                    <p>${summary}</p>
                `
            });
        }

        return NextResponse.json({ status: 'ok' });
    } catch (e) {
        console.error("Abandon Beacon Error:", e);
        return NextResponse.json({ status: 'error' }, { status: 500 });
    }
}
