'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Eye, Wind, Plus, Circle } from 'lucide-react';

interface FeaturePoint {
    id: string;
    number: string;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    position: { top: string; left: string };
}

const features: FeaturePoint[] = [
    {
        id: 'shell',
        number: '01',
        label: 'Prefab Concrete',
        description: 'Far more robust than containers. Fire-resistant, ballistic-rated, and built for 50-year longevity.',
        icon: Shield,
        position: { top: '30%', left: '20%' }, // Top-left corner area
    },
    {
        id: 'env',
        number: '02',
        label: 'Outdoor Ready',
        description: 'Weatherproof and secure by default. Deploy on a slab outdoors or inside a warehouse.',
        icon: Wind,
        position: { top: '15%', left: '60%' }, // Roof area
    },
    {
        id: 'backbone',
        number: '03',
        label: 'Tier III+ Resiliency',
        description: 'Resilient backbone ready for mission-critical workloads. N+1 Cooling and 2N Power.',
        icon: Zap,
        position: { top: '55%', left: '80%' }, // Side wall
    },
    {
        id: 'security',
        number: '04',
        label: 'Integrated Security',
        description: 'CCTV, access control, and monitoring are built-in, not bolted on.',
        icon: Eye,
        position: { top: '70%', left: '35%' }, // Front/Corner
    }
];

export const TechnicalDeepDive: React.FC = () => {
    const [activeFeature, setActiveFeature] = useState<string | null>(null);

    const activeData = features.find(f => f.id === activeFeature);

    return (
        <section className="py-24 px-6 bg-neutral-950 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* 1. Content / Text */}
                <div className="relative z-10 order-2 lg:order-1">
                    <div className="inline-block px-3 py-1 bg-red-900/30 border border-red-900/50 rounded-full text-red-500 font-mono text-xs mb-6 tracking-widest uppercase">
                        Fortress Grade Infrastructure
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white mb-6 uppercase leading-[0.9]">
                        Not a Container. <br />
                        <span className="text-neutral-500">A Bunker.</span>
                    </h2>
                    <p className="text-xl text-neutral-400 font-light mb-12 max-w-lg">
                        Prefabricated reinforced concrete. Ballistic rated. Weatherproof.
                        The speed of modular, with the permanence of a fortress.
                    </p>

                    {/* Feature Details Panel */}
                    <AnimatePresence mode="wait">
                        {activeData ? (
                            <motion.div
                                key={activeData.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-neutral-900 border border-white/10 p-8 rounded-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-8xl text-white select-none">
                                    {activeData.number}
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-4 text-red-500">
                                        <activeData.icon className="w-6 h-6" />
                                        <span className="font-mono font-bold uppercase tracking-widest">{activeData.label}</span>
                                    </div>
                                    <p className="text-neutral-300 text-lg leading-relaxed">
                                        {activeData.description}
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-[180px] flex items-center text-neutral-600 font-mono text-sm uppercase tracking-widest border-l-2 border-dashed border-neutral-800 pl-8">
                                // HOVER OVER THE IMAGE POINTS TO ANALYZE SPECS
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 2. Visual / The Image with Hotspots */}
                <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2">

                    <div className="relative w-full max-w-xl aspect-square md:aspect-[4/3] rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-black">
                        {/* The Image */}
                        <img
                            src="/images/standard-compute-1.jpg"
                            alt="Concrete Data Center Module"
                            className="w-full h-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                        />

                        {/* Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />


                        {/* Hotspots */}
                        {features.map((feature) => {
                            const isActive = activeFeature === feature.id;

                            return (
                                <div
                                    key={feature.id}
                                    className="absolute z-30"
                                    style={{ top: feature.position.top, left: feature.position.left }}
                                    onMouseEnter={() => setActiveFeature(feature.id)}
                                // onMouseLeave={() => setActiveFeature(null)} // Optional: keep active until next hover for easier reading
                                >
                                    {/* The Marker */}
                                    <div className="relative flex items-center justify-center w-12 h-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                                        {/* Pulse Ring */}
                                        <div className={`absolute inset-0 rounded-full bg-red-500/30 ${isActive ? 'animate-ping' : ''}`} />

                                        {/* Core Dot */}
                                        <div className={`
                                            relative w-4 h-4 rounded-full border-2 transition-all duration-300
                                            ${isActive ? 'bg-red-600 border-white scale-125' : 'bg-neutral-900 border-red-500 group-hover:bg-red-500'}
                                        `} />

                                        {/* Line & Label (Visible on Hover/Active) */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    className="absolute left-full ml-4 hidden md:flex items-center whitespace-nowrap"
                                                >
                                                    {/* Connecting Line */}
                                                    <div className="w-8 h-px bg-red-500 mr-2 origin-left" />

                                                    {/* Label Tag */}
                                                    <div className="px-3 py-1 bg-black/80 backdrop-blur border border-red-500/50 rounded text-red-500 font-mono text-xs uppercase tracking-wider">
                                                        {feature.label}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>
        </section>
    );
};
