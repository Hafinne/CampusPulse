'use client';

import React from 'react';
import { CampusFeeling } from '../lib/types';
import { ShieldCheck, HelpCircle, ShieldX } from 'lucide-react';

interface CampusFeelingSelectorProps {
  value: CampusFeeling | null;
  onSelect: (value: CampusFeeling) => void;
}

export default function CampusFeelingSelector({ value, onSelect }: CampusFeelingSelectorProps) {
  const options: {
    key: CampusFeeling;
    label: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    selectedBorder: string;
    selectedBg: string;
  }[] = [
    {
      key: 'yes',
      label: 'Yes, absolutely',
      subtitle: 'Felt welcomed, secure, and respected around campus.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      color: 'hover:border-emerald-300',
      selectedBorder: 'border-emerald-400 ring-2 ring-emerald-300',
      selectedBg: 'bg-emerald-50/70',
    },
    {
      key: 'partially',
      label: 'Partially / Mixed',
      subtitle: 'Mostly okay, but experienced awkward or uncomfortable moments.',
      icon: <HelpCircle className="w-5 h-5 text-amber-500" />,
      color: 'hover:border-amber-300',
      selectedBorder: 'border-amber-400 ring-2 ring-amber-300',
      selectedBg: 'bg-amber-50/70',
    },
    {
      key: 'no',
      label: 'No, not really',
      subtitle: 'Felt unsafe, excluded, stressed, or uncomfortable.',
      icon: <ShieldX className="w-5 h-5 text-rose-500" />,
      color: 'hover:border-rose-300',
      selectedBorder: 'border-rose-400 ring-2 ring-rose-300',
      selectedBg: 'bg-rose-50/70',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      {options.map((opt) => {
        const isSelected = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onSelect(opt.key)}
            className={`flex flex-col text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
              isSelected
                ? `${opt.selectedBg} ${opt.selectedBorder} shadow-md -translate-y-0.5`
                : `bg-white border-slate-200 ${opt.color} hover:shadow-sm`
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-100">
                {opt.icon}
              </div>
              {isSelected && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white animate-pop-in">
                  Selected
                </span>
              )}
            </div>
            <span className="font-bold text-slate-800 text-base mb-1">{opt.label}</span>
            <span className="text-xs text-slate-500 leading-relaxed">{opt.subtitle}</span>
          </button>
        );
      })}
    </div>
  );
}

