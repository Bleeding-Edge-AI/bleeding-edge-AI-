'use client';

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { GripVertical, Plus } from 'lucide-react';

interface ModuleBlock {
    id: string;
    type: 'Compute' | 'Inference' | 'Telco';
    cost: number; // relative units
}

export const CapExSimulator: React.FC = () => {

    // Simple state to simulate "dropping" modules into years
    // In a real app with dnd-kit this would be more complex
    const [year1, setYear1] = useState<ModuleBlock[]>([]);
    const [year2, setYear2] = useState<ModuleBlock[]>([]);
    const [year3, setYear3] = useState<ModuleBlock[]>([]);


    const addModule = (year: number) => {
        const newModule: ModuleBlock = { id: Math.random().toString(), type: 'Inference', cost: 25 };
        if (year === 1) setYear1([...year1, newModule]);
        if (year === 2) setYear2([...year2, newModule]);
        if (year === 3) setYear3([...year3, newModule]);
    };

    const totalModularCost = (year1.length + year2.length + year3.length) * 25;
    const traditionalCost = 200; // Fixed high cost

    return (
        <section className="py-24 px-6 bg-neutral-950">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-white mb-4">Optimize Your Cash Flow</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Simulate your deployment. Click "+" to add modules to the timeline and see how modular construction frees up capital.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Visualizer / Chart */}
                    <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5 h-[500px] flex flex-col justify-end relative">
                        <h3 className="absolute top-8 left-8 text-lg font-bold text-white">CapEx Comparison</h3>

                        <div className="flex items-end justify-center space-x-12 h-64 w-full px-8">
                            {/* Traditional Bar */}
                            <div className="w-24 bg-neutral-800 rounded-t-lg relative group h-full">
                                <div className="absolute -top-8 w-full text-center text-white font-mono">$200M</div>
                                <div className="absolute bottom-0 w-full bg-neutral-700/50 h-full rounded-t-lg animate-pulse" style={{ height: '100%' }}></div>
                                <div className="absolute bottom-4 w-full text-center text-xs text-neutral-400">Traditional</div>
                            </div>

                            {/* Modular Bar (Dynamic) */}
                            <div className="w-24 relative group h-full flex items-end">
                                <motion.div
                                    className="w-full bg-red-600 rounded-t-lg relative"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(totalModularCost / traditionalCost) * 100}%` }}
                                    transition={{ type: 'spring', damping: 20 }}
                                >
                                    <div className="absolute -top-8 w-full text-center text-red-500 font-mono font-bold">${totalModularCost}M</div>
                                </motion.div>
                                <div className="absolute -bottom-6 w-full text-center text-xs text-neutral-400">Modular</div>
                            </div>
                        </div>

                        <div className="mt-12 p-4 bg-red-900/10 border border-red-500/20 rounded-lg text-center">
                            <span className="text-red-500 font-bold text-lg">
                                ${Math.max(0, traditionalCost - totalModularCost)}M
                            </span>
                            <span className="text-neutral-400 ml-2">Capital Preserved</span>
                        </div>
                    </div>

                    {/* Controls / Timeline */}
                    <div className="space-y-6">
                        {[1, 2, 3].map((year) => (
                            <div key={year} className="p-6 bg-neutral-900 border border-white/5 rounded-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-white font-mono">YEAR 0{year}</h4>
                                    <button
                                        onClick={() => addModule(year)}
                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="min-h-[60px] flex flex-wrap gap-2 p-2 bg-neutral-950/50 rounded-lg border-2 border-dashed border-neutral-800">
                                    {(year === 1 ? year1 : year === 2 ? year2 : year3).map((mod, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="h-12 px-4 bg-neutral-800 rounded border border-white/10 flex items-center text-xs text-white"
                                        >
                                            <GripVertical className="w-3 h-3 text-neutral-500 mr-2" />
                                            Inference Mod
                                        </motion.div>
                                    ))}
                                    {(year === 1 ? year1 : year === 2 ? year2 : year3).length === 0 && (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs py-2">
                                            Add Modules
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
