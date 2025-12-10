'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Wind, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSystemVisual() {
    return (
        <div className="relative w-full h-[600px] flex items-center justify-center -mt-10">

            {/* CENTRAL VISUAL CONTAINER */}
            <div className="relative z-20 scale-90 sm:scale-100 flex flex-col items-center">

                {/* TOP: FIBER GUIDE TRAY */}
                <div className="w-[120%] h-4 bg-zinc-800 border border-zinc-700 mb-0 relative overflow-hidden rounded-sm flex items-center px-1">
                    {/* Cable Traces */}
                    <div className="w-full h-[1px] bg-zinc-600 mb-[1px]" />
                    <div className="w-full h-[1px] bg-zinc-600" />

                    {/* Horizontal Signal */}
                    <motion.div
                        className="absolute top-1 left-0 h-[2px] w-full bg-green-500/50"
                        animate={{ opacity: [0, 1, 0], left: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Fiber Drop Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 w-6 h-8 flex justify-center">
                        {/* The Dropping Cable */}
                        <div className="w-1 h-full bg-neutral-800 relative overflow-hidden rounded-b-md">
                            <motion.div
                                className="absolute inset-0 bg-green-500"
                                animate={{ y: ['-100%', '100%'] }}
                                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>
                    </div>
                </div>


                {/* MIDDLE: RACK + PDUs */}
                <div className="flex items-stretch gap-1">

                    {/* LEFT PDU (Power A) */}
                    <VerticalPDU color="bg-yellow-500" />

                    {/* THE SERVER RACK */}
                    <LegacyRackVisual />

                    {/* RIGHT PDU (Power B) */}
                    <VerticalPDU color="bg-orange-500" delay={0.5} />

                </div>


                {/* BOTTOM: COOLING PIPES */}
                <div className="w-[140%] h-12 mt-0 flex justify-between items-center px-8 relative -z-10">

                    {/* Left Pipe (Cold In) */}
                    <div className="flex-1 h-6 bg-gradient-to-b from-gray-300 via-white to-gray-400 rounded-full border border-gray-400 flex items-center px-2 relative overflow-hidden shadow-lg">
                        {/* Metallic Shine */}
                        <div className="absolute top-1 left-0 right-0 h-1 bg-white/50 blur-[1px]" />

                        {/* Flow Window */}
                        <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute inset-0 bg-blue-500"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>
                        {/* Connection to Rack */}
                        <div className="absolute right-4 top-0 -translate-y-full w-4 h-8 bg-gradient-to-r from-gray-400 to-gray-200" />
                    </div>

                    {/* Gap for Rack Base */}
                    <div className="w-64"></div>

                    {/* Right Pipe (Hot Out) */}
                    <div className="flex-1 h-6 bg-gradient-to-b from-gray-300 via-white to-gray-400 rounded-full border border-gray-400 flex items-center px-2 relative overflow-hidden shadow-lg">
                        {/* Metallic Shine */}
                        <div className="absolute top-1 left-0 right-0 h-1 bg-white/50 blur-[1px]" />

                        {/* Flow Window */}
                        <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute inset-0 bg-red-500/80"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>
                        {/* Connection to Rack */}
                        <div className="absolute left-4 top-0 -translate-y-full w-4 h-8 bg-gradient-to-r from-gray-400 to-gray-200" />
                    </div>

                </div>

            </div>


            {/* FLOATING WIDGETS */}

            {/* 1. POWER WIDGET (Left) */}
            <div className="absolute top-1/2 left-0 sm:left-4 -translate-y-1/2 z-30">
                <SystemWidget
                    title="Power A+B"
                    value="45.2 kW"
                    icon={Zap}
                    iconColor="text-yellow-500"
                    graphColor="#eab308"
                />
            </div>

            {/* 2. COOLING WIDGET (Bottom Right) */}
            <div className="absolute bottom-12 right-0 sm:right-10 z-30">
                <SystemWidget
                    title="Thermal Loop"
                    value="22.1°C"
                    icon={Wind}
                    iconColor="text-blue-500"
                    graphColor="#3b82f6"
                />
            </div>

            {/* 3. CONNECTIVITY WIDGET (Top Right) */}
            <div className="absolute top-8 right-0 sm:right-10 z-30">
                <SystemWidget
                    title="Fabric"
                    value="3.2 Tbps"
                    icon={Network}
                    iconColor="text-green-500"
                    graphColor="#22c55e"
                />
            </div>

        </div>
    );
}

function VerticalPDU({ color, delay = 0 }: { color: string, delay?: number }) {
    return (
        <div className="w-4 h-[500px] bg-neutral-900 border border-neutral-700 flex flex-col items-center py-1 gap-1 relative z-10">
            {/* Status light */}
            <div className={`w-2 h-2 rounded-full ${color.replace('bg-', 'text-')} bg-current shadow-[0_0_5px_currentColor] mb-2`} />

            {/* Internal Energy Flow */}
            <div className="w-1 flex-1 bg-neutral-800 relative overflow-hidden rounded-full">
                {/* Mobile: Static Fill */}
                <div className={`absolute inset-0 ${color} opacity-70 md:hidden`} />
                {/* Desktop: Animated Flow */}
                <motion.div
                    className={`absolute inset-0 ${color} opacity-70 hidden md:block`}
                    animate={{ top: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay }}
                />
            </div>

            {/* Plugs connecting to rack (Decor) */}
            <div className="absolute top-0 bottom-0 -right-1 w-1 flex flex-col justify-around">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="h-[1px] w-2 bg-neutral-600" />
                ))}
            </div>
        </div>
    );
}


