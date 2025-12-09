'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { Server, Box, Zap, Cable, CheckCircle2, MousePointer2 } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export function ColoDesignDemo() {
    // Animation Controls
    const cursorControls = useAnimation();
    const rackControls = useAnimation();
    const menuControls = useAnimation();
    const cableControls = useAnimation();
    const badgeControls = useAnimation();

    // State for visual updates during animation
    const [rackState, setRackState] = useState<'ghost' | 'placed' | 'powered'>('ghost');
    const [stats, setStats] = useState({ power: 0, btu: 0 });
    const [activeTool, setActiveTool] = useState<string | null>(null);

    // Sequence Script
    useEffect(() => {
        const runSequence = async () => {
            while (true) {
                // RESET STATE
                setRackState('ghost');
                setStats({ power: 0, btu: 0 });
                setActiveTool(null);
                await Promise.all([
                    rackControls.set({ opacity: 0, scale: 0.8, x: 0, y: 0 }),
                    menuControls.set({ opacity: 0, scale: 0.9 }),
                    cableControls.set({ pathLength: 0, opacity: 0 }),
                    badgeControls.set({ opacity: 0, y: 10 }),
                    cursorControls.set({ x: 0, y: 0 })
                ]);

                // STEP 1: SELECT RACK TOOL
                // Move to Sidebar "Rack"
                await cursorControls.start({ x: 40, y: 120, transition: { duration: 1, ease: "easeInOut" } });
                setActiveTool('rack');
                // Click Effect
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });

                // STEP 2: DRAG RACK TO GRID
                // Drag start
                await cursorControls.start({ x: 300, y: 200, transition: { duration: 1.2, ease: "easeOut" } });
                setRackState('placed');
                await rackControls.start({ opacity: 1, scale: 1, transition: { duration: 0.3 } });

                // Drop Effect
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                setActiveTool(null);

                // STEP 3: CONFIGURE RACK
                // Move slightly to click the placed rack
                await cursorControls.start({ x: 310, y: 210, transition: { duration: 0.5 } });
                // Click to Open Menu
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await menuControls.start({ opacity: 1, scale: 1, transition: { duration: 0.2 } });

                // Move to "Power: 50kW" option
                await cursorControls.start({ x: 380, y: 200, transition: { duration: 0.6 } });
                // Select Power
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                setRackState('powered');
                setStats({ power: 50, btu: 170000 }); // 50kW ~= 170k BTU

                // Close Menu (delay)
                await new Promise(r => setTimeout(r, 300));
                await menuControls.start({ opacity: 0, scale: 0.9, transition: { duration: 0.2 } });

                // STEP 4: CABLING
                // Move to Sidebar "Fiber"
                await cursorControls.start({ x: 40, y: 200, transition: { duration: 1 } });
                setActiveTool('fiber');
                // Click Effect
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });

                // Move back to Rack
                await cursorControls.start({ x: 300, y: 200, transition: { duration: 0.8 } });
                // Click (Start Draw)
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });

                // Draw to edge (Meet Me Room)
                cableControls.start({ opacity: 1, pathLength: 1, transition: { duration: 1 } });
                await cursorControls.start({ x: 550, y: 50, transition: { duration: 1, ease: "linear" } });
                setActiveTool(null);

                // STEP 5: COMPLETION
                await badgeControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } });

                // WAIT BEFORE RESTART
                await new Promise(r => setTimeout(r, 2000));
            }
        };

        runSequence();
    }, [cursorControls, rackControls, menuControls, cableControls, badgeControls]);

    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* DEMO CONTAINER */}
                <div className="relative w-full max-w-4xl mx-auto h-[500px] bg-zinc-900 rounded-xl border border-white/10 overflow-hidden shadow-2xl flex">

                    {/* LEFT SIDEBAR (Palette) */}
                    <div className="w-24 bg-black/50 border-r border-white/10 flex flex-col items-center py-6 gap-6 z-10">
                        <div className={`p-3 rounded-lg border transition-all ${activeTool === 'rack' ? 'bg-blue-500/20 border-blue-500' : 'bg-transparent border-white/10'}`}>
                            <Box className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className={`p-3 rounded-lg border transition-all ${activeTool === 'fiber' ? 'bg-yellow-500/20 border-yellow-500' : 'bg-transparent border-white/10'}`}>
                            <Cable className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="p-3 rounded-lg border border-white/10 opacity-50">
                            <Zap className="w-6 h-6 text-gray-400" />
                        </div>
                    </div>

                    {/* MAIN STAGE (Data Hall) */}
                    <div className="flex-1 relative bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] p-8">
                        {/* Floor Markings (Aisles) */}
                        <div className="absolute top-1/2 left-8 right-8 h-20 border-y border-white/5 bg-white/[0.02] -translate-y-1/2" />

                        {/* CABLE (Drawn dynamically) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                            <motion.path
                                d="M 320 220 C 320 150, 500 150, 550 50"
                                fill="none"
                                stroke="#EAB308"
                                strokeWidth="3"
                                strokeDasharray="10 5"
                                animate={cableControls}
                            />
                        </svg>

                        {/* RACK */}
                        <motion.div
                            animate={rackControls}
                            initial={{ opacity: 0 }}
                            className={`absolute top-[180px] left-[280px] w-20 h-32 rounded-lg border-2 transition-all duration-300 flex items-center justify-center shadow-lg z-10
                                ${rackState === 'powered'
                                    ? 'bg-blue-500/10 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                                    : 'bg-zinc-800 border-white/20'
                                }`}
                        >
                            <Server className={`w-8 h-8 transition-colors ${rackState === 'powered' ? 'text-blue-400' : 'text-gray-600'}`} />

                            {/* Status LED */}
                            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${rackState === 'powered' ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-red-500/50'}`} />
                        </motion.div>

                        {/* CONTEXT MENU */}
                        <motion.div
                            animate={menuControls}
                            initial={{ opacity: 0, scale: 0.9 }}
                            className="absolute top-[180px] left-[370px] bg-black/90 border border-white/20 backdrop-blur-md rounded-lg p-3 w-48 shadow-2xl z-20 origin-top-left"
                        >
                            <div className="text-[10px] text-gray-500 uppercase font-mono mb-2 border-b border-white/10 pb-1">Config Rack #01</div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 p-2 rounded bg-blue-500/20 text-blue-400 text-xs font-mono cursor-pointer border border-blue-500/30">
                                    <Zap className="w-3 h-3" /> Power: 50kW
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded hover:bg-white/5 text-gray-400 text-xs font-mono">
                                    <Zap className="w-3 h-3" /> Power: 8kW
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded hover:bg-white/5 text-gray-400 text-xs font-mono">
                                    <Cable className="w-3 h-3" /> Feed: A+B Red
                                </div>
                            </div>
                        </motion.div>

                        {/* COMPLETION BADGE */}
                        <div className="absolute top-8 right-8">
                            <motion.div
                                animate={badgeControls}
                                className="bg-green-900/80 border border-green-500/50 text-green-400 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-md"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Ready for Deployment</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* VIRTUAL CURSOR */}
                    <motion.div
                        animate={cursorControls}
                        className="absolute top-0 left-0 z-50 pointer-events-none"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                        {activeTool && (
                            <div className="absolute top-6 left-6 bg-white text-black text-[10px] font-bold px-1 rounded shadow-sm whitespace-nowrap">
                                {activeTool === 'rack' ? 'Add Rack' : 'Add Fiber'}
                            </div>
                        )}
                    </motion.div>

                    {/* STATS BAR (Bottom Overlay) */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 backdrop-blur-md rounded-full px-6 py-2 flex items-center gap-6 z-30">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 uppercase">Total Load</span>
                            <span className="font-mono font-bold text-white transition-all w-16 text-right">
                                {stats.power} kW
                            </span>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 uppercase">Heat Dissipation</span>
                            <span className="font-mono font-bold text-white transition-all w-24 text-right">
                                {stats.btu.toLocaleString()} BTU
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
