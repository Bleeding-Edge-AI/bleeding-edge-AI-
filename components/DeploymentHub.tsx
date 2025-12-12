'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, MapPin, Zap } from 'lucide-react';
import { ColoDesignDemo } from './ColoDesignDemo';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function DeploymentHub() {
    return (
        <section className="relative z-10 py-24 px-6 bg-neutral-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                {/* 1. Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                        <span>STRATEGIC REACH</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Instant Multitenant Capacity.</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Deploy 10kW to 50kW racks in our live locations. Select your density, cooling, and connectivity profiles.
                    </p>
                </div>

                {/* 2. Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT COLUMN: Site Catalog */}
                    <div className="space-y-6">
                        <SiteCatalog />
                    </div>

                    {/* RIGHT COLUMN: Design Animation */}
                    <div className="relative">
                        <div className="text-sm text-neutral-500 font-mono uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
                            Design your space
                        </div>
                        {/* Container for the visual */}
                        <div className="scale-90 md:scale-100 origin-top-left lg:origin-top">
                            <ColoDesignDemo />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}



function SiteCatalog() {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white mb-2 font-serif">Available Locations</h3>

            {/* HERO CARD: QUERÉTARO */}
            <motion.div
                className="group relative bg-neutral-900/50 backdrop-blur-sm border border-amber-500/30 rounded-xl overflow-hidden cursor-pointer"
                initial={false}
                whileHover="hover"
            >
                <div className="p-6 relative z-10">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="text-xs text-amber-500 font-mono mb-1">LIVE INVENTORY</div>
                            <h4 className="text-2xl font-bold text-white">Querétaro <span className="text-neutral-500 font-normal">QRO1</span></h4>
                        </div>
                        <div className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Available
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-neutral-300">
                        <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> 3 MW Total</span>
                        <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                        <span>Carrier Neutral</span>
                    </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Expandable Action Area (Desktop) */}
                <motion.div
                    className="hidden md:block bg-neutral-900 border-t border-white/10 overflow-hidden"
                    variants={{
                        hover: { height: 'auto', opacity: 1 },
                        initial: { height: 0, opacity: 0 }
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ height: 0, opacity: 0 }} // Start hidden
                >
                    <div className="p-4 flex justify-end">
                        <Link href="/specs/qro1" className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-neutral-200 transition-colors">
                            <FileDown className="w-4 h-4" /> Request Spec Sheet
                        </Link>
                    </div>
                </motion.div>

                {/* Mobile Action Area (Always Visible) */}
                <div className="md:hidden bg-neutral-900 border-t border-white/10 p-4 flex justify-end">
                    <Link href="/specs/qro1" className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-neutral-200 transition-colors">
                        <FileDown className="w-4 h-4" /> Request Spec Sheet
                    </Link>
                </div>
            </motion.div>


            {/* ROADMAP LIST */}
            <div className="mt-4 space-y-2">
                <div className="text-xs text-neutral-500 uppercase font-mono tracking-widest px-1">Expansion Roadmap</div>

                {[
                    { city: 'Monterrey', code: 'MTY2', capacity: '6 MW' },
                    { city: 'Santa Fe', code: 'MEX3', capacity: '8 MW' },
                    { city: 'Santiago', code: 'SCL1', capacity: '4 MW' },
                    { city: 'Buenos Aires', code: 'BUE1', capacity: '4 MW' },
                    { city: 'Madrid', code: 'MAD2', capacity: '8 MW' },
                ].map((site, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-not-allowed">
                        <div className="flex items-baseline gap-3">
                            <span className="text-neutral-400 font-medium group-hover:text-white transition-colors">{site.city}</span>
                            <span className="text-xs text-neutral-600 font-mono">{site.code}</span>
                        </div>

                        <div className="relative h-5">
                            {/* Default State: Capacity */}
                            <span className="absolute right-0 text-sm text-neutral-500 font-mono group-hover:opacity-0 transition-opacity duration-200">
                                {site.capacity}
                            </span>

                            {/* Hover State: Badge */}
                            <span className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-2 group-hover:translate-y-0 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-wide whitespace-nowrap">
                                Coming Soon
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
