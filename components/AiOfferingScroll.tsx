'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Server, Database, Brain, Network, Cpu, Code, FileSearch, ArrowRight, Terminal, UserCheck } from 'lucide-react';

const offeringData = {
    diagnosis: {
        number: "01",
        title: "Strategic Diagnosis",
        subhead: "We map the territory before we build the engine. A standalone audit to uncover ROI and technical feasibility.",
        items: [
            "Opportunity Mapping & ROI Modeling",
            "Data Readiness Audit",
            "Tech Stack Selection"
        ]
    },
    implementation: {
        number: "02",
        title: "Intelligent Execution",
        subhead: "From proof-of-concept to production. We deploy autonomous agents and RAG pipelines that live on your infrastructure.",
        items: [
            "Custom Agent Development (LangChain)",
            "Enterprise RAG Pipelines",
            "Proprietary Model Fine-Tuning"
        ]
    },
    fde: {
        number: "03",
        title: "Forward Deployed Engineer",
        subhead: "We don't just ship code. We embed an elite engineer in your team to bridge the gap between our models and your reality.",
        items: [
            "On-Site / Embedded Integration",
            "Real-Time Data Wrangling",
            "Day 2 Ops & Model Drift Management"
        ]
    }
};

export const AiOfferingScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

    // Transition Ranges (3 Phases)
    // 0.00 -> 0.33: Diagnosis
    // 0.33 -> 0.66: Implementation
    // 0.66 -> 1.00: FDE

    // Opacity Transforms
    const diagOpacity = useTransform(smoothProgress, [0.25, 0.33], [1, 0]);
    const implOpacity = useTransform(smoothProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]);
    const fdeOpacity = useTransform(smoothProgress, [0.58, 0.66], [0, 1]);

    // Scale/Position Transforms for Visuals
    const visualScale = useTransform(smoothProgress, [0.25, 0.33, 0.58, 0.66], [0.9, 1, 0.9, 1]);
    const visualY = useTransform(smoothProgress, [0.25, 0.33, 0.58, 0.66], [0, -20, 0, -20]);

    // Active Phase Display Logic
    const diagDisplay = useTransform(diagOpacity, v => v > 0 ? 'block' : 'none');
    const implDisplay = useTransform(implOpacity, v => v > 0 ? 'block' : 'none');
    const fdeDisplay = useTransform(fdeOpacity, v => v > 0 ? 'block' : 'none');

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-neutral-950">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col lg:flex-row">

                {/* --- LEFT COLUMN: CONTENT --- */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center p-6 md:p-8 lg:p-24 relative z-20 bg-neutral-950/80 backdrop-blur-sm lg:bg-transparent">
                    <div className="relative w-full max-w-xl">

                        {/* Phase 1 Text: Diagnosis */}
                        <motion.div
                            style={{ opacity: diagOpacity, display: diagDisplay }}
                            className="absolute top-1/2 left-0 w-full -translate-y-1/2"
                        >
                            <div className="font-mono text-red-500 text-sm mb-4 tracking-widest uppercase border-b border-red-900/30 pb-2 inline-block">
                                Phase {offeringData.diagnosis.number}
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-light text-white mb-4 lg:mb-8 tracking-tighter">
                                {offeringData.diagnosis.title.split(' ')[0]} <br />
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-900">
                                    {offeringData.diagnosis.title.split(' ')[1]}
                                </span>
                            </h2>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12 border-l-2 border-red-900 pl-6">
                                {offeringData.diagnosis.subhead}
                            </p>
                            <ul className="space-y-6">
                                {offeringData.diagnosis.items.map((item, i) => (
                                    <li key={i} className="flex items-center text-neutral-300 font-mono text-sm tracking-wide group">
                                        <div className="w-8 h-px bg-red-900 mr-4 group-hover:w-12 group-hover:bg-red-500 transition-all" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Phase 2 Text: Implementation */}
                        <motion.div
                            style={{ opacity: implOpacity, display: implDisplay }}
                            className="absolute top-1/2 left-0 w-full -translate-y-1/2"
                        >
                            <div className="font-mono text-cyan-500 text-sm mb-4 tracking-widest uppercase border-b border-cyan-900/30 pb-2 inline-block">
                                Phase {offeringData.implementation.number}
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-light text-white mb-4 lg:mb-8 tracking-tighter">
                                {offeringData.implementation.title.split(' ')[0]} <br />
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                                    {offeringData.implementation.title.split(' ')[1]}
                                </span>
                            </h2>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12 border-l-2 border-cyan-900 pl-6">
                                {offeringData.implementation.subhead}
                            </p>
                            <ul className="space-y-6">
                                {offeringData.implementation.items.map((item, i) => (
                                    <li key={i} className="flex items-center text-neutral-300 font-mono text-sm tracking-wide group">
                                        <div className="w-8 h-px bg-cyan-900 mr-4 group-hover:w-12 group-hover:bg-cyan-500 transition-all" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Phase 3 Text: FDE */}
                        <motion.div
                            style={{ opacity: fdeOpacity, display: fdeDisplay }}
                            className="absolute top-1/2 left-0 w-full -translate-y-1/2"
                        >
                            <div className="font-mono text-emerald-500 text-sm mb-4 tracking-widest uppercase border-b border-emerald-900/30 pb-2 inline-block">
                                Phase {offeringData.fde.number}
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-light text-white mb-4 lg:mb-8 tracking-tighter">
                                Forward <br />
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400">
                                    Deployed Eng.
                                </span>
                            </h2>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12 border-l-2 border-emerald-900 pl-6">
                                {offeringData.fde.subhead}
                            </p>
                            <ul className="space-y-6">
                                {offeringData.fde.items.map((item, i) => (
                                    <li key={i} className="flex items-center text-neutral-300 font-mono text-sm tracking-wide group">
                                        <div className="w-8 h-px bg-emerald-900 mr-4 group-hover:w-12 group-hover:bg-emerald-500 transition-all" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>
                </div>

                {/* --- RIGHT COLUMN: VISUAL --- */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-neutral-900/50 border-l border-white/5 relative overflow-hidden flex items-center justify-center">

                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    <motion.div
                        style={{ scale: visualScale, y: visualY }}
                        className="relative w-[500px] h-[500px]"
                    >
                        {/* --- PHASE 1 VISUAL: WIREFRAME --- */}
                        <motion.div
                            style={{ opacity: diagOpacity }}
                            className="absolute inset-0 z-10"
                        >
                            <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 500 500">
                                {/* Dashed Connections */}
                                <path d="M100,250 L250,100" stroke="#450a0a" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                                <path d="M100,250 L250,400" stroke="#450a0a" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                                <path d="M250,100 L400,250" stroke="#450a0a" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                                <path d="M250,400 L400,250" stroke="#450a0a" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                                <path d="M100,250 L400,250" stroke="#450a0a" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.5" />

                                {/* Nodes (Outline Only) */}
                                <g transform="translate(100,250)">
                                    <circle r="40" fill="#0a0a0a" stroke="#ef4444" strokeWidth="1.5" />
                                    <text x="0" y="5" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace">INPUT</text>
                                </g>
                                <g transform="translate(250,100)">
                                    <rect x="-30" y="-30" width="60" height="60" fill="#0a0a0a" stroke="#ef4444" strokeWidth="1.5" />
                                    <text x="0" y="5" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace">LOGIC</text>
                                </g>
                                <g transform="translate(250,400)">
                                    <rect x="-30" y="-30" width="60" height="60" fill="#0a0a0a" stroke="#ef4444" strokeWidth="1.5" />
                                    <text x="0" y="5" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace">DATA</text>
                                </g>
                                <g transform="translate(400,250)">
                                    <circle r="40" fill="#0a0a0a" stroke="#ef4444" strokeWidth="1.5" />
                                    <text x="0" y="5" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace">OUTPUT</text>
                                </g>
                            </svg>

                            {/* Annotations */}
                            <div className="absolute top-4 right-4 bg-neutral-900 border border-red-900/50 p-2 text-[10px] text-red-500 font-mono">
                                STATUS: AUDIT_PENDING
                            </div>
                        </motion.div>


                        {/* --- PHASE 2 VISUAL: ACTIVATION (Implementation) --- */}
                        <motion.div
                            style={{ opacity: implOpacity }}
                            className="absolute inset-0 z-20"
                        >
                            <svg className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]" viewBox="0 0 500 500">
                                <defs>
                                    <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#06b6d4" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Glowing Connections */}
                                <path d="M100,250 L250,100" stroke="url(#neonGrad)" strokeWidth="3" fill="none" filter="url(#glow)" className="animate-pulse" />
                                <path d="M100,250 L250,400" stroke="url(#neonGrad)" strokeWidth="3" fill="none" filter="url(#glow)" className="animate-pulse" />
                                <path d="M250,100 L400,250" stroke="url(#neonGrad)" strokeWidth="3" fill="none" filter="url(#glow)" className="animate-pulse" />
                                <path d="M250,400 L400,250" stroke="url(#neonGrad)" strokeWidth="3" fill="none" filter="url(#glow)" className="animate-pulse" />

                                {/* Nodes (Filled & Active) */}
                                <g transform="translate(100,250)" filter="url(#glow)">
                                    <circle r="40" fill="#06b6d4" stroke="none" opacity="0.2" />
                                    <circle r="35" fill="none" stroke="#06b6d4" strokeWidth="2" />
                                    <FileSearch x="-12" y="-12" width="24" height="24" stroke="#fff" />
                                </g>
                                <g transform="translate(250,100)" filter="url(#glow)">
                                    <rect x="-30" y="-30" width="60" height="60" rx="4" fill="#3b82f6" opacity="0.2" />
                                    <rect x="-30" y="-30" width="60" height="60" rx="4" fill="none" stroke="#3b82f6" strokeWidth="2" />
                                    <Brain x="-12" y="-12" width="24" height="24" stroke="#fff" />
                                </g>
                                <g transform="translate(250,400)" filter="url(#glow)">
                                    <rect x="-30" y="-30" width="60" height="60" rx="4" fill="#3b82f6" opacity="0.2" />
                                    <rect x="-30" y="-30" width="60" height="60" rx="4" fill="none" stroke="#3b82f6" strokeWidth="2" />
                                    <Database x="-12" y="-12" width="24" height="24" stroke="#fff" />
                                </g>
                                <g transform="translate(400,250)" filter="url(#glow)">
                                    <circle r="40" fill="#06b6d4" stroke="none" opacity="0.2" />
                                    <circle r="35" fill="none" stroke="#06b6d4" strokeWidth="2" />
                                    <CheckMark x="-12" y="-12" />
                                </g>
                            </svg>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-20 left-10 bg-neutral-900/90 border border-blue-500/50 p-4 rounded-lg shadow-xl backdrop-blur-md"
                            >
                                <div className="text-[10px] font-mono text-blue-400">
                                    import langchain<br />
                                    chain = LLMChain(llm=openai)<br />
                                    chain.run(context)
                                </div>
                            </motion.div>
                        </motion.div>


                        {/* --- PHASE 3 VISUAL: FDE (Live Terminal) --- */}
                        <motion.div
                            style={{ opacity: fdeOpacity }}
                            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                        >
                            {/* Background Elements Stabilized */}
                            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 500 500">
                                <path d="M100,250 L250,100" stroke="#10b981" strokeWidth="1" fill="none" />
                                <path d="M100,250 L250,400" stroke="#10b981" strokeWidth="1" fill="none" />
                                <path d="M250,100 L400,250" stroke="#10b981" strokeWidth="1" fill="none" />
                                <path d="M250,400 L400,250" stroke="#10b981" strokeWidth="1" fill="none" />
                                <g transform="translate(100,250)"><circle r="5" fill="#10b981" /></g>
                                <g transform="translate(400,250)"><circle r="5" fill="#10b981" /></g>
                            </svg>

                            {/* The Terminal Window */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative w-[360px] bg-black/90 border border-emerald-500/50 rounded-lg overflow-hidden shadow-2xl backdrop-blur-xl"
                            >
                                <div className="bg-neutral-900 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-2">
                                        <Terminal className="w-3 h-3" /> FDE_REMOTE_ACCESS
                                    </div>
                                </div>
                                <div className="p-6 font-mono text-xs md:text-sm h-64 overflow-hidden relative">
                                    <div className="text-emerald-700 mb-2">Last login: Today at 09:42:12 on ttys001</div>
                                    <div className="text-white">
                                        <span className="text-emerald-500">fde@bleeding-edge:~$</span> check_pipeline_status --verbose
                                    </div>
                                    <div className="text-neutral-400 mt-2">
                                        &gt; Checking Vector Store Connectivity... [OK]<br />
                                        &gt; Validating LLM Response Latency... [32ms]<br />
                                        &gt; <span className="text-yellow-500">WARNING: Data Drift Detected in Module 4</span>
                                    </div>
                                    <div className="text-white mt-4">
                                        <span className="text-emerald-500">fde@bleeding-edge:~$</span> fix_drift --auto-rebalance
                                    </div>
                                    <div className="text-emerald-400 mt-2 animate-pulse">
                                        &gt; Rebalancing weights...<br />
                                        &gt; Retraining local adapter...<br />
                                        &gt; <span className="bg-emerald-500/20 text-emerald-300 px-1">ISSUE RESOLVED</span>
                                    </div>

                                    {/* Cursor */}
                                    <motion.div
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="inline-block w-2 h-4 bg-emerald-500 ml-1 translate-y-1"
                                    />
                                </div>
                            </motion.div>

                            {/* Connection to HQ */}
                            <motion.div
                                className="absolute top-10 right-10 flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                <div className="text-[10px] font-mono text-emerald-500">CONNECTED TO HQ</div>
                            </motion.div>

                        </motion.div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
};

// Helper for SVG checkmark (reused)
const CheckMark = ({ x, y }: { x: string, y: string }) => (
    <svg x={x} y={y} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
