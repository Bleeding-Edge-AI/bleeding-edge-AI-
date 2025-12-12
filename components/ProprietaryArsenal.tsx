'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ShieldCheck, Network, CheckCircle, Search, Terminal, Activity, Zap } from 'lucide-react';

const tabs = [
    {
        id: 'interviewer',
        title: "The Generative Interviewer",
        headline: "Insight Extraction Engine",
        description: "Our autonomous agent interviews your workforce at scale to uncover hidden bottlenecks before we build avoiding costly assumptions.",
        icon: Brain,
        color: "text-purple-400",
        borderColor: "border-purple-500",
        bgGradient: "from-purple-500/20 to-transparent"
    },
    {
        id: 'eval',
        title: "The 'Eval-First' Framework",
        headline: "Deterministic Quality Assurance",
        description: "We don't guess. We use proprietary evaluation harnesses to unit-test LLM outputs against ground-truth data ensuring reliability.",
        icon: ShieldCheck,
        color: "text-emerald-400",
        borderColor: "border-emerald-500",
        bgGradient: "from-emerald-500/20 to-transparent"
    },
    {
        id: 'orchestrator',
        title: "The Agent Orchestrator",
        headline: "Horizontal Agent Fabric",
        description: "A pre-built lattice of specialized agents (Researcher, Coder, Critic) ready to be deployed on your specific vertical instantly.",
        icon: Network,
        color: "text-blue-400",
        borderColor: "border-blue-500",
        bgGradient: "from-blue-500/20 to-transparent"
    }
];

const techStack = [
    "PyTorch", "LangChain", "n8n", "PostgreSQL", "Next.js", "FastAPI", "Docker", "Kubernetes", "Redis", "Pinecone", "Weaviate", "Hugging Face"
];

