'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, ShieldCheck, Globe, Network, Cpu, Database } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                ANIMATED BG COMPONENTS                      */
/* -------------------------------------------------------------------------- */

// Outer Container Animation: Particles flowing INWARD from edges
const InwardFlowAnimation = () => {
    // Generate particles that move from random edge positions towards center
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        // Start from random position on perimeter (simplified as random % for demo)
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-1 h-1 bg-red-500 rounded-full"
                    style={{ left: p.left, top: p.top }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        // Move roughly towards center (50% 50%) based on start pos
                        // Note: A perfect radial inward flow is complex with simple XY, so we simulate chaos
                        x: [0, (Math.random() - 0.5) * 100],
                        y: [0, (Math.random() - 0.5) * 100],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
            {/* Pulsing Red Overlay */}
            <motion.div
                className="absolute inset-0 bg-red-600/5"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
        </div>
    );
};

// Inner Container Animation: Circuit Board Data Packets
const CircuitAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Moving Packets */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-px w-20 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                    style={{
                        top: `${10 + i * 12}%`,
                        left: '-10%'
                    }}
                    animate={{ left: '110%' }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={`v-${i}`}
                    className="absolute w-px h-20 bg-gradient-to-b from-transparent via-green-400 to-transparent"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: '-10%'
                    }}
                    animate={{ top: '110%' }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

export function InfrastructureBlueprint() {
    return (
        <section className="py-16 px-6 bg-black text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">The Foundation</h2>
                    <p className="text-gray-400 text-lg">Bleeding Edge facilities meets NVIDIA-certified architecture.</p>
                </motion.div>

                {/* 1. OUTER CONTAINER (FACILITY) */}
                <motion.div
                    className="relative w-full p-6 md:p-8 border border-red-500/50 rounded-3xl bg-red-950/10 shadow-[0_0_100px_-20px_rgba(220,38,38,0.3)] overflow-hidden"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <InwardFlowAnimation />

                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-red-500 mb-6 text-center uppercase tracking-widest border-b border-red-500/30 pb-4 inline-block mx-auto w-full">
                            Built on Bleeding Edge Datacenters
                        </h3>

                        {/* Facility Specs */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {[
                                { icon: Droplets, title: "Liquid Cooling Ready", desc: "Direct-to-chip capable infrastructure." },
                                { icon: ShieldCheck, title: "Fortress Grade Security", desc: "SOC 2 Type II, 24/7 Armed Guard." },
                                { icon: Globe, title: "Global Connectivity", desc: "100Gbps private peering uplinks." }
                            ].map((spec, idx) => (
                                <div key={idx} className="bg-black/40 backdrop-blur-md border border-red-500/20 p-4 rounded-xl flex items-start gap-4 hover:border-red-500/50 transition-colors">
                                    <spec.icon className="w-8 h-8 text-red-500 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg text-white">{spec.title}</h4>
                                        <p className="text-gray-400 text-sm mt-1">{spec.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 2. INNER CONTAINER (COMPUTE) */}
                        <motion.div
                            className="relative mx-auto max-w-5xl p-6 md:p-8 border border-green-500/50 rounded-2xl bg-black/80 shadow-[0_0_80px_-20px_rgba(34,197,94,0.3)] overflow-hidden"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <CircuitAnimation />

                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-green-500 mb-6 text-center uppercase tracking-widest border-b border-green-500/30 pb-4 inline-block mx-auto w-full">
                                    Designed with NVIDIA Architecture
                                </h3>

                                {/* Compute Specs */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { icon: Network, title: "3.2Tbps Fabric", desc: "Quantum-2 InfiniBand networking." },
                                        { icon: Cpu, title: "H100 SXM5 Compute", desc: "80GB HBM3e memory per GPU." },
                                        { icon: Database, title: "Performance Storage", desc: "WEKA / VAST Data via NVMe." }
                                    ].map((spec, idx) => (
                                        <div key={idx} className="bg-black/60 backdrop-blur-md border border-green-500/20 p-4 rounded-xl flex items-start gap-4 hover:border-green-500/50 transition-colors">
                                            <spec.icon className="w-8 h-8 text-green-500 shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-lg text-white">{spec.title}</h4>
                                                <p className="text-gray-400 text-sm mt-1">{spec.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
