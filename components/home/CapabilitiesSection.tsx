'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Zap, Truck } from 'lucide-react';

export const CapabilitiesSection: React.FC = () => {
    return (
        <section className="py-32 bg-neutral-900 text-white px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">POWERED BY <span className="text-neutral-500">PHYSICS</span>. DRIVEN BY <span className="text-amber-500">SPEED</span>.</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        Our products are built on a foundation of industrial capabilities competitors cannot match.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <CapabilityCard
                        icon={<Hammer className="w-8 h-8 text-blue-500" />}
                        title="Manufacturing"
                        desc="In-house Concrete & Cooling. We don't wait for supply chains."
                        delay={0}
                    />
                    <CapabilityCard
                        icon={<Zap className="w-8 h-8 text-amber-500" />}
                        title="Energy"
                        desc="Secured MWs & Substation Ownership. Green power guaranteed."
                        delay={0.1}
                    />
                    <CapabilityCard
                        icon={<Truck className="w-8 h-8 text-green-500" />}
                        title="Logistics"
                        desc="Regional dominance. Land banks and permitting across LatAm & Spain."
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
};

function CapabilityCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="p-8 bg-neutral-950 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors group"
        >
            <div className="mb-6 w-16 h-16 bg-neutral-900 rounded-xl flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-neutral-400 leading-relaxed min-h-[80px]">
                {desc}
            </p>
        </motion.div>
    );
}
