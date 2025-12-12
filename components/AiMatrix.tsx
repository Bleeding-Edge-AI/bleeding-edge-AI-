'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, TrendingUp, ShoppingBag, Scale, ArrowRight, Zap, Target, Lock } from 'lucide-react';

const horizontals = [
    { title: "Enterprise RAG", desc: "Universal Knowledge Retrieval" },
    { title: "Autonomous Agents", desc: "Goal-Directed Workers" },
    { title: "Process Automation", desc: "Probabilistic Workflows" }
];

const verticals = [
    {
        id: 'fintech',
        title: "FinTech",
        icon: TrendingUp,
        color: "blue",
        useCases: [
            { title: "Fraud Detection", desc: "Real-time anomaly scoring on transaction streams." },
            { title: "Algo-Trading", desc: "Sentiment analysis feeds for high-frequency models." },
            { title: "Risk Modeling", desc: "Automated credit underwriting with explainability." }
        ]
    },
    {
        id: 'retail',
        title: "Retail/Logistics",
        icon: ShoppingBag,
        color: "emerald",
        useCases: [
            { title: "Inventory Prediction", desc: "Demand forecasting integrating weather & social trends." },
            { title: "Supply Chain Agents", desc: "Autonomous negotiation with vendor APIs." },
            { title: "Dynamic Pricing", desc: "Context-aware price optimization engines." }
        ]
    },
    {
        id: 'legal',
        title: "Legal/Ops",
        icon: Scale,
        color: "amber",
        useCases: [
            { title: "Contract Analysis", desc: "Red-lining and clause deviation detection." },
            { title: "Compliance Bots", desc: "Continuous regulatory monitoring and alerting." },
            { title: "Discovery Automation", desc: "Semantic search across million-page corpora." }
        ]
    }
];

export const AiMatrix: React.FC = () => {
    const [activeVertical, setActiveVertical] = useState<string | null>(null);

    return (
        <section className="py-32 px-6 bg-neutral-950 relative overflow-hidden min-h-[900px] flex flex-col items-center justify-end pb-0">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />

            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center mb-0">

                {/* Header */}
                <div className="text-center mb-24 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-400 font-mono text-xs mb-6 uppercase tracking-widest"
                    >
                        <Layers className="w-3 h-3" />
                        Solution Matrix
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
                    >
                        We build the Base.<br />
                        And customize the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Peak.</span>
                    </motion.h2>
                </div>

                {/* THE MATRIX VISUALIZATION */}
                <div className="relative w-full h-[500px] flex items-end justify-center perspective-[1000px] gap-4 md:gap-8 px-4">

                    {/* --- VERTICAL LAYER (Spikes) --- */}
                    {verticals.map((vert, idx) => {
                        const isActive = activeVertical === vert.id;
                        const isInactive = activeVertical !== null && !isActive;

                        return (
                            <motion.div
                                key={vert.id}
                                layout
                                onClick={() => setActiveVertical(isActive ? null : vert.id)}
                                initial={{ height: 0, opacity: 0 }}
                                whileInView={{ height: isActive ? 450 : 250, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", bounce: 0.2 }}
                                className={`
                                    relative cursor-pointer group flex flex-col justify-end
                                    ${isActive ? 'w-full md:w-[500px] z-20' : 'w-1/3 md:w-32 z-10'}
                                    ${isInactive ? 'opacity-30 blur-sm scale-95 hover:opacity-50 hover:blur-0' : ''}
                                    transition-all duration-500 ease-out
                                `}
                            >
                                {/* The "Building" Bar */}
                                <div className={`
                                    absolute inset-x-0 bottom-0 top-0 rounded-t-lg border-x border-t border-white/20 backdrop-blur-md
                                    bg-gradient-to-t from-${vert.color}-900/80 to-${vert.color}-500/10
                                    group-hover:border-${vert.color}-400/50 transition-colors
                                    overflow-hidden
                                `}>
                                    {/* Inner Glow */}
                                    <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-${vert.color}-500/20 to-transparent`} />

                                    {/* Content Container */}
                                    <div className="p-6 relative h-full flex flex-col justify-between">

                                        {/* Top Icon Area */}
                                        <div className="flex justify-between items-start">
                                            <div className={`p-3 rounded-xl bg-black/40 border border-${vert.color}-500/30`}>
                                                <vert.icon className={`w-6 h-6 text-${vert.color}-400`} />
                                            </div>
                                            {isActive && (
                                                <motion.button
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveVertical(null);
                                                    }}
                                                >
                                                    <span className="text-white text-lg leading-none">&times;</span>
                                                </motion.button>
                                            )}
                                        </div>

                                        {/* Main Title (Rotated when inactive, Normal when active) */}
                                        {!isActive ? (
                                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rotate-[-90deg] whitespace-nowrap origin-center">
                                                <h3 className="text-2xl font-bold text-white tracking-wider">{vert.title}</h3>
                                            </div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-8 mb-auto"
                                            >
                                                <h3 className="text-3xl font-bold text-white mb-2">{vert.title}</h3>
                                                <p className="text-${vert.color}-200/60 text-sm font-mono uppercase tracking-widest">Specific Solutions</p>

                                                <div className="mt-8 space-y-4">
                                                    {vert.useCases.map((useCase, i) => (
                                                        <div key={i} className="bg-black/40 p-4 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <Target className={`w-4 h-4 text-${vert.color}-400`} />
                                                                <h4 className="text-white font-bold text-sm">{useCase.title}</h4>
                                                            </div>
                                                            <p className="text-neutral-400 text-xs pl-6">{useCase.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* "See Details" hint when collapsed */}
                                        {!isActive && (
                                            <div className="absolute bottom-6 left-0 w-full text-center">
                                                <ArrowRight className={`w-5 h-5 text-${vert.color}-400 mx-auto opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all`} />
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* --- HORIZONTAL LAYER (Foundation) --- */}
                <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-24 bg-neutral-900 border-t border-x border-white/10 rounded-t-3xl relative overflow-hidden backdrop-blur-xl z-30"
                >
                    <div className="grid grid-cols-3 h-full divide-x divide-white/10">
                        {horizontals.map((item, i) => (
                            <div key={i} className="group relative h-full flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] transition-colors">
                                <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-1 group-hover:text-white transition-colors">Foundation</span>
                                <h4 className="text-white font-bold text-sm md:text-lg">{item.title}</h4>

                                {/* Scan Line Effect on Click/Hover */}
                                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Horizontal Label */}
                <div className="w-full bg-neutral-950 border-t border-white/10 py-4 text-center">
                    <p className="text-neutral-500 font-mono text-xs uppercase tracking-[0.3em]">Horizontal Intelligence Layer (Universal)</p>
                </div>

            </div>
        </section>
    );
};
