'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROTATOR_WORDS = [
    "AI Bank",
    "AI Insurer",
    "AI Retailer",
    "AI Logistics Firm",
    "AI Hospital"
];

export const AiEconomySection: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROTATOR_WORDS.length);
        }, 2500); // 2.5s rotation
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-32 bg-neutral-950 overflow-hidden text-center z-10">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 to-neutral-950 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* 1. Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-sm md:text-base font-bold tracking-[0.2em] text-cyan-500 uppercase mb-4">The New Industrial Revolution</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        The world is shifting from software-enabled to AI-native. Legacy moats are dissolving. New ones are being built on data.
                    </p>
                </motion.div>

                {/* 2. Visual Hook (Word Rotator) */}
                <div className="flex flex-col md:flex-row items-center justify-center text-4xl md:text-7xl font-bold tracking-tight leading-tight mb-16 h-[200px] md:h-auto">
                    <span className="text-white mr-0 md:mr-4 mb-2 md:mb-0">We help you become an</span>

                    <div className="relative h-[1.2em] w-full md:w-[600px] overflow-hidden flex justify-center md:justify-start">
                        {/* Mask to fade edges of potential long words if needed, though mostly visual flair */}
                        <AnimatePresence mode='popLayout'>
                            <motion.span
                                key={index}
                                initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                exit={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="absolute inset-0 text-cyan-400 bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-cyan-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                            >
                                {ROTATOR_WORDS[index]}?
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* 3. Narrative */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="max-w-3xl mx-auto"
                >
                    <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light">
                        "Software ate the world. Now <span className="text-white font-semibold">Intelligence is eating software</span>. In this new economy, your competitive advantage isn't your code—it's your proprietary data and the agents that act on it."
                    </p>
                </motion.div>

            </div>
        </section>
    );
};
