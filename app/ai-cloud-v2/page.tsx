'use client';

import React from 'react';
import { Server, Cpu, Zap, Shield, Lock, Network, CheckCircle2, ArrowRight, Settings2, Minimize2 } from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SpotlightCard } from '@/components/SpotlightCard';
import { InterconnectVisualization } from '@/components/InterconnectVisualization';
import { StickyScrollSection } from '@/components/StickyScrollSection';

export default function AICloudV2Page() {
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
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Private Inference Cloud</span>.
                        <br />
                        <span className="text-white">Vertically Integrated.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        From bare metal H100s to managed serving engines. We architect, size, and optimize your private fleet for maximum throughput and privacy.
                    </p>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/contact" className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] flex items-center justify-center gap-2">
                            Talk to an Architect <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-bold rounded-lg transition-all">
                            View Hardware Specs
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* VALUE PROP - WHITE GLOVE SERVICE (Spotlight Cards) */}
            <section className="py-24 px-6 bg-zinc-950 border-y border-white/5 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
                            <span className="text-red-500 font-mono text-sm uppercase tracking-widest">White Glove Service</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">MLOps-Free. Private. Sized for You.</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We handle the infrastructure complexity. You get dedicated hardware with zero noisy neighbors.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Lock, title: "Private Deployments", desc: "Full hardware isolation. Your weights never touch shared infrastructure." },
                            { icon: Cpu, title: "Sizing & Architecture", desc: "We help you right-size your cluster based on your model and training regime." },
                            { icon: Zap, title: "Zero MLOps Overhead", desc: "We manage drivers, networking, and orchestration. You just push code." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <SpotlightCard className="h-full p-8 bg-black/50 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                                    <div className="w-14 h-14 bg-gradient-to-br from-zinc-800 to-black rounded-xl border border-white/5 flex items-center justify-center mb-6 shadow-inner">
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STICKY SCROLL SECTION */}
            <StickyScrollSection />

            {/* AI LIFECYCLE SECTION */}
            <section className="py-24 px-6 bg-black border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Built for the Full Lifecycle.</h2>
                        <p className="text-gray-400">From fine-tuning to production serving, we support every stage.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1: Fine-Tune */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-xl flex flex-col items-start hover:border-red-500/30 transition-colors"
                        >
                            <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center mb-6 text-red-500">
                                <Settings2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Train & Adapt</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                High-bandwidth clusters for efficient fine-tuning on your private data.
                            </p>
                        </motion.div>

                        {/* Card 2: Optimize */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-xl flex flex-col items-start hover:border-blue-500/30 transition-colors"
                        >
                            <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-6 text-blue-500">
                                <Minimize2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Distill & Quantize</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                White-glove support to convert weights to FP8/INT8 for faster serving.
                            </p>
                        </motion.div>

                        {/* Card 3: Serve */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-xl flex flex-col items-start hover:border-purple-500/30 transition-colors"
                        >
                            <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center mb-6 text-purple-500">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Production Inference</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Deploy to our low-latency, high-availability edge.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* AI IN A BOX - SECURITY */}
            <section className="py-24 px-6 bg-zinc-950 border-y border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
                                <span className="text-red-500 font-mono text-sm uppercase tracking-widest">True Isolation</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-6">AI in a Box</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Your weights, your data, your hardware. Vertically integrated from the rack up.
                                No noisy neighbors. No shared tenancy. Just pure, dedicated compute.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">Hardware Isolation</h4>
                                        <p className="text-sm text-gray-400">Dedicated servers. Your workloads never share silicon with other tenants.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Lock className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">Private Network</h4>
                                        <p className="text-sm text-gray-400">Isolated VLAN with optional VPN tunneling to your on-prem infrastructure.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Network className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">Air-Gapped Option</h4>
                                        <p className="text-sm text-gray-400">For regulated industries: fully disconnected clusters with physical access controls.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="aspect-square bg-gradient-to-br from-red-900/20 to-black border border-white/10 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,0,0,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                                <div className="relative z-10 text-center">
                                    <Lock className="w-24 h-24 text-red-500 mx-auto mb-4" />
                                    <div className="text-2xl font-bold">Your Private Cluster</div>
                                    <div className="text-sm text-gray-500 mt-2">Physically Isolated</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TECHNICAL SPECS TABLE + INTERCONNECT VISUALIZATION */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-center mb-8">Technical Specifications</h2>

                        {/* Interconnect Viz */}
                        <div className="mb-12">
                            <h3 className="text-xl font-mono text-gray-500 mb-4 text-center">FABRIC TOPOLOGY // 3.2TBPS</h3>
                            <InterconnectVisualization />
                        </div>
                    </motion.div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-6 text-gray-400 font-mono text-sm uppercase tracking-wider">Component</th>
                                    <th className="text-left py-4 px-6 text-gray-400 font-mono text-sm uppercase tracking-wider">Specification</th>
                                    <th className="text-left py-4 px-6 text-gray-400 font-mono text-sm uppercase tracking-wider">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 font-bold">Compute</td>
                                    <td className="py-4 px-6 font-mono">H100 SXM5 / A100</td>
                                    <td className="py-4 px-6 text-gray-400 text-sm">80GB HBM3e per GPU</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 font-bold">Interconnect</td>
                                    <td className="py-4 px-6 font-mono">3.2Tbps Fabric</td>
                                    <td className="py-4 px-6 text-gray-400 text-sm">NVIDIA Quantum-2 InfiniBand</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 font-bold">Stack</td>
                                    <td className="py-4 px-6 font-mono">Zero-Setup</td>
                                    <td className="py-4 px-6 text-gray-400 text-sm">PyTorch 2.5, JAX, CUDA 12.4 pre-installed</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 font-bold">Storage</td>
                                    <td className="py-4 px-6 font-mono">NVMe + Object</td>
                                    <td className="py-4 px-6 text-gray-400 text-sm">Local NVMe for checkpoints, S3-compatible object storage</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 font-bold">Network</td>
                                    <td className="py-4 px-6 font-mono">100Gbps Uplink</td>
                                    <td className="py-4 px-6 text-gray-400 text-sm">Dedicated internet + private peering available</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-zinc-950">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to build your AI factory?</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Talk to our infrastructure architects. We'll help you size and deploy your private cluster.
                    </p>
                    <Link href="/contact" className="inline-flex px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                        Schedule Architecture Call
                    </Link>
                </div>
            </section>

        </div>
    );
}
