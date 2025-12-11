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
import Image from 'next/image';

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
                <section className="relative px-6 py-32 border-b border-white/5 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/qro1/hero-bg.jpg"
                            alt="QRO1 Facility"
                            fill
                            priority
                            quality={100}
                            className="object-cover"
                            sizes="100vw"
                            unoptimized // Force raw file delivery
                        />
                        {/* No overlays as requested */}
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
                        <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xl font-semibold">
                            Querétaro's strategic colocation hub. Purpose-built for AI inference and high-density workloads within a modular infrastructure cluster.
                        </p>
                    </div>

                    {/* HERO STATS */}
                    <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
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
                                className="bg-neutral-950/80 backdrop-blur-md border border-white/20 p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-white/40 transition-colors shadow-lg"
                            >
                                <stat.icon className="w-6 h-6 text-red-500 mb-3" />
                                <div className="text-2xl font-bold font-mono text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>


                {/* ------------------------------------------------------------------------- */}
                {/* SECTION 2: GOOGLE NEIGHBORHOOD (MAP) */}
                {/* ------------------------------------------------------------------------- */}
                <section className="container mx-auto px-6 py-24 border-b border-white/5">
                    <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">

                        {/* LEFT COLUMN: STRATEGIC AMENITIES */}
                        <div className="col-span-1 flex flex-col justify-center space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                                    <Globe className="w-8 h-8 text-red-500" />
                                    Strategic Location
                                </h2>
                                <p className="text-gray-400">
                                    Located in the heart of Mexico's primary data center cluster, offering unmatched proximity to critical utility and transit infrastructure.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <LocationCard
                                    label="Power Infrastructure"
                                    value="1.2 km"
                                    desc="to CFE Substation"
                                    icon={Zap}
                                />
                                <LocationCard
                                    label="Dark Fiber Route"
                                    value="Adjacent"
                                    desc="to KCSM Right-of-Way"
                                    icon={Network}
                                />
                                <LocationCard
                                    label="International Logistics"
                                    value="20 min"
                                    desc="to Querétaro Int'l Airport"
                                    icon={Activity} // Using Activity as generic motion/transit if Plane not avail, or import Plane
                                />
                                <LocationCard
                                    label="Digital Ecosystem"
                                    value="Cluster"
                                    desc="Microsoft, Oracle, Amazon nearby"
                                    icon={Server}
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: GOOGLE MAP EMBED */}
                        <div className="col-span-1 lg:col-span-2 h-[500px] relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 group">
                            {/* MAP IFRAME */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14948.749688123166!2d-100.359196!3d20.559798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDMzJzM1LjMiTiAxMDDCsDIxJzMzLjEiVw!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full filter grayscale invert contrast-125 hover:grayscale-0 hover:invert-0 hover:contrast-100 transition-all duration-700 ease-in-out opacity-80 hover:opacity-100"
                            />

                            {/* VIGNETTE OVERLAY */}
                            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-10" />

                            {/* INTERACTION HINT */}
                            <div className="absolute bottom-6 right-6 z-20 bg-black/80 backdrop-blur text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-gray-400 pointer-events-none group-hover:opacity-0 transition-opacity">
                                HOVER TO EXPLORE
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

function LocationCard({ label, value, desc, icon: Icon }: any) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-neutral-900/40 border border-white/5 hover:bg-white/5 transition-colors">
            <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <div className="text-white font-bold">{value} <span className="text-gray-500 font-normal text-sm lowercase">{desc}</span></div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-mono mt-0.5">{label}</div>
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
