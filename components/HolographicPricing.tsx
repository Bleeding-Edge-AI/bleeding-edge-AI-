'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingBlade = ({ title, price, features, tier }: { title: string, price: string, features: string[], tier: 'basic' | 'pro' | 'ent' }) => {
    return (
        <div className="group relative w-full h-[500px] perspective-1000">
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500 ease-out transform group-hover:rotate-x-12 group-hover:rotate-y-12"
                whileHover={{ scale: 1.05 }}
            >
                {/* Glass Blade */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier === 'pro' ? 'from-red-900/40 to-black' : 'from-gray-900/40 to-black'
                    } backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-between shadow-2xl transition-colors duration-300 group-hover:border-red-500/50`}
                >
                    {/* Scanning Light Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none rounded-2xl z-0" />

                    <div className="relative z-10 w-full">
                        <div className="text-center mb-8">
                            <h3 className={`text-xl font-mono uppercase tracking-widest mb-4 ${tier === 'pro' ? 'text-red-500' : 'text-gray-400'}`}>
                                {title}
                            </h3>
                            <div className="text-5xl font-bold text-white mb-2">{price}</div>
                            <div className="text-xs text-gray-500 font-mono">PER GPU / HOUR</div>
                        </div>

                        <div className="space-y-4">
                            {features.map((feat, i) => (
                                <div key={i} className="flex items-center text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-red-500 mr-3 flex-shrink-0" />
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className={`relative z-10 w-full py-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${tier === 'pro'
                            ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                        }`}>
                        Deploy {title}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export const HolographicPricing = () => {
    return (
        <div className="py-32 px-6 bg-black perspective-origin-center">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold text-white mb-4">Select Compute Slice</h2>
                    <p className="text-gray-500">Instant provisioning. Microsecond billing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PricingBlade
                        tier="basic"
                        title="Inference"
                        price="$1.85"
                        features={['L40S GPU', '48GB VRAM', 'vCPU 16 Cores', '10Gbps Network']}
                    />
                    <PricingBlade
                        tier="pro"
                        title="Training"
                        price="$3.50"
                        features={['H100 SXM5', '80GB HBM3e', 'vCPU 32 Cores', '3.2Tbps InfiniBand']}
                    />
                    <PricingBlade
                        tier="ent"
                        title="Cluster"
                        price="Custom"
                        features={['Full DGX H100', '640GB Combined', 'Private Fabric', '24/7 SLA Support']}
                    />
                </div>
            </div>
        </div>
    );
};
