'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

import { useChat } from '@/app/context/ChatContext';

export const CustomBuildCTA: React.FC = () => {
    const { openChatWithIntent } = useChat();

    return (
        <section className="py-16 md:py-32 px-6 bg-white text-neutral-950">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Need Hyperscale?</h2>
                <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto">
                    For multi-MW campuses, we deploy custom-designed footprints using our modular supply chain.
                </p>
                <button
                    onClick={() => openChatWithIntent("I'm interested in discussing a custom build.")}
                    className="px-10 py-5 bg-neutral-950 text-white text-lg font-bold rounded hover:bg-neutral-800 transition-colors inline-flex items-center"
                >
                    Discuss Custom Build
                    <ArrowRight className="ml-3 w-5 h-5" />
                </button>
            </div>
        </section>
    );
};
