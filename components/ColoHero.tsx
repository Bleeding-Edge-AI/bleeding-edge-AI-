'use client';

import React from 'react';
import { Shield, Network, Server, ArrowRight } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';
import { HeroDashboard } from '@/components/HeroDashboard';
import Link from 'next/link';

export const ColoHero: React.FC = () => {
    const { openChatWithIntent } = useChat();

    return (
        <section className="relative z-10 container mx-auto px-4 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 border border-white/10 bg-white/5 px-3 py-1 rounded-full backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono text-gray-300 tracking-wide">CAPACITY LIVE</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                    Fortress-Grade Colocation <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
                        for the Age of AI.
                    </span>
                </h1>

                <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                    Modular, Tier III+ bunkers built for high-density inference. Manage your physical footprint with the speed of software.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => openChatWithIntent("I'd like to configure colocation space.")}
                        className="px-8 py-4 bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 rounded-lg"
                    >
                        CONFIGURE SPACE <Server className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => openChatWithIntent("I'd like to book a tour of a facility.")}
                        className="px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/5 transition-all text-center rounded-lg"
                    >
                        BOOK A TOUR
                    </button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-mono">
                    <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" /> Tier IV reliability</div>
                    <div className="flex items-center gap-2"><Network className="w-4 h-4 text-red-500" /> Carrier neutral</div>
                    <div className="flex items-center gap-2"><Server className="w-4 h-4 text-red-500" /> Operations as a platform</div>
                </div>
            </div>

            {/* RIGHT VISUAL: HERO SYSTEM VISUAL (Hardware + Config) */}
            <div className="h-full w-full relative flex items-center justify-center">
                <HeroDashboard />
            </div>
        </section>
    );
};
