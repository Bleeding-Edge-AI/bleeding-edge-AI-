'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useChat } from '@/app/context/ChatContext';
import { ArrowRight, Cpu, Zap, Globe, Shield, Activity, Award, Mic, Play } from 'lucide-react';
import { OriginSection } from '@/components/about/OriginSection';
import { CredibilitySection } from '@/components/about/CredibilitySection';
import { TimelineSection } from '@/components/about/TimelineSection';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export default function AboutFullComparison() {
    const { openChatWithIntent } = useChat();
    const { scrollYProgress } = useScroll();

    // Parallax for Hero
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500/30">

            {/* ---------------- SECTION 1: MANIFESTO (HERO) ---------------- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Cinematic Background Loop (Abstract Solarpunk/Industrial) */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-40"
                    style={{ y: yHero }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-neutral-950 to-neutral-950" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                    {/* Animated Grid / Horizon */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-500/10 to-transparent" />
                    <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-px opacity-10">
                        {Array.from({ length: 400 }).map((_, i) => (
                            <div key={i} className={`bg-amber-500/20 ${(i % 13 === 0 || i % 7 === 0) ? 'animate-pulse' : ''}`} />
                        ))}
                    </div>
                </motion.div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
                            THE FUTURE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                                CAN'T COME FAST ENOUGH.
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        We believe intelligence is the solution, not the problem. Curing disease, solving energy, and ending poverty requires <span className="text-amber-100 font-semibold">more compute, not less</span>. We exist to accelerate that timeline.
                    </motion.p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500"
                >
                    <ArrowRight className="rotate-90 w-6 h-6" />
                </motion.div>
            </section>

            {/* ======================= NEW SECTION ======================= */}
            <div className="py-8 bg-amber-900/20 text-center border-y border-amber-500/50">
                <span className="text-amber-500 font-mono tracking-widest uppercase">New: Origin & Command</span>
            </div>
            {/* ---------------- SECTION 2: THE ORIGIN & COMMAND (NEW) ---------------- */}
            <OriginSection />

            {/* ======================= OLD SECTION ======================= */}
            <div className="py-8 bg-neutral-800 text-center border-y border-neutral-700">
                <span className="text-neutral-400 font-mono tracking-widest uppercase">Legacy: Philosophy</span>
            </div>
            {/* ---------------- SECTION 2: THE PHILOSOPHY (OLD) ---------------- */}
            <section className="py-32 px-6 bg-neutral-950 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center tracking-tight">OPTIMISM IS A <span className="text-amber-500">DISCIPLINE</span>.</h2>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PrincipleCard
                            icon={<Cpu className="w-8 h-8 text-amber-500" />}
                            title="Atoms First"
                            desc="You can't code your way out of physics. We respect the hard reality of power, cooling, and concrete."
                        />
                        <PrincipleCard
                            icon={<Zap className="w-8 h-8 text-amber-500" />}
                            title="Speed is Moral"
                            desc="Delaying infrastructure delays the breakthroughs that save lives. We build in 120 days because waiting is not an option."
                        />
                        <PrincipleCard
                            icon={<Activity className="w-8 h-8 text-amber-500" />}
                            title="Vertical Control"
                            desc="To move fast, you must own the stack. We manufacture, we code, and we operate."
                        />
                    </div>
                </div>
            </section>

            {/* ======================= NEW SECTION ======================= */}
            <div className="py-8 bg-amber-900/20 text-center border-y border-amber-500/50">
                <span className="text-amber-500 font-mono tracking-widest uppercase">New: Credibility & Awards</span>
            </div>
            {/* ---------------- SECTION 3: CREDIBILITY (NEW) ---------------- */}
            <CredibilitySection />


            {/* ======================= OLD SECTION ======================= */}
            <div className="py-8 bg-neutral-800 text-center border-y border-neutral-700">
                <span className="text-neutral-400 font-mono tracking-widest uppercase">Legacy: Foundation / Bento</span>
            </div>
            {/* ---------------- SECTION 3: THE FOUNDATION (OLD) ---------------- */}
            <section className="py-32 px-6 bg-neutral-900 border-y border-neutral-800">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">BUILT ON 25 YEARS OF <span className="text-neutral-500">EXECUTION</span>.</h2>
                        <p className="text-xl text-neutral-400 max-w-2xl">We aren't new to this. We built the first internet hubs in Mexico. Now we're building the AI hubs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                        {/* Card 1: Scale (Large) */}
                        <BentoCard
                            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-neutral-800 to-neutral-900"
                            title="30+ Data Centers"
                            subtitle="Built & Operated"
                            icon={<Globe className="w-12 h-12 text-amber-500 mb-4" />}
                        >
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                        </BentoCard>

                        {/* Card 2: First Mover */}
                        <BentoCard
                            className="md:col-span-1 md:row-span-1"
                            title="First Mover"
                            subtitle="Founded Mexico's First IXP"
                            icon={<Zap className="w-6 h-6 text-neutral-400" />}
                        />

                        {/* Card 3: Network */}
                        <BentoCard
                            className="md:col-span-1 md:row-span-1"
                            title="The Network"
                            subtitle="4,500km Metro Fiber"
                            icon={<Activity className="w-6 h-6 text-neutral-400" />}
                        />

                        {/* Card 4: Exit */}
                        <BentoCard
                            className="md:col-span-2 md:row-span-1 bg-neutral-800"
                            title=" Proven Success"
                            subtitle="Founded & Sold to KIO Networks"
                            icon={<Shield className="w-6 h-6 text-amber-400" />}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <BentoCard
                            title="Innovation"
                            subtitle="Patent Holders for Modular Data Centers"
                            icon={<Cpu className="w-6 h-6 text-neutral-400" />}
                        />
                        <BentoCard
                            title="Recognition"
                            subtitle="DCD Awards: Edge Project of the Year 2025"
                            icon={<Award className="w-6 h-6 text-amber-500" />}
                            className="border-amber-500/30 bg-amber-950/10"
                        />
                    </div>
                </div>
            </section>

            {/* ======================= NEW SECTION ======================= */}
            <div className="py-8 bg-amber-900/20 text-center border-y border-amber-500/50">
                <span className="text-amber-500 font-mono tracking-widest uppercase">New: Legacy Timeline</span>
            </div>
            {/* ---------------- SECTION 4: LEGACY TIMELINE (NEW) ---------------- */}
            <TimelineSection />


            {/* ======================= OLD SECTION ======================= */}
            <div className="py-8 bg-neutral-800 text-center border-y border-neutral-700">
                <span className="text-neutral-400 font-mono tracking-widest uppercase">Legacy: Media</span>
            </div>
            {/* ---------------- SECTION 4: THE MEDIA (OLD) ---------------- */}
            <section className="py-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-right">LEADING THE <br /> CONVERSATION</h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                        <MediaCard
                            host="Oso Trava"
                            podcast="Cracks Podcast"
                            image="/api/placeholder/400/320"
                        />
                        <MediaCard
                            host="Rodrigo Pacheco"
                            podcast="Rod Cast"
                            image="/api/placeholder/400/320"
                            delay={0.2}
                        />
                    </div>
                </div>
            </section>


            {/* ---------------- SECTION 5: FOOTER CTA ---------------- */}
            <section className="py-32 px-6 bg-amber-950/20 border-t border-amber-900/30 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">BUILD THE FUTURE <br /> WITH US.</h2>
                    <button
                        onClick={() => openChatWithIntent("I want to contact the leadership team.")}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg rounded-full transition-all hover:scale-105 active:scale-95"
                    >
                        <span>Contact Command</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </motion.div>
            </section>

        </div>
    );
}

// ---------------- SUB-COMPONENTS (Restored) ----------------

function PrincipleCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="p-8 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-amber-500/50 transition-colors group rounded-xl"
        >
            <div className="mb-6 p-4 bg-neutral-950 inline-block rounded-lg border border-neutral-800 group-hover:border-amber-500/30 transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-amber-500 transition-colors">{title}</h3>
            <p className="text-neutral-400 leading-relaxed">
                {desc}
            </p>
        </motion.div>
    )
}

