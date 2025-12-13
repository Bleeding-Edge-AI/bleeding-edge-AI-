'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Mic, Award, Zap } from 'lucide-react';

export const OriginSection: React.FC = () => {
    return (
        <section className="py-24 md:py-32 px-6 bg-neutral-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                {/* CONTENT BLOCK A: The Founder */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative mb-8 group">
                        {/* Placeholder for High-Quality Portrait */}
                        <div className="aspect-[4/5] bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-800 relative">
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10" />
                            <img
                                src="/api/placeholder/600/750"
                                alt="Sergio Rosengaus"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-6 left-6 z-20">
                                <h3 className="text-3xl font-bold text-white">Sergio Rosengaus</h3>
                                <p className="text-amber-500 font-mono text-sm tracking-widest uppercase">Founder</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        A RETURN TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">VALUES</span>.
                    </h2>

                    <div className="prose prose-lg prose-invert text-neutral-400 mb-12">
                        <p className="leading-relaxed">
                            "Bleeding Edge was born out of a burning need to return to true client-centric values, relentless innovation, and operational agility. After building Mexico’s largest traditional data center colocation provider, Sergio Rosengaus returns with a fresh, agile team—free from legacy constraints—to take a step back in the value chain."
                        </p>
                        <p className="leading-relaxed mt-4">
                            "Now, the team is dedicated to designing and building the digital infrastructure for the needs of the future—driving solutions that reflect both our expertise and our commitment to genuine partnership."
                        </p>
                    </div>

                    {/* Social Proof */}
                    <div className="border-t border-neutral-800 pt-8">
                        <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">Featured Conversations</p>
                        <div className="flex gap-8 items-center opacity-70">
                            {/* Text Placeholders for Logos */}
                            <div className="flex items-center gap-2">
                                <Mic className="w-5 h-5 text-amber-500" />
                                <span className="text-lg font-bold text-white">Cracks Podcast</span>
                            </div>
                            <div className="h-4 w-px bg-neutral-800" />
                            <div className="flex items-center gap-2">
                                <Mic className="w-5 h-5 text-amber-500" />
                                <span className="text-lg font-bold text-white">Rod Cast</span>
                            </div>
                        </div>
                    </div>
                </motion.div>


                {/* CONTENT BLOCK B: The Agile Team (Engineering Core) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">THE ENGINEERING <span className="text-neutral-600">CORE</span>.</h2>
                        <p className="text-neutral-400">
                            A fresh, agile team free from legacy constraints. We build differently because we think differently.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TeamCard
                            role="Chief Technology Officer"
                            name="Placeholder Name"
                            exp="20 Years Experience"
                            delay={0.1}
                        />
                        <TeamCard
                            role="Chief Operating Officer"
                            name="Placeholder Name"
                            exp="18 Years Experience"
                            delay={0.2}
                        />
                        <TeamCard
                            role="Head of Engineering"
                            name="Placeholder Name"
                            exp="15 Years Experience"
                            delay={0.3}
                        />
                        <TeamCard
                            role="VP of Construction"
                            name="Placeholder Name"
                            exp="22 Years Experience"
                            delay={0.4}
                        />
                    </div>

                    {/* "Agile" Visual Element */}
                    <div className="mt-8 p-6 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-4">
                        <Zap className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-amber-500 font-bold mb-1">120-Day Deployment</h4>
                            <p className="text-sm text-neutral-400">Our team is optimized for speed. No committees. No bureaucracy. Just execution.</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

function TeamCard({ name, role, exp, delay }: { name: string, role: string, exp: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-amber-500/30 transition-colors group"
        >
            <div className="w-10 h-10 bg-neutral-800 rounded-full mb-4 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                <Users className="w-5 h-5 text-neutral-500 group-hover:text-amber-500 transition-colors" />
            </div>
            <h4 className="text-white font-bold text-lg mb-1">{role}</h4>
            <p className="text-neutral-500 text-sm mb-2">{name}</p>
            <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-amber-500" />
                <span className="text-xs text-amber-500/80 uppercase tracking-wider">{exp}</span>
            </div>
        </motion.div>
    );
}
