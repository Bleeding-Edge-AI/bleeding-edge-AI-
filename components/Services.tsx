'use client';

import React from 'react';
import { Icons } from './Icons';
import { Service } from '../types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const services: (Service & { link?: string })[] = [
  {
    id: 'build',
    title: 'Hyperscale Build',
    description: 'Custom turnkey data center solutions designed for high-density AI workloads.',
    icon: 'Server',
    features: ['Liquid Cooling Ready', '50MW+ Sites', 'Sustainable Power'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    link: '/build'
  },
  {
    id: 'colocation',
    title: 'Premium Colocation',
    description: 'Secure, connected, and reliable rack space for your mission-critical hardware.',
    icon: 'Database',
    features: ['Tier IV Reliability', 'Carrier Neutral', '24/7 Remote Hands'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    link: '/colocation'
  },
  {
    id: 'cloud',
    title: 'AI Cloud',
    description: 'Instant access to bare metal H100s and massive storage for training models.',
    icon: 'Cpu',
    features: ['NVIDIA H100/H200', 'Infiniband Fabric', 'Instant Provisioning'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    link: '/ai-cloud'
  },
  {
    id: 'applied-ai',
    title: 'Applied AI Services',
    description: 'We help enterprises integrate Generative AI into their workflows securely.',
    icon: 'Brain',
    features: ['Custom RAG', 'Agentic Workflows', 'Model Fine-tuning'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
    link: '/applied-ai'
  }
];

import { useChat } from '@/app/context/ChatContext';

export const Services: React.FC = () => {
  const router = useRouter();
  const { openChatWithIntent } = useChat();

  const handleLearnMore = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    openChatWithIntent(`I'd like to learn more about ${title}.`);
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            End-to-End <span className="text-brand-500">Intelligence</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl">
            From the concrete foundation to the neural weights, we provide the complete stack for the next generation of computing.
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons];
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative group">
                  <div className={`absolute inset-0 bg-brand-600/20 rounded-2xl transform transition-transform duration-500 ${isEven ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'} group-hover:translate-x-0 group-hover:translate-y-0`}></div>
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-hard-light"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
                    <div className="absolute inset-0 bg-brand-900/20 mix-blend-overlay"></div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-900/30 rounded-lg border border-brand-500/20">
                      {/* @ts-ignore */}
                      <IconComponent className="w-8 h-8 text-brand-500" />
                    </div>
                    <span className="text-sm font-mono text-brand-500 uppercase tracking-widest">
                      0{index + 1} / {service.id.replace('-', ' ')}
                    </span>
                  </div>

                  <h3 className="text-3xl font-display font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-slate-300">
                        <Icons.ShieldCheck className="w-5 h-5 text-brand-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {service.link ? (
                    <Link href={service.link} className="text-brand-500 font-semibold hover:text-brand-400 inline-flex items-center transition-colors">
                      Learn more <Icons.ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      onClick={(e) => handleLearnMore(e, service.title)}
                      className="text-brand-500 font-semibold hover:text-brand-400 inline-flex items-center transition-colors cursor-pointer"
                    >
                      Learn more <Icons.ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};