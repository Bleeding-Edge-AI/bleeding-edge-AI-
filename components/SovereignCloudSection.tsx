'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Key, UserCheck } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                3D VAULT COMPONENT                          */
/* -------------------------------------------------------------------------- */

const VaultVisual = () => {
    // Cube dimensions
    const width = 280; // px
    const height = 360; // px - taller monolith
    const depth = 280; // px

    // Half dimensions for transforms
    const halfW = width / 2;
    const halfH = height / 2;
    const halfD = depth / 2;

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000 overflow-hidden">

            {/* Subtler Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

            {/* LEVITATION WRAPPER */}
            <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative preserve-3d"
            >
                {/* ROTATION WRAPPER */}
                <motion.div
                    className="relative preserve-3d"
                    style={{ width, height }}
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {/* --- INTERNAL CORE (THE AI MODEL) --- */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d">
                        {/* Glowing Red Cylinder/Core */}
                        <motion.div
                            className="w-20 h-64 bg-red-600 rounded-full blur-md"
                            animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.05, 0.9] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                boxShadow: '0 0 50px rgba(220, 38, 38, 0.6)',
                                filter: 'drop-shadow(0 0 20px #dc2626)'
                            }}
                        />
                        {/* Core Structure (Visual anchor) */}
                        <div className="absolute inset-0 border border-red-500/30 rounded-full" />
                    </div>

                    {/* --- OBSIDIAN GLASS FACES --- */}

                    {/* Common Face Style */}
                    {/* backdrop-blur-sm combined with dark bg gives the obsidian look */}
                    {/* Inset shadows create the "thick glass" edge reflection effect */}

                    {/* FRONT */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                        style={{ transform: `translateZ(${halfD}px)` }}
                    >
                        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
                        <div className="absolute bottom-6 w-full text-center">
                            <div className="inline-block w-8 h-1 bg-red-500 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* BACK */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10"
                        style={{ transform: `rotateY(180deg) translateZ(${halfD}px)` }}
                    >
                        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
                    </div>

                    {/* RIGHT (Width is Depth) */}
                    <div
                        className="absolute top-0 bottom-0 bg-black/80 backdrop-blur-sm border border-white/10"
                        style={{
                            width: depth,
                            left: width / 2 - depth / 2, // Centering logic
                            transform: `rotateY(90deg) translateZ(${halfW}px)`
                        }}
                    >
                        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
                        {/* Side Vents Detail */}
                        <div className="absolute inset-x-6 top-10 flex flex-col gap-2 opacity-20">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-px bg-white w-full" />
                            ))}
                        </div>
                    </div>

                    {/* LEFT */}
                    <div
                        className="absolute top-0 bottom-0 bg-black/80 backdrop-blur-sm border border-white/10"
                        style={{
                            width: depth,
                            left: width / 2 - depth / 2,
                            transform: `rotateY(-90deg) translateZ(${halfW}px)`
                        }}
                    >
                        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
                        <div className="absolute inset-x-6 top-10 flex flex-col gap-2 opacity-20">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-px bg-white w-full" />
                            ))}
                        </div>
                    </div>

                    {/* TOP (Cap) */}
                    <div
                        className="absolute left-0 right-0 bg-zinc-900 border border-white/10"
                        style={{
                            height: depth,
                            top: height / 2 - depth / 2,
                            transform: `rotateX(90deg) translateZ(${halfH}px)`
                        }}
                    >
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,1)]" />
                        {/* Top Logo/Marker */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border border-red-500/20 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM (Cap) */}
                    <div
                        className="absolute left-0 right-0 bg-zinc-900 border border-white/10"
                        style={{
                            height: depth,
                            top: height / 2 - depth / 2,
                            transform: `rotateX(-90deg) translateZ(${halfH}px)`
                        }}
                    >
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,1)]" />
                        <div className="absolute inset-0 bg-red-500/5" />
                    </div>

                </motion.div>
            </motion.div>
        </div>
    );
};


/* -------------------------------------------------------------------------- */
/*                              MAIN SECTION COMPONENT                        */
/* -------------------------------------------------------------------------- */

export function SovereignCloudSection() {
    return (
        <section className="py-24 px-6 bg-neutral-950 text-white relative overflow-hidden">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                {/* LEFT COLUMN: NARRATIVE */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                        <span className="text-white/80 font-mono text-xs uppercase tracking-widest">Sovereign Infrastructure</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Your Private AI Region. <br />
                        <span className="text-red-500">Physically Isolated.</span>
                    </h2>

                    <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
                        The ease of an API. The sovereignty of a vault. We deploy a fully managed 'AI in a Box' dedicated strictly to you.
                    </p>

                    <div className="space-y-8">
                        {[
                            {
                                icon: MapPin,
                                title: "True Data Residency",
                                desc: "Data never leaves your designated city. Full compliance with local sovereignty laws."
                            },
                            {
                                icon: Key,
                                title: "Physical Access Rights",
                                desc: "Not a virtual concept. Visit your dedicated cage, audit the hardware, and verify security in person."
                            },
                            {
                                icon: UserCheck,
                                title: "Managed Ownership",
                                desc: "We manage the power, cooling, and software stack. You own the model and the outputs. No DevOps required."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/10 shrink-0 h-fit">
                                    <item.icon className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: HIGH FIDELITY 3D VAULT */}
                <div className="relative">
                    <VaultVisual />
                </div>

            </div>
        </section>
    );
}
