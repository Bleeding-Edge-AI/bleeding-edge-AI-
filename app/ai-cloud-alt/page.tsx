'use client';

import React from 'react';
import { NeuralSphere } from '@/components/NeuralSphere';
import { HolographicPricing } from '@/components/HolographicPricing';
import { Brain, Zap, Network } from 'lucide-react';

export default function AICloudAltPage() {
    return (
        <div className="bg-black min-h-screen text-white">

            {/* SECTION 1: HERO (Neural Sphere) */}
            <section className="relative">
                <NeuralSphere />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black to-transparent pointer-events-none">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 pointer-events-auto">
                        <div className="max-w-2xl">
                            <p className="text-xl md:text-2xl text-gray-300 font-light mb-6">
                                Cortex-Grade Intelligence. <br />
                                Thinking happens <span className="text-red-500 font-bold">here</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTRO */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">The Hive Mind.</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Connect to a global lattice of H100s. Our swarm intelligence scheduler mimics biological neural pathways
                        to route your inference requests to the lowest-latency nodes instantly.
                    </p>
                </div>
            </section>

            {/* SECTION 3: HOLOGRAPHIC PRICING */}
            <section className="relative z-10">
                <div className="sticky top-0 bg-black/80 backdrop-blur-sm p-4 text-center z-50 border-b border-white/10">
                    <span className="text-red-500 font-mono text-sm uppercase tracking-widest">Pricing Model // Holographic Blades</span>
                </div>
                <HolographicPricing />
            </section>

            {/* SECTION 4: FEATURES */}
            <section className="py-24 px-6 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center text-red-500 mb-4">
                            <Brain className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Neural Routing</h3>
                        <p className="text-gray-400">Traffic is routed like synaptic signals across the most efficient path in real-time.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center text-red-500 mb-4">
                            <Network className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Resilient Memory</h3>
                        <p className="text-gray-400">State is preserved across the fabric, ensuring zero-loss context switching.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center text-red-500 mb-4">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Synaptic Bursts</h3>
                        <p className="text-gray-400">Instantly scale compute resources during high-intensity inference moments.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
