import React from 'react';
import { BadgeCheck, Zap, Shield, Server, ArrowRight, Lock, Network } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ServerRack3D } from '@/components/ServerRack3D';
// import { PlatformExperience } from '@/components/PlatformExperience'; // Keeping commented out just in case
import { InfrastructureBento } from '@/components/InfrastructureBento';
import { HeroDashboard } from '@/components/HeroDashboard';
import { HeroBunkerSchematic } from '@/components/HeroBunkerSchematic';
import { HeroSystemVisual } from '@/components/HeroSystemVisual';
import OperationsGrid from '@/components/OperationsGrid';
import WholesaleScaleSection from '@/components/WholesaleScaleSection';
import { DeploymentHub } from '@/components/DeploymentHub';

export const metadata: Metadata = {
    title: 'Premium Colocation | Bleeding Edge',
    description: 'Tier IV ready colocation with liquid cooling support and 100% Uptime SLA.',
};

export default function ColocationPage() {
    const features = [
        {
            title: 'Tier IV Reliability',
            description: 'Fault-tolerant site infrastructure with electrical power storage and distribution facilities. Guaranteed 100% Uptime SLA.',
            icon: Shield
        },
        {
            title: 'Carrier Neutral',
            description: 'Direct access to 50+ carriers and major cloud on-ramps (AWS Direct Connect, Azure ExpressRoute, Google Cloud Interconnect).',
            icon: Network
        },
        {
            title: '24/7 Remote Hands',
            description: 'Expert on-site technicians available around the clock for rack-and-stack, cabling, and hardware troubleshooting.',
            icon: Server
        }
    ];

    const specs = [
        { label: 'Rack Units', value: '42U / 45U / 52U' },
        { label: 'Power Feeds', value: 'A + B (2N Red)' },
        { label: 'Voltage', value: '208V / 415V 3-Phase' },
        { label: 'Security', value: 'Biometric + Mantrap' },
    ];



    return (
        <div className="bg-black min-h-screen text-white selection:bg-red-500 selection:text-white">
            {/* BACKGROUND - Grid & Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-900/20 blur-[120px] rounded-full opacity-50" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <section className="relative z-10 container mx-auto px-4 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
                {/* LEFT CONTENT */}
                <div className="space-y-8">
                    <div className="inline-flex items-center space-x-2 border border-white/10 bg-white/5 px-3 py-1 rounded-full backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono text-gray-300 tracking-wide">CAPACITY LIVE</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Fortress-Grade Colocation <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
                            for the Age of AI.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                        Modular, Tier III+ bunkers built for high-density inference. Manage your physical footprint with the speed of software.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 rounded-lg">
                            CONFIGURE SPACE <Server className="w-4 h-4" />
                        </Link>
                        <Link href="/contact" className="px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/5 transition-all text-center rounded-lg">
                            BOOK A TOUR
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-mono">
                        <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" /> Tier IV reliability</div>
                        <div className="flex items-center gap-2"><Network className="w-4 h-4 text-red-500" /> Carrier neutral</div>
                        <div className="flex items-center gap-2"><Server className="w-4 h-4 text-red-500" /> Operations as a platform</div>
                    </div>
                </div>

                {/* RIGHT VISUAL: HERO SYSTEM VISUAL (Hardware + Config) */}
                <div className="h-full w-full relative flex items-center justify-center">
                    <HeroSystemVisual />
                </div>
            </section>

            {/* REFACTORED SECTIONS (Features, Specs, Locations) */}



            {/* PLATFORM EXPERIENCE / OPERATIONS GRID */}
            <OperationsGrid />

            {/* INFRASTRUCTURE SPECS BENTO (Technical Specs) */}
            <InfrastructureBento />

            {/* WHOLESALE / HYPERSCALE SECTION (Moved above Instant Capacity) */}
            <WholesaleScaleSection />

            {/* DEPLOYMENT HUB (Replaces Instant Capacity) */}
            <DeploymentHub />


            {/* CTA */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-12 rounded-3xl relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 blur-[80px] pointer-events-none"></div>
                    <h2 className="text-3xl font-bold text-white mb-6">Need a custom cage?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        We offer private suites and build-to-suit options for enterprise requirements.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        Get a Quote <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
