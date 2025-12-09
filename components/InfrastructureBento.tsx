'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Wind, Activity, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*                                 CARD FRAME                                 */
/* -------------------------------------------------------------------------- */

interface BentoCardProps {
    className?: string;
    title: string;
    subtitle: string;
    icon?: React.ElementType<{ className?: string }>;
    children?: React.ReactNode;
    hoverColor?: string; // e.g., "border-orange-500"
}

function BentoCard({ className, title, subtitle, icon: Icon, children, hoverColor = "border-white/40" }: BentoCardProps) {
    return (
        <motion.div
            className={cn(
                "group relative overflow-hidden rounded-xl bg-neutral-950 border border-white/10 p-6 flex flex-col justify-between",
                className
            )}
            whileHover="hover"
            initial="initial"
        >
            {/* Hover Border Overlay */}
            <motion.div
                className={cn(
                    "absolute inset-0 border-2 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300",
                    hoverColor
                )}
                variants={{
                    hover: { opacity: 1 },
                    initial: { opacity: 0 }
                }}
            />

            {/* Grid Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col">
                <div className="flex-1 min-h-0">
                    {children}
                </div>

                <div className="mt-4 flex-shrink-0 relative z-20">
                    <div className="flex items-center gap-2 mb-1">
                        {Icon && <Icon className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />}
                        <h3 className="text-lg font-bold text-white group-hover:translate-x-1 transition-transform">{title}</h3>
                    </div>
                    <p className="text-xs text-gray-400 font-mono leading-relaxed group-hover:text-gray-300 transition-colors">
                        {subtitle}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                    CARDS                                   */
/* -------------------------------------------------------------------------- */

// 1. DENSITY (Wide) - Glowing Power Lines
function DensityVisual() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-50 group-hover:opacity-100 transition-opacity">
                {/* Rack Outline */}
                <rect x="140" y="10" width="40" height="80" rx="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-700" />
                <rect x="145" y="15" width="30" height="5" fill="currentColor" className="text-gray-800" />
                <rect x="145" y="25" width="30" height="5" fill="currentColor" className="text-gray-800" />
                <rect x="145" y="35" width="30" height="5" fill="currentColor" className="text-gray-800" />

                {/* Power Lines */}
                <path d="M 0 30 L 50 30 L 80 50 L 140 50" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-800" />
                <path d="M 0 70 L 40 70 L 80 50" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-800" />

                {/* Animated Flow */}
                <motion.path
                    d="M 0 30 L 50 30 L 80 50 L 140 50"
                    fill="none"
                    stroke="#f59e0b" // Orange
                    strokeWidth="2"
                    strokeDasharray="10 100"
                    variants={{
                        hover: { strokeDashoffset: -110 },
                        initial: { strokeDashoffset: 0 }
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </svg>
        </div>
    );
}

// 2. COOLING (Square) - Digital Snowflake
function CoolingVisual() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <motion.svg
                viewBox="0 0 100 100"
                className="w-24 h-24"
                variants={{
                    hover: { rotate: 45 },
                    initial: { rotate: 0 }
                }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            >
                {/* Cross */}
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2" className="text-cyan-900 group-hover:text-cyan-500 transition-colors" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" className="text-cyan-900 group-hover:text-cyan-500 transition-colors" />
                {/* Diagonals */}
                <line x1="22" y1="22" x2="78" y2="78" stroke="currentColor" strokeWidth="2" className="text-cyan-900 group-hover:text-cyan-400 transition-colors" />
                <line x1="22" y1="78" x2="78" y2="22" stroke="currentColor" strokeWidth="2" className="text-cyan-900 group-hover:text-cyan-400 transition-colors" />

                {/* Tips */}
                <circle cx="50" cy="10" r="3" fill="currentColor" className="text-cyan-900 group-hover:text-cyan-300" />
                <circle cx="50" cy="90" r="3" fill="currentColor" className="text-cyan-900 group-hover:text-cyan-300" />
                <circle cx="10" cy="50" r="3" fill="currentColor" className="text-cyan-900 group-hover:text-cyan-300" />
                <circle cx="90" cy="50" r="3" fill="currentColor" className="text-cyan-900 group-hover:text-cyan-300" />
            </motion.svg>
        </div>
    );
}

// 3. RESILIENCE (Tall) - A/B Paths
function ResilienceVisual() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 relative py-2">
            {/* Feed A */}
            <div className="w-1 bg-gray-800 flex-1 min-h-[3rem] relative overflow-hidden group-hover:bg-gray-700">
                <motion.div
                    className="absolute top-0 left-0 w-full h-1/2 bg-red-500"
                    variants={{
                        hover: { top: ["0%", "100%"] },
                        initial: { top: "0%" }
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </div>
            {/* Feed B */}
            <div className="w-1 bg-gray-800 flex-1 min-h-[3rem] relative overflow-hidden group-hover:bg-gray-700">
                <motion.div
                    className="absolute top-0 left-0 w-full h-1/2 bg-blue-500"
                    variants={{
                        hover: { top: ["-50%", "100%"], opacity: [0.5, 1, 0.5] },
                        initial: { top: "0%" }
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
                />
            </div>

            {/* Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 py-1 border border-white/20 rounded text-[10px] font-mono text-white z-10">
                ATS
            </div>
        </div>
    );
}

// 4. SECURITY (Square) - Radar
function SecurityVisual() {
    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <Shield className="w-16 h-16 text-gray-800 group-hover:text-gray-700 transition-colors" />

            {/* Radar Scan Line */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent w-full h-full"
                style={{ rotate: 45, scale: 2 }}
                variants={{
                    hover: { x: ["-100%", "100%"] },
                    initial: { x: "-100%" }
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border border-white/10 rounded-full group-hover:border-green-500/30 transition-colors" />
                <div className="absolute w-28 h-28 border border-white/5 rounded-full group-hover:border-green-500/20 transition-colors" />
            </div>
        </div>
    );
}

// 5. CONNECTIVITY (Wide) - Network Map
function ConnectivityVisual() {
    return (
        <div className="w-full h-full relative p-4">
            <svg viewBox="0 0 300 100" className="w-full h-full">
                <path d="M 20 50 L 80 20 L 150 50 L 220 20 L 280 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-800" />
                <path d="M 20 50 L 80 80 L 150 50 L 220 80 L 280 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-800" />

                {/* Moving Dots */}
                <motion.circle
                    r="3" fill="#8b5cf6" // Purple
                    variants={{
                        hover: {
                            offsetDistance: "100%",
                            opacity: [0, 1, 0]
                        },
                        initial: { offsetDistance: "0%", opacity: 0 }
                    }}
                >
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 50 L 80 20 L 150 50 L 220 20 L 280 50" />
                </motion.circle>

                <motion.circle
                    r="3" fill="#ec4899" // Pink
                    variants={{
                        hover: { opacity: 1 },
                        initial: { opacity: 0 }
                    }}
                >
                    <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M 20 50 L 80 80 L 150 50 L 220 80 L 280 50" />
                </motion.circle>
            </svg>
        </div>
    );
}


/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export function InfrastructureBento() {
    return (
        <section className="py-24 px-6 bg-[#050505] relative">
            <div className="max-w-7xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono mb-4">
                    <Shield className="w-3 h-3" />
                    <span>TECHNICAL SPECIFICATIONS</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The AI-Ready Bunker</h2>
                <p className="text-gray-400 max-w-2xl text-lg">
                    Purpose-built infrastructure for high-performance computing. Validated designs for H100/H200 clusters.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">

                {/* 1. DENSITY (Wide: Col Span 2) */}
                <BentoCard
                    className="md:col-span-2"
                    title="Extreme Power Density"
                    subtitle="10kW to 50kW per rack. Liquid cooling ready."
                    icon={Zap}
                    hoverColor="border-orange-500"
                >
                    <DensityVisual />
                </BentoCard>

                {/* 2. COOLING (Square: Col Span 1) */}
                <BentoCard
                    className="md:col-span-1"
                    title="Liquid Ready"
                    subtitle="N+1 Chillers. Waterless closed loop."
                    icon={Wind}
                    hoverColor="border-cyan-500"
                >
                    <CoolingVisual />
                </BentoCard>

                {/* 3. RESILIENCE (Tall: Row Span 2) */}
                <BentoCard
                    className="md:col-span-1 md:row-span-2"
                    title="2N Redundancy"
                    subtitle="Fault-tolerant topology. Dual active feeds."
                    icon={Activity}
                    hoverColor="border-blue-500"
                >
                    <ResilienceVisual />
                </BentoCard>

                {/* 4. SECURITY (Square: Col Span 1) */}
                <BentoCard
                    className="md:col-span-1"
                    title="7-Layer Defense"
                    subtitle="Biometrics, mantraps, 24/7 armed guard."
                    icon={Shield}
                    hoverColor="border-green-500"
                >
                    <SecurityVisual />
                </BentoCard>

                {/* 5. CONNECTIVITY (Wide: Col Span 2) */}
                <BentoCard
                    className="md:col-span-2"
                    title="Carrier Neutral Fabric"
                    subtitle="<3ms Latency to regional hubs. Dark fiber ring."
                    icon={Network}
                    hoverColor="border-purple-500"
                >
                    <ConnectivityVisual />
                </BentoCard>

            </div>
        </section>
    );
}
