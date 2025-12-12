import type { Metadata } from 'next';
import { BuildHero } from '@/components/BuildHero';
import { ScaleAnimation } from '@/components/ScaleAnimation';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ProprietaryShowcase } from '@/components/ProprietaryShowcase';
import { CapExSimulator } from '@/components/CapExSimulator';
import { TechnicalDeepDive } from '@/components/TechnicalDeepDive';
import { CustomBuildCTA } from '@/components/CustomBuildCTA';

export const metadata: Metadata = {
    title: 'Bleeding Edge BUILD | Data Center Modules as Product',
    description: 'Own the asset without the construction risk. AI-ready modules delivered in 120 days. Capitalized as hardware, operated as a service.',
};

export default function BuildPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-red-900/50 selection:text-white">
            <BuildHero />
            <ScaleAnimation />
            <ProductCatalog />
            <ProprietaryShowcase />
            <CapExSimulator />
            <TechnicalDeepDive />
            <CustomBuildCTA />
        </div>
    );
}
