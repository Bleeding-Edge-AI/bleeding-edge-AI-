'use client';

import React from 'react';
import { CheckCircle2, Clock, PlayCircle, Calendar, Laptop, LayoutDashboard, Activity, Server, Settings } from 'lucide-react';

export const PlatformExperience = () => {
    return (
        <section className="py-24 px-6 bg-[#080808] border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* TEXT CONTENT */}
                    <div className="space-y-12 relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 text-xs font-mono font-bold text-red-500 bg-red-500/10 rounded-full border border-red-500/20 uppercase tracking-widest">
                                    Software Defined Infrastructure
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                The <span className="bg-red-600 px-2 text-black transform -skew-x-12 inline-block mx-1">PLATFORM</span> Experience
                            </h2>
                            <p className="text-xl text-gray-400 font-light leading-relaxed">
                                Your capacity, on demand. Operate everything through our unified portal.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Feature 1 */}
                            <div className="group">
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 group-hover:text-red-500 transition-colors">
                                    Unified Web Platform
                                </h3>
                                <p className="text-gray-500 pl-0 border-l-2 border-white/10 pl-4 group-hover:border-red-500 transition-colors">
                                    Manage every request, task, and deployment from one place. No more email chains or spreadsheets.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="group">
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 group-hover:text-red-500 transition-colors">
                                    3X Better SLAs
                                </h3>
                                <p className="text-gray-500 pl-0 border-l-2 border-white/10 pl-4 group-hover:border-red-500 transition-colors">
                                    Automated workflows cut response times dramatically. Real-time status updates on all fit-outs.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="group">
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 group-hover:text-red-500 transition-colors">
                                    Full Traceability
                                </h3>
                                <p className="text-gray-500 pl-0 border-l-2 border-white/10 pl-4 group-hover:border-red-500 transition-colors">
                                    End-to-end visibility across operations, from ticket creation to physical completion.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* VISUAL: DASHBOARD MOCKUP */}
                    <div className="relative">
                        {/* Laptop Frame */}
                        <div className="relative mx-auto bg-gray-900 rounded-t-xl border border-white/10 shadow-2xl overflow-hidden max-w-lg lg:max-w-xl xl:max-w-2xl transform hover:scale-[1.02] transition-transform duration-500">
                            {/* Screen Header */}
                            <div className="h-8 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                            </div>

                            {/* Screen Content */}
                            <div className="bg-[#0a0a0a] p-6 min-h-[300px] text-xs font-mono">
                                {/* App Navbar */}
                                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                                        <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">B</div>
                                        BLEEDING EDGE
                                    </div>
                                    <div className="flex gap-4 text-gray-500">
                                        <span className="text-white border-b border-red-500">Dashboard</span>
                                        <span>Cross Connects</span>
                                        <span>Smart Hands</span>
                                        <span>Monitoring</span>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-gray-700" />
                                </div>

                                {/* Dashboard Body */}
                                <div className="flex gap-6">
                                    {/* Sidebar */}
                                    <div className="w-12 flex flex-col gap-4 text-gray-600">
                                        <LayoutDashboard className="w-5 h-5 text-red-500" />
                                        <Activity className="w-5 h-5" />
                                        <Server className="w-5 h-5" />
                                        <Settings className="w-5 h-5" />
                                    </div>

                                    {/* Main */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-lg text-white font-sans font-semibold">Active Requests</h4>
                                            <button className="bg-red-900/30 text-red-400 px-3 py-1.5 rounded hover:bg-red-900/50 transition-colors">
                                                + New Request
                                            </button>
                                        </div>

                                        {/* Table */}
                                        <div className="space-y-3">
                                            {/* Row 1 */}
                                            <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5 mt-2">
                                                <div className="w-1/4">
                                                    <div className="text-white font-bold">Cross Connect</div>
                                                </div>
                                                <div className="w-1/3 text-gray-400">Connect to AWS Direct Connect PoP</div>
                                                <div className="w-1/4 flex items-center gap-2 text-green-500">
                                                    <CheckCircle2 className="w-3 h-3" /> Completed
                                                </div>
                                            </div>

                                            {/* Row 2 */}
                                            <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                                                <div className="w-1/4">
                                                    <div className="text-white font-bold">Smart Hands</div>
                                                </div>
                                                <div className="w-1/3 text-gray-400">Patch panel installation - Hall 8</div>
                                                <div className="w-1/4 flex items-center gap-2 text-yellow-500 animate-pulse">
                                                    <PlayCircle className="w-3 h-3" /> In Progress
                                                </div>
                                            </div>

                                            {/* Row 3 */}
                                            <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                                                <div className="w-1/4">
                                                    <div className="text-white font-bold">Fitout</div>
                                                </div>
                                                <div className="w-1/3 text-gray-400">Install 4 racks - Zone 2</div>
                                                <div className="w-1/4 flex items-center gap-2 text-blue-500">
                                                    <Calendar className="w-3 h-3" /> Scheduled
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Laptop Base */}
                        <div className="relative mx-auto w-[110%] h-4 bg-[#1a1a1a] rounded-b-xl shadow-2xl mt-[-1px] z-20 max-w-lg lg:max-w-xl xl:max-w-2xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-b-md" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
