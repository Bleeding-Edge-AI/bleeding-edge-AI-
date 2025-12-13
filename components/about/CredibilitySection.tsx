'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Globe, MapPin } from 'lucide-react';

export const CredibilitySection: React.FC = () => {
    return (
        <section className="py-24 bg-neutral-900 border-y border-neutral-800">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                    >
                        CERTIFIED <span className="text-amber-500">EXCELLENCE</span>.
                    </motion.h2>
                </div>

                {/* ROW 1: THE TROPHY CASE */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <AwardCard
                        title="Edge Project of the Year"
                        org="DCD Awards 2025"
                        desc="Recognized for innovation in high-density AI infrastructure."
                        delay={0}
                    />
                    <AwardCard
                        title="Digital Evolution Leadership"
                        org="DEVA Awards 2025"
                        desc="Awarded for driving the AI transformation in LATAM."
                        delay={0.1}
                    />
                    <AwardCard
                        title="Level V Certification"
                        org="ICREA"
                        desc="High Security & High Availability. 99.999% Uptime."
                        delay={0.2}
                    />
                </div>

                {/* ROW 2: THE GLOBAL FOOTPRINT (MAP) */}
                <div className="relative w-full h-[400px] md:h-[500px] bg-neutral-950 rounded-3xl border border-neutral-800 overflow-hidden flex flex-col md:flex-row">

                    {/* Map Panel (Stylized) */}
                    <div className="flex-grow relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <span className="text-9xl font-bold text-neutral-800 select-none tracking-tighter">GLOBAL</span>
                        </div>
                        {/* Abstract Dot Grid Map */}
                        <div className="absolute inset-0 p-8">
                            <StylizedMap />
                        </div>

                        {/* Labels for Regions */}
                        <MapLabel x="30%" y="45%" label="Mexico (HQ)" active />
                        <MapLabel x="35%" y="60%" label="LatAm" />
                        <MapLabel x="55%" y="30%" label="Spain" />
                    </div>

                    {/* Stats Panel */}
                    <div className="w-full md:w-80 bg-neutral-900/80 backdrop-blur-md border-l border-neutral-800 p-8 flex flex-col justify-center gap-8">
                        <StatItem value="30+" label="Data Centers Delivered" />
                        <StatItem value="3" label="Continents Active" />
                        <StatItem value="120" label="Days Deployment Record" sub="Industry Avg: 18-24 Mo" />
                    </div>
                </div>

            </div>
        </section>
    );
};

function AwardCard({ title, org, desc, delay }: { title: string, org: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="p-8 bg-neutral-950 border border-neutral-800 rounded-2xl hover:border-amber-500/50 transition-colors group"
        >
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-500 text-amber-500 group-hover:text-black transition-all">
                <Award className="w-6 h-6" />
            </div>
            <h4 className="text-amber-500 font-bold uppercase text-xs tracking-widest mb-2">{org}</h4>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    )
}

function StatItem({ value, label, sub }: { value: string, label: string, sub?: string }) {
    return (
        <div>
            <div className="text-5xl font-bold text-white mb-2">{value}</div>
            <div className="text-neutral-400 font-medium">{label}</div>
            {sub && <div className="text-amber-500 text-xs mt-1">{sub}</div>}
        </div>
    )
}

function MapLabel({ x, y, label, active = false }: { x: string, y: string, label: string, active?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute flex items-center gap-2"
            style={{ left: x, top: y }}
        >
            <div className="relative">
                <div className={`w-3 h-3 rounded-full ${active ? 'bg-amber-500' : 'bg-neutral-500'}`} />
                {active && <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping" />}
            </div>
            <span className={`text-sm font-bold ${active ? 'text-white' : 'text-neutral-500'}`}>{label}</span>
        </motion.div>
    )
}

// Simple stylized dots to represent landmasses vaguely
const StylizedMap = () => {
    // Generate random dots in grid
    const dots = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        // Using noise to simulate continents vaguely or just a grid aesthetic
        active: Math.random() > 0.6
    }));

    return (
        <div className="w-full h-full opacity-20 grid grid-cols-12 grid-rows-6 gap-2">
            {dots.map(d => (
                <div key={d.id} className={`rounded-full w-1 h-1 ${d.active ? 'bg-neutral-500' : 'bg-transparent'}`} />
            ))}
        </div>
    )
}
