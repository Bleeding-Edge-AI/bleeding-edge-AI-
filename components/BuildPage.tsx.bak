'use client';

import React from 'react';
import { Icons } from './Icons';
import { useRouter } from 'next/navigation';

export const BuildPage: React.FC = () => {
  const router = useRouter();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const features = [
    {
      title: 'Liquid Cooling Native',
      description: 'Designed from the ground up for high-density AI clusters. Direct-to-chip and rear-door heat exchanger ready.',
      icon: 'Zap'
    },
    {
      title: 'Hyperscale Speed',
      description: 'Modular construction techniques allow us to deliver 50MW+ facilities in 12-18 months, 40% faster than industry average.',
      icon: 'Loader2' // Using Loader as a proxy for speed/progress
    },
    {
      title: 'Sustainable Power',
      description: 'Strategic site selection with access to renewable energy grids and ultra-efficient PUE < 1.15 designs.',
      icon: 'Globe'
    }
  ];

  const specs = [
    { label: 'Power Density', value: '100kW+ / Rack' },
    { label: 'Floor Loading', value: '400+ lbs / sq ft' },
    { label: 'Ceiling Height', value: '18ft Clear' },
    { label: 'Cooling Redundancy', value: 'N+1 or 2N' },
  ];

  const process = [
    {
      phase: '01',
      title: 'Site Selection & Power',
      desc: 'We secure land with confirmed utility power feeds and fiber diversity before breaking ground.'
    },
    {
      phase: '02',
      title: 'Design & Engineering',
      desc: 'BIM-driven design process optimizing for AI hardware heat rejection and airflow dynamics.'
    },
    {
      phase: '03',
      title: 'Modular Construction',
      desc: 'Parallel fabrication of electrical and mechanical skids to accelerate deployment timelines.'
    },
    {
      phase: '04',
      title: 'Commissioning (Cx)',
      desc: 'Rigorous Level 1-5 testing to ensure systems handle 100% load steps without thermal excursion.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-900/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 mb-6">
              <Icons.HardDrive className="w-4 h-4 text-brand-500" />
              <span className="text-xs font-mono text-brand-300 uppercase tracking-widest">Turnkey Data Centers</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
              Megawatt-Scale <br />
              <span className="text-brand-500">Foundations.</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              We build the physical layer for the Intelligence Age. Custom-engineered facilities designed to handle the extreme power and cooling density of next-gen silicon.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleContactClick}
                className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg transition-all flex items-center justify-center shadow-[0_0_20px_rgba(158,28,32,0.3)]"
              >
                Start Your Build
                <Icons.ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={handleContactClick}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-lg transition-all"
              >
                Download Specs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = Icons[feat.icon as keyof typeof Icons];
              return (
                <div key={idx} className="p-8 bg-slate-900 border border-white/5 rounded-2xl hover:border-brand-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-brand-900/20 rounded-lg flex items-center justify-center mb-6 text-brand-500 group-hover:scale-110 transition-transform">
                    {/* @ts-ignore */}
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Specs & Image */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Engineered for Density</h2>
              <p className="text-slate-400 mb-8">
                Traditional data centers can't handle the heat. Our facilities are purpose-built for AI, supporting rack densities 5x higher than standard colocation.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, i) => (
                  <div key={i} className="p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                    <div className="text-xs text-slate-500 uppercase font-mono mb-1">{spec.label}</div>
                    <div className="text-lg font-bold text-white">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
                  alt="Industrial Data Center Interior"
                  className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
                {/* Blueprint Overlay Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,#09090b_1px),linear-gradient(90deg,transparent_1px,#09090b_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-brand-600 p-6 rounded-xl shadow-xl z-20 hidden md:block">
                <div className="text-4xl font-display font-bold text-white">18</div>
                <div className="text-xs text-brand-200 uppercase tracking-widest">Months to Live</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">The Build Process</h2>
            <p className="text-slate-400">Streamlined delivery from dirt to data.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-5xl font-display font-bold text-slate-800/50 mb-4">{step.phase}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
                {idx !== process.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-brand-500/50 to-transparent transform translate-x-1/2 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Have a project in mind?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Whether you are looking for a powered shell or a fully fitted turnkey solution, our engineering team is ready to scope your requirements.
          </p>
          <button
            onClick={handleContactClick}
            className="px-8 py-4 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-all shadow-lg"
          >
            Contact Construction Team
          </button>
        </div>
      </section>
    </div>
  );
};
