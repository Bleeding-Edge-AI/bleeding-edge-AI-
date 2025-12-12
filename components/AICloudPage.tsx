'use client';

import React from 'react';
import { Icons } from './Icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useChat } from '@/app/context/ChatContext';

export const AICloudPage: React.FC = () => {
  const router = useRouter();
  const { openChatWithIntent } = useChat();

  const instances = [
    {
      name: 'H100 SXM5 Superpod',
      chip: 'NVIDIA H100 80GB',
      vram: '80GB HBM3',
      interconnect: '3.2Tbps Infiniband',
      price: '$2.85',
      unit: '/ GPU / hr',
      reserved: true,
      features: ['Best for LLM Training', 'FP8 Transformer Engine', 'NVLink Switch System']
    },
    {
      name: 'A100 80GB Cluster',
      chip: 'NVIDIA A100 80GB',
      vram: '80GB HBM2e',
      interconnect: '1.6Tbps Infiniband',
      price: '$1.75',
      unit: '/ GPU / hr',
      reserved: false,
      features: ['Efficient Fine-tuning', 'Multi-Instance GPU', 'Deep Learning Standard']
    },
    {
      name: 'L40S Inference',
      chip: 'NVIDIA L40S',
      vram: '48GB GDDR6',
      interconnect: 'PCIe Gen4',
      price: '$0.85',
      unit: '/ GPU / hr',
      reserved: false,
      features: ['High Throughput Inference', 'Generative AI Art/Video', 'Ray Tracing']
    }
  ];

  const specs = [
    { label: 'Network Fabric', value: 'NVIDIA Quantum-2 Infiniband', icon: 'Network' },
    { label: 'Storage', value: 'WEKA / VAST Data Tier', icon: 'Database' },
    { label: 'Orchestration', value: 'Kubernetes / Slurm', icon: 'Cpu' },
    { label: 'Security', value: 'SOC 2 Type II Encrypted', icon: 'ShieldCheck' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-900/30 border border-brand-500/30 mb-6">
                <Icons.Zap className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-mono text-brand-300 uppercase tracking-widest">Instant Availability</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
                Bare Metal <br />
                <span className="text-brand-500">Intelligence.</span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Zero virtualization overhead. Massive Infiniband scale.
                Deploy H100 clusters in minutes, not months. Pre-configured with PyTorch, JAX, and DeepSpeed.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => openChatWithIntent("I'd like to start training on H100 clusters.")}
                  className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(158,28,32,0.3)] hover:shadow-[0_0_30px_rgba(158,28,32,0.5)]"
                >
                  Start Training
                </button>
                <button
                  onClick={() => openChatWithIntent("I'd like to talk to sales about high-volume compute.")}
                  className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-lg transition-all"
                >
                  Contact Sales
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-sm p-2">
                <img
                  src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=2070&auto=format&fit=crop"
                  alt="H100 Cluster"
                  className="rounded-xl w-full"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md rounded-lg border border-brand-500/30">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-brand-500 font-bold animate-pulse">● STATUS: OPERATIONAL</span>
                    <span className="text-slate-400">REGION: US-WEST-2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Bar */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {specs.map((spec, idx) => {
              const Icon = Icons[spec.icon as keyof typeof Icons];
              return (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-900/20 rounded-lg">
                    {/* @ts-ignore */}
                    <Icon className="w-6 h-6 text-brand-500" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 uppercase font-mono">{spec.label}</div>
                    <div className="text-white font-semibold">{spec.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Transparent Pricing</h2>
            <p className="text-slate-400">No hidden ingress/egress fees. Just raw compute.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instances.map((instance, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl relative group hover:border-brand-500/50 transition-colors duration-300">
                {instance.reserved && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Best Value
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{instance.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{instance.chip}</p>

                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-display font-bold text-white">{instance.price}</span>
                  <span className="text-slate-500 ml-2">{instance.unit}</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-slate-400">VRAM</span>
                    <span className="text-white font-mono">{instance.vram}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-slate-400">Interconnect</span>
                    <span className="text-white font-mono">{instance.interconnect}</span>
                  </div>
                  <div className="pt-2">
                    {instance.features.map((feat, i) => (
                      <div key={i} className="flex items-center text-sm text-slate-300 mb-2">
                        <Icons.ShieldCheck className="w-4 h-4 text-brand-500 mr-2" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openChatWithIntent(`I want to deploy a node: ${instance.name}`)}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${instance.reserved ? 'bg-brand-600 hover:bg-brand-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                >
                  Deploy Node
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-brand-900/10">
        <div className="max-w-4xl mx-auto glass-panel p-12 rounded-3xl border border-brand-500/20">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Need Custom Orchestration?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Our Applied AI team can help you build custom Slurm clusters, set up Kubernetes (EKS/GKE hybrid), and optimize your training checkpoints.
          </p>
          <button
            onClick={() => openChatWithIntent("I'd like to talk to an engineer about custom orchestration.")}
            className="inline-block px-8 py-4 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-all cursor-pointer"
          >
            Talk to an Engineer
          </button>
        </div>
      </section>
    </div>
  );
};