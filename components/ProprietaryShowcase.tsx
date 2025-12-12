'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ProprietaryShowcase: React.FC = () => {
    return (
        <section className="py-24 bg-neutral-950 border-y border-white/5 overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tight">
                        Manufacturing <span className="text-red-600">Advantage</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed">
                        Controlled manufacturing gives speed, consistency, and smart systems built in from day one.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column Callouts */}
                    <div className="lg:col-span-3 space-y-12">
                        <FeaturePoint
                            title="Battle-Tested Designs"
                            desc="Proven topologies replicated at speed."
                            align="right"
                        />
                        <FeaturePoint
                            title="Proprietary Components"
                            desc="Custom built for precise engineering and operations."
                            align="right"
                        />
                        <FeaturePoint
                            title="Dedicated Manufacturing"
                            desc="In-house and partner lines focused on our modules."
                            align="right"
                        />
                    </div>

                    {/* Central Visual */}
                    <div className="lg:col-span-6 relative h-[600px] flex items-center justify-center">
                        <div className="relative w-full h-full bg-neutral-900/50 rounded-2xl border border-white/10 overflow-hidden group">
                            {/* Placeholder for the Module Image - Use a schematic looking one */}
                            <img
                                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
                                alt="Module Manufacturing"
                                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Blueprints Overlay */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint-grid.png')] opacity-20 mix-blend-overlay" />

                            {/* Glowing Center Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-red-500/5 blur-3xl rounded-full" />

                            <div className="absolute bottom-8 left-0 right-0 text-center">
                                <div className="inline-block px-4 py-1 bg-black/50 backdrop-blur border border-white/10 rounded-full text-xs font-mono text-white/50">
                                    FIG 1.0 - MODULAR ASSEMBLY
                                </div>
                            </div>
                        </div>

                        {/* Decorating Lines - purely visual for desktop */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" preserveAspectRatio="none">
                            <path d="M 20 150 L 100 300" stroke="rgba(255,255,255,0.1)" fill="none" />
                            <circle cx="100" cy="300" r="3" fill="#DC2626" />
                        </svg>
                    </div>

                    {/* Right Column Callouts */}
                    <div className="lg:col-span-3 space-y-12">
                        <FeaturePoint
                            title="Speed"
                            desc="120-day delivery timelines thanks to prefabrication."
                            align="left"
                        />
                        <FeaturePoint
                            title="Smart By Design"
                            desc="DCIM and automation embedded natively."
                            align="left"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

const FeaturePoint = ({ title, desc, align }: { title: string, desc: string, align: 'left' | 'right' }) => (
    <motion.div
        initial={{ opacity: 0, x: align === 'left' ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col ${align === 'left' ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} items-center text-center`}
    >
        <h3 className="text-red-500 font-bold uppercase tracking-wider mb-2 text-lg border-b border-red-500/20 pb-2 inline-block">
            {title}
        </h3>
        <p className="text-neutral-300 font-light leading-relaxed max-w-xs">
            {desc}
        </p>
    </motion.div>
);
