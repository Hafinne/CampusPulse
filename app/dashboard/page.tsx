'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Trash2,
  RotateCcw,
  PlusCircle,
  HelpCircle,
  LifeBuoy,
  Zap,
} from 'lucide-react';
import MoodTrendChart from '../../components/MoodTrendChart';
import {
  clearAllCheckIns,
  deleteCheckIn,
  getCheckIns,
  resetDemoData,
  checkTier1LowMood,
  simulateFourLowMoodDays,
} from '../../lib/storage';
import { CheckInEntry, MOOD_CONFIGS, MoodLevel } from '../../lib/types';

export default function DashboardPage() {
  const [entries, setEntries] = useState<CheckInEntry[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEntries(getCheckIns());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteCheckIn(id);
    setEntries(updated);
  };

  const handleReset = () => {
    const reset = resetDemoData();
    setEntries(reset);
  };

  const handleSimulateLow = () => {
    const simulated = simulateFourLowMoodDays();
    setEntries(simulated);
  };

  const handleClear = () => {
    clearAllCheckIns();
    setEntries([]);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEntry = entries.find((e) => e.date === todayStr);

  // Tier 1 Rule: 4 consecutive low-mood entries (level 1 or 2)
  const isTier1Triggered = checkTier1LowMood(entries);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your 7-day personal energy rhythm and check-in history.
          </p>
        </div>

        {/* Demo helpers for GLB300 presentation */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/check-in"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-xs shadow-sm hover:bg-violet-700 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{todayEntry ? 'Check In Again' : 'Check In Today'}</span>
          </Link>

          <button
            onClick={handleSimulateLow}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors"
            title="Simulate 4 consecutive low mood days to test the Tier 1 Rule"
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Test Tier 1 Rule</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            title="Reset to default demo data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TODAY'S STATUS CARD */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-100 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
              todayEntry ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'
            }`}
          >
            {todayEntry ? todayEntry.moodEmoji : '🌱'}
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Today&apos;s Status
            </span>
            {todayEntry ? (
              <p className="text-sm font-bold text-slate-800">
                Checked in at {todayEntry.time} —{' '}
                <span className="text-violet-700">
                  {todayEntry.moodEmoji} {todayEntry.moodLabel} (Level {todayEntry.mood})
                </span>
              </p>
            ) : (
              <p className="text-sm font-bold text-slate-700">
                You haven&apos;t checked in today yet.
              </p>
            )}
          </div>
        </div>

        <div>
          {todayEntry ? (
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          ) : (
            <Link
              href="/check-in"
              className="px-3.5 py-1.5 rounded-xl bg-violet-100 text-violet-800 font-bold text-xs hover:bg-violet-200 transition-colors whitespace-nowrap"
            >
              Check in now →
            </Link>
          )}
        </div>
      </div>

      {/* TIER 1 SUPPORT CARD (TRIGGERS ON 4 CONSECUTIVE LOW MOOD DAYS) */}
      {isTier1Triggered && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm animate-pop-in space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[11px] font-black uppercase tracking-wider bg-amber-200/90 text-amber-950 px-2.5 py-0.5 rounded-full">
              Prototype Rule: Pending Psychology-Team Review
            </span>
            <span className="text-[11px] font-semibold text-amber-800">
              4 Consecutive Low-Energy Days Detected
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Taking care of yourself matters 💛
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We noticed your last 4 reflections indicate your mood and energy have been lower than usual.
              University coursework and life transitions can feel heavy. You don&apos;t have to navigate it all alone.
              Would you like to explore free, confidential campus support?
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/support"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shadow-xs transition-colors"
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>Explore Campus Support Options</span>
            </Link>
            <span className="text-[11px] text-amber-800/80">
              100% voluntary & confidential • No data is shared with faculty or staff
            </span>
          </div>
        </div>
      )}

      {/* 7-DAY MOOD HISTORY CHART */}
      <MoodTrendChart entries={entries} />

      {/* RECENT CHECK-IN ENTRIES */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Previous Check-ins</h3>
          {entries.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <p className="text-center py-8 text-xs text-slate-400">
            No check-in entries yet. Complete a check-in to see your history!
          </p>
        ) : (
          <div className="space-y-2.5">
            {entries.slice(0, 7).map((item) => {
              const config = MOOD_CONFIGS[item.mood as MoodLevel] || MOOD_CONFIGS[3];
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white flex items-center justify-between gap-3 text-xs transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0">{item.moodEmoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-slate-800 text-xs">
                          {config.label} (Level {item.mood})
                        </strong>
                        <span className="text-slate-400 text-[11px]">
                          {item.displayDate} at {item.time}
                        </span>
                      </div>
                      {item.reflection && (
                        <p className="text-slate-600 italic truncate max-w-md mt-0.5">
                          &quot;{item.reflection}&quot;
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg transition-colors shrink-0"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Non-diagnostic disclaimer */}
      <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
        <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
        <span>For personal self-reflection only. Not a medical or diagnostic score.</span>
      </div>
    </div>
  );
}
