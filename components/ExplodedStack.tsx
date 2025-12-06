'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ExplodedStack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform layers based on scroll
    const layer1Y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, -100]);
    const layer2Y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 0]); // Middle stays
    const layer3Y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100]);

    const rotation = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1]);

    return (
        <div ref={containerRef} className="h-[200vh] bg-black relative flex items-start justify-center pt-40 overflow-hidden">
            <div className="sticky top-40 w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center perspective-1000">
                <div className="relative w-[500px] h-[300px] preserve-3d">

                    {/* Text Description that fades in/out */}
                    <motion.div style={{ opacity: scale }} className="absolute -left-64 top-1/2 -translate-y-1/2 w-48 text-right">
                        <h3 className="text-red-500 font-bold mb-2">Cooling Plate</h3>
                        <p className="text-gray-500 text-sm">Liquid cooling channels optimized for high Tinsley flow rates.</p>
                    </motion.div>
                    <motion.div style={{ opacity: scale }} className="absolute -right-64 top-1/2 -translate-y-1/2 w-48 text-left">
                        <h3 className="text-red-500 font-bold mb-2">HBM3e Memory</h3>
                        <p className="text-gray-500 text-sm">80GB of High Bandwidth Memory for massive model weights.</p>
                    </motion.div>


                    {/* Layer 1: Cooling/Top */}
                    <motion.div
                        style={{ y: layer1Y, rotateX: 60, rotateZ: rotation }}
                        className="absolute inset-0 bg-gray-800 border-2 border-red-500/50 rounded-lg shadow-2xl flex items-center justify-center backdrop-blur-sm opacity-90 z-30"
                    >
                        <div className="text-white font-mono opacity-50">COOLING_ASSEMBLY</div>
                        {/* Grid pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,0,0,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                    </motion.div>

                    {/* Layer 2: Core Logic */}
                    <motion.div
                        style={{ y: layer2Y, rotateX: 60, rotateZ: rotation }}
                        className="absolute inset-0 bg-black border-2 border-white/20 rounded-lg shadow-2xl flex items-center justify-center z-20"
                    >
                        {/* Simulated Chip Die */}
                        <div className="w-32 h-32 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-sm border border-yellow-500 flex items-center justify-center">
                            <span className="text-[10px] text-yellow-200 font-mono">NVIDIA H100</span>
                        </div>
                        {/* Circuit lines */}
                        <div className="absolute inset-0 border-[20px] border-gray-900" />
                    </motion.div>

                    {/* Layer 3: PCB/Substrate */}
                    <motion.div
                        style={{ y: layer3Y, rotateX: 60, rotateZ: rotation }}
                        className="absolute inset-0 bg-green-950/50 border-2 border-green-500/30 rounded-lg shadow-xl flex items-center justify-center z-10"
                    >
                        <div className="text-green-500/50 font-mono">PCB_SUBSTRATE_V2</div>
                        <div className="absolute -bottom-4 -right-4 w-4 h-4 bg-green-500 rounded-full animate-ping" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
                SCROLL TO EXPLODE
            </div>
        </div>
    );
};
