'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Network, Cpu, HardHat, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Defines the data for each layer
const LAYERS = [
    {
        id: 'build',
        title: 'BUILD',
        subtitle: 'Infrastructure. 120-Day Modular Build.',
        description: 'Rapidly deploy modular data center capacity in just 120 days. Our pre-fabricated proprietary design delivers critical power 3x faster than traditional buildouts.',
        icon: HardHat,
        color: 'orange',
        route: '/build',
        texture: '/textures/stack-build.png',
        accentColor: '#f97316', // orange-500
        glowcolor: 'rgba(249,115,22,0.6)'
    },
    {
        id: 'deploy',
        title: 'DEPLOY',
        subtitle: 'Colocation. QRO1 Campus Live.',
        description: 'Secure your hardware in our QRO1 campus. Featuring carrier-neutral connectivity, high-density cooling, and a 100% uptime SLA for your mission-critical workloads.',
        icon: MapPin,
        color: 'amber',
        route: '/colocation',
        texture: '/textures/stack-deploy.png',
        accentColor: '#f59e0b', // amber-500
        glowcolor: 'rgba(245,158,11,0.6)'
    },
    {
        id: 'compute',
        title: 'COMPUTE',
        subtitle: 'AI Cloud. Private Bare Metal Clusters.',
        description: 'Access high-performance H100 clusters with bare-metal isolation. Designed for foundation model training and high-throughput inference without the virtualization tax.',
        icon: Cpu,
        color: 'green',
        route: '/ai-cloud',
        texture: '/textures/stack-compute.png',
        accentColor: '#22c55e', // green-500
        glowcolor: 'rgba(34,197,94,0.6)'
    },
    {
        id: 'transform',
        title: 'TRANSFORM',
        subtitle: 'Applied AI. Enterprise Agents & ROI.',
        description: 'Deploy autonomous AI agents that integrate deeply with your enterprise data. We build the neural tissue of your organization to drive real-world ROI.',
        icon: Network, // "Brain/Network"
        color: 'cyan',
        route: '/applied-ai',
        texture: '/textures/stack-transform.png',
        accentColor: '#06b6d4', // cyan-500
        glowcolor: 'rgba(6,182,212,0.6)'
    }
];

