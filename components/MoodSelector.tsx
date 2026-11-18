'use client';

import React from 'react';
import { MOOD_CONFIGS, MoodLevel } from '../lib/types';

interface MoodSelectorProps {
  selectedMood: MoodLevel | null;
  onSelect: (mood: MoodLevel) => void;
}

export default function MoodSelector({ selectedMood, onSelect }: MoodSelectorProps) {
  const levels: MoodLevel[] = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        {levels.map((level) => {
          const config = MOOD_CONFIGS[level];
          const isSelected = selectedMood === level;

          return (
            <button
              key={level}
              type="button"
              onClick={() => onSelect(level)}
              className={`group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-3xl border-2 transition-all duration-300 text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-violet-300/50 ${
                isSelected
                  ? `${config.bgLight} ${config.borderColor} shadow-lg scale-105 ${config.ringColor} ring-2 ring-offset-2 ring-offset-white`
                  : 'bg-white border-slate-200/90 hover:border-violet-300 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Top rating badge */}
              <span
                className={`text-xs font-black px-2 py-0.5 rounded-full mb-2 transition-colors ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-700'
                }`}
              >
                Level {level}
              </span>

              {/* Expressive Emoji */}
              <div
                className={`text-4xl sm:text-5xl my-2 transition-transform duration-300 ${
                  isSelected
                    ? 'scale-125 rotate-3'
                    : 'group-hover:scale-115 group-hover:-rotate-3'
                }`}
              >
                {config.emoji}
              </div>

              {/* Label & Description */}
              <div className="mt-2">
                <p
                  className={`font-black text-sm sm:text-base tracking-tight transition-colors ${
                    isSelected ? config.textColor : 'text-slate-800'
                  }`}
                >
                  {config.label}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug hidden sm:block">
                  {config.subtitle}
                </p>
              </div>

              {/* Selection Check Indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-md animate-pop-in">
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <div className="text-center pt-1 animate-pop-in">
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Selected:{' '}
            <strong className="text-violet-700">
              {MOOD_CONFIGS[selectedMood].emoji} {MOOD_CONFIGS[selectedMood].label}
            </strong>{' '}
            — {MOOD_CONFIGS[selectedMood].subtitle}
          </p>
        </div>
      )}
    </div>
  );
}

