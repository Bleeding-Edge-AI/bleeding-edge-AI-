'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Box, Zap, Terminal, Code, Cpu, Database } from 'lucide-react';
import Image from 'next/image';

/* -------------------------------------------------------------------------- */
/*                                SUB-COMPONENTS                              */
/* -------------------------------------------------------------------------- */

// VISUAL 1: Bare Metal Server (H100 Image + HUD)
const ServerVisual = () => (
    <div className="w-full h-full bg-zinc-900 border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-2xl shadow-purple-500/20">

        {/* Realistic Image */}
        {/* Note: Ensure /images/h100-chassis.jpg exists in public folder */}
        <Image
            src="/images/h100-v2.jpg"
            alt="Nvidia H100 HGX Bare Metal Server Chassis"
            fill
            className="object-cover"
            unoptimized
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Dimmer */}

        {/* HUD OVERLAY */}
        <div className="absolute inset-0 z-10">
            {/* 1. Grid Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px] pointer-events-none" />

            {/* 2. Live Status Badge */}
            <div className="absolute top-6 right-6 flex items-center gap-3 bg-black/60 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full z-20">
                <div className="flex gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                </div>
                <span className="text-[10px] font-mono text-green-400 tracking-wider font-bold">LIVE :: 100% UPTIME</span>
            </div>

            {/* 3. Scanning Line Animation */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />

            {/* Tech Decoration - Corner Brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-white/20" />
            <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-white/20" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-white/20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-white/20" />
        </div>
    </div>
);

// VISUAL 2: Managed Container
const ContainerVisual = () => (
    <div className="w-full h-full bg-blue-950/20 border border-blue-500/10 rounded-2xl p-8 relative overflow-hidden flex items-center justify-center">
        {/* Abstract Container Box */}
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-64 border-2 border-blue-500/50 bg-blue-500/5 backdrop-blur-md rounded-xl relative flex items-center justify-center transform preserve-3d"
        >
            {/* Inner Cube */}
            <div className="w-32 h-32 bg-blue-600/10 border border-blue-400/30 rounded flex items-center justify-center">
                <Box className="w-12 h-12 text-blue-400" />
            </div>

            {/* Floating Dependencies removed */}
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-3 bg-black border border-white/10 rounded-lg shadow-xl"
            >
                <Cpu className="w-5 h-5 text-gray-400" />
            </motion.div>
            <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 p-3 bg-black border border-white/10 rounded-lg shadow-xl"
            >
                <Database className="w-5 h-5 text-gray-400" />
            </motion.div>
        </motion.div>
    </div>
);

// VISUAL 3: API Code Block
const CodeVisual = () => (
    <div className="w-full h-full bg-zinc-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col font-mono text-sm leading-relaxed text-gray-300 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 p-2 bg-black/50 rounded-lg border border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-gray-500">api_request.py</span>
        </div>
        <div className="space-y-1 overflow-hidden">
            <div><span className="text-purple-400">import</span> openai</div>
            <div className="h-2"></div>
            <div>client = openai.OpenAI(</div>
            <div className="pl-4">api_key=<span className="text-green-400">"sk_live_..."</span>,</div>
            <div className="pl-4">base_url=<span className="text-green-400">"https://api.bleedingedge.ai/v1"</span></div>
            <div>)</div>
            <div className="h-2"></div>
            <div>response = client.chat.completions.create(</div>
            <div className="pl-4">model=<span className="text-green-400">"llama-3-70b"</span>,</div>
            <div className="pl-4">messages=[</div>
            <div className="pl-8">{`{"role": "user", "content": "Explain quantum..."}`}</div>
            <div className="pl-4">]</div>
            <div>)</div>
            <div className="h-2"></div>
            <div><span className="text-blue-400">print</span>(response.choices[0].message)</div>
        </div>

        {/* Typing cursor animation */}
        <motion.div
            className="absolute bottom-10 right-10 w-32 h-10 bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center text-green-400 font-bold"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            200 OK
        </motion.div>
    </div>
);


/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

