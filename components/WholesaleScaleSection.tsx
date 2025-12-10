'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Timer, Map, Crosshair, Zap, ArrowRight } from 'lucide-react';

import WholesaleCatalogMarquee from './WholesaleCatalogMarquee';

const WholesaleScaleSection = () => {
    return (
        <section className="relative min-h-screen w-full bg-neutral-950 flex flex-col justify-between overflow-hidden border-t border-white/5">
            {/* 1. Global GIS Background Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Moving Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                    <motion.div
                        className="absolute inset-0 bg-neutral-950/20"
                        animate={{ x: [-24, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                </div>

                {/* Ambient Glows */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-900/5 blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-900/5 blur-[100px]" />

                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)]" />
            </div>

            {/* 2. Main Content Area (Centered) */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

                    {/* LEFT: Narrative */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono font-bold uppercase tracking-widest mb-6">
                                <Map className="w-3 h-3" />
                                Strategic Expansion
                            </div>
                            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-[0.9]">
                                Dedicated<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">Colocation</span>
                            </h2>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-lg">
                                Rapid deployment of custom data center modules for hyperscalers. From site selection to energization in 120 days.
                            </p>
                        </div>

                        <div className="pt-2">
                            <Link href="/ai-native" className="group flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/30 pb-1 hover:border-amber-500 transition-colors text-lg">
                                EXPLORE HYPERSCALE SOLUTIONS <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContentCard
                            icon={Timer}
                            title="120 Day Deployments"
                            description="Rapid construction using modular prefab methodologies."
                        />
                        <ContentCard
                            icon={Map}
                            title="Shovel-Ready Catalog"
                            description="Pre-permitted land bank with secured power capacity."
                        />
                        <ContentCard
                            icon={Crosshair}
                            title="Proprietary GIS"
                            description="Site selection driven by our internal geospatial intelligence platform."
                        />
                        <ContentCard
                            icon={Zap}
                            title="Time-to-Power"
                            description="Grid connections secured and energized faster than market average."
                        />
                    </div>
                </div>
            </div>

            {/* 3. Bottom Marquee Section (Full Width) */}
            <div className="relative z-10 w-full pb-8">
                <div className="w-full py-6">
                    <WholesaleCatalogMarquee />
                </div>
            </div>
        </section>
    );
};

// Subcomponent: Content Card
const ContentCard = ({
    icon: Icon,
    title,
    description
}: {
    icon: any,
    title: string,
    description: string
}) => {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-white/10 group-hover:border-amber-500/50">
                <Icon className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
};

export default WholesaleScaleSection;
