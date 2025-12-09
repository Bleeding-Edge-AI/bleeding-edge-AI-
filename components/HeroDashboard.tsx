'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Activity, Shield, Thermometer, Wifi, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroDashboard() {
    // Stats State for "ticking" animation
    const [power, setPower] = useState(45.2);
    const [temp, setTemp] = useState(22.4);

    // Simulate subtle fluctuations
    useEffect(() => {
        const interval = setInterval(() => {
            setPower(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
            setTemp(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-neutral-950 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden group">

            {/* BACKGROUND: Industrial "Scanline" / Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">BMS CONSOLE // LIVE</span>
                </div>
                <div className="text-xs font-mono text-gray-600">ID: US-ASH-1-A04</div>
            </div>

            {/* MAIN GRAPH CARD */}
            <div className="mb-4 bg-black/40 border border-white/5 rounded-lg p-6 relative overflow-hidden">
                <div className="flex justify-between items-end mb-4 relative z-10">
                    <div>
                        <div className="text-xs font-mono text-gray-500 uppercase mb-1">Rack Row A // Power Draw</div>
                        <div className="text-4xl font-mono font-bold text-white flex items-baseline gap-2">
                            {power.toFixed(1)} <span className="text-lg text-gray-500">kW</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-orange-500 text-xs font-mono bg-orange-500/10 px-2 py-1 rounded">
                        <Activity className="w-3 h-3" /> PEAK LOAD
                    </div>
                </div>

                {/* ANIMATED GRAPH */}
                <div className="h-32 w-full relative overflow-hidden">
                    {/* The Graph Container */}
                    <LiveGraph />
                </div>
            </div>

            {/* STATUS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* 1. CONNECTIVITY */}
                <StatusCard
                    label="Fabric Throughput"
                    value="3.1 Tbps"
                    icon={Wifi}
                    statusColor="bg-green-500"
                    statusLabel="Optimized"
                />

                {/* 2. THERMALS */}
                <StatusCard
                    label="Cold Aisle Temp"
                    value={`${temp.toFixed(1)}°C`}
                    icon={Thermometer}
                    statusColor="bg-blue-500"
                    statusLabel="Stable"
                />

                {/* 3. SECURITY */}
                <StatusCard
                    label="Perimeter Defense"
                    value="Zone 4 Locked"
                    icon={Shield}
                    statusColor="bg-red-500"
                    statusLabel="Engaged"
                    iconColor="text-red-500"
                />
            </div>

        </div>
    );
}

function StatusCard({ label, value, icon: Icon, statusColor, statusLabel, iconColor = "text-gray-400" }: any) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-lg p-4 relative overflow-hidden hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <Icon className={cn("w-4 h-4", iconColor)} />
                <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full", statusColor, statusLabel === 'Optimized' && "animate-pulse")} />
                    <span className="text-[10px] font-mono text-gray-500 uppercase">{statusLabel}</span>
                </div>
            </div>
            <div className="text-[10px] text-gray-400 font-mono uppercase mb-1">{label}</div>
            <div className="text-lg font-mono font-bold text-white">{value}</div>
        </div>
    );
}

function LiveGraph() {
    // Generating a "noisy" path
    const points = 50; // Number of points
    const width = 600;
    const height = 100;

    // Create a path string
    // We want it to be wider than the container to scroll it

    return (
        <div className="absolute inset-0 flex items-end">
            <svg
                viewBox="0 0 1000 100"
                preserveAspectRatio="none"
                className="w-[200%] h-full absolute top-0 left-0" // Double width for scrolling
            >
                {/* Gradient Fill */}
                <defs>
                    <linearGradient id="grid-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Scrolling Path Group */}
                <motion.g
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 10 // Speed of scroll
                    }}
                >
                    {/* We draw the graph twice (once for the first half, once for the loop) to make it seamless */}
                    <GraphPath width={1000} height={100} offset={0} />
                    <GraphPath width={1000} height={100} offset={1000} />
                </motion.g>
            </svg>
        </div>
    );
}

function GraphPath({ width, height, offset }: { width: number, height: number, offset: number }) {
    // Generate a jagged line
    // Just hardcoding a path that looks "noisy" and repeats at ends for simplicity/performance vs generating on fly
    // A clean sine wave with noise would be best, but for SVG path string, hardcoded is safer for SSR consistency.

    // M 0,50 L 10,48 L 20,52 ... 
    // Let's use a pre-calculated nice looking noise path data scaled to 1000 width

    const d = `
    M ${0 + offset} 60 
    L ${50 + offset} 55 L ${100 + offset} 40 L ${150 + offset} 45 L ${200 + offset} 30 
    L ${250 + offset} 50 L ${300 + offset} 45 L ${350 + offset} 60 L ${400 + offset} 55 
    L ${450 + offset} 40 L ${500 + offset} 35 L ${550 + offset} 50 L ${600 + offset} 45 
    L ${650 + offset} 55 L ${700 + offset} 40 L ${750 + offset} 45 L ${800 + offset} 35 
    L ${850 + offset} 50 L ${900 + offset} 55 L ${950 + offset} 60 L ${1000 + offset} 60
    `;

    const fillD = `${d} L ${1000 + offset} 100 L ${0 + offset} 100 Z`;

    return (
        <>
            <path d={fillD} fill="url(#grid-gradient)" stroke="none" />
            <path d={d} fill="none" stroke="#f97316" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </>
    );
}
