import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Logo variant="full" />
          </div>
          <div className="flex space-x-6 text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">SLA</a>
          </div>
        </div>
        <div className="text-center md:text-left text-slate-600 text-sm space-y-1">
          <div>Vibecoded with <span className="text-red-500">♥</span> by Bleeding Edge</div>
          <div>&copy; {new Date().getFullYear()} Bleeding Edge Infrastructure. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};