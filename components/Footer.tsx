import React from 'react';
import Link from 'next/link';
import { HeartPulse, Heart, ShieldCheck, Globe2, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-violet-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Campus<span className="text-violet-400">Pulse</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Voluntary daily student well-being check-in developed for the GLB300 course project fair.
              Designed for quick 15-second self-reflection and campus belonging.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-[11px] font-medium">
                <Globe2 className="w-3 h-3 text-emerald-400" />
                <span>UN SDG 3: Health & Well-Being</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-800/60 text-[11px] font-medium">
                <ShieldCheck className="w-3 h-3 text-sky-400" />
                <span>UN SDG 16: Safe Institutions</span>
              </span>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/check-in" className="hover:text-violet-400 transition-colors">
                  Daily Check-in
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-violet-400 transition-colors">
                  My Progress
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-violet-400 transition-colors">
                  Get Support & Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-violet-400 transition-colors">
                  About & Impact (GLB300)
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Demonstration Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Demo Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/counselor-demo"
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Counselor Demo View ↗</span>
                </Link>
              </li>
              <li>
                <Link href="/about#ethics" className="hover:text-violet-400 transition-colors">
                  Ethics & Privacy Charter
                </Link>
              </li>
            </ul>

            <div className="mt-4 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400 leading-snug">
              Client-side demo in localStorage. Not a clinical diagnosis tool.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 CampusPulse • Interdisciplinary GLB300 Course Prototype</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>for university student wellness</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