export const ProprietaryArsenal: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="py-16 md:py-32 px-6 bg-neutral-900 border-t border-white/5 relative overflow-hidden">
            {/* Simple Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black opacity-40"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs mb-6 uppercase tracking-widest">
                        <Terminal className="w-3 h-3" />
                        Internal Tooling
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">Proprietary Intelligence.</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        We don't just prompt models. We bring a pre-built arsenal of frameworks, diagnostic agents, and evaluation engines to every engagement.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start h-auto lg:h-[600px]">

                    {/* LEFT COLUMN: TABS */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {tabs.map((tab, idx) => {
                            const isActive = activeTab === idx;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(idx)}
                                    className={`text-left p-6 rounded-2xl transition-all duration-300 border ${isActive ? `bg-white/[0.03] ${tab.borderColor} shadow-2xl` : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'}`}
                                >
                                    <h3 className={`text-sm font-mono uppercase tracking-wider mb-2 ${isActive ? tab.color : 'text-neutral-500'}`}>
                                        {tab.headline}
                                    </h3>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${isActive ? 'bg-white/10 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                                            <tab.icon className="w-5 h-5" />
                                        </div>
                                        <span className={`text-xl font-bold ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                                            {tab.title}
                                        </span>
                                    </div>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-neutral-400 text-sm leading-relaxed mt-2 pt-2 border-t border-white/5">
                                            {tab.description}
                                        </p>
                                    </motion.div>
                                </button>
                            );
                        })}
                    </div>

                    {/* RIGHT COLUMN: VISUALS */}
                    <div className="lg:col-span-7 h-full bg-neutral-950/50 rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {activeTab === 0 && <InterviewerVisual key="interviewer" />}
                            {activeTab === 1 && <EvalVisual key="eval" />}
                            {activeTab === 2 && <OrchestratorVisual key="orchestrator" />}
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            {/* TECH STACK TICKER */}
            <div className="mt-32 border-t border-white/5 pt-12">
                <div className="relative flex overflow-x-hidden group">
                    {/* Gradient Masks */}
                    <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-neutral-900 to-transparent z-10"></div>
                    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-neutral-900 to-transparent z-10"></div>

                    <div className="animate-marquee whitespace-nowrap py-4 flex gap-12">
                        {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                            <span key={i} className="text-2xl font-display font-bold text-neutral-800 uppercase tracking-widest select-none">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* --- SUB-COMPONENTS FOR VISUALS --- */

/* 1. Generative Interviewer: Pulsing Brain & Nodes */
const InterviewerVisual = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full flex items-center justify-center"
    >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />

        {/* Central Core */}
        <div className="relative z-10">
            <motion.div
                animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px rgba(168,85,247,0.3)", "0 0 60px rgba(168,85,247,0.6)", "0 0 20px rgba(168,85,247,0.3)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center backdrop-blur-xl"
            >
                <Brain className="w-16 h-16 text-purple-400" />
            </motion.div>
            {/* Orbiting User Nodes */}
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-4 h-4 bg-white/80 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    style={{ x: -8, y: -8 }} // Center offset
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                        type: "tween"
                    }}
                >
                    <motion.div
                        className="w-full h-full"
                        style={{ x: 80 + i * 20 }} // Radius
                    />
                </motion.div>
            ))}
        </div>

        <div className="absolute bottom-10 text-purple-400 font-mono text-xs flex items-center gap-2">
            <Activity className="w-4 h-4 animate-bounce" />
            <span>ANALYZING WORKFORCE SENTIMENT...</span>
        </div>
    </motion.div>
);

/* 2. Eval Framework: Test Suite */
const EvalVisual = () => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
    >
        <div className="bg-neutral-900 border border-emerald-500/30 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-neutral-950 px-4 py-3 border-b border-white/5 flex justify-between items-center">
                <span className="text-emerald-500 font-mono text-xs">EVAL_SUITE_V2.py</span>
                <span className="text-white/50 text-[10px]">RUNNING</span>
            </div>
            <div className="p-4 space-y-3">
                {[
                    "Recall Accuracy > 95%",
                    "Hallucination Rate < 1%",
                    "Latency < 200ms",
                    "PII Redaction Check",
                    "Tone Consistency Score"
                ].map((test, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex items-center justify-between p-2 rounded bg-white/5"
                    >
                        <span className="text-neutral-300 text-sm font-mono">{test}</span>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.2 + 0.4 }}
                        >
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
            <div className="bg-emerald-500/10 p-4 border-t border-emerald-500/30 flex justify-between items-center">
                <span className="text-emerald-400 font-bold text-sm">TOTAL SCORE</span>
                <span className="text-2xl font-display font-bold text-white">98.4%</span>
            </div>
        </div>
    </motion.div>
);

/* 3. Orchestrator: Network Graph */
const OrchestratorVisual = () => (
    <motion.div
        initial={{ opacity: 0, rotate: -5 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 5 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full flex items-center justify-center"
    >
        {/* Nodes */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center mb-2">
                <Search className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-blue-400 text-xs font-mono font-bold">PLANNER</span>
        </div>

        <div className="absolute bottom-20 left-20 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center mb-2">
                <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-blue-400 text-xs font-mono font-bold">EXECUTOR</span>
        </div>

        <div className="absolute bottom-20 right-20 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center mb-2">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-blue-400 text-xs font-mono font-bold">REVIEWER</span>
        </div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Top to Left */}
            <line x1="50%" y1="180" x2="25%" y2="350" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.3" />
            {/* Left to Right */}
            <line x1="25%" y1="350" x2="75%" y2="350" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.3" />
            {/* Right to Top */}
            <line x1="75%" y1="350" x2="50%" y2="180" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.3" />

            {/* Moving Particle */}
            <motion.circle
                r="6"
                fill="#60a5fa"
                animate={{
                    cx: ["50%", "25%", "75%", "50%"],
                    cy: ["180", "350", "350", "180"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
        </svg>

    </motion.div>
);
