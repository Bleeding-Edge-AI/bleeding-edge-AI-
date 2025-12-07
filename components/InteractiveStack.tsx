'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Box, Zap, Layers, Cpu, Database } from 'lucide-react';

interface StackLayerProps {
    isActive: boolean;
    onHover: () => void;
    color: string;
    translateZ: number;
    title: string;
    icon: React.ReactNode;
    index: number;
}

const StackLayer = ({ isActive, onHover, color, translateZ, title, icon, index }: StackLayerProps) => {
    return (
        <motion.div
            onMouseEnter={onHover}
            className={`absolute w-64 h-64 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-center
                ${isActive ? 'shadow-[0_0_30px_rgba(var(--layer-color),0.4)] border-opacity-100' : 'border-opacity-30 hover:border-opacity-70'}
            `}
            style={{
                background: isActive
                    ? `linear-gradient(135deg, rgba(var(--layer-color), 0.1), rgba(var(--layer-color), 0.05))`
                    : 'rgba(255, 255, 255, 0.03)',
                borderColor: `rgba(var(--layer-color), ${isActive ? 1 : 0.3})`,
                backdropFilter: 'blur(8px)',
                ['--layer-color' as any]: color,
                transformStyle: 'preserve-3d',
                boxShadow: isActive ? `0 0 20px rgba(var(--layer-color), 0.3), inset 0 0 20px rgba(var(--layer-color), 0.1)` : 'none'
            }}
            animate={{
                z: isActive ? translateZ + 40 : translateZ,
                translateY: isActive ? -index * 20 : 0, // Spread out when active
            }}
            whileHover={{
                scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="transform -rotate-45 text-white flex flex-col items-center gap-2">
                <div style={{ color: `rgb(var(--layer-color))` }}>
                    {icon}
                </div>
                <span className="font-bold text-shadow-sm">{title}</span>
            </div>

            {/* Simulated Side thickness for 3D effect */}
            <div className="absolute inset-0 border-2 opacity-50 rounded-xl"
                style={{
                    transform: 'translateZ(-10px)',
                    borderColor: `rgba(var(--layer-color), 0.3)`
                }}
            />
        </motion.div>
    );
};

export function InteractiveStack() {
    const [activeLayer, setActiveLayer] = useState<number>(1); // Default to middle layer

    const layers = [
        {
            id: 0,
            title: "Bare Metal",
            icon: <Server size={32} />,
            color: "239, 68, 68", // Red-500
            desc: "Root access, InfiniBand, H100s. Direct control over the silicon.",
            features: [
                "Full Root SSH Access",
                "3.2Tbps InfiniBand Fabric",
                "H100 SXM5 Nodes",
                "Custom Kernel Modules"
            ]
        },
        {
            id: 1,
            title: "Managed Environments",
            icon: <Box size={32} />,
            color: "59, 130, 246", // Blue-500
            desc: "Curated Runtimes with PyTorch/JAX/Drivers pre-installed. No dependency hell.",
            features: [
                "Pre-validated Docker Images",
                "Orchestration Managed",
                "Auto-Checkpointing",
                "Jupyter/VSCode Ready"
            ]
        },
        {
            id: 2,
            title: "The Token Factory",
            icon: <Zap size={32} />,
            color: "168, 85, 247", // Purple-500
            desc: "Serverless inference, zero cold starts, OpenAI-compatible API.",
            features: [
                "Sub-second Cold Starts",
                "Token-based Billing",
                "Auto-scaling to Zero",
                "OpenAI SDK Compatible"
            ]
        }
    ];

    return (
        <div className="w-full min-h-[600px] flex flex-col lg:flex-row items-center justify-center gap-20 perspective-1000 py-20 overflow-visible z-10">

            {/* LEFT COLUMN: 3D STACK */}
            <div className="relative w-80 h-96 preserve-3d flex items-center justify-center"
                style={{ transform: 'rotateX(60deg) rotateZ(-45deg)' }}>

                {/* Connecting Lines (Decorations) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 pointer-events-none transform -translate-z-20">
                    <div className="w-1 h-80 bg-gradient-to-b from-red-500 via-blue-500 to-purple-500 blur-sm" />
                </div>

                <AnimatePresence>
                    {layers.map((layer, index) => (
                        <div
                            key={layer.id}
                            className="absolute"
                            style={{
                                transform: `translateZ(${index * 80}px)`, // Increased spacing from 60 to 80
                                zIndex: index
                            }}
                        >
                            <StackLayer
                                isActive={activeLayer === index}
                                onHover={() => setActiveLayer(index)}
                                color={layer.color}
                                translateZ={0} // Relative to container
                                title={layer.title}
                                icon={layer.icon}
                                index={index}
                            />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: DETAILS PANEL */}
            <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl h-96 flex flex-col justify-center relative shadow-2xl z-20">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeLayer}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg"
                                style={{ color: `rgb(${layers[activeLayer].color})` }}>
                                {layers[activeLayer].icon}
                            </div>
                            <h3 className="text-3xl font-bold text-white leading-tight">{layers[activeLayer].title}</h3>
                        </div>

                        <p className="text-gray-300 text-lg mb-8 min-h-[4rem] leading-relaxed">
                            {layers[activeLayer].desc}
                        </p>

                        <div className="grid grid-cols-1 gap-3">
                            {layers[activeLayer].features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-3 text-sm font-medium text-gray-400 group"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full ring-2 ring-opacity-20 group-hover:scale-125 transition-transform"
                                        style={{
                                            background: `rgb(${layers[activeLayer].color})`,
                                            boxShadow: `0 0 10px rgba(${layers[activeLayer].color}, 0.5)`
                                        }} />
                                    {feature}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Background glow based on active color */}
                <div
                    className="absolute inset-0 -z-10 blur-[120px] opacity-15 transition-colors duration-500"
                    style={{ background: `rgb(${layers[activeLayer].color})` }}
                />
            </div>
        </div>
    );
}
