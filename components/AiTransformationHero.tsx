'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { ArrowRight, Lock, Activity, FileText, TrendingUp, Zap, Server } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const AiTransformationHero: React.FC = () => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    };

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push('/');
        setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-6 w-full relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* LEFT COLUMN: Messaging */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 mb-8 backdrop-blur-md">
                        <Server className="w-4 h-4 text-brand-400" />
                        <span className="text-xs font-mono text-brand-300 uppercase tracking-widest">Engineering Services</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
                        Engineering the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-400 to-purple-400">AI-Native Enterprise.</span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                        Move beyond the hype. We build the custom agents, RAG pipelines, and decision engines that transform your organization—backed by the security of our private compute.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mb-12">
                        <button
                            onClick={handleContactClick}
                            className="px-8 py-4 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-all flex items-center justify-center group shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                        >
                            Start Your Transformation
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                        <div className="p-1 rounded-full bg-brand-500/20">
                            <Lock className="w-3 h-3 text-brand-400" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">Powered by Bleeding Edge Private Cloud</span>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: Digital Command Center */}
                <div className="relative h-[600px] w-full flex items-center justify-center perspective-[1000px]">
                    <CommandCenterVisual mouseX={mouseX} mouseY={mouseY} />
                </div>

            </div>
        </section>
    );
};

/* --- SUB-COMPONENT: Command Center Visual --- */
const CommandCenterVisual = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
    // Parallax Transforms
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    // Spring physics for smooth movement
    const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
    const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

    // Orbital Animation
    const orbitProgress = useMotionValue(0);

    useEffect(() => {
        const controls = animate(orbitProgress, 360, {
            ease: "linear",
            duration: 40, // 40s per full rotation
            repeat: Infinity,
        });
        return () => controls.stop();
    }, [orbitProgress]);

    return (
        <motion.div
            style={{
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformStyle: "preserve-3d"
            }}
            className="relative w-full h-full flex items-center justify-center transform-style-3d"
        >
            {/* Central Core (The Engine) */}
            <div
                className="absolute z-10 w-32 h-32 md:w-40 md:h-40"
                style={{ transform: "translateZ(0px)" }}
            >
                {/* Core Glow */}
                <div className="absolute inset-0 bg-brand-500/30 rounded-full blur-[50px] animate-pulse-slow" />

                {/* Inner Sphere */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-brand-900 to-slate-950 border border-brand-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                    <div className="absolute inset-2 rounded-full border border-brand-500/30 border-dashed animate-[spin_10s_linear_infinite]" />
                    <Zap className="w-12 h-12 text-brand-500 animate-pulse" />
                </div>
            </div>

            {/* Orbiting Agents */}
            <AgentNode
                angle={0} radius={220} delay={0} icon={Activity} label="Ops Agent" metric="Efficiency +40%" color="emerald"
                mouseX={mouseX} mouseY={mouseY} parallaxFactor={20} orbitProgress={orbitProgress}
            />
            <AgentNode
                angle={120} radius={220} delay={0.2} icon={FileText} label="Data Agent" metric="Processing..." color="blue"
                mouseX={mouseX} mouseY={mouseY} parallaxFactor={30} orbitProgress={orbitProgress}
            />
            <AgentNode
                angle={240} radius={220} delay={0.4} icon={TrendingUp} label="Sales Agent" metric="Revenue Forecast" color="indigo"
                mouseX={mouseX} mouseY={mouseY} parallaxFactor={25} orbitProgress={orbitProgress}
            />

            {/* Connecting Lines (SVG Layer) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <motion.circle cx="50%" cy="50%" r="220" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,5" fill="none" />
            </svg>

            {/* Central ROI Counter */}
            <RoiCounter />

        </motion.div>
    );
};

