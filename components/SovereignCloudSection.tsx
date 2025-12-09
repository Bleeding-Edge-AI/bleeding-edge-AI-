'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Key, UserCheck, Lock } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                STATIC CARD VISUAL                          */
/* -------------------------------------------------------------------------- */

const VaultVisual = () => {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                {/* Diagonal Stripes Background */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 10px)'
                    }}
                />

                {/* Red Glow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-transparent pointer-events-none" />

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/5 shadow-xl backdrop-blur-sm">
                        <Lock className="w-20 h-20 text-red-500" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-3">Your Private Cluster</h3>
                    <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Physically Isolated</p>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 p-8 opacity-20">
                    <div className="w-24 h-24 bg-red-500/20 rounded-full blur-3xl"></div>
                </div>
            </div>
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
