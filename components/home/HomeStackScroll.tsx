'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Box, Cpu, HardDrive, Zap } from 'lucide-react';
import Link from 'next/link';

export const HomeStackScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll Progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

    // --- PHASE TRANSITIONS ---
    // Phase 1: 0.0 - 0.20 (Intro / All Visible)
    // Phase 2: 0.20 - 0.45 (Transform Focus)
    // Phase 3: 0.45 - 0.70 (Compute Focus)
    // Phase 4: 0.70 - 0.90 (Build Focus)
    // Phase 5: 0.90 - 1.00 (Deploy Focus)

    // Opacity / Visibility logic for each layer based on progress
    // We want focused layer to be prominent, others dim or move out.

    // LAYER TRANSFORMS (Y Position & Scale)
    // 1. TRANSFORM (Top)
    const t1Y = useTransform(smoothProgress, [0, 0.2, 0.45], [0, 0, -200]); // Moves up when phase 3 starts
    const t1Opacity = useTransform(smoothProgress, [0, 0.2, 0.45], [1, 1, 0.2]);
    const t1Scale = useTransform(smoothProgress, [0.1, 0.2, 0.45], [0.9, 1.1, 0.8]); // Popped out in Phase 2

    // 2. COMPUTE
    const t2Y = useTransform(smoothProgress, [0, 0.2, 0.45, 0.7], [0, 100, -100, -300]); // Moves down first, then up to center, then out
    const t2Opacity = useTransform(smoothProgress, [0, 0.2, 0.45, 0.7], [1, 0.3, 1, 0.2]);
    const t2Scale = useTransform(smoothProgress, [0.2, 0.45, 0.7], [0.8, 1.1, 0.8]);

    // 3. BUILD
    const t3Y = useTransform(smoothProgress, [0, 0.45, 0.7, 0.9], [0, 200, -50, -200]);
    const t3Opacity = useTransform(smoothProgress, [0, 0.45, 0.7, 0.9], [1, 0.3, 1, 0.2]);
    const t3Scale = useTransform(smoothProgress, [0.45, 0.7, 0.9], [0.8, 1.1, 0.8]);

    // 4. DEPLOY (Bottom)
    const t4Y = useTransform(smoothProgress, [0, 0.7, 0.9, 1], [0, 300, 0, 0]);
    const t4Opacity = useTransform(smoothProgress, [0, 0.7, 0.9], [1, 0.3, 1]);
    const t4Scale = useTransform(smoothProgress, [0.7, 0.9, 1], [0.8, 1.1, 1.1]);


    // TEXT CONTENT ANIMATION (Fade in/out based on phases)
    // Using opacity to switch content blocks
    const opacityIntro = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const opacityTransform = useTransform(smoothProgress, [0.15, 0.2, 0.4], [0, 1, 0]);
    const opacityCompute = useTransform(smoothProgress, [0.4, 0.45, 0.65], [0, 1, 0]);
    const opacityBuild = useTransform(smoothProgress, [0.65, 0.7, 0.85], [0, 1, 0]);
    const opacityDeploy = useTransform(smoothProgress, [0.85, 0.9, 1], [0, 1, 1]);

    const pointerEventsIntro = useTransform(smoothProgress, (v) => v < 0.15 ? 'auto' : 'none');
    const pointerEventsTransform = useTransform(smoothProgress, (v) => v >= 0.15 && v < 0.4 ? 'auto' : 'none');
    const pointerEventsCompute = useTransform(smoothProgress, (v) => v >= 0.4 && v < 0.65 ? 'auto' : 'none');
    const pointerEventsBuild = useTransform(smoothProgress, (v) => v >= 0.65 && v < 0.85 ? 'auto' : 'none');
    const pointerEventsDeploy = useTransform(smoothProgress, (v) => v >= 0.85 ? 'auto' : 'none');


    return (
        <section ref={containerRef} className="relative h-[400vh] bg-neutral-950">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row">

                {/* --- LEFT: CONTENT --- */}
                <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 md:p-20 relative z-20">
                    <div className="max-w-xl w-full relative h-64 md:h-80">
                        {/* 0. INTRO */}
                        <motion.div style={{ opacity: opacityIntro, pointerEvents: pointerEventsIntro }} className="absolute inset-0 flex flex-col justify-center">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                                THE INTEGRATED <br /> <span className="text-amber-500">STACK.</span>
                            </h2>
                            <p className="text-xl text-neutral-400 mb-8">
                                A vertical aligned ecosystem designed for the Intelligence Age. Scroll to explore.
                            </p>
                        </motion.div>

                        {/* 1. TRANSFORM */}
                        <motion.div style={{ opacity: opacityTransform, pointerEvents: pointerEventsTransform }} className="absolute inset-0 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-6 h-6 text-cyan-400" />
                                <span className="text-cyan-400 font-mono tracking-widest text-sm">LAYER 01</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                TRANSFORM.
                            </h2>
                            <p className="text-xl text-neutral-400 mb-8">
                                Applied AI. Enterprise Agents & ROI. We turn raw compute into business value.
                            </p>
                            <Link href="/applied-ai">
                                <button className="flex items-center gap-2 px-6 py-3 bg-cyan-900/30 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all rounded-full group">
                                    <span>Explore AI</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>

                        {/* 2. COMPUTE */}
                        <motion.div style={{ opacity: opacityCompute, pointerEvents: pointerEventsCompute }} className="absolute inset-0 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <Cpu className="w-6 h-6 text-green-400" />
                                <span className="text-green-400 font-mono tracking-widest text-sm">LAYER 02</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                COMPUTE.
                            </h2>
                            <p className="text-xl text-neutral-400 mb-8">
                                AI Cloud. Private Bare Metal Clusters tailored for training and inference.
                            </p>
                            <Link href="/ai-cloud">
                                <button className="flex items-center gap-2 px-6 py-3 bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-500 hover:text-black transition-all rounded-full group">
                                    <span>View Specs</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>

                        {/* 3. BUILD */}
                        <motion.div style={{ opacity: opacityBuild, pointerEvents: pointerEventsBuild }} className="absolute inset-0 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <Box className="w-6 h-6 text-neutral-400" />
                                <span className="text-neutral-400 font-mono tracking-widest text-sm">LAYER 03</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                BUILD.
                            </h2>
                            <p className="text-xl text-neutral-400 mb-8">
                                Infrastructure. 120-Day Modular Build. Rapid deployment for critical capacity.
                            </p>
                            <Link href="/build">
                                <button className="flex items-center gap-2 px-6 py-3 bg-neutral-800 border border-neutral-600 text-neutral-300 hover:bg-neutral-200 hover:text-black transition-all rounded-full group">
                                    <span>Start Building</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>

                        {/* 4. DEPLOY */}
                        <motion.div style={{ opacity: opacityDeploy, pointerEvents: pointerEventsDeploy }} className="absolute inset-0 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <HardDrive className="w-6 h-6 text-slate-400" />
                                <span className="text-slate-400 font-mono tracking-widest text-sm">LAYER 04</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                DEPLOY.
                            </h2>
                            <p className="text-xl text-neutral-400 mb-8">
                                Colocation. QRO1 Campus Live. Strategic hub for connectivity and power.
                            </p>
                            <Link href="/colocation">
                                <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-600 text-slate-300 hover:bg-slate-200 hover:text-black transition-all rounded-full group">
                                    <span>Find Space</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* --- RIGHT: 3D STACK VISUAL --- */}
                <div className="w-full md:w-1/2 h-full flex items-center justify-center relative perspective-1000 overflow-hidden bg-neutral-900/10">
                    <div className="relative w-full max-w-md h-[500px] flex flex-col items-center justify-center" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(20deg) rotateY(-20deg) scale(0.9)' }}>

                        {/* 1. TRANSFORM SLAB */}
                        <motion.div
                            style={{ y: t1Y, opacity: t1Opacity, scale: t1Scale }}
                            className="absolute top-0 w-64 h-64 md:w-80 md:h-80 bg-black border-2 border-cyan-500/50 rounded-xl shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] flex items-center justify-center backdrop-blur-sm z-40 transition-shadow duration-500"
                        >
                            <div className="text-center">
                                <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                                <h3 className="text-cyan-400 font-bold tracking-widest text-lg">TRANSFORM</h3>
                            </div>
                            {/* Neon Edges */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-cyan-500/80 shadow-[0_0_20px_rgba(6,182,212,1)]" />
                        </motion.div>

                        {/* 2. COMPUTE SLAB */}
                        <motion.div
                            style={{ y: t2Y, opacity: t2Opacity, scale: t2Scale, zIndex: 30 }}
                            className="absolute top-24 w-64 h-64 md:w-80 md:h-80 bg-black border-2 border-green-500/50 rounded-xl shadow-[0_0_50px_-12px_rgba(34,197,94,0.5)] flex items-center justify-center backdrop-blur-sm transition-shadow duration-500"
                        >
                            <div className="text-center">
                                <Cpu className="w-12 h-12 text-green-400 mx-auto mb-2" />
                                <h3 className="text-green-400 font-bold tracking-widest text-lg">COMPUTE</h3>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500/80 shadow-[0_0_20px_rgba(34,197,94,1)]" />
                        </motion.div>

                        {/* 3. BUILD SLAB */}
                        <motion.div
                            style={{ y: t3Y, opacity: t3Opacity, scale: t3Scale, zIndex: 20 }}
                            className="absolute top-48 w-64 h-64 md:w-80 md:h-80 bg-neutral-900 border-2 border-neutral-600 rounded-xl shadow-2xl flex items-center justify-center transition-shadow duration-500"
                        >
                            <div className="text-center">
                                <Box className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
                                <h3 className="text-neutral-300 font-bold tracking-widest text-lg">BUILD</h3>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-neutral-600" />
                        </motion.div>

                        {/* 4. DEPLOY SLAB */}
                        <motion.div
                            style={{ y: t4Y, opacity: t4Opacity, scale: t4Scale, zIndex: 10 }}
                            className="absolute top-72 w-64 h-64 md:w-80 md:h-80 bg-slate-900 border-2 border-slate-700 rounded-xl shadow-2xl flex items-center justify-center transition-shadow duration-500"
                        >
                            <div className="text-center">
                                <HardDrive className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                                <h3 className="text-slate-400 font-bold tracking-widest text-lg">DEPLOY</h3>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-700" />
                        </motion.div>

                    </div>
                </div>

            </div>
        </section>
    );
};
