'use client';

import React from 'react';
import { Shield, RefreshCw } from 'lucide-react';

export const TechnicalDeepDive: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-neutral-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Col: Fortress Grade */}
                    <div>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-neutral-900 rounded-lg text-white">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-white">Fortress Grade</h2>
                        </div>

                        <p className="text-neutral-400 mb-8 leading-relaxed">
                            Prefab Reinforced Concrete. Ballistic rated. Fire resistant. This is not a shipping container.
                            It is a permanent asset built to withstand extreme environments.
                        </p>

                        <div className="relative h-64 bg-neutral-900 rounded-xl overflow-hidden border border-white/10 group">
                            <img
                                src="https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?q=80&w=2069&auto=format&fit=crop"
                                alt="Concrete Texture"
                                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded border border-white/20">
                                    <div className="text-2xl font-bold text-white">UL 752 Level 4</div>
                                    <div className="text-xs text-neutral-400 uppercase tracking-widest text-center">Ballistic Rated</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Future Proof */}
                    <div>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-neutral-900 rounded-lg text-white">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-white">Future Proof Chassis</h2>
                        </div>

                        <p className="text-neutral-400 mb-8 leading-relaxed">
                            The Chassis that evolves. Switch cooling technologies without rebuilding the shell.
                            From Air Cooling to Rear-Door Heat Exchangers to Direct-to-Chip.
                        </p>

                        <div className="relative h-64 bg-neutral-900 rounded-xl overflow-hidden border border-white/10 p-8 flex items-center justify-between">
                            {/* Simple Evolution Viz */}
                            <div className="text-center opacity-40">
                                <div className="w-16 h-16 bg-neutral-800 rounded-full mx-auto mb-2 flex items-center justify-center border border-white/10">Air</div>
                                <div className="text-xs">2023</div>
                            </div>
                            <div className="h-px bg-white/20 flex-1 mx-4"></div>
                            <div className="text-center opacity-70">
                                <div className="w-16 h-16 bg-neutral-800 rounded-full mx-auto mb-2 flex items-center justify-center border border-white/10">RDHx</div>
                                <div className="text-xs">2024</div>
                            </div>
                            <div className="h-px bg-white/20 flex-1 mx-4"></div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-900/20 rounded-full mx-auto mb-2 flex items-center justify-center border border-red-500 text-red-500">DLC</div>
                                <div className="text-xs text-red-500 font-bold">NOW</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
