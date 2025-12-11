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
                        className="absolute top-1 left-0 h-[2px] w-full bg-green-500/50 hidden md:block will-change-transform"
                        animate={{ opacity: [0, 1, 0], left: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Fiber Drop Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 w-6 h-8 flex justify-center">
                        {/* The Dropping Cable */}
                        <div className="w-1 h-full bg-neutral-800 relative overflow-hidden rounded-b-md">
                            <motion.div
                                className="absolute inset-0 bg-green-500 hidden md:block will-change-transform"
                                animate={{ y: ['-100%', '100%'] }}
                                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>
                    </div>
                </div>


                {/* MIDDLE: RACK + PDUs */}
                <div className="flex items-stretch gap-3">

                    {/* LEFT PDU (Power A) */}
                    <VerticalPDU color="bg-yellow-500" />

                    {/* THE SERVER RACK */}
                    <LegacyRackVisual />

                    {/* RIGHT PDU (Power B) */}
                    <VerticalPDU color="bg-orange-500" delay={0.5} />

                </div>


                {/* BOTTOM: COOLING PIPES */}
                <div className="w-[140%] h-16 mt-0 flex justify-between items-center px-8 relative -z-10">

                    {/* Left Pipe (Cold In) */}
                    <div className="flex-1 h-10 bg-gradient-to-b from-slate-700 via-slate-500 to-slate-800 rounded-lg border-y border-slate-600 flex items-center px-2 relative overflow-hidden shadow-2xl">
                        {/* Flanges/Joints */}
                        <div className="absolute left-10 w-2 h-full bg-slate-400 opacity-50 border-x border-black/30" />
                        <div className="absolute right-10 w-2 h-full bg-slate-400 opacity-50 border-x border-black/30" />

                        {/* Metallic Shine */}
                        <div className="absolute top-1 left-0 right-0 h-1 bg-white/30 blur-[1px]" />

                        {/* Flow Window - Thinner & Clean */}
                        <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden relative border border-white/5">
                            <motion.div
                                className="absolute inset-0 bg-blue-500 hidden md:block will-change-transform"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>
                        {/* Connection to Rack */}
                        <div className="absolute right-12 top-0 -translate-y-full w-6 h-8 bg-gradient-to-r from-slate-600 to-slate-500 z-0" />
                    </div>

                    {/* Gap for Rack Base */}
                    <div className="w-[280px]"></div>

                    {/* Right Pipe (Hot Out) */}
                    <div className="flex-1 h-10 bg-gradient-to-b from-slate-700 via-slate-500 to-slate-800 rounded-lg border-y border-slate-600 flex items-center px-2 relative overflow-hidden shadow-2xl">
                        {/* Flanges/Joints */}
                        <div className="absolute left-10 w-2 h-full bg-slate-400 opacity-50 border-x border-black/30" />
                        <div className="absolute right-10 w-2 h-full bg-slate-400 opacity-50 border-x border-black/30" />

                        {/* Metallic Shine */}
                        <div className="absolute top-1 left-0 right-0 h-1 bg-white/30 blur-[1px]" />

                        {/* Flow Window */}
                        <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden relative border border-white/5">
                            <motion.div
                                className="absolute inset-0 bg-red-500/80 hidden md:block will-change-transform"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>
                        {/* Connection to Rack */}
                        <div className="absolute left-12 top-0 -translate-y-full w-6 h-8 bg-gradient-to-r from-slate-600 to-slate-500 z-0" />
                    </div>

                </div>

            </div>


            {/* FLOATING WIDGETS (Unchanged) */}

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
        <div className="w-12 h-[500px] bg-neutral-900 border border-neutral-700 rounded-sm flex flex-col items-center py-4 gap-2 relative z-10 shadow-xl">
            {/* Header Icon */}
            <div className={`p-1.5 rounded-full bg-neutral-800 border ${color.replace('bg-', 'border-')} shadow-[0_0_8px_rgba(0,0,0,0.5)]`}>
                <Zap className={`w-3 h-3 ${color.replace('bg-', 'text-')}`} />
            </div>

            {/* Status LED */}
            <div className={`w-1.5 h-1.5 rounded-full ${color.replace('bg-', 'text-')} bg-current shadow-[0_0_5px_currentColor] my-1`} />

            {/* The "Core" - Constant Pulsating Feed */}
            <div className="w-3 flex-1 bg-neutral-950 relative overflow-hidden rounded-full mb-2 border border-white/5">
                {/* Visual texture */}
                <div className="absolute inset-0 z-10 opacity-20 bg-[linear-gradient(0deg,transparent_45%,#000_50%,transparent_55%)] bg-[size:100%_4px]" />

                {/* The Glow */}
                <motion.div
                    className={`absolute inset-0 ${color} blur-[2px]`}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
                />
                {/* Solid Core */}
                <motion.div
                    className={`absolute inset-0 ${color}`}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
                />
            </div>

            {/* Branding/Footer */}
            <div className="text-[8px] font-mono text-gray-600 rotate-90 whitespace-nowrap mb-6">
                A-FEED
            </div>

            {/* Outlets (Visual Decor) */}
            <div className="absolute top-16 bottom-16 -right-[1px] w-[2px] flex flex-col justify-around opacity-50">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-[2px] w-full bg-neutral-500" />
                ))}
            </div>
        </div>
    );
}


function LegacyRackVisual() {
    return (
        <div className="relative w-64 h-[500px] border border-white/10 bg-black/40 backdrop-blur-sm rounded-sm p-1.5 shadow-2xl shadow-black z-20">
            {/* Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            {/* Rack Units Grid */}
            <div className="h-full w-full grid grid-rows-[repeat(42,minmax(0,1fr))] gap-[1px] bg-neutral-900/50 ">
                {/* Loop 42 times for rack units */}
                {[...Array(42)].map((_, i) => (
                    <div key={i} className="w-full bg-neutral-800/80 rounded-[1px] flex items-center justify-between px-1.5 relative group-hover:bg-neutral-700 transition-colors border-b border-black/20">
                        {/* Rack Screw holes */}
                        <div className="w-0.5 h-full flex flex-col justify-between py-[1px]">
                            <div className="w-0.5 h-0.5 rounded-full bg-neutral-600" />
                            <div className="w-0.5 h-0.5 rounded-full bg-neutral-600" />
                        </div>

                        {/* Blinkers */}
                        {Math.random() > 0.7 && (
                            <div className={`w-1 h-0.5 rounded-full ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-blue-500'} animate-pulse shadow-[0_0_4px_currentColor] ml-auto mr-1`} />
                        )}

                        {/* Rack Screw holes Right */}
                        <div className="w-0.5 h-full flex flex-col justify-between py-[1px]">
                            <div className="w-0.5 h-0.5 rounded-full bg-neutral-600" />
                            <div className="w-0.5 h-0.5 rounded-full bg-neutral-600" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Floor Reflection/Shadow */}
            <div className="absolute -bottom-12 left-2 right-2 h-4 bg-black/60 blur-lg rounded-[100%]" />
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
                    className="hidden md:block will-change-transform"
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
