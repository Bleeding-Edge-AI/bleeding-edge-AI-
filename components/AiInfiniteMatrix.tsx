'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import { Database, Brain, Scan, LineChart, CheckCircle2, Zap, ArrowRight, Layers } from 'lucide-react';

const horizontalTools = [
    { id: 'rag', title: "Semantic Search (RAG)", icon: Database, color: "text-blue-400", border: "border-blue-500/50" },
    { id: 'agents', title: "Autonomous Agents", icon: Brain, color: "text-purple-400", border: "border-purple-500/50" },
    { id: 'vision', title: "Multi-Modal Analysis", icon: Scan, color: "text-emerald-400", border: "border-emerald-500/50" },
    { id: 'predict', title: "Predictive Modeling", icon: LineChart, color: "text-amber-400", border: "border-amber-500/50" },
];

const useCases = [
    { industry: "FinTech", title: "Real-time Fraud Detection Agent", toolRef: "agents" },
    { industry: "AgriTech", title: "Drone Imagery Crop Analysis", toolRef: "vision" },
    { industry: "Legal", title: "M&A Contract Due Diligence", toolRef: "rag" },
    { industry: "Logistics", title: "Last-Mile Route Optimization", toolRef: "predict" },
    { industry: "Healthcare", title: "Patient Triage Assistant", toolRef: "agents" },
    { industry: "Mining", title: "IoT Predictive Maintenance", toolRef: "predict" },
    { industry: "Retail", title: "Dynamic Pricing Engine", toolRef: "predict" },
    { industry: "HR", title: "Resume Screening Bot", toolRef: "rag" },
    { industry: "Manufacturing", title: "Defect Detection Vision System", toolRef: "vision" },
    { industry: "Cybersecurity", title: "Threat Log Anomaly Hunter", toolRef: "agents" },
    { industry: "Real Estate", title: "Property Valuation Model", toolRef: "predict" },
    { industry: "Education", title: "Personalized Tutor Agent", toolRef: "rag" },
    { industry: "Media", title: "Content Moderation AI", toolRef: "vision" },
    { industry: "Energy", title: "Grid Load Balancing", toolRef: "predict" },
    { industry: "Customer Support", title: "L1 Ticket Resolution", toolRef: "rag" },
];

export const AiInfiniteMatrix: React.FC = () => {
    return (
        <section className="relative bg-neutral-950 min-h-screen flex flex-col md:flex-row overflow-hidden border-t border-white/5">
            {/* Background Atmosphere */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            {/* LEFT COLUMN: Horizontal Foundation (Fixed) */}
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center relative z-10 bg-neutral-950/80 backdrop-blur-sm border-b md:border-b-0 md:border-r border-white/5">
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-400 font-mono text-xs mb-6 uppercase tracking-widest">
                        <Layers className="w-3 h-3" />
                        The Matrix
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                        Universal Engine.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Infinite Applications.</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
                        We deploy a core set of horizontal capabilities to solve hyper-specific vertical problems across any industry.
                    </p>
                </div>

                {/* The Core Tools */}
                <div className="space-y-6 relative">
                    {/* Connector Origin Point (Hidden, used for visual logic) */}
                    <div className="absolute top-1/2 right-[-1px] w-1 h-1 bg-white" id="connector-origin" />

                    {horizontalTools.map((tool) => (
                        <div key={tool.id} className={`group relative p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden`}>
                            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${tool.color.replace('text', 'from')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`p-3 rounded-lg bg-neutral-800 ${tool.color}`}>
                                    <tool.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white">{tool.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: Vertical Infinite Stream */}
            <div className="w-full md:w-1/2 h-[80vh] md:h-screen relative overflow-hidden bg-neutral-950/50">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-50" />

                {/* Marquee Container */}
                <div className="h-full overflow-hidden relative">
                    <motion.div
                        className="flex flex-col gap-6 p-8 absolute w-full"
                        animate={{ y: ["0%", "-50%"] }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {/* Repeat list twice for infinite loop */}
                        {[...useCases, ...useCases].map((useCase, idx) => (
                            <UseCaseCard key={idx} data={useCase} index={idx} />
                        ))}
                    </motion.div>
                </div>

                {/* Central Focus Line */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent pointer-events-none opacity-0 md:opacity-30" />
            </div>
        </section>
    );
};

const UseCaseCard = ({ data, index }: { data: typeof useCases[0], index: number }) => {
    // Logic to detect when this card crosses the center line could be added here for dynamic SVGs
    // For now, we rely on the CSS/Motion loop for the "Stream" effect.

    return (
        <div className="relative group">
            {/* Connection Line Trigger (Visual only) */}
            <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-indigo-500/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300" />

            <div className="p-6 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/5 hover:bg-white/[0.07] hover:border-indigo-500/30 transition-all duration-300 group-hover:translate-x-2">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 opacity-70 mb-1 block">
                        {data.industry}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                    {data.title}
                </h4>
            </div>
        </div>
    );
};
