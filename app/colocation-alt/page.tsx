'use client';

import React from 'react';
import { BadgeCheck, Zap, Shield, Server, Globe, ArrowRight, Lock, Network } from 'lucide-react';
import Link from 'next/link';
import { FiberOpticBackground } from '@/components/FiberOpticBackground';

import { useChat } from '@/app/context/ChatContext';

export default function ColocationAltPage() {
    const { openChatWithIntent } = useChat();
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
        <div className="bg-black min-h-screen text-white selection:bg-cyan-500 selection:text-black">
            <FiberOpticBackground />

            <section className="relative z-10 container mx-auto px-4 pt-40 pb-20 grid lg:grid-cols-2 gap-12 items-center">
                {/* LEFT CONTENT */}
                <div className="space-y-8">
                    <div className="inline-flex items-center space-x-2 border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 rounded-full backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-xs font-mono text-cyan-300 tracking-wide">CAPACITY AVAILABLE: US-EAST-1</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Data at the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                            Speed of Light.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                        Next-generation interconnection hubs for high-frequency trading and AI inference.
                        Connect at <span className="text-cyan-400 font-semibold font-mono">LIGHTSPEED</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => openChatWithIntent("I'd like to configure colocation space.")}
                            className="px-8 py-4 bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                        >
                            CONFIGURE SPACE <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => openChatWithIntent("I'd like to book a tour.")}
                            className="px-8 py-4 border border-cyan-500/30 text-cyan-400 font-medium hover:bg-cyan-950/30 transition-all text-center rounded-lg backdrop-blur-sm"
                        >
                            BOOK A TOUR
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-mono">
                        <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-cyan-500" /> SOC2 TYPE II</div>
                        <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-cyan-500" /> ISO 27001</div>
                        <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-cyan-500" /> 100% UPTIME</div>
                    </div>
                </div>

                {/* RIGHT VISUAL - Keeping it simple to let background shine, or maybe a HUD */}
                <div className="hidden lg:flex justify-end relative">
                    <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl max-w-sm">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <span className="text-gray-400 font-mono text-sm">NETWORK_STATUS</span>
                                <span className="text-green-500 font-mono text-sm animate-pulse">OPTIMAL</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Latency (LHR-NYC)</span>
                                    <span className="text-cyan-400 font-mono">28.4ms</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Packet Loss</span>
                                    <span className="text-cyan-400 font-mono">0.00%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Jitter</span>
                                    <span className="text-cyan-400 font-mono">0.1ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative z-10 py-24 border-y border-white/5 bg-black/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feat, idx) => (
                            <div key={idx} className="p-8 bg-black/40 border border-white/5 rounded-2xl hover:border-cyan-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-cyan-950/30 rounded-lg flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                                    <feat.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Specs */}
            <section className="relative z-10 py-24 px-6 bg-black/80">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Built for Uptime</h2>
                            <p className="text-gray-400 text-lg">
                                Every critical system is concurrently maintainable. No single point of failure.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {specs.map((spec, i) => (
                                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/30 transition-colors">
                                        <div className="text-xs text-gray-500 uppercase font-mono mb-1">{spec.label}</div>
                                        <div className="text-lg font-bold text-white font-mono">{spec.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Center Graphic */}
                        <div className="lg:w-1/2 flex justify-center">
                            <div className="relative w-64 h-64 border border-cyan-500/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                <div className="absolute inset-2 border border-violet-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="absolute inset-8 border border-white/5 rounded-full" />
                                <Server className="w-12 h-12 text-cyan-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations */}
            <section className="relative z-10 py-24 px-6 bg-black">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Global Network</h2>
                    <p className="text-gray-400">Low-latency fiber rings connecting key markets.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                    {locations.map((loc, idx) => (
                        <div key={idx} className="p-6 border border-white/10 rounded-xl bg-gray-950 hover:border-cyan-500/50 transition-colors group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <Globe className="w-6 h-6 text-gray-600 group-hover:text-cyan-500 transition-colors" />
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${loc.status === 'Available' ? 'bg-cyan-500/10 text-cyan-500' :
                                    loc.status === 'Limited' ? 'bg-violet-500/10 text-violet-500' :
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
        </div>
    );
}
