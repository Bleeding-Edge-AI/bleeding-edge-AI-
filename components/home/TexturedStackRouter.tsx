'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Network, Cpu, HardHat, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Defines the data for each layer
const LAYERS = [
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
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pt-32 pb-20 px-8">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* --- LEFT SIDE: CONTENT --- */}
                    <div className="relative h-[500px] flex items-center order-2 lg:order-1">

                        {/* 1. INTRO HEADER */}
                        <motion.div
                            style={{ opacity: headerOpacity, y: headerY, pointerEvents: headerPointerEvents }}
                            className="absolute inset-0 flex flex-col justify-center text-left"
                        >
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight">
                                THE INTEGRATED <br /> <span className="text-amber-500">STACK.</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-lg">
                                A vertically aligned ecosystem designed for the Intelligence Age.
                                <br /><br />
                                Scroll to explore the layers.
                            </p>
                        </motion.div>

                        {/* 2. LAYERS LIST */}
                        <motion.div
                            style={{ opacity: listOpacity, x: listX, pointerEvents: listPointerEvents }}
                            className="absolute inset-0 flex flex-col justify-center gap-4"
                        >
                            {LAYERS.map((layer, index) => {
                                const isHovered = activeIndex === index;
                                const isDimmed = activeIndex !== null && !isHovered;

                                return (
                                    <Link
                                        key={layer.id}
                                        href={layer.route}
                                        className="group relative block"
                                    >
                                        <motion.div
                                            animate={{
                                                opacity: isDimmed ? 0.3 : 1,
                                                x: isHovered ? 20 : 0,
                                                scale: isHovered ? 1.02 : 1,
                                                borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0)',
                                                backgroundColor: isHovered ? 'rgba(23,23,23,0.8)' : 'rgba(0,0,0,0)'
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex flex-col p-4 md:p-6 rounded-2xl border transition-all duration-300 ${isHovered ? 'shadow-2xl' : ''}`}
                                        >
                                            <div className="flex items-start gap-6">
                                                {/* Icon Box */}
                                                <div
                                                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
                                                    style={{
                                                        backgroundColor: isHovered ? layer.accentColor : 'rgba(255,255,255,0.05)',
                                                        color: isHovered ? '#000' : layer.accentColor
                                                    }}
                                                >
                                                    <layer.icon className="w-6 h-6" />
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3
                                                            className="text-2xl font-bold tracking-widest transition-colors duration-300"
                                                            style={{ color: isHovered ? layer.accentColor : 'white' }}
                                                        >
                                                            {layer.title}
                                                        </h3>
                                                        <ArrowRight
                                                            className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-2' : 'opacity-0 -translate-x-2'}`}
                                                            style={{ color: layer.accentColor }}
                                                        />
                                                    </div>
                                                    <p className="text-neutral-400 font-light text-lg">
                                                        {layer.subtitle}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* EXPANDED DESCRIPTION */}
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    height: isHovered ? 'auto' : 0,
                                                    opacity: isHovered ? 1 : 0,
                                                    marginTop: isHovered ? 16 : 0
                                                }}
                                                transition={{ duration: 0.4, ease: "circOut" }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-neutral-300 leading-relaxed pl-[72px] pr-4">
                                                    {layer.description}
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* --- RIGHT SIDE: 3D TEXTURED STACK --- */}
                    <div className="relative h-[600px] flex items-center justify-center perspective-[2000px] order-1 lg:order-2">
                        {/* 
                            Stack is visually largely static in position, but layers move z-index/pop.
                            We keep it slightly scaled up always now (1.05 default).
                        */}
                        <div
                            className="relative w-80 h-80 preserve-3d"
                            style={{ transform: 'rotateX(55deg) rotateZ(45deg) scale(1.05)' }}
                        >
                            {LAYERS.map((layer, index) => {
                                const isHovered = activeIndex === index;
                                const isDimmed = activeIndex !== null && !isHovered;

                                // --- CONSTANT EXPANDED GAP ---
                                // We keep the gap large (150px) to show the separation clearly at all times.
                                const gap = 150;

                                const posIndex = (LAYERS.length - 1 - index);
                                const zOffset = (posIndex * gap) - ((LAYERS.length - 1) * gap / 2);

                                return (
                                    <motion.div
                                        key={layer.id}
                                        className="absolute inset-0 preserve-3d"
                                        animate={{
                                            translateZ: zOffset,
                                            // The active layer "levitates" slightly more
                                            y: isHovered ? -40 : 0,
                                            // scale: isHovered ? 1.1 : 1, // Optional: Scale up active
                                            opacity: isDimmed ? 0.3 : 1, // Dim others
                                        }}
                                        style={{
                                            zIndex: LAYERS.length - index
                                        }}
                                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    >
                                        {/* TOP FACE */}
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

                                        {/* SIDE FACES */}
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
