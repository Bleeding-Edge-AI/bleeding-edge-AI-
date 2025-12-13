'use client';

import React from 'react';
import { Icons } from './Icons';
import { useRouter } from 'next/navigation';

import { AiOfferingScroll } from './AiOfferingScroll';
import { AdoptionDashboard } from './AdoptionDashboard';
import { ProprietaryArsenal } from './ProprietaryArsenal';
import { AiInfiniteMatrix } from './AiInfiniteMatrix';
import { AiTransformationHero } from './AiTransformationHero';
import { AiEconomySection } from './AiEconomySection';

import { useChat } from '@/app/context/ChatContext';

export const AppliedAIPage: React.FC = () => {
  const router = useRouter();
  const { openChatWithIntent } = useChat();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openChatWithIntent("I'd like to schedule a consultation for Applied AI Services.");
  };

  const solutions = [
    {
      title: 'Enterprise RAG Pipelines',
      description: 'Connect your proprietary data to Large Language Models without training. Secure, citation-backed answers from your internal documentation.',
      icon: 'Database',
      details: ['Vector Database Implementation', 'Hybrid Search (Keyword + Semantic)', 'Role-Based Access Control']
    },
    {
      title: 'Autonomous Agents',
      description: 'Go beyond chatbots. Deploy agentic workflows that can plan, execute tools, and perform complex multi-step tasks autonomously.',
      icon: 'Brain',
      details: ['Tool Use & Function Calling', 'Multi-Agent Orchestration', 'Human-in-the-loop Workflows']
    },
    {
      title: 'Model Fine-Tuning',
      description: 'Adapt open-weights models (Llama 3, Mistral) to your specific domain language and style using efficient LoRA techniques.',
      icon: 'Cpu',
      details: ['Dataset Preparation', 'RLHF / DPO Alignment', 'Private Model Hosting']
    },
  ];

  const processSteps = [
    { num: '01', title: 'Discovery', desc: 'We map your high-value use cases and data readiness.' },
    { num: '02', title: 'Prototyping', desc: 'Rapid PoC development using state-of-the-art frameworks.' },
    { num: '03', title: 'Evaluation', desc: 'Rigorous testing for hallucinations, latency, and accuracy.' },
    { num: '04', title: 'Production', desc: 'Scalable deployment with monitoring and guardrails.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-0">
      {/* Hero */}
      <AiTransformationHero />

      {/* AI Economy Section */}
      <AiEconomySection />

      {/* Core Offerings Scroll */}
      <AiOfferingScroll />

      {/* Solutions Matrix */}
      <AiInfiniteMatrix />

      {/* Proprietary Technology Arsenal */}
      <ProprietaryArsenal />

      {/* Change Management Dashboard */}
      <AdoptionDashboard />


      {/* Stack CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto glass-panel p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-500/5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Ready to build?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Stop experimenting with notebooks and start shipping production-grade AI agents.
              Our team of ML engineers is ready to augment your workforce.
            </p>
            <button
              onClick={handleContactClick}
              className="px-8 py-4 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-all shadow-lg"
            >
              Get a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};