export function StickyScrollSection() {
    const [activeStage, setActiveStage] = useState(0);

    // Refs for observing intersection
    const stage1Ref = useRef(null);
    const stage2Ref = useRef(null);
    const stage3Ref = useRef(null);

    const isStage1InView = useInView(stage1Ref, { margin: "-50% 0px -50% 0px" });
    const isStage2InView = useInView(stage2Ref, { margin: "-50% 0px -50% 0px" });
    const isStage3InView = useInView(stage3Ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isStage1InView) setActiveStage(0);
        if (isStage2InView) setActiveStage(1);
        if (isStage3InView) setActiveStage(2);
    }, [isStage1InView, isStage2InView, isStage3InView]);

    const visuals = [
        <ServerVisual key="0" />,
        <ContainerVisual key="1" />,
        <CodeVisual key="2" />
    ];

    return (
        <section className="relative px-6 py-24 bg-black">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-24">

                {/* LEFT COLUMN - STICKY VISUALS */}
                <div className="hidden lg:block w-full lg:w-1/2 h-[600px] sticky top-32">
                    <div className="relative w-full h-full">
                        {visuals.map((visual, index) => (
                            <motion.div
                                key={index}
                                className="absolute inset-0 w-full h-full"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{
                                    opacity: activeStage === index ? 1 : 0,
                                    scale: activeStage === index ? 1 : 0.95,
                                    zIndex: activeStage === index ? 10 : 0
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {visual}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN - SCROLLABLE CONTENT */}
                <div className="w-full lg:w-1/2 flex flex-col gap-32 lg:py-20">

                    {/* STAGE 1: BARE METAL */}
                    <div ref={stage1Ref} className="min-h-[60vh] flex flex-col justify-center">
                        <div className="lg:hidden h-80 mb-8">{/* Mobile Visual Only */}
                            <ServerVisual />
                        </div>

                        <h3 className="text-4xl font-bold mb-6 text-white">
                            Raw Metal. <br />
                            <span className="text-red-500">Zero Overhead.</span>
                        </h3>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Bypass the hypervisor. Get 100% of the FLOPs and VRAM you pay for. Our bare metal instances eliminate virtualization noise,
                            ensuring consistent latency for high-density inference fleets.
                        </p>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {[
                                { name: "H100 SXM5", price: "$3.50/hr", ram: "80GB" },
                                { name: "A100 SXM4", price: "$1.89/hr", ram: "80GB" },
                                { name: "L40S", price: "$0.85/hr", ram: "48GB" },
                            ].map((card, i) => (
                                <div key={i} className="p-4 rounded-xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-800 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold text-white group-hover:text-red-500 transition-colors">{card.name}</div>
                                        <div className="text-xs bg-white/10 px-2 py-1 rounded">{card.ram}</div>
                                    </div>
                                    <div className="text-sm text-gray-400 mb-4">Starting at {card.price}</div>
                                    <button className="w-full py-2 bg-white/5 hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-wider rounded transition-all">
                                        Rent Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* STAGE 2: MANAGED */}
                    <div ref={stage2Ref} className="min-h-[60vh] flex flex-col justify-center">
                        <div className="lg:hidden h-80 mb-8">{/* Mobile Visual Only */}
                            <ContainerVisual />
                        </div>

                        <h3 className="text-4xl font-bold mb-6 text-white">
                            Managed Inference Runtimes. <br />
                            <span className="text-blue-500">Architected for You.</span>
                        </h3>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Pre-tuned serving engines, optimized for our topology. We provide white-glove environments with vLLM, TGI, and TensorRT-LLM pre-installed and quantized.
                            No dependency hell—just maximum token throughput.
                        </p>

                        <div className="mb-6">
                            <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">Supported Stocks</h4>
                            <div className="flex flex-wrap gap-3">
                                {["PyTorch 2.5", "JAX", "Triton", "vLLM", "Ray", "Deepspeed"].map((badge, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* STAGE 3: MODEL API */}
                    <div ref={stage3Ref} className="min-h-[60vh] flex flex-col justify-center">
                        <div className="lg:hidden h-80 mb-8">{/* Mobile Visual Only */}
                            <CodeVisual />
                        </div>

                        <h3 className="text-4xl font-bold mb-6 text-white">
                            The Token Factory. <br />
                            <span className="text-purple-500">Instant Intelligence.</span>
                        </h3>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Instant scaling for Llama 3, Mixtral, and DeepSeek. Serverless access with zero cold starts.
                            Deploy standard open-source models or your own private fine-tunes on dedicated, secure endpoints.
                        </p>

                        {/* Logo Carousel */}
                        <div className="w-full overflow-hidden border-t border-b border-white/10 py-6 bg-white/5">
                            <div className="flex gap-8 items-center opacity-50 justify-around">
                                <span className="text-xl font-bold">LLAMA 3</span>
                                <span className="text-xl font-bold">MISTRAL</span>
                                <span className="text-xl font-bold">GEMMA</span>
                                <span className="text-xl font-bold">PHI-3</span>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-xs text-gray-500">
                            + 50 more open source models available
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
