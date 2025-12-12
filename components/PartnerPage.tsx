'use client';

import React from 'react';
import { Icons } from './Icons';
import { useRouter } from 'next/navigation';

import { useChat } from '@/app/context/ChatContext';

export const PartnerPage: React.FC = () => {
  const router = useRouter();
  const { openChatWithIntent } = useChat();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openChatWithIntent("I'm interested in applying for the Bleeding Edge Partner Program.");
  };

  const benefits = [
    {
      title: 'Recurring Revenue',
      desc: 'Earn aggressive commissions on the lifetime value of every contract you refer. Build a long-term passive income stream.',
      icon: 'Database'
    },
    {
      title: 'White Label Ready',
      desc: 'Resell our GPU cloud and colocation services under your own brand. We handle the infrastructure, you own the client.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Technical Access',
      desc: 'Direct line to our solution architects for complex deal scoping. Priority allocation for high-demand H100 clusters.',
      icon: 'Server'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/10 to-slate-950"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 mb-6">
            <Icons.Network className="w-4 h-4 text-brand-500" />
            <span className="text-xs font-mono text-brand-300 uppercase tracking-widest">Partner Ecosystem</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
            Grow with <br />
            <span className="text-brand-500">Bleeding Edge.</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Empower your clients with world-class AI infrastructure.
            Designed for MSPs, System Integrators, and AI Consultancies.
          </p>

          <button
            onClick={handleContactClick}
            className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(158,28,32,0.3)]"
          >
            Apply to Partner
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((ben, idx) => {
              const Icon = Icons[ben.icon as keyof typeof Icons];
              return (
                <div key={idx} className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    {/* @ts-ignore */}
                    <Icon className="w-24 h-24 text-brand-500" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">{ben.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{ben.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-24 px-6 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Program Tiers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Referral */}
            <div className="p-8 border border-white/10 rounded-xl bg-slate-950">
              <h3 className="text-xl font-bold text-white mb-2">Referral</h3>
              <div className="text-brand-500 font-mono text-sm mb-6">NO COMMITMENT</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-400 text-sm"><Icons.ShieldCheck className="w-4 h-4 mr-2 text-slate-600" /> 5% Commission</li>
                <li className="flex items-center text-slate-400 text-sm"><Icons.ShieldCheck className="w-4 h-4 mr-2 text-slate-600" /> Deal Registration</li>
                <li className="flex items-center text-slate-400 text-sm"><Icons.ShieldCheck className="w-4 h-4 mr-2 text-slate-600" /> Co-branded Assets</li>
              </ul>
            </div>

            {/* Reseller */}
            <div className="p-8 border border-brand-500 rounded-xl bg-slate-950 relative shadow-[0_0_30px_rgba(158,28,32,0.1)]">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
              <h3 className="text-xl font-bold text-white mb-2">Reseller</h3>
              <div className="text-brand-500 font-mono text-sm mb-6">$10K MRR GOAL</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-300 text-sm"><Icons.ShieldCheck className="w-4 h-4 mr-2 text-brand-500" /> 15% Margin</li>
                <li className="flex items-center text-slate-300 text-sm"><Icons.ShieldCheck className="w-4 h-4 mr-2 text-brand-500" /> White Label Support</li>
                <li className="flex items-center text-slate-300 text-sm"><Icons.ShieldCheck className="w-4 h-4 mr-2 text-brand-500" /> Dedicated Account Manager</li>
              </ul>
            </div>

            {/* Elite */}
            <div className="p-8 border border-white/10 rounded-xl bg-slate-950">
              <h3 className="text-xl font-bold text-white mb-2">Elite</h3>
              <div className="text-brand-500 font-mono text-sm mb-6">$100K MRR GOAL</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-400 text-sm"><Icons.ShieldCheck className="w-4 h-4 mr-2 text-slate-600" /> 25% Margin</li>
                <li className="flex items-center text-slate-400 text-sm"><Icons.ShieldCheck className="w-4 h-4 mr-2 text-slate-600" /> Early Access Hardware</li>
                <li className="flex items-center text-slate-400 text-sm"><Icons.ShieldCheck className="w-4 h-4 mr-2 text-slate-600" /> Executive Sponsorship</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Ready to Partner?</h2>
          <button
            onClick={handleContactClick}
            className="px-8 py-4 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-all"
          >
            Submit Application
          </button>
        </div>
      </section>
    </div>
  );
};