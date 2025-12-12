'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';

export const ColoCTA: React.FC = () => {
    const { openChatWithIntent } = useChat();

    return (
        <section className="relative z-10 py-20 px-6">
            <div className="max-w-4xl mx-auto text-center border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-12 rounded-3xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 blur-[80px] pointer-events-none"></div>
                <h2 className="text-3xl font-bold text-white mb-6">Need Colo Space?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Get in touch with our sales team to learn more about our colocation options.
                </p>
                <button
                    onClick={() => openChatWithIntent("I'd like to get a quote for colocation.")}
                    className="inline-flex px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                    Get a Quote <ArrowRight className="ml-2 w-5 h-5" />
                </button>
            </div>
        </section>
    );
};
