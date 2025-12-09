'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Wind, Network } from 'lucide-react';

export function HeroBunkerSchematic() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative w-full h-[500px] flex items-center justify-center -mt-12 perspective-[1000px]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            {/* ISOMETRIC CONTAINER WRAPPER */}
            {/* We rotate the entire scene to get that 2.5D Isometric look */}
            <motion.div
                className="relative w-64 h-64 transform-style-3d rotate-x-[60deg] rotate-z-[-45deg]"
                animate={{
                    rotateX: 60,
                    rotateZ: -45,
                    z: hovered ? 20 : 0
                }}
                transition={{ duration: 0.5, type: 'spring' }}
            >

                {/* 1. BUNKER SHELL (Glass Container) */}
                <div className="absolute inset-0 border-[4px] border-neutral-700 bg-neutral-900/80 shadow-2xl backdrop-blur-sm transform-style-3d">
                    {/* Front Face Label */}
                    <div className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-400 bg-black/50 px-1 border border-white/10 rotate-180">
                        QRO-1
                    </div>
                </div>

                {/* Depth/Thickness Effects (Pseudo-3D) */}
                {/* Simplified: Using shadows and layers instead of full CSS 3D box for better performance/look consistency in Tailwind */}
                <div className="absolute -inset-1 border border-white/10 pointer-events-none opacity-50" />
                <div className="absolute -inset-4 border border-white/5 pointer-events-none opacity-30 rounded-3xl" />


                {/* 2. THE CORE (RACK) */}
                {/* Centered inside the floor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black border border-neutral-800 flex flex-col items-center justify-center gap-1 shadow-inner transform-style-3d">
                    {/* H100 Units Stack */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-24 h-3 bg-neutral-800 border border-neutral-700 rounded-sm relative overflow-hidden"
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                        >
                            {/* Inner Glow */}
                            <div className="absolute left-1 top-1 w-1 h-1 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]" />
                        </motion.div>
                    ))}

                    {/* Label Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-[8px] font-mono px-1 border border-white/20">
                        SECURE ENCLAVE
                    </div>
                </div>


                {/* 3. INPUTS/OUTPUTS (Flows) */}

                {/* POWER FEEDS (Entering from bottom-left visual side -> in DOM terms, top/left or bottom/right depending on rotation) */}
                {/* Because of rotation, 'bottom' of div is bottom-right visual. */}

                {/* Feed A (Yellow) */}
                <div className="absolute -left-32 bottom-8 w-32 h-1 bg-neutral-800 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-yellow-500"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                    {hovered && <Tooltip text="Feed A: 208V" color="text-yellow-500" className="-top-8 left-0" />}
                </div>

                {/* Feed B (Orange) */}
                <div className="absolute -left-32 bottom-4 w-32 h-1 bg-neutral-800 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-orange-600"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.75 }}
                    />
                    {hovered && <Tooltip text="Feed B: Active" color="text-orange-500" className="-top-8 left-0" />}
                </div>


                {/* COOLING (Blue Drift from base) */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-40 h-40 bg-blue-500/10 blur-xl rounded-full" />
                </motion.div>
                {hovered && (
                    <Tooltip text="Temp: 18°C" color="text-blue-400" className="top-0 -right-24" />
                )}


                {/* CONNECTIVITY (Neon Beam Upward) */}
                {/* In Isometric view, 'Up' requires Z translation or specific positioning. 
                    Since we use rotateX(60), 'Up' visual is negative Y in 2D space before transform, or Z axis.
                    We'll simulate it with a line extending 'out'.
                */}
                <div className="absolute top-1/2 left-1/2 w-1 h-64 bg-green-500/20 -translate-x-1/2 -translate-y-full origin-bottom transform-style-3d"
                    style={{ transform: 'translate(-50%, -50%) rotateX(-90deg) translateY(-50%)' }} // Attempting to point straight up in 3D
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-green-500 to-transparent"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    />
                    {/* Data Packets */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-4 bg-white"
                        animate={{ bottom: ['0%', '100%'] }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
                {hovered && (
                    <Tooltip text="Fabric: 400G" color="text-green-400" className="-top-32 left-1/2" />
                )}

            </motion.div>

            {/* HOVER HINT */}
            <div className="absolute bottom-10 text-xs font-mono text-gray-600 uppercase tracking-widest pointer-events-none">
                Interactive Schematic // Hover to Inspect
            </div>

        </div>
    );
}


function Tooltip({ text, color, className }: { text: string, color: string, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute z-50 bg-black border border-white/20 px-2 py-1 text-[10px] font-mono whitespace-nowrap shadow-xl ${className}`}
        >
            <span className={color}>●</span> {text}
        </motion.div>
    );
}

