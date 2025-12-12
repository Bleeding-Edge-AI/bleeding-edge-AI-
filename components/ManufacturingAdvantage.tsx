'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Sun, Zap, Layers, Factory, Clock, ShieldCheck, Component } from 'lucide-react';

const pillars = [
    {
        id: 'supply',
        title: 'Vertical Integration',
        desc: 'We manufacture our own Fanwalls, Power Skids, and Fiber Trays. Zero dependency on external vendor backlogs.',
        icon: Component,
        highlightLayer: 'all' // Highlights everything or specific parts
    },
    {
        id: 'environment',
        title: 'Factory Precision',
        desc: 'Controlled environments eliminate weather delays and ensure consistent, high-quality finishes every time.',
        icon: Factory,
        highlightLayer: 'shell'
    },
    {
        id: 'speed',
        title: 'Parallel Execution',
        desc: 'We build your modules in the factory while simultaneously prepping the site. Delivery in 120 days flat.',
        icon: Clock,
        highlightLayer: 'skid'
    },
    {
        id: 'design',
        title: 'Battle-Tested Topologies',
        desc: 'Proven, standardized engineering designs replicated at speed. No experimental custom one-offs.',
        icon: ShieldCheck,
        highlightLayer: 'fanwall'
    }
];

export const ManufacturingAdvantage: React.FC = () => {
    const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

    return (
        <section className="py-24 px-6 bg-neutral-950 border-y border-white/5 relative overflow-hidden">
            {/* Background Tech Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tight">
                        Manufactured. <span className="text-red-600">Not Constructed.</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl font-light leading-relaxed">
                        We moved the construction site to the factory floor. By manufacturing our own proprietary components, we eliminate vendor delays and guarantee 120-day delivery.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: The 4 Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pillars.map((pillar) => (
                            <div
                                key={pillar.id}
                                onMouseEnter={() => setActiveHighlight(pillar.highlightLayer)}
                                onMouseLeave={() => setActiveHighlight(null)}
                                className="p-8 bg-neutral-900/50 border border-white/5 hover:border-red-500/50 rounded-xl transition-all duration-300 group cursor-default hover:bg-neutral-900"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-neutral-400 group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors">
                                    <pillar.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide group-hover:text-red-500 transition-colors">{pillar.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Exploded View Visualization */}
                    <div className="relative h-[600px] flex items-center justify-center perspective-[2000px]">
                        <div className="relative w-64 md:w-80 h-96 transform-style-3d rotate-x-60 rotate-z-45">

                            {/* Layer 1: Top (Concrete Shell) */}
                            <motion.div
                                animate={{
                                    y: activeHighlight === 'shell' || activeHighlight === 'all' ? -60 : 0,
                                    opacity: activeHighlight && activeHighlight !== 'shell' && activeHighlight !== 'all' ? 0.3 : 1
                                }}
                                className="absolute inset-0 z-30 transition-all duration-500"
                            >
                                <div className="w-full h-full bg-neutral-800 border-2 border-neutral-600 rounded-lg shadow-xl flex items-center justify-center relative backdrop-blur-sm bg-opacity-90">
                                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest bg-black/50 px-2 py-1 rounded">Prefab Shell</div>
                                    {/* Texture */}
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] mix-blend-overlay"></div>
                                </div>
                            </motion.div>

                            {/* Layer 2: Middle (Fanwall) */}
                            <motion.div
                                animate={{
                                    y: activeHighlight === 'fanwall' || activeHighlight === 'all' ? 0 : 20,
                                    scale: activeHighlight === 'fanwall' ? 1.05 : 1,
                                    opacity: activeHighlight && activeHighlight !== 'fanwall' && activeHighlight !== 'all' ? 0.3 : 1
                                }}
                                className="absolute inset-0 z-20 mt-12 transition-all duration-500"
                            >
                                <div className="w-full h-full bg-neutral-900 border-2 border-red-900/50 rounded-lg flex items-center justify-center relative shadow-lg">
                                    <div className="grid grid-cols-3 gap-2 p-4 w-full h-full opacity-50">
                                        {[...Array(9)].map((_, i) => (
                                            <div key={i} className="bg-neutral-800 rounded-full border border-neutral-700 animate-pulse"></div>
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-xs font-mono text-red-500 uppercase tracking-widest bg-black/80 px-2 py-1 rounded border border-red-500/20">Thermal Wall</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Layer 3: Bottom (Power Skid) */}
                            <motion.div
                                animate={{
                                    y: activeHighlight === 'skid' || activeHighlight === 'all' ? 60 : 40,
                                    opacity: activeHighlight && activeHighlight !== 'skid' && activeHighlight !== 'all' ? 0.3 : 1
                                }}
                                className="absolute inset-0 z-10 mt-24 transition-all duration-500"
                            >
                                <div className="w-full h-full bg-neutral-900 border-2 border-yellow-900/30 rounded-lg flex items-center justify-center relative shadow-lg">
                                    {/* Circuit Pattern */}
                                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]"></div>
                                    <div className="text-xs font-mono text-yellow-500 uppercase tracking-widest bg-black/80 px-2 py-1 rounded border border-yellow-500/20 z-10">Power Skid</div>
                                </div>
                            </motion.div>

                        </div>

                        {/* Dashed Lines connecting layers when exploded */}
                        <motion.div
                            animate={{ opacity: activeHighlight === 'all' ? 0.5 : 0 }}
                            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                        >
                            {/* SVG lines could be added here for extra detail */}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
