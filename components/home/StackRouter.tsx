'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, Zap, Server } from 'lucide-react';

export const StackRouter: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="py-32 bg-neutral-950 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

            <div className="mb-24 text-center z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">ENTER THE <span className="text-amber-500">STACK</span>.</h2>
                <p className="text-neutral-400 max-w-xl mx-auto">Hover to expand the layers. Click to explore.</p>
            </div>

            {/* THE STACK CONTAINER */}
            <div
                className="relative w-full max-w-4xl h-[600px] flex flex-col items-center justify-center perspective-1000"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* 
                   LAYER 1: TRANSFORM (Top)
                   Default: Compressed. Hover: Moves Up significantly. 
                */}
                <StackLayer
                    offset={isHovered ? -180 : -15}
                    zIndex={40}
                    color="border-amber-500 bg-amber-900/20"
                    title="TRANSFORM"
                    subtitle="Applied AI & Agents"
                    icon={<Cpu className="w-8 h-8 text-amber-500" />}
                    href="/applied-ai"
                    isHovered={isHovered}
                >
                    {/* Visual Texture: Neural Nodes */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent animate-pulse" />
                </StackLayer>

                {/* 
                   LAYER 2: COMPUTE 
                   Default: Compressed. Hover: Moves Up slightly. 
                */}
                <StackLayer
                    offset={isHovered ? -60 : -5}
                    zIndex={30}
                    color="border-green-500/50 bg-green-900/10"
                    title="COMPUTE"
                    subtitle="AI Cloud & H100s"
                    icon={<Server className="w-8 h-8 text-green-500" />}
                    href="/ai-cloud"
                    isHovered={isHovered}
                >
                    {/* Visual Texture: Server Lights */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 flex flex-col justify-around opacity-50 px-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-green-500 animate-ping" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                </StackLayer>

                {/* 
                   LAYER 3: BUILD 
                   Default: Compressed. Hover: Moves Down slightly. 
                */}
                <StackLayer
                    offset={isHovered ? 60 : 5}
                    zIndex={20}
                    color="border-blue-500/50 bg-blue-900/10"
                    title="BUILD"
                    subtitle="Modular Infrastructure"
                    icon={<Layers className="w-8 h-8 text-blue-500" />}
                    href="/build"
                    isHovered={isHovered}
                >
                    {/* Visual Texture: Blueprint Grid */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] mix-blend-overlay" />
                </StackLayer>

                {/* 
                   LAYER 4: DEPLOY (Bottom)
                   Default: Compressed. Hover: Moves Down significantly. 
                */}
                <StackLayer
                    offset={isHovered ? 180 : 15}
                    zIndex={10}
                    color="border-neutral-500/50 bg-neutral-800"
                    title="DEPLOY"
                    subtitle="Colocation & Campus"
                    icon={<Zap className="w-8 h-8 text-neutral-400" />}
                    href="/deployment-hub"
                    isHovered={isHovered}
                >
                    {/* Visual Texture: Asphalt/Concrete */}
                    <div className="absolute inset-0 bg-neutral-900 opacity-80" />
                </StackLayer>

            </div>
        </section>
    );
};

interface StackLayerProps {
    offset: number;
    zIndex: number;
    color: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    href: string;
    isHovered: boolean;
    children?: React.ReactNode;
}

const StackLayer: React.FC<StackLayerProps> = ({ offset, zIndex, color, title, subtitle, icon, href, isHovered, children }) => {
    // We use a custom transform for the 3D slab effect
    // rotateX(60deg) gives the "Slab" perspective look.

    return (
        <motion.div
            className={`absolute w-[90%] md:w-[800px] h-32 rounded-2xl border-2 backdrop-blur-md overflow-hidden flex items-center justify-between px-12 transition-colors duration-500 group shadow-2xl cursor-pointer ${color}`}
            style={{
                zIndex,
                transformStyle: "preserve-3d",
            }}
            animate={{
                y: offset,
                scale: isHovered ? 1 : 0.95,
                rotateX: isHovered ? 0 : 50, // Flatten on hover for readability, tilt when compressed
                opacity: isHovered ? 1 : 0.8
            }}
            whileHover={{
                scale: 1.05,
                rotateX: 0,
                transition: { duration: 0.2 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <Link href={href} className="absolute inset-0 z-50 focus:outline-none" aria-label={`Go to ${title}`} />

            {/* Background Texture Children */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {children}
            </div>

            {/* Content Left */}
            <div className="relative z-10 flex items-center gap-6">
                <div className="p-3 bg-black/40 rounded-xl border border-white/10 shadow-inner">
                    {icon}
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white tracking-widest">{title}</h3>
                    <AnimatePresence>
                        {isHovered && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-neutral-300 font-mono text-sm uppercase mt-1"
                            >
                                {subtitle}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Content Right (CTA) */}
            <motion.div
                className="relative z-10"
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            >
                <div className="flex items-center gap-2 text-white font-bold bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                    Explore <ArrowRight className="w-4 h-4" />
                </div>
            </motion.div>

        </motion.div>
    );
}

