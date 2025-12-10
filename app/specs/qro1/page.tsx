'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap, Server, Shield, Network, Activity,
    Thermometer, Lock, FileText, ArrowRight,
    Globe, Clock, Layers, CheckCircle2,
    Cpu, Download
} from 'lucide-react';
import Link from 'next/link';

export default function QRO1SpecsPage() {
    return (
        <div className="bg-neutral-950 min-h-screen text-white selection:bg-red-500 selection:text-white font-sans">

            {/* BACKGROUND: Technical Grid */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-red-900/10 blur-[120px] rounded-full opacity-30" />
            </div>

            {/* NAV SPACER */}
            <div className="h-20" />

            <div className="relative z-10">

                {/* ------------------------------------------------------------------------- */}
                {/* SECTION 1: HERO & IDENTITY */}
                {/* ------------------------------------------------------------------------- */}
                {/* ------------------------------------------------------------------------- */}
                {/* SECTION 1: HERO & IDENTITY */}
                {/* ------------------------------------------------------------------------- */}
                <section className="relative px-6 py-32 border-b border-white/5 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/qro1/hero-bg.jpg"
                            alt="QRO1 Facility"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/80 border border-red-500/50 text-white text-xs font-mono font-bold uppercase tracking-widest mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            Live Facility
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
                            QRO1
                            <span className="block text-2xl md:text-3xl text-gray-200 font-normal mt-2 font-mono drop-shadow-md">
                                The Heart of Latin America's Digital Backbone
                            </span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
                            Querétaro's strategic colocation hub. Purpose-built for AI inference and high-density workloads within a modular infrastructure cluster.
                        </p>
                    </div>

                    {/* HERO STATS */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {[
                            { label: "Critical Load", value: "3 MW", icon: Zap },
                            { label: "Data Halls", value: "6 Halls", icon: Layers },
                            { label: "Topology", value: "Tier III+", icon: Shield },
                            { label: "AI Density", value: "10-50 kW", icon: Cpu },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-neutral-900/50 border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-white/20 transition-colors"
                            >
                                <stat.icon className="w-6 h-6 text-red-500 mb-3" />
                                <div className="text-2xl font-bold font-mono text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>


                {/* ------------------------------------------------------------------------- */}
                {/* SECTION 2: DIGITAL NEIGHBORHOOD */}
                {/* ------------------------------------------------------------------------- */}
                <section className="container mx-auto px-6 py-24 border-b border-white/5">
                    <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">

                        {/* LEFT: HEADER */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Globe className="w-8 h-8 text-red-500" />
                                Strategic Node & <br /> Dark Fiber
                            </h2>
                            <p className="text-gray-400 mb-8 text-lg">
                                Positioned at the core of Mexico's fiber ecosystem, QRO1 offers redundant paths to major terrestrial borders and direct links to subsea cable landing stations.
                            </p>

                            <div className="space-y-6">
                                <FeatureRow
                                    title="Carrier Neutral Platform"
                                    desc="Multiple active providers on-net for maximum routing flexibility."
                                />
                                <FeatureRow
                                    title="Cross-Connects"
                                    desc="Rapid provisioning with ≤ 48H SLA guaranteed."
                                />
                                <FeatureRow
                                    title="Northbound Connectivity"
                                    desc="Seamless long-haul fiber routes directly to US egress points."
                                />
                            </div>
                        </div>

                        {/* RIGHT: REACH */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold mb-6 font-mono border-b border-white/10 pb-4">Performance Metrics</h3>

                            <div className="grid gap-6">
                                <MetricCard
                                    title="Ultra-Low Latency"
                                    value="< 3 ms"
                                    desc="Round trip time to Mexico City central business district."
                                    icon={Clock}
                                />
                                <MetricCard
                                    title="Cloud Ready"
                                    value="Direct"
                                    desc="Private on-ramps to major cloud availability zones."
                                    icon={Network}
                                />
                                <MetricCard
                                    title="Duct Control"
                                    value="100%"
                                    desc="Fully proprietary ducting system with diverse physical paths."
                                    icon={Layers}
                                />
                            </div>
                        </div>

                    </div>
                </section>


                {/* ------------------------------------------------------------------------- */}
                {/* SECTION 3: MODULAR CAMPUS */}
                {/* ------------------------------------------------------------------------- */}
                <section className="container mx-auto px-6 py-24 border-b border-white/5">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Scalable & Strategic</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Modular architecture supporting private or shared configurations. Engineered for varying power densities and cooling methodologies.
                        </p>
                    </div>

                    {/* VISUAL LAYOUT GRID */}
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {['A', 'B', 'C', 'D', 'E', 'F'].map((module, i) => (
                                <div key={i} className="group relative aspect-square bg-neutral-900 border border-white/10 rounded-xl flex flex-col items-center justify-center hover:bg-neutral-800 transition-colors">
                                    <div className="text-4xl font-bold text-white/10 group-hover:text-red-500/20 transition-colors mb-2">
                                        {module}
                                    </div>
                                    <div className="text-xs font-mono text-gray-500 uppercase">Module {module}</div>
                                    <div className="text-[10px] text-gray-600 mt-1">500 kW</div>

                                    {/* Connection Lines (Visual Decor) */}
                                    {i < 5 && <div className="absolute right-0 top-1/2 w-4 h-[1px] bg-white/5 translate-x-2 hidden md:block" />}
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-6 text-xs font-mono text-gray-500">
                            <span className="inline-block w-2 h-2 bg-neutral-900 border border-white/10 rounded-full mr-2" />
                            6 INDEPENDENT DATA HALLS (182 m² EACH)
                        </div>
                    </div>
                </section>


                {/* ------------------------------------------------------------------------- */}
                {/* SECTION 4: TECHNICAL SPECIFICATIONS */}
                {/* ------------------------------------------------------------------------- */}
                <section className="container mx-auto px-6 py-24 border-b border-white/5">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                            <Activity className="w-8 h-8 text-red-500" />
                            Facility Parameters
                        </h2>

                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
                            <SpecRow label="Total Capacity" value="3 MW (500 kW per Module)" />
                            <SpecRow label="Rack Density" value="10kW - 50kW (High Density)" />
                            <SpecRow label="Redundancy" value="2N (Fault Tolerant)" />
                            <SpecRow label="Generators" value="12 Total (2 per module) @ 830 kW" />
                            <SpecRow label="Cooling" value="N+1 (Direct Exp / Fanwalls / Waterless)" />
                            <SpecRow label="Fire Suppression" value="VESDA, Clean Agent (Non-disruptive)" />
                            <SpecRow label="Security" value="7-Layer Framework (Biometrics, CCTV)" />
                            <SpecRow label="Floor Space" value="1,093 m² Total (182 m² per module)" />
                        </div>
                    </div>
                </section>


                {/* ------------------------------------------------------------------------- */}
                {/* SECTION 5: FACILITY GALLERY */}
                {/* ------------------------------------------------------------------------- */}
                <section className="container mx-auto px-6 py-24 border-b border-white/5">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                        <Layers className="w-8 h-8 text-red-500" />
                        Facility Visuals
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ImageCard
                            src="/images/qro1/hall-entrance.jpg"
                            caption="Strategic Design"
                            desc="Purpose-built infrastructure modules."
                        />
                        <ImageCard
                            src="/images/qro1/data-hall.jpg"
                            caption="Data Halls"
                            desc="High-density aisles optimized for AI workloads."
                        />
                        <ImageCard
                            src="/images/qro1/cooling.jpg"
                            caption="Precision Cooling"
                            desc="Efficient thermal management systems."
                        />
                    </div>
                </section>


                {/* ------------------------------------------------------------------------- */}
                {/* SECTION 6: ON-SITE SERVICES */}
                {/* ------------------------------------------------------------------------- */}
                <section className="container mx-auto px-6 py-24 border-b border-white/5 bg-neutral-900/20">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-6">
                            <ServiceCard
                                title="24/7 NOC Monitoring"
                                icon={Activity}
                                desc="Real-time infrastructure oversight and incident response."
                            />
                            <ServiceCard
                                title="Smart Hands & Support"
                                icon={Server}
                                desc="Certified technicians for physical maintenance and cabling."
                            />
                            <ServiceCard
                                title="Staging & Office Space"
                                icon={Layers}
                                desc="Dedicated areas for equipment prep and client workstations."
                            />
                        </div>
                    </div>
                </section>


                {/* ------------------------------------------------------------------------- */}
                {/* SECTION 7: FOOTER CTA */}
                {/* ------------------------------------------------------------------------- */}
                <footer className="container mx-auto px-6 py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-8">Ready to Deploy?</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact" className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-colors flex items-center gap-2 group">
                                Schedule Technical Walkthrough
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <button className="px-8 py-4 border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Download PDF Copy
                            </button>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}


/* -------------------------------------------------------------------------- */
/*                              HELPER COMPONENTS                             */
/* -------------------------------------------------------------------------- */

function FeatureRow({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div>
                <h4 className="font-bold text-white mb-1">{title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function MetricCard({ title, value, desc, icon: Icon }: any) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-neutral-900/50 border border-white/5">
            <div className="p-3 bg-white/5 rounded-lg text-gray-400">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="text-2xl font-bold font-mono text-white tracking-tight">{value}</div>
                <div className="font-bold text-gray-400 text-xs uppercase mb-1">{title}</div>
                <div className="text-xs text-gray-600 leading-tight">{desc}</div>
            </div>
        </div>
    );
}

function SpecRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-4 border-b border-white/5 hover:bg-white/[0.02] px-4 transition-colors">
            <span className="text-gray-500 font-mono text-sm uppercase tracking-wider">{label}</span>
            <span className="text-white font-mono font-bold text-right">{value}</span>
        </div>
    );
}

function ServiceCard({ title, desc, icon: Icon }: any) {
    return (
        <div className="p-8 border border-white/10 bg-neutral-900 rounded-xl hover:border-red-500/30 transition-colors group">
            <Icon className="w-8 h-8 text-gray-600 mb-6 group-hover:text-red-500 transition-colors" />
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                {desc}
            </p>
        </div>
    );
}

function ImageCard({ src, caption, desc }: { src: string, caption: string, desc: string }) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/10 aspect-[4/3]">
            <img
                src={src}
                alt={caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100" />
            <div className="absolute bottom-0 left-0 p-6">
                <h4 className="text-lg font-bold text-white mb-1">{caption}</h4>
                <p className="text-sm text-gray-400">{desc}</p>
            </div>
        </div>
    );
}
