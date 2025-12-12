'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icons } from './Icons';
import { Logo } from './Logo';

import { useChat } from '@/app/context/ChatContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openChatWithIntent } = useChat();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (targetId === 'contact') {
      openChatWithIntent("I'd like to get in touch with sales.");
      return;
    }

    if (isHome) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleGetStarted = () => {
    setIsMobileMenuOpen(false);
    openChatWithIntent("I'm interested in getting started with Bleeding Edge.");
  };

  interface NavLink {
    name: string;
    path?: string;
    id?: string;
    dropdown?: { name: string; path: string }[];
  }

  const navLinks: NavLink[] = [
    {
      name: 'Products',
      dropdown: [
        { name: 'Build', path: '/build' },
        { name: 'Colocation', path: '/colocation' },
        { name: 'AI Cloud', path: '/ai-cloud-v2' },
        { name: 'Applied AI', path: '/applied-ai' }
      ]
    },
    {
      name: 'Solutions',
      dropdown: [
        { name: 'Government', path: '/government' },
        { name: 'Enterprise', path: '/enterprise' },
        { name: 'AI Native', path: '/ai-native' }
      ]
    },
    {
      name: 'Capabilities',
      dropdown: [
        { name: 'Energy', path: '/energy' },
        { name: 'Manufacturing', path: '/manufacturing' }
      ]
    },
    {
      name: 'Company',
      dropdown: [
        { name: 'About Us', path: '/about-us' },
        { name: 'Become a Partner', path: '/partner' }
      ]
    },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <Logo variant="full" className="transform transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            // Handle Dropdown Menu
            if (link.dropdown) {
              return (
                <div key={link.name} className="relative group h-full flex items-center">
                  <button className="flex items-center text-sm font-medium text-slate-300 hover:text-brand-500 transition-colors uppercase tracking-widest focus:outline-none">
                    {link.name}
                    <Icons.ChevronDown className="ml-1.5 w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Content */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                    <div className="bg-slate-950 border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden min-w-[200px] backdrop-blur-xl">
                      {link.dropdown.map((subLink, idx) => (
                        <Link
                          key={subLink.name}
                          href={subLink.path}
                          className={`block px-6 py-3 text-sm text-slate-400 hover:text-white hover:bg-brand-900/20 transition-colors ${idx !== link.dropdown!.length - 1 ? 'border-b border-white/5' : ''
                            }`}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Handle Standard Path Links
            if (link.path) {
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium transition-colors uppercase tracking-widest ${pathname === link.path ? 'text-brand-500' : 'text-slate-300 hover:text-brand-500'
                    }`}
                >
                  {link.name}
                </Link>
              );
            }

            // Handle Anchor Links
            return (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id!)}
                className="text-sm font-medium text-slate-300 hover:text-brand-500 transition-colors uppercase tracking-widest cursor-pointer"
              >
                {link.name}
              </a>
            );
          })}
          <button
            onClick={handleGetStarted}
            className="px-6 py-2 bg-white text-brand-950 font-bold rounded-full transition-all hover:bg-slate-200 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-white/10 p-6 flex flex-col space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.name} className="flex flex-col space-y-3">
                  <span className="text-lg font-medium text-slate-500 uppercase tracking-widest pt-2">
                    {link.name}
                  </span>
                  {link.dropdown.map(subLink => (
                    <Link
                      key={subLink.name}
                      href={subLink.path}
                      className="text-lg font-medium text-slate-300 hover:text-brand-500 pl-4 border-l border-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              );
            }

            if (link.path) {
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-lg font-medium text-slate-300 hover:text-brand-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            } else {
              return (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id!)}
                  className="text-lg font-medium text-slate-300 hover:text-brand-500"
                >
                  {link.name}
                </a>
              );
            }
          })}
        </div>
      )}
    </nav>
  );
};