'use client';

import React from 'react';
import Marquee from '@/components/magicui/marquee';
import { CheckCircle2, Zap, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const WholesaleCatalogMarquee = ({ className }: { className?: string }) => {
    return (
        <div className={cn("w-full", className)}>
            {/* Unified Infinite Marquee for All Devices */}
            <div className="will-change-transform">
                <Marquee pauseOnHover className="[--duration:60s]">
                    {siteCatalog.map((site, index) => (
                        <SiteCard key={index} data={site} />
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

// Site Card Component (Horizontal Layout)
const SiteCard = ({ data }: { data: SiteData }) => {
    return (
        <div className="group relative w-[400px] h-[140px] mx-4 rounded-xl bg-neutral-900/60 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-300 hover:border-amber-500/50 hover:bg-neutral-900/80 hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.2)] flex">

            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Left: Main Stats & Readiness */}
            <div className="flex-1 p-4 flex flex-col justify-between relative z-10">
                {/* Big Power Stat */}
                <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-white tracking-tighter group-hover:text-amber-400 transition-colors">{data.power}</span>
                        <span className="text-sm text-neutral-400 font-light">MW</span>
                    </div>
                </div>

                {/* Checklist (Compact 2 column or just key items) */}
                <div className="space-y-1">
                    {data.readiness.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500/80" />
                            <span className="text-[10px] text-neutral-300">{item}</span>
                        </div>
                    ))}
                    {/* Location Footer line */}
                    <div className="flex items-center gap-1 text-neutral-500 text-[10px] pt-1 mt-1 border-t border-white/5">
                        <MapPin className="w-3 h-3" />
                        {data.location}
                    </div>
                </div>
            </div>

            {/* Right: Info Header (ID & Status) */}
            <div className="w-[140px] bg-white/[0.02] border-l border-white/5 p-4 flex flex-col justify-between items-end text-right">

                <div>
                    <div className="text-[9px] text-neutral-500 font-mono mb-0.5">SITE ID</div>
                    <div className="text-xs font-bold text-white font-mono tracking-wide">{data.id}</div>
                </div>

                <div className={cn(
                    "px-2 py-0.5 rounded text-[9px] font-bold border font-mono uppercase",
                    data.status === 'Permitted' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        data.status === 'Shovel Ready' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                            "bg-blue-500/10 text-blue-500 border-blue-500/20"
                )}>
                    {data.status}
                </div>
            </div>
        </div>
    );
};

// Data Types & Sample Data
type SiteData = {
    id: string;
    location: string;
    power: number;
    status: string;
    readiness: string[];
};

const siteCatalog: SiteData[] = [
    {
        id: "QRO-N-04",
        location: "Querétaro North",
        power: 40,
        status: "Permitted",
        readiness: ["Land Owned", "Utility Feasibility Signed"]
    },
    {
        id: "MTY-IND-09",
        location: "Monterrey Ind. Park",
        power: 60,
        status: "Shovel Ready",
        readiness: ["Substation Active", "Permits Complete"]
    },
    {
        id: "GDL-W-02",
        location: "Guadalajara West",
        power: 25,
        status: "Land Banking",
        readiness: ["Land Secured", "Feasibility Study Done"]
    },
    {
        id: "MEX-E-12",
        location: "Mexico City Edge",
        power: 10,
        status: "Shell Complete",
        readiness: ["Core & Shell Done", "Power Connected"]
    },
    {
        id: "ELP-S-01",
        location: "El Paso South",
        power: 100,
        status: "Master Planned",
        readiness: ["100Ha Campus", "Dual Feed High Voltage"]
    },
    {
        id: "TOL-C-05",
        location: "Toluca Corridor",
        power: 80,
        status: "Permitted",
        readiness: ["EIA Approved", "Land Title Clear"]
    }
];

export default WholesaleCatalogMarquee;
