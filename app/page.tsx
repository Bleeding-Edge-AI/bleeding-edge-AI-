'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useChat } from '@/app/context/ChatContext';
import { ArrowRight } from 'lucide-react';
import { CinematicHero } from '@/components/home/CinematicHero';
import { StackRouter } from '@/components/home/StackRouter';
import { CapabilitiesSection } from '@/components/home/CapabilitiesSection';
import { HomeCredibilitySection } from '@/components/home/HomeCredibilitySection';
import { ScrollToFullscreenVideo } from '@/components/home/ScrollToFullscreenVideo';

export default function HomePage() {
    const { openChatWithIntent } = useChat();

    return (
        <main className="bg-neutral-950 min-h-screen selection:bg-amber-500/30">

            {/* 1. HERO: CINEMATIC VISION */}
            <CinematicHero />

            {/* 2. ROUTER: THE STACK */}
            <StackRouter />

            {/* 3. CAPABILITIES: THE ENGINE */}
            <CapabilitiesSection />

            {/* 4. CREDIBILITY: SOCIAL PROOF */}
            <HomeCredibilitySection />

            {/* 5. IMMERSIVE INTRO VIDEO */}
            <ScrollToFullscreenVideo />

            {/* 6. FOOTER CTA */}
            <section className="py-32 px-6 bg-amber-950/20 border-t border-amber-900/30 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">READY TO <br /> ACCELERATE?</h2>
                    <button
                        onClick={() => openChatWithIntent("I want to discuss a project.")}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg rounded-full transition-all hover:scale-105 active:scale-95"
                    >
                        <span>Start a Project</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </motion.div>
            </section>
        </main>
    );
}
