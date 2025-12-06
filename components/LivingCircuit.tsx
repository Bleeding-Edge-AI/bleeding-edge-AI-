'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const LivingCircuit = () => {
    // Complex circuit paths
    const circuitPaths = [
        "M10 10 H 50 V 50 H 100",
        "M10 30 H 40 V 80 H 150",
        "M20 100 V 50 H 150",
        "M150 10 V 150 H 50",
        "M200 50 H 150 V 100 H 250",
        "M50 150 V 200 H 100",
        "M250 150 H 200 V 250 H 100",
        "M100 250 V 200 H 50"
    ];

    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-black flex items-center justify-center">
            {/* Background Chip Texture */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay"></div>

            {/* Glowing Central Core */}
            <div className="absolute z-10 w-48 h-48 bg-red-900/20 rounded-full blur-[80px] animate-pulse"></div>

            <svg className="w-full h-full absolute inset-0 z-20" viewBox="0 0 300 300" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                        <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {circuitPaths.map((path, i) => (
                    <motion.path
                        key={i}
                        d={path}
                        fill="none"
                        stroke="url(#pulseGradient)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0, 1, 0],
                            strokeDashoffset: [0, -100]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                    />
                ))}

                {/* Static darker tracks for context */}
                {circuitPaths.map((path, i) => (
                    <path
                        key={`static-${i}`}
                        d={path}
                        fill="none"
                        stroke="#1f2937"
                        strokeWidth="1"
                        opacity="0.3"
                    />
                ))}
            </svg>

            <div className="relative z-30 text-center">
                <div className="inline-block px-3 py-1 mb-4 border border-red-500/30 rounded-full bg-red-950/30 backdrop-blur-md">
                    <span className="text-red-500 font-mono text-xs tracking-[0.2em] animate-pulse">LIVE CIRCUITRY</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 tracking-tighter">
                    SILICON<br />SOUL
                </h1>
            </div>
        </div>
    );
};
