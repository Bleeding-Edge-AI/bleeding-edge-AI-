import React from 'react';
import type { Metadata } from 'next';
import { InfrastructureBento } from '@/components/InfrastructureBento';
import OperationsGrid from '@/components/OperationsGrid';
import WholesaleScaleSection from '@/components/WholesaleScaleSection';
import { DeploymentHub } from '@/components/DeploymentHub';
import { ColoHero } from '@/components/ColoHero';
import { ColoCTA } from '@/components/ColoCTA';

export const metadata: Metadata = {
    title: 'Premium Colocation | Bleeding Edge',
    description: 'Tier IV ready colocation with liquid cooling support and 100% Uptime SLA.',
};

export default function ColocationPage() {
    return (
        <div className="bg-black min-h-screen text-white selection:bg-red-500 selection:text-white">
            {/* BACKGROUND - Grid & Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-900/20 blur-[120px] rounded-full opacity-50" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <ColoHero />

            {/* PLATFORM EXPERIENCE / OPERATIONS GRID */}
            <OperationsGrid />

            {/* INFRASTRUCTURE SPECS BENTO (Technical Specs) */}
            <InfrastructureBento />

            {/* DEPLOYMENT HUB (Replaces Instant Capacity) */}
            <DeploymentHub />

            {/* WHOLESALE / HYPERSCALE SECTION (Moved above Instant Capacity) */}
            <WholesaleScaleSection />

            <ColoCTA />
        </div>
    );
}
