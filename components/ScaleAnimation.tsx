'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScaleAnimation: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Calculate opacity/scale for 3 phases
    // Phase 1: 0 - 0.33 (Node)
    // Phase 2: 0.33 - 0.66 (Cluster)
    // Phase 3: 0.66 - 1.0 (Network)

    const nodeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const nodeScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

    const clusterOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
    const clusterScale = useTransform(scrollYProgress, [0.25, 0.35], [0.8, 1]);

    const networkOpacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);
    const networkScale = useTransform(scrollYProgress, [0.6, 0.7], [0.8, 1]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-neutral-950">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

                {/* Title Container */}
                <div className="absolute top-24 z-20 text-center px-6">
                    <motion.div style={{ opacity: nodeOpacity }} className="absolute inset-0 flex items-center justify-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-2">From Node...</h2>
                            <div className="text-red-500 font-mono text-sm tracking-widest uppercase">Edge Deployment (Month 1)</div>
                        </div>
                    </motion.div>
                    <motion.div style={{ opacity: clusterOpacity }} className="absolute inset-0 flex items-center justify-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-2">...To Campus...</h2>
                            <div className="text-red-500 font-mono text-sm tracking-widest uppercase">Campus Cluster (Month 8)</div>
                        </div>
                    </motion.div>
                    <motion.div style={{ opacity: networkOpacity }} className="absolute inset-0 flex items-center justify-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-2">...To Constellation.</h2>
                            <div className="text-red-500 font-mono text-sm tracking-widest uppercase">Distributed Network (Year 2)</div>
                        </div>
                    </motion.div>
                </div>

                {/* Visuals Container */}
                <div className="relative w-full max-w-5xl aspect-video bg-neutral-900/50 rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Phase 1: Single Node */}
                    <motion.div style={{ opacity: nodeOpacity, scale: nodeScale }} className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-48 bg-neutral-800 border-2 border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.3)] rounded-lg flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
                            <span className="text-xs font-mono text-red-400">NODE 01</span>
                        </div>
                    </motion.div>

                    {/* Phase 2: Cluster */}
                    <motion.div style={{ opacity: clusterOpacity, scale: clusterScale }} className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="w-24 h-36 bg-neutral-800 border border-neutral-600 rounded-lg flex items-center justify-center relative group">
                                    <div className="absolute inset-0 bg-red-500/5"></div>
                                    {i === 2 && <div className="absolute inset-0 border-2 border-red-500 animate-pulse rounded-lg"></div>}
                                    <div className="flex space-x-1">
                                        <div className="w-1 h-3 bg-red-600 rounded-full"></div>
                                        <div className="w-1 h-3 bg-red-600 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Connection lines would go here - simplified for React version */}
                    </motion.div>

                    {/* Phase 3: Map / Network */}
                    <motion.div style={{ opacity: networkOpacity, scale: networkScale }} className="absolute inset-0 flex items-center justify-center">
                        {/* Simplified Map Visualization */}
                        <div className="relative w-full h-full opacity-50">
                            <svg className="w-full h-full" viewBox="0 0 800 450">
                                {/* Map Points */}
                                <circle cx="200" cy="150" r="4" fill="#666" />
                                <circle cx="210" cy="280" r="4" fill="#666" />

                                {/* Active Clusters */}
                                <circle cx="400" cy="225" r="8" fill="#DC2626" className="animate-pulse" />
                                <circle cx="400" cy="225" r="30" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.5" />

                                <circle cx="600" cy="100" r="6" fill="#DC2626" />
                                <circle cx="550" cy="350" r="6" fill="#DC2626" />

                                {/* Connection Lines */}
                                <path d="M400,225 L600,100" stroke="#DC2626" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                                <path d="M400,225 L550,350" stroke="#DC2626" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                            </svg>
                        </div>
                        <div className="absolute bottom-8 right-8 text-right">
                            <div className="text-4xl font-bold text-white">450 MW</div>
                            <div className="text-sm font-mono text-neutral-500">TOTAL CAPACITY</div>
                        </div>
                    </motion.div>

                </div>

                <div className="absolute bottom-12 text-center max-w-xl px-6">
                    <h3 className="text-xl text-neutral-400">Deploy CapEx in increments. <span className="text-white">Never overbuild.</span></h3>
                </div>
            </div>
        </div>
    );
};
