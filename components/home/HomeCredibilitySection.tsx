'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export const HomeCredibilitySection: React.FC = () => {
    return (
        <section className="py-24 bg-neutral-950 border-t border-neutral-900 text-white px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Text Side */}
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2">25 YEARS. 30 DATA CENTERS. ONE TEAM.</h2>
                    <p className="text-neutral-500">Founded by the team that built Mexico's first IXP and KIO Networks.</p>
                </div>

                {/* Awards Strip */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <AwardItem title="DCD AWARD" sub="Edge Project" />
                    <AwardItem title="DEVA" sub="Leadership" />
                    <AwardItem title="ICREA" sub="Level V" />
                </div>
            </div>
        </section>
    );
};

function AwardItem({ title, sub }: { title: string, sub: string }) {
    return (
        <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-500" />
            <div>
                <div className="font-bold text-white leading-none">{title}</div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">{sub}</div>
            </div>
        </div>
    )
}
