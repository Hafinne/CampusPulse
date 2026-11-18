'use client';

import React from 'react';
import { CheckInEntry, MOOD_CONFIGS, MoodLevel } from '../lib/types';
import { Sparkles, Calendar, TrendingUp } from 'lucide-react';

interface MoodTrendChartProps {
  entries: CheckInEntry[];
}

export default function MoodTrendChart({ entries }: MoodTrendChartProps) {
  // Generate the last 7 days window
  const days: { dateStr: string; dayLabel: string; shortDate: string; entry?: CheckInEntry }[] = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Yest.' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const shortDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Find the latest check-in on this date if any
    const match = entries.find((e) => e.date === dateStr);
    days.push({
      dateStr,
      dayLabel,
      shortDate,
      entry: match,
    });
  }

  // Calculate average
  const scoredEntries = entries.filter((e) => typeof e.mood === 'number');
  const averageScore = scoredEntries.length > 0
    ? (scoredEntries.reduce((sum, e) => sum + e.mood, 0) / scoredEntries.length).toFixed(1)
    : null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-sm relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-100 text-violet-700">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              7-Day Energy & Mood Rhythm
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visual record of your daily voluntary self-reflections over the past week.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {averageScore ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Avg: {averageScore} / 5.0</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">No recent data</span>
          )}
        </div>
      </div>

      {/* Chart Visual Grid */}
      <div className="pt-6 pb-2">
        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-56 sm:h-64 px-1">
          {days.map((day, idx) => {
            const hasData = Boolean(day.entry);
            const moodLevel = day.entry?.mood as MoodLevel | undefined;
            const moodConfig = moodLevel ? MOOD_CONFIGS[moodLevel] : null;

            // Height calculation: Level 1 -> 20%, 2 -> 40%, 3 -> 60%, 4 -> 80%, 5 -> 100%
            const heightPercent = moodLevel ? moodLevel * 20 : 8;

            return (
              <div key={idx} className="flex flex-col items-center h-full justify-end group relative">
                {/* Tooltip on hover */}
                {hasData && day.entry && (
                  <div className="absolute -top-12 z-30 hidden group-hover:flex flex-col items-center bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap animate-pop-in">
                    <span>
                      {day.entry.moodEmoji} Level {day.entry.mood}: {day.entry.moodLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">{day.shortDate}</span>
                    <div className="w-2 h-2 bg-slate-900 rotate-45 -mb-1 mt-0.5" />
                  </div>
                )}

                {/* The Bar */}
                <div className="w-full max-w-[48px] bg-slate-100 rounded-2xl p-1 flex flex-col justify-end h-44 sm:h-48 border border-slate-200/60 relative overflow-hidden">
                  {hasData && moodConfig ? (
                    <div
                      className={`w-full rounded-xl bg-gradient-to-t ${moodConfig.gradient} shadow-sm transition-all duration-500 flex flex-col items-center justify-between py-2 group-hover:brightness-105`}
                      style={{ height: `${heightPercent}%` }}
                    >
                      <span className="text-lg sm:text-xl drop-shadow-xs">{moodConfig.emoji}</span>
                      <span className="text-[10px] sm:text-xs font-black text-white/90">
                        {moodLevel}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                      <span className="text-xs font-bold text-slate-300">·</span>
                    </div>
                  )}
                </div>

                {/* Day Labels */}
                <div className="text-center mt-2.5">
                  <p
                    className={`text-xs font-bold ${
                      day.dayLabel === 'Today' ? 'text-violet-700' : 'text-slate-700'
                    }`}
                  >
                    {day.dayLabel}
                  </p>
                  <p className="text-[10px] text-slate-400">{day.shortDate.split(' ')[1]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood Legend */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-slate-600 mr-1">Scale:</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">
            1 😫 Very Low
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">
            2 🙁 Low
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 text-sky-700">
            3 😐 Okay
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
            4 🙂 Good
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-50 text-violet-700">
            5 🤩 Amazing
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>Past 7 days window</span>
        </div>
      </div>
    </div>
  );
}

