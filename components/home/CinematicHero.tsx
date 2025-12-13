'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const CinematicHero: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black text-white">
            {/* Background Video Layer */}
            <motion.div
                style={{ scale, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay using opacity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />

                {/* Simulated High-End Video Loop via CSS/Image Placeholder */}
                {/* ideally this is a <video> tag */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    poster="/api/placeholder/1920/1080" // Fallback
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-server-room-with-blue-lights-2266-large.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6">
                        INFRASTRUCTURE <br /> FOR THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">INTELLIGENCE AGE</span>.
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="max-w-2xl mx-auto"
                >
                    <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed">
                        The world's first vertically integrated AI partner. <br />
                        Unifying Energy, Infrastructure, Compute, and Code.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">Explore the Stack</span>
                <ChevronDown className="w-6 h-6 text-amber-500 animate-bounce" />
            </motion.div>
        </section>
    );
};
