'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function InterconnectVisualization() {
    const nodes = [
        { x: 50, y: 50, label: 'GPU 0' },
        { x: 200, y: 30, label: 'GPU 1' },
        { x: 350, y: 50, label: 'GPU 2' },
        { x: 500, y: 30, label: 'GPU 3' },
        { x: 650, y: 50, label: 'GPU 4' },
        { x: 125, y: 90, label: 'NVLink' },
        { x: 275, y: 90, label: 'Switch' },
        { x: 425, y: 90, label: 'NVLink' },
        { x: 575, y: 90, label: 'Switch' },
    ];

    const connections = [
        { from: 0, to: 5 }, { from: 1, to: 5 }, { from: 1, to: 6 },
        { from: 2, to: 6 }, { from: 2, to: 7 }, { from: 3, to: 7 },
        { from: 3, to: 8 }, { from: 4, to: 8 }, { from: 5, to: 6 },
        { from: 6, to: 7 }, { from: 7, to: 8 },
    ];

    return (
        <div className="relative w-full h-40 overflow-hidden rounded-xl bg-gradient-to-b from-zinc-900/50 to-black border border-white/5">
            <svg className="w-full h-full" viewBox="0 0 700 120" preserveAspectRatio="xMidYMid meet">
                <defs>
                    {/* Glowing gradients */}
                    <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="30%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="70%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>

                    <linearGradient id="cyanPulse" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="40%" stopColor="#06b6d4" />
                        <stop offset="60%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Connection lines - static base */}
                {connections.map((conn, i) => (
                    <line
                        key={`line-${i}`}
                        x1={nodes[conn.from].x}
                        y1={nodes[conn.from].y}
                        x2={nodes[conn.to].x}
                        y2={nodes[conn.to].y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="2"
                    />
                ))}

                {/* Animated data pulses along connections */}
                {connections.map((conn, i) => {
                    const fromNode = nodes[conn.from];
                    const toNode = nodes[conn.to];
                    const dx = toNode.x - fromNode.x;
                    const dy = toNode.y - fromNode.y;
                    const length = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                    return (
                        <g key={`pulse-${i}`}>
                            <motion.rect
                                x={fromNode.x}
                                y={fromNode.y - 1.5}
                                width="20"
                                height="3"
                                rx="1.5"
                                fill="url(#pulseGradient)"
                                filter="url(#glow)"
                                style={{
                                    transformOrigin: `${fromNode.x}px ${fromNode.y}px`,
                                    transform: `rotate(${angle}deg)`,
                                }}
                                animate={{
                                    x: [fromNode.x - 10, toNode.x - 10],
                                    opacity: [0, 1, 1, 0],
                                }}
                                transition={{
                                    duration: 1.5 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: 'linear',
                                }}
                            />
                            {/* Reverse direction pulse */}
                            <motion.rect
                                x={toNode.x}
                                y={toNode.y - 1.5}
                                width="15"
                                height="3"
                                rx="1.5"
                                fill="url(#cyanPulse)"
                                filter="url(#glow)"
                                style={{
                                    transformOrigin: `${toNode.x}px ${toNode.y}px`,
                                    transform: `rotate(${angle + 180}deg)`,
                                }}
                                animate={{
                                    x: [toNode.x - 7.5, fromNode.x - 7.5],
                                    opacity: [0, 0.8, 0.8, 0],
                                }}
                                transition={{
                                    duration: 1.8 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.2 + 0.5,
                                    ease: 'linear',
                                }}
                            />
                        </g>
                    );
                })}

                {/* GPU Nodes */}
                {nodes.slice(0, 5).map((node, i) => (
                    <g key={`gpu-${i}`}>
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="12"
                            fill="#18181b"
                            stroke="#ef4444"
                            strokeWidth="2"
                            filter="url(#nodeGlow)"
                            animate={{
                                strokeOpacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: 'easeInOut',
                            }}
                        />
                        <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            className="fill-white text-[8px] font-mono font-bold"
                        >
                            H100
                        </text>
                    </g>
                ))}

                {/* Switch/NVLink Nodes */}
                {nodes.slice(5).map((node, i) => (
                    <g key={`switch-${i}`}>
                        <motion.rect
                            x={node.x - 18}
                            y={node.y - 8}
                            width="36"
                            height="16"
                            rx="3"
                            fill="#18181b"
                            stroke="#3b82f6"
                            strokeWidth="1.5"
                            animate={{
                                strokeOpacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: 'easeInOut',
                            }}
                        />
                        <text
                            x={node.x}
                            y={node.y + 3}
                            textAnchor="middle"
                            className="fill-gray-400 text-[6px] font-mono"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}

                {/* Throughput indicator */}
                <motion.text
                    x="350"
                    y="115"
                    textAnchor="middle"
                    className="fill-gray-500 text-[10px] font-mono"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    ▲ 3.2 Tbps Active
                </motion.text>
            </svg>

            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-red-500/30" />
            <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-red-500/30" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-red-500/30" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-red-500/30" />
        </div>
    );
}