export const TexturedStackRouter: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

    // --- LEFT SIDE ANIMATIONS ---
    // Header Logic
    const headerOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const headerY = useTransform(smoothProgress, [0, 0.15], [0, -50]);
    // const headerScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]); // Subtle scale visual
    const headerPointerEvents = useTransform(smoothProgress, (v) => v < 0.15 ? 'auto' : 'none');

    // List Logic
    const listOpacity = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);
    const listX = useTransform(smoothProgress, [0.15, 0.25], [-50, 0]);
    const listPointerEvents = useTransform(smoothProgress, (v) => v > 0.15 ? 'auto' : 'none');


    // --- ANIMATION LOGIC DRIVER ---
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Scroll Phases:
            // 0.0 - 0.2: Intro (Stack Expanded, No Highlight)
            // 0.2 - 0.4: Layer 0 Highlight
            // 0.4 - 0.6: Layer 1 Highlight
            // 0.6 - 0.8: Layer 2 Highlight
            // 0.8 - 1.0: Layer 3 Highlight

            if (latest < 0.2) {
                setActiveIndex(null);
            } else if (latest < 0.4) {
                setActiveIndex(0);
            } else if (latest < 0.6) {
                setActiveIndex(1);
            } else if (latest < 0.8) {
                setActiveIndex(2);
            } else {
                setActiveIndex(3);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-neutral-950">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pt-20 lg:pt-32 pb-10 lg:pb-20 px-4 lg:px-8">

                {/*
                   MOBILE LAYOUT STRATEGY:
                   - Stack is absolutely positioned or centered in background.
                   - Content overlays it.
                   - We use a flex col for mobile, grid for desktop.
                */}
                <div className="w-full max-w-7xl h-full relative flex flex-col lg:grid lg:grid-cols-2 lg:gap-24 items-center justify-center">

                    {/* --- RIGHT SIDE: 3D TEXTURED STACK (Background on Mobile) --- */}
                    {/* On Desktop: Order 2. On Mobile: Absolute centered or Order 1 with adjustments. */}
                    {/* UPDATED: Changed items-center to items-start + padding to bring stack up on mobile */}
                    <div className="absolute inset-0 lg:static lg:inset-auto flex items-start pt-32 lg:pt-0 lg:items-center justify-center perspective-[2000px] z-0 lg:order-2 pointer-events-none lg:pointer-events-auto">
                        <div
                            className="relative w-64 h-64 md:w-80 md:h-80 preserve-3d"
                            style={{ transform: 'rotateX(55deg) rotateZ(45deg) scale(0.9) md:scale(1.05)' }}
                        >
                            {LAYERS.map((layer, index) => {
                                const isHovered = activeIndex === index;
                                const isDimmed = activeIndex !== null && !isHovered;

                                // Reduce gap slightly on mobile to fit
                                const gap = 150;

                                // UPDATED: Build from ground up.
                                // Index 0 (Build) -> Bottom (posIndex 0)
                                // Index 3 (Transform) -> Top (posIndex 3)
                                const posIndex = index;
                                const zOffset = (posIndex * gap) - ((LAYERS.length - 1) * gap / 2);

                                return (
                                    <motion.div
                                        key={layer.id}
                                        className="absolute inset-0 preserve-3d"
                                        animate={{
                                            translateZ: zOffset,
                                            y: isHovered ? -40 : 0,
                                            opacity: isDimmed ? 0.2 : 1, // Dim others more
                                            filter: isHovered ? 'brightness(1.2)' : 'brightness(0.5)', // Brighten active, dim others
                                        }}
                                        style={{
                                            zIndex: index + 1
                                        }}
                                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-xl shadow-2xl transition-all duration-500"
                                            style={{
                                                backgroundImage: `url(${layer.texture})`,
                                                backgroundSize: 'cover',
                                                boxShadow: isHovered ? `0 0 80px -20px ${layer.glowcolor}` : 'none',
                                                border: `1px solid ${layer.glowcolor}`
                                            }}
                                        >
                                            <div className={`absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-500 rounded-xl ${isHovered ? 'bg-transparent' : ''}`} />
                                        </div>
                                        <div
                                            className="absolute top-full left-0 w-full h-4 bg-neutral-900 origin-top transform-3d"
                                            style={{
                                                transform: 'rotateX(-90deg)',
                                                backgroundColor: layer.accentColor,
                                                filter: 'brightness(0.5)'
                                            }}
                                        />
                                        <div
                                            className="absolute top-0 left-full w-4 h-full bg-neutral-900 origin-left transform-3d"
                                            style={{
                                                transform: 'rotateY(90deg)',
                                                backgroundColor: layer.accentColor,
                                                filter: 'brightness(0.3)'
                                            }}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>


                    {/* --- LEFT SIDE: CONTENT (Foreground) --- */}
                    <div className="relative w-full h-full lg:h-[500px] flex flex-col justify-end lg:justify-center z-10 lg:order-1 pointer-events-none">

                        {/* 1. INTRO HEADER */}
                        <motion.div
                            style={{ opacity: headerOpacity, y: headerY, pointerEvents: headerPointerEvents }}
                            className="absolute inset-0 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
                        >
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight drop-shadow-2xl bg-black/50 lg:bg-transparent p-4 lg:p-0 rounded-2xl backdrop-blur-sm lg:backdrop-blur-none">
                                THE INTEGRATED <br /> <span className="text-amber-500">STACK.</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-neutral-200 lg:text-neutral-400 font-light max-w-lg bg-black/50 lg:bg-transparent p-4 lg:p-0 rounded-xl ml-4 mr-4 lg:ml-0 lg:mr-0 backdrop-blur-sm lg:backdrop-blur-none">
                                A vertically aligned ecosystem designed for the Intelligence Age.
                                <br /><br />
                                Scroll to explore the layers.
                            </p>
                        </motion.div>

                        {/* 2. LAYERS LIST */}
                        {/* 
                             Mobile: Only show active card at bottom.
                             Desktop: Show all in list.
                        */}
                        <motion.div
                            style={{ opacity: listOpacity, x: listX, pointerEvents: listPointerEvents }}
                            className="absolute lg:inset-0 w-full bottom-0 top-auto lg:top-0 flex flex-col justify-end lg:justify-center gap-4 pb-8 lg:pb-0 px-4 lg:px-0"
                        >
                            {LAYERS.map((layer, index) => {
                                const isHovered = activeIndex === index;
                                const isDimmed = activeIndex !== null && !isHovered;

                                // Mobile: Hide if not active
                                const mobileClass = isHovered ? 'flex' : 'hidden lg:flex';

                                return (
                                    <Link
                                        key={layer.id}
                                        href={layer.route}
                                        className={`group relative ${mobileClass} pointer-events-auto`}
                                    >
                                        <motion.div
                                            animate={{
                                                opacity: isDimmed ? 0.3 : 1, // On desktop dimming. On mobile hidden anyway.
                                                x: isHovered ? 20 : 0, // Desktop offset
                                                scale: isHovered ? 1.02 : 1,
                                                borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0)',
                                                backgroundColor: isHovered ? 'rgba(23,23,23,0.95)' : 'rgba(0,0,0,0)'
                                            }}
                                            transition={{ duration: 0.3 }}
                                            // Added bg-black/80 for mobile readability
                                            className={`flex flex-col w-full p-4 md:p-6 rounded-2xl border transition-all duration-300 ${isHovered ? 'shadow-2xl bg-neutral-900/90 backdrop-blur-md' : 'bg-transparent border-transparent'}`}
                                        >
                                            <div className="flex items-start gap-4 md:gap-6">
                                                {/* Icon Box */}
                                                <div
                                                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
                                                    style={{
                                                        backgroundColor: isHovered ? layer.accentColor : 'rgba(255,255,255,0.05)',
                                                        color: isHovered ? '#000' : layer.accentColor
                                                    }}
                                                >
                                                    <layer.icon className="w-5 h-5 md:w-6 md:h-6" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3
                                                            className="text-xl md:text-2xl font-bold tracking-widest transition-colors duration-300"
                                                            style={{ color: isHovered ? layer.accentColor : 'white' }}
                                                        >
                                                            {layer.title}
                                                        </h3>
                                                        <ArrowRight
                                                            className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-2' : 'opacity-0 -translate-x-2'}`}
                                                            style={{ color: layer.accentColor }}
                                                        />
                                                    </div>
                                                    <p className="text-neutral-300 md:text-neutral-400 font-light text-base md:text-lg">
                                                        {layer.subtitle}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* EXPANDED DESCRIPTION */}
                                            <motion.div
                                                initial={false}
                                                // Always expanded on mobile if active (since we only show active)
                                                // On desktop driven by hover/active
                                                // Since we mapped isHovered to activeIndex, this works for both.
                                                animate={{
                                                    height: isHovered ? 'auto' : 0,
                                                    opacity: isHovered ? 1 : 0,
                                                    marginTop: isHovered ? 16 : 0
                                                }}
                                                transition={{ duration: 0.4, ease: "circOut" }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-neutral-300 text-sm md:text-base leading-relaxed pl-0 md:pl-[72px] pr-4">
                                                    {layer.description}
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </div>

                </div>

                <style jsx global>{`
                    .perspective-2000 { perspective: 2000px; }
                    .preserve-3d { transform-style: preserve-3d; }
                    .transform-3d { transform-style: preserve-3d; }
                `}</style>
            </div>
        </section>
    );
};
