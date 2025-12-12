'use client';

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StickyScrollSection } from '@/components/StickyScrollSection';
import { InfrastructureBlueprint } from '@/components/InfrastructureBlueprint';
import { SovereignCloudSection } from '@/components/SovereignCloudSection';

import { useChat } from '@/app/context/ChatContext';

export default function AICloudV2Page() {
    const { openChatWithIntent } = useChat();
    return (
        <div className="bg-black min-h-screen text-white">

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                {/* Animated Glow */}
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/20 blur-[120px] rounded-full pointer-events-none"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />


                <motion.div
                    className="max-w-5xl mx-auto text-center relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight">
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Private AI Factory</span>.
                        <br />
                        <span className="text-white">Vertically Integrated.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        The vertically integrated cloud built for production AI. Whether you need raw H100 access or a managed Token Factory,
                        we deliver the infrastructure, you control the <span className="text-white font-semibold">intelligence</span>.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={() => openChatWithIntent("I'd like to talk to an architect about private AI factory.")}
                            className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] flex items-center justify-center gap-2"
                        >
                            Talk to an Architect <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-bold rounded-lg transition-all">
                            View Hardware Specs
                        </button>
                    </motion.div>
                </motion.div>
            </section>


            {/* SOVEREIGN WEATHER CLOUD */}
            <SovereignCloudSection />

            {/* STICKY SCROLL SECTION */}
            <StickyScrollSection />

            {/* INFRASTRUCTURE BLUEPRINT */}
            <InfrastructureBlueprint />



            {/* CTA */}
            <section className="py-20 px-6 bg-zinc-950">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to build your AI factory?</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Talk to our infrastructure architects. We'll help you size and deploy your private cluster.
                    </p>
                    <button
                        onClick={() => openChatWithIntent("I'd like to schedule an architecture call.")}
                        className="inline-flex px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                    >
                        Schedule Architecture Call
                    </button>
                </div>
            </section>

        </div>
    );
}
