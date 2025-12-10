'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    QrCode,
    Unlock,
    Package,
    CheckCircle2,
    MessageSquare,
    Camera,
    Network,
    Activity,
    Zap,
    Clock,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this exists given 'clsx' and 'tailwind-merge' in package.json

// Fallback for cn if @/lib/utils doesn't exist or isn't set up
function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

// Card Wrapper Component
const Card = ({
    children,
    className,
    colSpan = "col-span-1"
}: {
    children: React.ReactNode;
    className?: string;
    colSpan?: string;
}) => {
    return (
        <motion.div
            className={classNames(
                "relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm p-6 flex flex-col justify-between hover:border-white/20 transition-colors duration-500",
                colSpan,
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            {/* Glossy gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {children}
        </motion.div>
    );
};

// Access Card Component
const AccessCard = () => {
    return (
        <Card colSpan="col-span-1 lg:col-span-3" className="min-h-[300px]">
            <div className="flex flex-col md:flex-row h-full">
                <div className="flex-1 z-10 flex flex-col justify-center pr-4">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                        <QrCode className="w-5 h-5" />
                        <span className="text-sm font-medium tracking-wider uppercase">Frictionless Access</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Smart Access Control</h3>
                    <p className="text-neutral-400 leading-relaxed max-w-sm">
                        Pre-register visitors, assign specific zones, and generate digital keys instantly. No clipboard required.
                    </p>
                </div>

                <div className="flex-1 relative flex items-center justify-center mt-6 md:mt-0">
                    {/* Mobile Phone Mockup */}
                    <div className="relative w-40 h-72 bg-neutral-950 border-4 border-neutral-800 rounded-[2rem] overflow-hidden shadow-2xl transform rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
                        {/* Screen Content */}
                        <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center pt-8 px-4">
                            <div className="w-12 h-1 bg-neutral-800 rounded-full mb-6" />
                            <div className="w-full aspect-square bg-white p-2 rounded-xl mb-4 relative overflow-hidden">
                                <QrCode className="w-full h-full text-neutral-900" />

                                {/* Scan Scanner Line */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                                    initial={{ top: "0%" }}
                                    whileHover={{ top: "100%" }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "linear",
                                        repeatType: "reverse"
                                    }}
                                />
                            </div>

                            <div className="text-center">
                                <div className="text-xs text-neutral-500 mb-1">Visitor Pass</div>
                                <div className="text-white font-bold">Data Hall A</div>
                            </div>

                            {/* Success Overlay on Hover */}
                            <motion.div
                                className="absolute inset-0 bg-emerald-500/90 flex flex-col items-center justify-center opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-white rounded-full p-3 mb-2">
                                    <Unlock className="w-6 h-6 text-emerald-600" />
                                </div>
                                <span className="text-white font-bold">Access Granted</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

// Logistics Card Component
const LogisticsCard = () => {
    const timelineItems = [
        { time: "09:00", text: "Truck Arrived", icon: <Package size={14} /> },
        { time: "10:15", text: "Unboxed & Staged", icon: <CheckCircle2 size={14} /> },
        { time: "10:30", text: "Inventory Updated (32 Assets)", icon: <Activity size={14} />, highlight: true }
    ];

    return (
        <Card colSpan="col-span-1 lg:col-span-3" className="min-h-[300px]">
            <div className="flex flex-col md:flex-row h-full">
                <div className="flex-1 z-10 flex flex-col justify-center pr-4">
                    <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <Package className="w-5 h-5" />
                        <span className="text-sm font-medium tracking-wider uppercase">Zero-Touch Logistics</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Receiving & Staging Hub</h3>
                    <p className="text-neutral-400 leading-relaxed max-w-sm">
                        Ship directly to us. We receive, unbox, scan serials, and stage your hardware. Track inbound inventory in real-time.
                    </p>
                </div>

                <div className="flex-1 relative flex items-center justify-center mt-6 md:mt-0 px-4">
                    <div className="w-full max-w-xs space-y-4">
                        {timelineItems.map((item, i) => (
                            <motion.div
                                key={i}
                                className={classNames(
                                    "flex items-center gap-3 p-3 rounded-lg border backdrop-blur-sm transition-all",
                                    item.highlight
                                        ? "bg-blue-500/20 border-blue-500/50 text-white shadow-lg shadow-blue-500/10"
                                        : "bg-neutral-800/50 border-white/5 text-neutral-300"
                                )}
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className={classNames("p-2 rounded-full", item.highlight ? "bg-blue-500" : "bg-neutral-700")}>
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-mono opacity-60">{item.time}</div>
                                    <div className="text-sm font-medium">{item.text}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

// Smart Hands Card (Bottom Left)
const SmartHandsCard = () => {
    return (
        <Card colSpan="col-span-1 lg:col-span-2">
            <div className="h-full flex flex-col">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 text-purple-400">
                        <Camera className="w-5 h-5" />
                        <span className="text-sm font-medium tracking-wider uppercase">Traceable</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">Evidence-Based Support</h3>
                    <p className="text-sm text-neutral-400">Request remote hands and get photo evidence.</p>
                </div>

                <div className="flex-1 flex items-end justify-center py-2">
                    <motion.div
                        className="w-full bg-neutral-800/80 rounded-2xl p-3 border border-white/5 relative"
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white shrink-0">
                                <MessageSquare size={14} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-neutral-400 mb-2">Technician shared an attachment</p>
                                <div className="bg-neutral-900 rounded-lg p-2 border border-white/10 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center overflow-hidden relative">
                                        {/* Abstract server image representation */}
                                        <div className="absolute inset-0 bg-neutral-700 grid grid-cols-4 gap-[1px]">
                                            {[...Array(16)].map((_, i) => (
                                                <div key={i} className={`bg-neutral-600 ${i % 3 === 0 ? 'bg-green-500/40' : ''}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium text-white truncate">rack_a4_cabling.jpg</div>
                                        <div className="text-[10px] text-green-400 flex items-center gap-1">
                                            <CheckCircle2 size={10} /> Verified
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Card>
    );
};

// Connectivity Card (Bottom Center)
const ConnectivityCard = () => {
    const [timeLeft, setTimeLeft] = useState("03:59:59");

    // Simple countdown effect
    useEffect(() => {
        const timer = setInterval(() => {
            // Just a dummy simulation
            const now = new Date();
            setTimeLeft(`03:${59 - now.getSeconds()}:${Math.floor(Math.random() * 99)}`);
        }, 100);
        return () => clearInterval(timer);
    }, []);

    return (
        <Card colSpan="col-span-1 lg:col-span-2">
            <div className="h-full flex flex-col">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 text-orange-400">
                        <Network className="w-5 h-5" />
                        <span className="text-sm font-medium tracking-wider uppercase">Instant</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">API-Driven Cross Connects</h3>
                    <p className="text-sm text-neutral-400">Provision interconnections in hours.</p>
                </div>

                <div className="flex-1 flex items-center justify-center relative py-4">
                    <div className="flex items-center justify-between w-full max-w-[200px]">
                        {/* Node A */}
                        <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10" />

                        {/* Connection Line Container */}
                        <div className="flex-1 h-[2px] bg-neutral-800 relative mx-1 overflow-hidden">
                            {/* Glowing Line */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full bg-orange-500"
                                animate={{
                                    x: ["-100%", "100%"]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "linear"
                                }}
                            />
                        </div>

                        {/* Node B */}
                        <div className="w-3 h-3 rounded-full bg-white z-10" />
                    </div>

                    <div className="absolute bottom-0 w-full flex justify-center">
                        <div className="px-3 py-1 bg-neutral-800 rounded-full border border-white/5 flex items-center gap-2">
                            <Clock size={12} className="text-orange-400" />
                            <span className="text-xs font-mono text-white">SLA: 4h remaining</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

// Telemetry Card (Bottom Right)
const TelemetryCard = () => {
    return (
        <Card colSpan="col-span-1 lg:col-span-2">
            <div className="h-full flex flex-col">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 text-red-500">
                        <Zap className="w-5 h-5" />
                        <span className="text-sm font-medium tracking-wider uppercase">Live Telemetry</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">Real-Time Visibility</h3>
                    <p className="text-sm text-neutral-400">Monitor power draw and thermals.</p>
                </div>

                <div className="flex-1 flex items-end relative min-h-[100px] overflow-hidden rounded-xl bg-neutral-900/30">
                    {/* Grid lines */}
                    <div className="absolute inset-0 border-b border-white/5" style={{ top: '25%' }} />
                    <div className="absolute inset-0 border-b border-white/5" style={{ top: '50%' }} />
                    <div className="absolute inset-0 border-b border-white/5" style={{ top: '75%' }} />

                    {/* Sparkline SVG */}
                    <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.5)" />
                                <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                            </linearGradient>
                        </defs>

                        {/* Path */}
                        <motion.path
                            d="M0,80 Q20,60 40,80 T80,80 T120,50 T160,90 T200,60 T240,80 T280,40 T320,70 T360,50"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1, pathOffset: [0, -1] }} // Make it "flow" visually if wanted, but simpler to just draw it
                        // For a "live" graph feel, animating the d attribute is heavier. 
                        // Instead, let's animate the pathLength or translation for simplicity in a static mockup.
                        />

                        {/* Area under curve */}
                        <path
                            d="M0,80 Q20,60 40,80 T80,80 T120,50 T160,90 T200,60 T240,80 T280,40 T320,70 T360,50 V150 H0 Z"
                            fill="url(#gradient)"
                            className="opacity-50"
                        />
                    </svg>

                    {/* Pulsing Dot */}
                    <div className="absolute right-8 top-[33%] transform -translate-y-1/2">
                        <div className="relative">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <motion.div
                                className="absolute inset-0 bg-red-500 rounded-full"
                                animate={{ scale: [1, 2], opacity: [1, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </div>
                    </div>

                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-500/20 text-red-500 rounded text-[10px] font-bold uppercase border border-red-500/30">
                        Live
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default function OperationsGrid() {
    return (
        <section className="py-24 px-4 bg-neutral-950">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
                        Software-Defined Operations.
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
                        We replaced the clipboard with code. Manage physical infrastructure with the speed and transparency of a cloud platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    {/* Top Row */}
                    <AccessCard />
                    <LogisticsCard />

                    {/* Bottom Row */}
                    <SmartHandsCard />
                    <ConnectivityCard />
                    <TelemetryCard />
                </div>
            </div>
        </section>
    );
}
