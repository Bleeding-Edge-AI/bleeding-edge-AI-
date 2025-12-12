'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Box, MousePointer2, GripHorizontal } from 'lucide-react';

// Timer Component
const CardTimer = ({ onComplete }: { onComplete: () => void }) => {
    const [days, setDays] = useState(0);

    useEffect(() => {
        const duration = 3000; // Slower build time
        const intervalTime = duration / 120;
        const timer = setInterval(() => {
            setDays(prev => {
                if (prev >= 120) {
                    clearInterval(timer);
                    onComplete();
                    return 120;
                }
                return prev + 2; // Slower increments
            });
        }, intervalTime);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="font-mono text-xs font-bold text-red-500 tabular-nums">
            T-{days} DAYS
        </div>
    );
};

export const CapExSimulator: React.FC = () => {
    const [activeModules, setActiveModules] = useState<number[]>([]);
    const [completedModules, setCompletedModules] = useState<number[]>([]);
    const [cursorStep, setCursorStep] = useState<'idle' | 'move-to-palette' | 'grab' | 'move-to-slot' | 'drop'>('idle');
    const [targetSlot, setTargetSlot] = useState(0);

    // Coordinate mapping for relative container center (0,0)
    const slotPositions = [
        { x: -180, y: 0 },
        { x: 0, y: 0 },
        { x: 180, y: 0 },
        { x: 360, y: 0 }
    ];
    // Palette is now on the left
    const palettePos = { x: -420, y: 0 };

    useEffect(() => {
        let isMounted = true;

        const runSequence = async () => {
            // Reset
            if (!isMounted) return;
            setActiveModules([]);
            setCompletedModules([]);
            await wait(1000);

            for (let i = 0; i < 4; i++) {
                if (!isMounted) return;
                setTargetSlot(i);

                // 1. Move to Palette
                setCursorStep('move-to-palette');
                await wait(1200);

                // 2. Grab
                setCursorStep('grab');
                await wait(600);

                // 3. Move to Slot
                setCursorStep('move-to-slot');
                await wait(1200);

                // 4. Drop
                setCursorStep('drop');
                setActiveModules(prev => [...prev, i + 1]); // Activate the slot
                await wait(300);

                // 5. Back to Idle/Loop
                setCursorStep('idle');
                await wait(2000); // Wait bit before next one
            }

            // Loop
            await wait(6000);
            if (isMounted) runSequence();
        };

        runSequence();
        return () => { isMounted = false; };
    }, []);

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Calculate Cursor Position
    const getCursorPos = () => {
        if (cursorStep === 'move-to-palette' || cursorStep === 'grab') return palettePos;
        if (cursorStep === 'move-to-slot' || cursorStep === 'drop') return slotPositions[targetSlot];
        return { x: -420, y: -100 }; // idle pos above palette
    };

    const cursorPos = getCursorPos();
    const isGrabbing = cursorStep === 'grab' || cursorStep === 'move-to-slot';

    return (
        <section className="py-24 px-6 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-neutral-950 to-neutral-950" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase">
                        Deploy CapEx at <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-900">Your Own Pace.</span>
                    </h2>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto font-light">
                        Simulated Deployment: React to the market in 4-month increments.
                    </p>
                </div>

                {/* Animation Canvas */}
                <div className="relative h-[400px] w-full max-w-[1000px] mx-auto bg-neutral-900/20 rounded-3xl border border-white/5 overflow-hidden">

                    {/* Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

                    {/* --- Module Palette (Vertical Left) --- */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-24 bg-neutral-800/80 backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 shadow-2xl py-6 z-20">
                        <div className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest absolute -top-6 w-full text-center">Inv</div>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-16 h-16 bg-neutral-700/50 rounded-lg border border-white/5 flex items-center justify-center">
                                <Box className="w-6 h-6 text-neutral-500" />
                            </div>
                        ))}
                    </div>

                    {/* --- Timeline Slots (Horizontal Right) --- */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-12 flex gap-4">
                        {[1, 2, 3, 4].map((id) => {
                            const isActive = activeModules.includes(id);
                            const isComplete = completedModules.includes(id);

                            return (
                                <div key={id} className="relative w-40 h-56 bg-neutral-900/50 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center transition-colors">
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ type: 'spring', bounce: 0.5 }}
                                                className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center p-4 border transition-colors duration-500
                                                    ${isComplete ? 'bg-neutral-800 border-red-500' : 'bg-neutral-800/80 border-white/20'}
                                                `}
                                            >
                                                {/* Module Visual */}
                                                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-all duration-500 ${isComplete ? 'bg-red-600' : 'bg-neutral-700 animate-pulse'}`}>
                                                    <Box className="w-6 h-6 text-white" />
                                                </div>

                                                <div className="text-sm font-bold text-white mb-2">MODULE 0{id}</div>

                                                {/* Timer / Status */}
                                                {isComplete ? (
                                                    <div className="flex items-center text-red-500 text-xs font-bold uppercase tracking-wider">
                                                        <Check className="w-3 h-3 mr-1" /> Active
                                                    </div>
                                                ) : (
                                                    <CardTimer onComplete={() => setCompletedModules(prev => [...prev, id])} />
                                                )}

                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {!isActive && (
                                        <div className="text-neutral-700 text-xs font-mono uppercase tracking-widest text-center">Empty<br />Slot</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>


                    {/* --- Cursor & Dragged Item Layer --- */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 pointer-events-none z-50"
                        animate={{
                            x: cursorPos.x,
                            y: cursorPos.y,
                        }}
                        transition={{
                            type: 'spring',
                            damping: 30, // Increased damping for slower feel
                            stiffness: 100 // Reduced stiffness for slower feel
                        }}
                    >
                        {/* Dragged Module (Ghost) */}
                        <AnimatePresence>
                            {isGrabbing && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="absolute -top-12 -left-8 w-24 h-16 bg-red-600/80 rounded-lg shadow-xl backdrop-blur-sm border border-white/20 flex items-center justify-center"
                                >
                                    <Box className="w-6 h-6 text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Cursor Icon */}
                        <div className="relative">
                            <MousePointer2
                                className={`w-8 h-8 text-white drop-shadow-md transition-transform duration-200 ${isGrabbing ? 'scale-90' : 'scale-100'}`}
                                fill="black"
                            />
                            {/* Click Ring */}
                            {cursorStep === 'grab' && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    className="absolute -top-2 -left-2 w-12 h-12 rounded-full border-2 border-white/50"
                                />
                            )}
                            {cursorStep === 'drop' && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    className="absolute -top-2 -left-2 w-12 h-12 rounded-full border-2 border-red-500/50"
                                />
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
