import React from 'react';
import { BadgeCheck, Zap, Shield, Server, Globe, ArrowRight, Lock, Network } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ServerRack3D } from '@/components/ServerRack3D';
import { PlatformExperience } from '@/components/PlatformExperience';

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

    const locations = [
        { city: 'Ashburn, VA', region: 'US East', code: 'US-ASH-1', status: 'Available' },
        { city: 'Santa Clara, CA', region: 'US West', code: 'US-SJC-2', status: 'Limited' },
        { city: 'London, UK', region: 'Europe', code: 'EU-LHR-1', status: 'Available' },
        { city: 'Tokyo, JP', region: 'Asia Pacific', code: 'AP-NRT-1', status: 'Waitlist' },
    ];

    return (
        <div className="bg-black min-h-screen text-white selection:bg-red-500 selection:text-white">
            {/* BACKGROUND - Grid & Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-900/20 blur-[120px] rounded-full opacity-50" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <section className="relative z-10 container mx-auto px-4 pt-40 pb-20 grid lg:grid-cols-2 gap-12 items-center">
                {/* LEFT CONTENT */}
                <div className="space-y-8">
                    <div className="inline-flex items-center space-x-2 border border-white/10 bg-white/5 px-3 py-1 rounded-full backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono text-gray-300 tracking-wide">CAPACITY AVAILABLE: US-EAST-1</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Your Hardware. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                            Our Fortress.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                        High-density colocation suites designed for AI workloads.
                        Deploy up to <span className="text-white font-semibold">100kW per rack</span> with direct liquid cooling support.
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
                        <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-red-500" /> SOC2 TYPE II</div>
                        <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" /> ISO 27001</div>
                        <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-red-500" /> 100% UPTIME</div>
                    </div>
                </div>

                {/* RIGHT VISUAL: 3D SERVER RACK */}
                <div className="hidden lg:block h-[600px] w-full max-w-lg mx-auto relative">
                    <ServerRack3D />
                    {/* Glow Effect behind the rack */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
                </div>
            </section>

            {/* REFACTORED SECTIONS (Features, Specs, Locations) */}

            {/* Features Grid */}
            <section className="relative z-10 py-24 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feat, idx) => (
                            <div key={idx} className="p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-red-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-white group-hover:bg-red-600 transition-colors">
                                    <feat.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PLATFORM EXPERIENCE */}
            <PlatformExperience />

            {/* Technical Specs */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Built for Uptime</h2>
                            <p className="text-gray-400 text-lg">
                                Every critical system is concurrently maintainable. No single point of failure.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {specs.map((spec, i) => (
                                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                                        <div className="text-xs text-gray-500 uppercase font-mono mb-1">{spec.label}</div>
                                        <div className="text-lg font-bold text-white font-mono">{spec.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start gap-4">
                                <Lock className="w-6 h-6 text-red-500 mt-1" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">Physical Security</h4>
                                    <p className="text-sm text-gray-400">Biometric scanners, mantraps, and 24/7 armed guards ensure your hardware is untouchable.</p>
                                </div>
                            </div>
                        </div>
                        {/* Visual placeholder for specs - could be an image or CSS graphic */}
                        <div className="lg:w-1/2 h-full min-h-[400px] bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20 mix-blend-overlay" />
                            <div className="relative z-10 text-center p-8">
                                <Shield className="w-24 h-24 text-white/5 mx-auto mb-4" />
                                <div className="text-2xl font-mono font-bold text-white/20">TIER IV ARCHITECTURE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations */}
            <section className="relative z-10 py-24 px-6 bg-[#050505]">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Global Presence</h2>
                    <p className="text-gray-400">Low-latency hubs in major digital corridors.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                    {locations.map((loc, idx) => (
                        <div key={idx} className="p-6 border border-white/10 rounded-xl bg-black hover:border-red-500/50 transition-colors group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <Globe className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${loc.status === 'Available' ? 'bg-green-500/10 text-green-500' :
                                    loc.status === 'Limited' ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-red-500/10 text-red-500'
                                    }`}>
                                    {loc.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white">{loc.city}</h3>
                            <div className="text-sm text-gray-500 mb-1">{loc.region}</div>
                            <div className="text-xs font-mono text-gray-600">{loc.code}</div>
                        </div>
                    ))}
                </div>
            </section>

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
