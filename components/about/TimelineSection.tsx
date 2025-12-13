'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MILESTONES = [
    { year: "2000", title: "Mexico's First IXP", desc: "Founded the first Internet Exchange Point, laying the groundwork for connectivity." },
    { year: "2002-2020", title: "30+ Data Centers", desc: "Built and operated critical infrastructure under KIO Networks across LatAm." },
    { year: "2023", title: "Bleeding Edge R&D", desc: "Established stealth engineering lab for High-Density AI cooling and power." },
    { year: "2025", title: "QRO1 Campus Live", desc: "Launched 100MW AI Campus. DCD Edge Project of the Year Winner." },
];

export const TimelineSection: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-950">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Section Header (Fixed or moving slowly) */}
                <div className="absolute top-12 left-6 md:left-24 z-10 p-6 bg-neutral-950/80 backdrop-blur-md rounded-xl border border-neutral-800">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">25 YEARS OF <br /><span className="text-amber-500">BUILDING THE BACKBONE</span>.</h2>
                    <p className="text-neutral-400">Scroll to explore our legacy.</p>
                </div>

                <motion.div style={{ x }} className="flex gap-24 px-24 pl-[40vw]">
                    {MILESTONES.map((item, i) => (
                        <div key={i} className="relative w-[400px] md:w-[600px] flex-shrink-0 group">
                            {/* Year Marker */}
                            <div className="text-8xl md:text-9xl font-bold text-neutral-800 mb-8 border-b-2 border-neutral-800 pb-4 group-hover:text-neutral-700 transition-colors">
                                {item.year}
                            </div>

                            {/* Card Content */}
                            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative group-hover:border-amber-500/50 transition-all">
                                <div className="absolute -top-3 -left-3 w-6 h-6 bg-amber-500 rounded-full border-4 border-neutral-950" />
                                <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-xl text-neutral-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* "Now" Marker */}
                    <div className="w-[300px] flex-shrink-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-2xl text-amber-500 font-bold mb-4 animate-pulse">THE FUTURE IS NOW</div>
                            <div className="h-px w-24 bg-amber-500 mx-auto" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
