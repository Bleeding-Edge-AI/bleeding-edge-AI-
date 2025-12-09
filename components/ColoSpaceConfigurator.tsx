'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Server, Box, Wind, Trash2, Zap, LayoutGrid, Info } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type ItemType = 'rack-standard' | 'rack-ai' | 'cooling' | null;

interface GridItem {
    id: string;
    type: ItemType;
    x: number;
    y: number;
}

interface ItemDefinition {
    id: ItemType;
    label: string;
    power: number; // kW
    space: number; // m² (approx)
    icon: React.ElementType;
    color: string;
    description: string;
}

const ITEMS: Record<string, ItemDefinition> = {
    'rack-standard': {
        id: 'rack-standard',
        label: 'Standard Rack',
        power: 8,
        space: 2,
        icon: Server,
        color: 'bg-blue-500',
        description: 'General purpose compute storage. 8kW.'
    },
    'rack-ai': {
        id: 'rack-ai',
        label: 'AI High Density',
        power: 50,
        space: 2,
        icon: Box, // Using Box for a beefier rack look
        color: 'bg-red-500',
        description: 'H100/H200 ready. Liquid cooling hookups. 50kW.'
    },
    'cooling': {
        id: 'cooling',
        label: 'In-Row Cooling',
        power: 2, // Consumption
        space: 1,
        icon: Wind,
        color: 'bg-cyan-500',
        description: 'Precision cooling unit for high-density zones.'
    }
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export function ColoSpaceConfigurator() {
    // Grid Dimensions
    const rows = 8;
    const cols = 12;

    const [grid, setGrid] = useState<(ItemType | null)[]>(Array(rows * cols).fill(null));
    const [selectedTool, setSelectedTool] = useState<ItemType>('rack-standard');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Stats Calculation
    const stats = grid.reduce((acc, itemType) => {
        if (!itemType || !ITEMS[itemType]) return acc;
        const def = ITEMS[itemType];
        return {
            power: acc.power + def.power,
            space: acc.space + def.space,
            count: acc.count + 1
        };
    }, { power: 0, space: 0, count: 0 });

    const handleCellClick = (index: number) => {
        setGrid(prev => {
            const newGrid = [...prev];
            // Toggle removal if clicking same type, else replace
            if (newGrid[index] === selectedTool) {
                newGrid[index] = null;
            } else {
                newGrid[index] = selectedTool;
            }
            return newGrid;
        });
    };

    const handleClear = () => {
        setGrid(Array(rows * cols).fill(null));
    };

    return (
        <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
                        <LayoutGrid className="w-3 h-3" />
                        <span>INTERACTIVE CONFIGURATOR</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Design Your Deployment</h2>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Visualize your cage layout. Mix and match standard racks, high-density computing units, and cooling infrastructure to see your power footprint.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:h-[600px]">
                    {/* PALETTE SIDEBAR */}
                    <div className="lg:w-80 flex flex-col gap-4">
                        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 flex flex-col gap-4 h-full">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Component Library</h3>

                            {Object.values(ITEMS).map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedTool(item.id)}
                                    className={`relative p-4 rounded-xl border transition-all text-left group ${selectedTool === item.id
                                        ? 'bg-white/10 border-white/40 shadow-lg'
                                        : 'bg-black/40 border-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className={`p-2 rounded-lg ${item.color} bg-opacity-20`}>
                                            <item.icon className={`w-5 h-5 ${item.color.replace('bg-', 'text-')}`} />
                                        </div>
                                        <div className="text-xs font-mono text-gray-500">{item.power}kW</div>
                                    </div>
                                    <div className="font-bold text-white mb-1">{item.label}</div>
                                    <div className="text-xs text-gray-500 leading-relaxed">{item.description}</div>

                                    {/* Active Indicator */}
                                    {selectedTool === item.id && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none"
                                        />
                                    )}
                                </button>
                            ))}

                            <div className="mt-auto pt-4 border-t border-white/5">
                                <button
                                    onClick={() => setSelectedTool(null)}
                                    className={`w-full p-3 rounded-lg border flex items-center justify-center gap-2 transition-colors ${selectedTool === null
                                        ? 'bg-red-500/20 border-red-500 text-red-500'
                                        : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                                        }`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="text-sm font-bold">Eraser / Remove</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* GRID AREA */}
                    <div className="flex-1 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden relative flex flex-col">
                        {/* Grid Header / Toolbar */}
                        <div className="p-4 border-b border-white/5 bg-black/40 flex justify-between items-center">
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 border border-white/20 bg-transparent rounded-sm"></div>
                                    <span>Empty Series 600m² Data Hall</span>
                                </div>
                            </div>
                            <button
                                onClick={handleClear}
                                className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                            >
                                Clear Map
                            </button>
                        </div>

                        {/* The Grid */}
                        <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px]">
                            <div
                                className="grid gap-2 relative"
                                style={{
                                    gridTemplateColumns: `repeat(${cols}, minmax(40px, 1fr))`,
                                    width: 'fit-content'
                                }}
                            >
                                {grid.map((cell, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCellClick(i)}
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-md border flex items-center justify-center transition-colors relative ${cell
                                            ? 'bg-zinc-800 border-white/20'
                                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <AnimatePresence>
                                            {cell && ITEMS[cell] && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    className={`w-full h-full flex items-center justify-center ${ITEMS[cell].color} bg-opacity-10 text-opacity-100`}
                                                >
                                                    {React.createElement(ITEMS[cell].icon, {
                                                        className: `w-6 h-6 ${ITEMS[cell].color.replace('bg-', 'text-')}`
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Ghost Preview */}
                                        {hoveredIndex === i && !cell && selectedTool && ITEMS[selectedTool] && (
                                            <div className="absolute inset-0 opacity-30 flex items-center justify-center">
                                                {React.createElement(ITEMS[selectedTool].icon, { className: "w-6 h-6 text-white" })}
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Live Stats Footer */}
                        <div className="p-6 bg-black/80 border-t border-white/10 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex gap-8">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Power</div>
                                    <div className="text-2xl font-bold text-white flex items-end gap-1">
                                        {stats.power} <span className="text-sm text-gray-500 font-mono mb-1">kW</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Est. Space</div>
                                    <div className="text-2xl font-bold text-white flex items-end gap-1">
                                        {stats.space * 2} <span className="text-sm text-gray-500 font-mono mb-1">m²</span>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-px bg-white/10 mx-2"></div>
                                <div className="hidden sm:block">
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Rack Count</div>
                                    <div className="text-2xl font-bold text-white font-mono">{stats.count}</div>
                                </div>
                            </div>

                            <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-nowrap">
                                Quote This Config
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
