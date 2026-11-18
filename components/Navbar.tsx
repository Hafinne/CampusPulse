'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, Sparkles, Menu, X, BarChart2, LifeBuoy, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simplified to exactly the 3 core student journeys
  const navLinks = [
    { href: '/check-in', label: 'Check-in', icon: <CheckCircle2 className="w-4 h-4 text-violet-500" /> },
    { href: '/dashboard', label: 'My Progress', icon: <BarChart2 className="w-4 h-4 text-sky-500" /> },
    { href: '/support', label: 'Get Support', icon: <LifeBuoy className="w-4 h-4 text-rose-500" /> },
  ];

  const isActive = (path: string) => {
    if (!pathname) return false;
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-purple-100/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl px-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse-gentle" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-violet-700 transition-colors">
                Campus<span className="text-violet-600">Pulse</span>
              </span>
              <span className="text-[10px] font-semibold text-purple-600/80 tracking-wider uppercase -mt-1">
                Student Well-Being
              </span>
            </div>
          </Link>

          {/* Desktop Navigation: 3 Essential Student Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                    active
                      ? 'bg-violet-100 text-violet-900 shadow-xs'
                      : 'text-slate-600 hover:text-violet-700 hover:bg-violet-50/70'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/check-in"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-extrabold text-sm shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Quick Check-in</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/check-in"
              className="p-2.5 rounded-2xl bg-violet-600 text-white shadow-sm sm:hidden"
              aria-label="Check-in"
            >
              <HeartPulse className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl bg-white border border-purple-100 text-slate-700 hover:text-violet-700 hover:bg-violet-50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-purple-100 px-4 pt-3 pb-6 space-y-2 animate-pop-in shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-bold transition-all ${
                    active
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-slate-700 hover:bg-violet-50 hover:text-violet-700'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-purple-100 flex items-center justify-between px-2 text-xs text-slate-400">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-violet-600 font-medium"
            >
              About GLB300 & Impact
            </Link>
            <Link
              href="/counselor-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="text-violet-600 font-semibold"
            >
              Counselor Demo ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