const AgentNode = ({ angle, radius, delay, icon: Icon, label, metric, color, orbitProgress }: any) => {
    // Dynamic Orbital Position
    // We add the initial angle to the global progress
    const currentAngle = useTransform(orbitProgress, (v: any) => v + angle);

    // Calculate raw orbit position based on current angle
    // Using simple trig: x = r * cos(theta), y = r * sin(theta)
    const orbitX = useTransform(currentAngle, (a: number) => Math.cos(a * (Math.PI / 180)) * radius);
    const orbitY = useTransform(currentAngle, (a: number) => Math.sin(a * (Math.PI / 180)) * radius);

    // Dynamic scale/z-index for depth effect
    // When y is positive (lower on screen), it's "closer" -> larger scale, higher z-index
    const scale = useTransform(orbitY, [-radius, radius], [0.8, 1.2]);
    const zIndex = useTransform(orbitY, (y) => y > 50 ? 40 : 5); // Simple threshold for z-sorting

    return (
        <motion.div
            style={{
                left: "50%",
                top: "50%",
                marginLeft: -32, // Re-center (w-16 = 64px / 2 = 32)
                marginTop: -32,
                x: orbitX, // Direct orbital mapping
                y: orbitY,
                zIndex,
                scale,
                transformStyle: "preserve-3d" // maintain 3d context
            }}
            className="absolute will-change-transform" // perf optimization
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay }}
        >
            {/*
                Rotate container to keep it facing forward?
                Actually, since we are just translating x/y, the node itself doesn't rotate.
                It stays upright. 3D transform is on parent.
             */}
            <div
                className={`relative group cursor-pointer`}
                style={{ transform: "translateZ(0px)" }}
            >
                {/* Visual Node */}
                <div className={`w-16 h-16 rounded-xl bg-slate-950 border border-${color}-500/50 flex items-center justify-center shadow-lg transition-transform duration-300 ease-out z-30 relative`}>
                    <div className="absolute inset-0 bg-slate-900/90 rounded-xl -z-10" />
                    <Icon className={`w-8 h-8 text-${color}-400 relative z-20`} />

                    {/* Badge */}
                    <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-${color}-500 flex items-center justify-center animate-ping`} />
                    <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-${color}-500 flex items-center justify-center`} />
                </div>

                {/* Expanded Details Tooltip */}
                <div
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-40 bg-slate-900 border border-white/10 rounded-lg p-3 opacity-100 transition-opacity pointer-events-none transform backdrop-blur-md z-40 shadow-xl"
                    style={{ transform: "translateZ(40px)" }}
                >
                    <p className="text-xs text-slate-400 uppercase font-mono mb-1">{label}</p>
                    <p className={`text-sm font-bold text-${color}-400 mb-0`}>{metric}</p>
                </div>

                {/* Pulse Emission */}
                <PulseParticle delay={delay} color={color} startX={0} startY={0} endX={0} endY={0} />
            </div>
        </motion.div>
    );
};

// Particle that travels from Agent back to Center (0,0 relative to parent)
const PulseParticle = ({ delay, color, startX, startY, endX, endY }: any) => {
    return (
        <motion.div
            className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-${color}-400 shadow-[0_0_10px_currentColor] z-0 pointer-events-none`}
            initial={{ opacity: 0, x: startX, y: startY }}
            animate={{
                opacity: [0, 1, 0],
                x: [startX, endX], // Move "Inward" towards center (which is -x relative to node)
                y: [startY, endY]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay,
                repeatDelay: 3,
                ease: "easeInOut"
            }}
        />
    )
}

const RoiCounter = () => {
    const [count, setCount] = useState(1240000);

    // Simulate ROI ticking up
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev + Math.floor(Math.random() * 500));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-[60%] md:top-[65%] w-auto bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-2xl backdrop-blur-xl flex flex-col items-center shadow-[0_0_30px_rgba(16,185,129,0.1)]"
        >
            <span className="text-xs text-emerald-400 font-mono uppercase tracking-widest mb-1">Total Value Creation</span>
            <div className="flex items-center gap-2">
                <span className="text-2xl md:text-3xl font-display font-bold text-white">
                    ${(count).toLocaleString()}
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-500 animate-bounce" />
            </div>
        </motion.div>
    );
};
