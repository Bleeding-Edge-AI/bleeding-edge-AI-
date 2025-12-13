'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useChat } from '@/app/context/ChatContext';
import { ArrowRight } from 'lucide-react';
import { OriginSection } from '@/components/about/OriginSection';
import { CredibilitySection } from '@/components/about/CredibilitySection';
import { TimelineSection } from '@/components/about/TimelineSection';



export default function AboutOptimism() {
    const { openChatWithIntent } = useChat();
    const { scrollYProgress } = useScroll();

    // Parallax for Hero
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500/30">

            {/* ---------------- SECTION 1: MANIFESTO (HERO) ---------------- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Cinematic Background Loop (Abstract Solarpunk/Industrial) */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-40"
                    style={{ y: yHero }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-neutral-950 to-neutral-950" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                    {/* Animated Grid / Horizon */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-500/10 to-transparent" />
                    <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-px opacity-10">
                        {Array.from({ length: 400 }).map((_, i) => (
                            <div key={i} className={`bg-amber-500/20 ${(i % 13 === 0 || i % 7 === 0) ? 'animate-pulse' : ''}`} />
                        ))}
                    </div>
                </motion.div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
                            THE FUTURE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                                CAN'T COME FAST ENOUGH.
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        We believe intelligence is the solution, not the problem. Curing disease, solving energy, and ending poverty requires <span className="text-amber-100 font-semibold">more compute, not less</span>. We exist to accelerate that timeline.
                    </motion.p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500"
                >
                    <ArrowRight className="rotate-90 w-6 h-6" />
                </motion.div>
            </section>


            {/* ---------------- SECTION 2: THE ORIGIN & COMMAND ---------------- */}
            <OriginSection />

            {/* ---------------- SECTION 3: CREDIBILITY (AWARDS & MAP) ---------------- */}
            <CredibilitySection />

            {/* ---------------- SECTION 4: LEGACY TIMELINE ---------------- */}
            <TimelineSection />


            {/* ---------------- SECTION 5: FOOTER CTA ---------------- */}
            <section className="py-32 px-6 bg-amber-950/20 border-t border-amber-900/30 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">BUILD THE FUTURE <br /> WITH US.</h2>
                    <button
                        onClick={() => openChatWithIntent("I want to contact the leadership team.")}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg rounded-full transition-all hover:scale-105 active:scale-95"
                    >
                        <span>Contact Command</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </motion.div>
            </section>

        </div>
    );
}