function BentoCard({ title, subtitle, icon, className, children }: { title: string, subtitle: string, icon?: React.ReactNode, className?: string, children?: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`relative p-8 rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden flex flex-col justify-end group hover:border-neutral-600 transition-colors ${className}`}
        >
            {children}
            <div className="relative z-10">
                {icon && <div className="mb-2">{icon}</div>}
                <h4 className="text-3xl font-bold text-white mb-1 tracking-tight">{title}</h4>
                <p className="text-neutral-400 font-medium">{subtitle}</p>
            </div>
        </motion.div>
    )
}

function MediaCard({ host, podcast, image, delay = 0 }: { host: string, podcast: string, image: string, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, rotate: -5, x: -50 }}
            whileInView={{ opacity: 1, rotate: 0, x: 0 }}
            transition={{ delay, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative w-full md:w-[400px] aspect-[4/5] bg-neutral-800 rounded-3xl border border-neutral-700 overflow-hidden group cursor-pointer shadow-2xl shadow-black/50"
        >
            {/* Visual Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 group-hover:bg-neutral-800 transition-colors">
                <Mic className="w-24 h-24 text-neutral-700 group-hover:text-amber-600/50 transition-colors" />
            </div>

            <div className="absolute bottom-8 left-8 z-20">
                <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-amber-500 rounded-full text-black">
                        <Play className="w-4 h-4 fill-current" />
                    </span>
                    <span className="text-amber-500 font-bold tracking-widest text-xs uppercase">Listen Now</span>
                </div>
                <h3 className="text-3xl font-bold text-white leading-none mb-1">{podcast}</h3>
                <p className="text-neutral-400">with {host}</p>
            </div>
        </motion.div>
    )
}