function LegacyRackVisual() {
    return (
        <div className="relative w-80 h-[500px] border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg p-2 shadow-2xl shadow-red-900/20 z-20">
            {/* Top Glow Pulse (Reduced on mobile) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 blur-[2px] animate-pulse md:animate-pulse" />

            {/* Rack Units Grid */}
            <div className="h-full w-full grid grid-rows-[repeat(42,minmax(0,1fr))] gap-[2px]">
                {/* Loop 42 times for rack units */}
                {[...Array(42)].map((_, i) => (
                    <div key={i} className="w-full bg-white/5 rounded-[1px] flex items-center justify-between px-2 relative group-hover:bg-white/10 transition-colors">
                        <div className="w-1 h-1 rounded-full bg-gray-600" />

                        {/* Top Unit is Switch - Connected to Fiber Drop */}
                        {i === 0 && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                        )}

                        <div className={`w-1 h-1 rounded-full ${Math.random() > 0.8 ? 'bg-red-500 animate-pulse' : 'bg-gray-700'}`} />
                    </div>
                ))}
            </div>

            {/* Floor Reflection/Shadow */}
            <div className="absolute -bottom-10 left-0 right-0 h-10 bg-gradient-to-b from-red-500/10 to-transparent blur-xl" />
        </div>
    );
}

function SystemWidget({ title, value, icon: Icon, iconColor, graphColor }: any) {
    const [liveValue, setLiveValue] = useState(parseFloat(value));

    // Simple fluctuation (Disabled on mobile to save frames? - keeping for now as it's low cost)
    useEffect(() => {
        const interval = setInterval(() => {
            const num = parseFloat(value.replace(/[^0-9.]/g, ''));
            const diff = (Math.random() * 0.4 - 0.2);
            setLiveValue(+(num + diff).toFixed(1));
        }, 1500);
        return () => clearInterval(interval);
    }, [value]);

    const displayValue = value.replace(/[0-9.]+/, liveValue.toFixed(1));

    return (
        <div className="w-48 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-2">
                    <Icon className={cn("w-3 h-3", iconColor)} />
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold">{title}</span>
                </div>
                <div className="flex items-center gap-1 bg-green-500/10 px-1.5 py-0.5 rounded-full border border-green-500/20">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] uppercase font-mono text-green-500">Healthy</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 relative">
                <div className="text-xl font-bold font-mono text-white mb-2">{displayValue}</div>

                {/* Live Graph Container */}
                <div className="h-8 w-full relative overflow-hidden opacity-50">
                    <LiveLineGraph color={graphColor} />
                </div>
            </div>
        </div>
    );
}

function LiveLineGraph({ color }: { color: string }) {
    return (
        <div className="absolute inset-0 flex items-center">
            <svg
                viewBox="0 0 200 50"
                preserveAspectRatio="none"
                className="w-[200%] h-full absolute top-0 left-0"
            >
                {/* Mobile: Static Graph */}
                <g className="md:hidden">
                    <path d="M 0 25 L 10 20 L 20 30 L 30 25 L 40 22 L 50 28 L 60 25 L 70 20 L 80 30 L 90 25 L 100 25 L 110 20 L 120 30 L 130 25 L 140 22 L 150 28 L 160 25 L 170 20 L 180 30 L 190 25 L 200 25"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                {/* Desktop: Animated Graph */}
                <motion.g
                    className="hidden md:block"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 5
                    }}
                >
                    <path d="M 0 25 L 10 20 L 20 30 L 30 25 L 40 22 L 50 28 L 60 25 L 70 20 L 80 30 L 90 25 L 100 25 L 110 20 L 120 30 L 130 25 L 140 22 L 150 28 L 160 25 L 170 20 L 180 30 L 190 25 L 200 25"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path d="M 200 25 L 210 20 L 220 30 L 230 25 L 240 22 L 250 28 L 260 25 L 270 20 L 280 30 L 290 25 L 300 25 L 310 20 L 320 30 L 330 25 L 340 22 L 350 28 L 360 25 L 370 20 L 380 30 L 390 25 L 400 25"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                </motion.g>
            </svg>
        </div>
    );
}
