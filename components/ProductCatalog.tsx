'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Server, Radio } from 'lucide-react';
import { ProductModal } from './ProductModal';

const products = [
    {
        id: 'compute',
        name: 'Standard Compute 1',
        tagline: 'Balanced Enterprise Workloads',
        icon: Server,
        image: '/images/standard-compute-1.jpg',
        description: 'The workhorse of the modern cloud. Optimised for general purpose compute, storage, and database workloads. scalable and resilient.',
        specs: [
            { label: 'Density', value: '10-35 kW / Rack' },
            { label: 'Capacity', value: '20-50 Racks' },
            { label: 'Cooling', value: 'Air / Hybrid' },
            { label: 'PUE', value: '< 1.25' }
        ],
        features: ['Universal Rack Compatibility', 'N+1 Power Redundancy', 'Hot Aisle Containment', 'Carrier Neutral']
    },
    {
        id: 'inference',
        name: 'Inference Module',
        tagline: 'Mid-scale AI Inference (H100)',
        icon: Cpu,
        highlight: true,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
        description: 'Purpose-built for High Performance Computing and AI Inference. Features liquid-ready infrastructure and reinforced flooring for heavy rack weights.',
        specs: [
            { label: 'Density', value: '35-50 kW / Rack' },
            { label: 'Capacity', value: '20-30 Racks' },
            { label: 'Cooling', value: 'Liquid Ready (DLC)' },
            { label: 'PUE', value: '< 1.15' }
        ],
        features: ['Heavy Floor Loading (400psf)', 'Process Water Loop', 'NVIDIA Reference Design', 'High-Security Perimeter']
    },
    {
        id: 'telco',
        name: 'Telco Node',
        tagline: 'Edge Computing / 5G',
        icon: Radio,
        image: 'https://images.unsplash.com/photo-1565610261704-771965bf6b14?q=80&w=2070&auto=format&fit=crop',
        description: 'Ruggedised edge deployment unit designed for low-latency applications and 5G network points of presence. Outdoor rated and compact.',
        specs: [
            { label: 'Density', value: '3-8 kW / Rack' },
            { label: 'Capacity', value: '10-20 Racks' },
            { label: 'Cooling', value: 'DX / Free Cooling' },
            { label: 'Rating', value: 'IP65 Outdoor' }
        ],
        features: ['EMP Protection', '72hr Fuel Storage', 'Satellite Uplink Ready', 'Unmanned Operation']
    }
];

export const ProductCatalog: React.FC = () => {
    // @ts-ignore
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    return (
        <section className="py-24 px-6 bg-neutral-950 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl font-display font-bold text-white mb-4">The Hardware Menu</h2>
                    <p className="text-neutral-400 max-w-2xl">Select your chassis. Configure your spec. Deploy globally.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => setSelectedProduct(product)}
                            className={`
                        relative rounded-2xl border transition-all duration-500 cursor-pointer group flex flex-col h-full overflow-hidden
                        ${product.highlight
                                    ? 'border-red-900/50 hover:border-red-500'
                                    : 'border-white/5 hover:border-white/20'
                                }
                    `}
                        >
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 z-0">
                                {product.image ? (
                                    <>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-70 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-neutral-950/50" />
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-neutral-900" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-8 flex flex-col h-full">
                                {product.highlight && (
                                    <div className="absolute -top-3 left-8 px-3 py-1 bg-red-600 text-white text-xs font-bold tracking-wider uppercase rounded-sm shadow-lg shadow-red-900/50 z-20">
                                        Hero Product
                                    </div>
                                )}

                                <div className="mb-6 flex justify-between items-start">
                                    <div className={`p-3 rounded-lg backdrop-blur-md ${product.highlight ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-neutral-200'} group-hover:scale-110 transition-transform`}>
                                        <product.icon className="w-8 h-8" />
                                    </div>
                                    <ArrowUpRight className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                                <p className="text-neutral-400 text-sm mb-8 h-12 leading-relaxed">{product.tagline}</p>

                                <ul className="space-y-4 mb-8 mt-auto">
                                    {product.specs.slice(0, 3).map((spec, i) => (
                                        <li key={i} className="flex justify-between text-sm border-b border-white/10 pb-2">
                                            <span className="text-neutral-500">{spec.label}</span>
                                            <span className="text-neutral-200 font-mono">{spec.value}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                                    View Specs
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    );
};
