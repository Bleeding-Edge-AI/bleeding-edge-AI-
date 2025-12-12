import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AIChat } from '@/components/AIChat';

import { ChatProvider } from '@/app/context/ChatContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
    title: 'Bleeding Edge | Infrastructure for the Intelligence Age',
    description: 'Infrastructure for the Intelligence Age. We build the physical and digital foundations for Artificial Intelligence.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen bg-slate-950 text-white selection:bg-brand-500 selection:text-white`}>
                <ChatProvider>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <AIChat />
                </ChatProvider>
            </body>
        </html>
    );
}
