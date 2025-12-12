'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Box, ShieldCheck, Cpu } from 'lucide-react';

export const BuildHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax and zoom effects
    const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);
    const y = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-neutral-950 flex flex-col justify-center items-center">

            {/* Cinematic Background */}
            <motion.div
                style={{ scale, y }}
                className="absolute inset-0 z-0"
            >
                {/* Video Background */}
                <video
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125"
                    onEnded={(e) => {
                        e.currentTarget.pause();
                    }}
                >
                    <source src="/Cinematic_concrete.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                {/* Overlay Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,#0a0a0a_1px),linear-gradient(90deg,transparent_1px,#0a0a0a_1px)] bg-[size:50px_50px] opacity-20" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 max-w-7xl mx-auto px-6 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="mb-8"
                >
                    <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter text-white mb-2 uppercase">
                        Own your data center.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
                            Hassle Free.
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed mb-12"
                >
                    Own the asset without the construction risk. AI-ready modules delivered to your site in <span className="text-white font-semibold">120 days</span>. Capitalized as hardware, operated as a service.
                </motion.p>
            </motion.div>

            {/* Trust Ticker */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 z-20 bg-neutral-950/80 backdrop-blur-md border-t border-white/10"
            >
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-neutral-400 font-mono text-sm uppercase tracking-widest">
                        <div className="flex items-center space-x-3 group hover:text-white transition-colors cursor-default">
                            <Box className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                            <span>120-Day Delivery</span>
                        </div>
                        <div className="hidden md:block w-px h-6 bg-white/10" />
                        <div className="flex items-center space-x-3 group hover:text-white transition-colors cursor-default">
                            <ShieldCheck className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                            <span>Prefab Concrete Shells</span>
                        </div>
                        <div className="hidden md:block w-px h-6 bg-white/10" />
                        <div className="flex items-center space-x-3 group hover:text-white transition-colors cursor-default">
                            <Cpu className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                            <span>NVIDIA Reference Architecture</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
