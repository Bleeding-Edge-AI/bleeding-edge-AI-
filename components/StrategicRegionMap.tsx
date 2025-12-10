'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StrategicRegionMap = () => {
    const [scanPosition, setScanPosition] = useState(0);

    // Continuous scanning effect
    useEffect(() => {
        const interval = setInterval(() => {
            setScanPosition(prev => (prev >= 100 ? 0 : prev + 0.5));
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full bg-neutral-950 overflow-hidden select-none rounded-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
            </div>

            {/* SVG Map Layer */}
            <svg
                viewBox="0 0 600 500"
                className="w-full h-full relative z-10"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {/* Power Zone Gradient */}
                    <radialGradient id="power-glow-mty" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
                        <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="power-glow-qro" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                        <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </radialGradient>

                    {/* Neon Glow Filter */}
                    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Target Marker Pattern */}
                    <pattern id="target-rings" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="8" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
                        <circle cx="10" cy="10" r="4" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.5" />
                    </pattern>
                </defs>

                {/* GEOGRAPHY - More Recognizable Shapes */}
                <g className="fill-neutral-800/80 stroke-neutral-700 stroke-[0.5]">
                    {/* USA - Southern States (simplified) */}
                    <path d="
                        M 0 0 
                        L 600 0 
                        L 600 150 
                        L 520 160 
                        L 480 180 
                        L 420 170 
                        L 380 190 
                        L 320 180 
                        L 280 200 
                        L 220 190 
                        L 160 210 
                        L 100 200 
                        L 50 220 
                        L 0 200 
                        Z
                    " className="fill-neutral-900" />

                    {/* Mexico (simplified polygon) */}
                    <path d="
                        M 50 220 
                        L 100 200 
                        L 160 210 
                        L 220 190 
                        L 280 200 
                        L 320 180 
                        L 380 190 
                        L 420 170 
                        L 480 180 
                        L 520 160 
                        L 540 220 
                        L 520 280 
                        L 480 340 
                        L 420 380 
                        L 360 420 
                        L 300 450 
                        L 240 470 
                        L 180 450 
                        L 140 400 
                        L 100 350 
                        L 80 300 
                        L 50 260 
                        Z
                    " className="fill-neutral-800" />

                    {/* Baja California */}
                    <path d="
                        M 50 220 
                        L 80 240 
                        L 70 320 
                        L 50 380 
                        L 30 400 
                        L 20 350 
                        L 30 280 
                        L 40 240 
                        Z
                    " className="fill-neutral-850" />
                </g>

                {/* Border Line */}
                <path
                    d="M 50 220 L 100 200 L 160 210 L 220 190 L 280 200 L 320 180 L 380 190 L 420 170 L 480 180 L 520 160"
                    fill="none"
                    stroke="#525252"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    className="opacity-50"
                />

                {/* POWER ZONES (Heatmaps) */}
                <ellipse cx="400" cy="280" rx="60" ry="50" fill="url(#power-glow-mty)" />
                <ellipse cx="380" cy="360" rx="70" ry="55" fill="url(#power-glow-qro)" />
                <ellipse cx="420" cy="420" rx="40" ry="35" fill="url(#power-glow-mty)" />

                {/* CONNECTIVITY - Fiber Routes */}
                <g filter="url(#neon-glow)">
                    {/* Main Route: Dallas -> Laredo -> Monterrey -> Queretaro -> CDMX */}
                    <motion.path
                        d="M 350 80 C 350 120 360 150 370 190 L 385 240 L 400 280 L 390 320 L 380 360 L 400 400 L 420 420"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                    />

                    {/* Branch to Guadalajara */}
                    <motion.path
                        d="M 380 360 L 320 380 L 280 400"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                    />

                    {/* Branch to San Antonio */}
                    <motion.path
                        d="M 385 240 L 340 220 L 300 190"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    />

                    {/* Data Packets Animation */}
                    <circle r="4" fill="#fff">
                        <animateMotion
                            dur="4s"
                            repeatCount="indefinite"
                            path="M 350 80 C 350 120 360 150 370 190 L 385 240 L 400 280 L 390 320 L 380 360 L 400 400 L 420 420"
                        />
                    </circle>
                    <circle r="3" fill="#22d3ee">
                        <animateMotion
                            dur="4s"
                            begin="2s"
                            repeatCount="indefinite"
                            path="M 350 80 C 350 120 360 150 370 190 L 385 240 L 400 280 L 390 320 L 380 360 L 400 400 L 420 420"
                        />
                    </circle>
                    <circle r="2" fill="#fff">
                        <animateMotion
                            dur="3s"
                            begin="0.5s"
                            repeatCount="indefinite"
                            path="M 380 360 L 320 380 L 280 400"
                        />
                    </circle>
                </g>

                {/* City Labels */}
                <g className="fill-neutral-500 text-[10px] font-mono">
                    <text x="350" y="70">DALLAS</text>
                    <text x="290" y="185">SAN ANTONIO</text>
                    <text x="385" y="195">LAREDO</text>
                </g>
            </svg>

            {/* Site Markers (HTML overlay for better interactivity) */}
            <SiteMarker
                x="66%" y="56%"
                name="MTY-HYPER-1"
                power="60MW"
                timeline="90 Days"
                label="MONTERREY"
            />
            <SiteMarker
                x="63%" y="72%"
                name="QRO-NORTH-2"
                power="40MW"
                timeline="120 Days"
                label="QUERÉTARO"
            />
            <SiteMarker
                x="70%" y="84%"
                name="CDMX-CORE"
                power="25MW"
                timeline="Ready"
                label="CDMX"
            />
            <SiteMarker
                x="47%" y="80%"
                name="GDL-WEST"
                power="35MW"
                timeline="150 Days"
                label="GUADALAJARA"
            />

            {/* Scanning Line */}
            <motion.div
                className="absolute top-0 w-[1px] h-full pointer-events-none z-30"
                style={{ left: `${scanPosition}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
                <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />
            </motion.div>

            {/* HUD / Legend */}
            <div className="absolute bottom-4 right-4 p-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg text-[11px] font-mono z-20">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                    <span className="text-cyan-300">Long Haul Fiber</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500/40 shadow-[0_0_12px_#f59e0b]" />
                    <span className="text-amber-400">Active Power Zone</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-amber-400 rounded-full" />
                    <span className="text-white/80">Build-to-Suit Site</span>
                </div>
            </div>

            {/* System Status HUD */}
            <div className="absolute top-4 left-4 z-20">
                <div className="text-[9px] font-mono text-cyan-500/60 tracking-widest mb-1">SYSTEM STATUS</div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider">
                    <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    LIVE MONITORING
                </div>
            </div>
        </div>
    );
};

// Site Marker Component
const SiteMarker = ({
    x, y, name, power, timeline, label
}: {
    x: string, y: string, name: string, power: string, timeline: string, label: string
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="absolute z-20 pointer-events-auto"
            style={{ left: x, top: y }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative -translate-x-1/2 -translate-y-1/2 cursor-crosshair group">
                {/* Outer Pulse Ring */}
                <motion.div
                    className="absolute inset-0 w-10 h-10 -m-[13px] rounded-full border border-amber-500/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                />

                {/* Main Marker */}
                <div className="w-4 h-4 rounded-full border-2 border-amber-400 bg-amber-500/20 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-125">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                </div>

                {/* City Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-mono text-white/60 whitespace-nowrap">
                    {label}
                </div>

                {/* Crosshairs on Hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        >
                            <div className="w-8 h-[1px] bg-amber-400/60 absolute top-0 left-1/2 -translate-x-1/2" />
                            <div className="h-8 w-[1px] bg-amber-400/60 absolute left-0 top-1/2 -translate-y-1/2" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Intel Card Tooltip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-8 top-1/2 -translate-y-1/2 w-52 bg-neutral-900/95 backdrop-blur-xl border border-amber-500/30 rounded-lg shadow-2xl overflow-hidden z-50"
                    >
                        {/* Card Header */}
                        <div className="bg-amber-500/10 px-3 py-2 border-b border-amber-500/20 flex justify-between items-center">
                            <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wider">SITE INTEL</span>
                            <div className="flex gap-0.5">
                                {[1, 2, 3].map(i => <div key={i} className="w-0.5 h-2 bg-amber-500/50" />)}
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-3 space-y-2">
                            <div>
                                <div className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Site ID</div>
                                <div className="text-white font-bold text-sm font-mono">{name}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <div className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Power</div>
                                    <div className="text-amber-400 font-mono text-sm font-semibold">{power}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Timeline</div>
                                    <div className="text-white font-mono text-sm">{timeline}</div>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-white/10">
                                <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                                    <motion.div
                                        className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                                        animate={{ opacity: [1, 0.4, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                    PERMITTED & SECURED
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StrategicRegionMap;
