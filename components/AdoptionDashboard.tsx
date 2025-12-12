'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, TrendingUp, Clock, CheckCircle, MessageSquare, Award, Zap } from 'lucide-react';

export const AdoptionDashboard: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    // Mock Data for Line Graph (Adoption)
    const lineData = [10, 25, 45, 60, 75, 85, 92, 98];
    const maxVal = 100;

    return (
        <section className="py-32 px-6 bg-neutral-950 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-24 max-w-3xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/20 border border-green-500/30 text-green-400 font-mono text-xs mb-6 uppercase tracking-widest"
                    >
                        <Zap className="w-3 h-3" />
                        Change Management
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
                    >
                        Deployment is <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Day One.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-neutral-400 leading-relaxed"
                    >
                        We solve the "Empty Chair" problem. Our change management protocols ensure high adoption and measurable impact from the moment we go live.
                    </motion.p>
                </div>

                {/* Dashboard Mockup */}
                <div ref={containerRef} className="relative w-full max-w-5xl">

                    {/* Main Dashboard Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 50 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 overflow-hidden"
                    >
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">Impact Analytics</div>
                                    <div className="text-neutral-500 text-xs font-mono">LIVE DATA // Q3 REPORT</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-green-500 text-xs font-mono font-bold">SYSTEM ACTIVE</span>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Metric 1: User Adoption Line Graph */}
                            <div className="bg-black/40 border border-white/5 rounded-xl p-6 col-span-2 relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-neutral-400 text-xs font-mono mb-1 uppercase tracking-wider">Active Users</div>
                                        <div className="text-3xl font-bold text-white">2,405</div>
                                        <div className="text-green-400 text-xs flex items-center mt-1">
                                            <TrendingUp className="w-3 h-3 mr-1" /> +124% vs last month
                                        </div>
                                    </div>
                                    <Users className="w-5 h-5 text-neutral-600" />
                                </div>

                                {/* Line Chart Visualization */}
                                <div className="h-32 w-full flex items-end justify-between gap-1 relative">
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                        <div className="w-full h-px bg-white/5" />
                                        <div className="w-full h-px bg-white/5" />
                                        <div className="w-full h-px bg-white/5" />
                                    </div>

                                    {/* SVG Path for Smooth Line */}
                                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                                        <motion.path
                                            d={`M ${lineData.map((d, i) => `${(i / (lineData.length - 1)) * 100}% ${100 - (d / maxVal) * 100}%`).join(' L ')}`}
                                            fill="none"
                                            stroke="#22c55e"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                                        />
                                        {/* Area under curve gradient (optional, simplified here) */}
                                    </svg>
                                </div>
                            </div>

                            {/* Metric 2: Hours Saved Bar Chart */}
                            <div className="bg-black/40 border border-white/5 rounded-xl p-6 relative">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-neutral-400 text-xs font-mono mb-1 uppercase tracking-wider">Hours Saved</div>
                                        <div className="text-3xl font-bold text-white">14.2k</div>
                                    </div>
                                    <Clock className="w-5 h-5 text-neutral-600" />
                                </div>
                                <div className="h-32 flex items-end justify-between gap-2">
                                    {[30, 45, 35, 60, 80].map((h, i) => (
                                        <div key={i} className="w-full bg-neutral-800 rounded-t-sm relative group/bar">
                                            <motion.div
                                                className="absolute bottom-0 left-0 w-full bg-blue-500 rounded-t-sm"
                                                initial={{ height: 0 }}
                                                animate={isInView ? { height: `${h}%` } : {}}
                                                transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Metric 3: Sentiment Gauge */}
                            <div className="bg-black/40 border border-white/5 rounded-xl p-6 md:col-span-3 lg:col-span-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-neutral-400 text-xs font-mono mb-1 uppercase tracking-wider">Sentiment Score</div>
                                        <div className="text-3xl font-bold text-white">96/100</div>
                                    </div>
                                    <Award className="w-5 h-5 text-neutral-600" />
                                </div>
                                <div className="flex items-center justify-center p-4">
                                    {/* Simple Radial Gauge */}
                                    <div className="relative w-32 h-16 overflow-hidden">
                                        <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-[12px] border-neutral-800" />
                                        <motion.div
                                            className="absolute top-0 left-0 w-32 h-32 rounded-full border-[12px] border-transparent border-t-green-500 border-r-green-500"
                                            style={{ rotate: '45deg' }} // Adjust to start from left
                                            initial={{ rotate: '-135deg' }}
                                            animate={isInView ? { rotate: '40deg' } : {}} // End angle
                                            transition={{ duration: 1.5, delay: 1.5, ease: "circOut" }}
                                        />
                                    </div>
                                </div>
                                <div className="text-center text-xs text-neutral-400 mt-2">Employee Satisfaction Rating</div>
                            </div>
                        </div>
                    </motion.div>


                    {/* Floating Training Cards */}
                    <FloatingCard
                        icon={Users}
                        title="Role-Specific Workshops"
                        delay={0}
                        className="absolute -top-12 left-0 md:-left-24 z-20"
                    />
                    <FloatingCard
                        icon={CheckCircle}
                        title="Gamified Onboarding"
                        delay={1.5}
                        className="absolute top-1/2 right-0 md:-right-24 z-20"
                    />
                    <FloatingCard
                        icon={MessageSquare}
                        title="Feedback Loops"
                        delay={0.8}
                        className="absolute -bottom-8 left-0 md:left-24 z-20"
                    />

                </div>
            </div>
        </section>
    );
};

const FloatingCard: React.FC<{ icon: any, title: string, className?: string, delay: number }> = ({ icon: Icon, title, className, delay }) => (
    <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay }}
        className={`bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 ${className}`}
    >
        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10">
            <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-bold text-white">{title}</span>
    </motion.div>
);
