'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Activity, ArrowRight, Signal } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const NODES = [
    { id: 'ash', x: 25, y: 35, city: 'Ashburn', type: 'hub', latency: '0ms' },
    { id: 'sjc', x: 15, y: 38, city: 'Santa Clara', type: 'hub', latency: '68ms' },
    { id: 'lhr', x: 48, y: 28, city: 'London', type: 'hub', latency: '75ms' },
    { id: 'nrt', x: 85, y: 35, city: 'Tokyo', type: 'hub', latency: '140ms' },
    { id: 'sin', x: 78, y: 55, city: 'Singapore', type: 'edge', latency: '180ms' },
    { id: 'fra', x: 52, y: 30, city: 'Frankfurt', type: 'edge', latency: '82ms' },
    { id: 'syd', x: 92, y: 75, city: 'Sydney', type: 'edge', latency: '190ms' },
    { id: 'gru', x: 32, y: 70, city: 'São Paulo', type: 'edge', latency: '110ms' },
];

const CONNECTIONS = [
    { from: 'ash', to: 'lhr' },
    { from: 'ash', to: 'sjc' },
    { from: 'ash', to: 'gru' },
    { from: 'lhr', to: 'fra' },
    { from: 'sjc', to: 'nrt' },
    { from: 'nrt', to: 'sin' },
    { from: 'sin', to: 'syd' },
    { from: 'lhr', to: 'nrt' }, // Long haul
];

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export function StrategicMap() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    return (
        <section className="py-24 px-6 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono mb-4">
                            <Globe className="w-3 h-3" />
                            <span>GLOBAL FABRIC</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Strategic Connectivity</h2>
                        <p className="text-gray-400 max-w-xl text-lg">
                            Our private backbone bypasses the public internet. Connect to your compute from anywhere with consistent, ultra-low latency.
                        </p>
                    </div>
                </div>

                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">

                    {/* Map Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />

                    {/* World Map Outline (Simplified SVG or similar would go here, using abstract dots for now) */}
                    <div className="absolute inset-0 opacity-20 bg-[url('/images/world-map-dots.png')] bg-contain bg-no-repeat bg-center" style={{ backgroundSize: '80%' }}>
                        {/* Fallback geometric map if image missing */}
                    </div>


                    {/* INTERACTIVE LAYER */}
                    <div className="absolute inset-0 top-[10%] left-[5%] w-[90%] h-[80%]">
                        {/* Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {CONNECTIONS.map((conn, i) => {
                                const start = NODES.find(n => n.id === conn.from);
                                const end = NODES.find(n => n.id === conn.to);
                                if (!start || !end) return null;

                                return (
                                    <motion.line
                                        key={i}
                                        x1={`${start.x}%`}
                                        y1={`${start.y}%`}
                                        x2={`${end.x}%`}
                                        y2={`${end.y}%`}
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: i * 0.1 }}
                                    />
                                );
                            })}
                        </svg>

                        {/* Nodes */}
                        {NODES.map((node) => (
                            <div
                                key={node.id}
                                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                onMouseEnter={() => setActiveNode(node.id)}
                                onMouseLeave={() => setActiveNode(null)}
                            >
                                {/* Ripple */}
                                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${node.type === 'hub' ? 'bg-red-500' : 'bg-blue-500'}`} />

                                {/* Core Dot */}
                                <div className={`relative w-3 h-3 rounded-full border border-black shadow-lg transition-transform duration-300 group-hover:scale-150 ${node.type === 'hub' ? 'bg-red-500' : 'bg-white'}`} />

                                {/* Tooltip */}
                                <div className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none transition-all duration-300 ${activeNode === node.id || node.type === 'hub' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                    }`}>
                                    <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg flex flex-col items-center gap-1 shadow-xl z-20">
                                        <div className="text-white text-xs font-bold flex items-center gap-1">
                                            {node.city}
                                            {node.type === 'hub' && <Activity className="w-3 h-3 text-red-500" />}
                                        </div>
                                        {activeNode === node.id && (
                                            <div className="text-[10px] text-gray-400 font-mono">
                                                Latency: <span className="text-green-400">{node.latency}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Legend / Overlay UI */}
                    <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
                        <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span>Core Hub (Tier IV)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white" />
                                <span>Edge PoP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
