'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface ProductSpec {
    label: string;
    value: string;
}

interface Product {
    id: string;
    name: string;
    tagline: string;
    specs: ProductSpec[];
    features: string[];
    description: string;
    image?: string;
}

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-5xl h-[90vh] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col relative shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-20 group"
                    >
                        <X className="w-6 h-6 text-neutral-400 group-hover:text-white" />
                    </button>

                    <div className="flex flex-col lg:flex-row h-full">
                        {/* Visual Side */}
                        <div className="w-full lg:w-2/5 bg-neutral-950/50 relative border-b lg:border-b-0 lg:border-r border-white/10 p-8 flex flex-col justify-between">
                            <div>
                                <div className="inline-block px-3 py-1 bg-red-900/20 border border-red-500/20 text-red-500 font-mono text-xs rounded mb-6">
                                    HARDWARE SPEC
                                </div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{product.name}</h2>
                                <p className="text-xl text-neutral-400 font-light mb-8">{product.tagline}</p>

                                <div className="w-full aspect-square bg-neutral-900 rounded-lg border border-white/5 relative overflow-hidden group">
                                    {product.image ? (
                                        <div className="relative w-full h-full">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                            {/* Blueprint overlay for "sci-fi" feel */}
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint-grid.png')] opacity-30 mix-blend-overlay pointer-events-none" />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                                            <div className="text-neutral-600 font-mono">PRODUCT RENDER</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8">
                                <button className="w-full py-4 bg-white text-neutral-950 font-bold rounded hover:bg-neutral-200 transition-colors">
                                    Download Technical Datasheet
                                </button>
                            </div>
                        </div>

                        {/* Data Side */}
                        <div className="w-full lg:w-3/5 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
                            <div className="mb-12">
                                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">System Architecture</h3>
                                <p className="text-neutral-300 leading-relaxed text-lg">
                                    {product.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div>
                                    <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">Technical Specs</h3>
                                    <dl className="space-y-4">
                                        {product.specs.map((spec, idx) => (
                                            <div key={idx} className="flex justify-between border-b border-white/5 pb-2">
                                                <dt className="text-neutral-400">{spec.label}</dt>
                                                <dd className="text-white font-mono">{spec.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                                <div>
                                    <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">Features</h3>
                                    <ul className="space-y-3">
                                        {product.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <Check className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                                                <span className="text-neutral-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
