'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  BarChart2,
  LifeBuoy,
  Lock,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { MOOD_CONFIGS, MoodLevel } from '../lib/types';

export default function HomePage() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);

  const moodLevels: MoodLevel[] = [1, 2, 3, 4, 5];

  const handleContinue = () => {
    if (selectedMood) {
      router.push(`/check-in?mood=${selectedMood}`);
    } else {
      router.push('/check-in');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Background soft pastel blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-80 bg-gradient-to-tr from-purple-200/40 via-pink-100/30 to-amber-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* MAIN CHECK-IN HERO CARD */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border-2 border-purple-100 shadow-xl shadow-purple-500/5 text-center space-y-6">
        {/* Friendly greeting */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold border border-violet-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Daily 15-Second Reflection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Hey! How are you feeling today?
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            Choose the emoji that matches your mood and campus energy right now.
          </p>
        </div>

        {/* Five expressive clickable emojis */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 max-w-2xl mx-auto pt-2">
          {moodLevels.map((level) => {
            const config = MOOD_CONFIGS[level];
            const isSelected = selectedMood === level;

            return (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedMood(level)}
                className={`group flex flex-col items-center justify-between p-4 rounded-3xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? `${config.bgLight} ${config.borderColor} scale-105 shadow-md ${config.ringColor} ring-2 ring-offset-2 ring-offset-white`
                    : 'bg-slate-50/70 border-slate-200 hover:border-violet-300 hover:scale-102 hover:bg-white'
                }`}
              >
                <span className="text-4xl sm:text-5xl my-1 group-hover:scale-110 transition-transform">
                  {config.emoji}
                </span>
                <span
                  className={`font-black text-xs sm:text-sm mt-2 ${
                    isSelected ? config.textColor : 'text-slate-700'
                  }`}
                >
                  {config.label}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight hidden sm:block mt-0.5">
                  Level {level}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected feedback & Continue button */}
        <div className="pt-3 max-w-md mx-auto space-y-3">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-extrabold text-base shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span>{selectedMood ? 'Continue Check-in' : 'Start Check-in'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {selectedMood && (
            <p className="text-xs text-violet-700 font-semibold animate-pop-in">
              Selected: {MOOD_CONFIGS[selectedMood].emoji} {MOOD_CONFIGS[selectedMood].label} —{' '}
              {MOOD_CONFIGS[selectedMood].subtitle}
            </p>
          )}
        </div>

        {/* Reassurance pills */}
        <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-400 flex-wrap">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-violet-500" /> Takes ~15 seconds
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> Anonymous & voluntary
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" /> No student IDs collected
          </span>
        </div>
      </div>

      {/* QUICK SECONDARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <Link
          href="/dashboard"
          className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 hover:border-violet-200 hover:bg-white shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 group-hover:scale-105 transition-transform">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-slate-800">My Progress</h4>
              <p className="text-xs text-slate-500">View your weekly energy rhythm</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href="/support"
          className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 hover:border-violet-200 hover:bg-white shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-105 transition-transform">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-slate-800">Get Support</h4>
              <p className="text-xs text-slate-500">Counseling info & emergency hotlines</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>

      {/* DEMO NOTICE */}
      <div className="mt-8 text-center text-xs text-slate-400 max-w-xl mx-auto">
        GLB300 Course Project Prototype • Fictional demo data stored in localStorage • Non-diagnostic
      </div>
    </div>
  );
}
