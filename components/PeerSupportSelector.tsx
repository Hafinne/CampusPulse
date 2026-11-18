'use client';

import React from 'react';
import { PeerObservation } from '../lib/types';
import { Users, HeartHandshake, EyeOff, Sparkles, AlertCircle } from 'lucide-react';

interface PeerSupportSelectorProps {
  value: PeerObservation | null;
  onSelect: (value: PeerObservation) => void;
}

export default function PeerSupportSelector({ value, onSelect }: PeerSupportSelectorProps) {
  const options: {
    key: PeerObservation;
    label: string;
    subtitle: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'yes',
      label: 'Yes, I noticed someone',
      subtitle: 'A peer appeared noticeably distressed, silent, or isolated.',
      icon: <Users className="w-5 h-5 text-purple-600" />,
    },
    {
      key: 'no',
      label: 'No, haven\'t noticed',
      subtitle: 'Peers around me seemed generally fine or balanced.',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
    },
    {
      key: 'prefer-not-to-say',
      label: 'Prefer not to say',
      subtitle: 'Keep this private; focusing purely on personal reflection.',
      icon: <EyeOff className="w-5 h-5 text-slate-500" />,
    },
  ];

  return (
    <div className="space-y-4">
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
                  ? 'bg-violet-50/80 border-violet-400 ring-2 ring-violet-300 shadow-md -translate-y-0.5'
                  : 'bg-white border-slate-200 hover:border-violet-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-100">
                  {opt.icon}
                </div>
                {isSelected && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-600 text-white animate-pop-in">
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

      {/* Gentle guidance shown if YES is selected */}
      {value === 'yes' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 border border-purple-200/80 text-slate-800 animate-pop-in shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-violet-600" />
            </div>
            <div className="space-y-2 text-sm">
              <h5 className="font-bold text-violet-950 flex items-center gap-2">
                Gentle Peer Support Guidance
                <span className="text-[11px] font-normal text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                  Educational Tip
                </span>
              </h5>
              <p className="text-slate-600 leading-relaxed">
                Thank you for your empathy! University can feel overwhelming, and having someone notice can be powerful.
                Consider gentle, low-pressure actions:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 pl-1">
                <li>A warm &quot;Hey, how have you been holding up lately?&quot; before or after lecture.</li>
                <li>Inviting them to join for a coffee or study table in the campus student lounge.</li>
                <li>Offering to share class notes or form an informal study group.</li>
                <li>Letting them know that campus counseling services are available and confidential.</li>
              </ul>
              <div className="pt-1.5 flex items-center gap-1.5 text-xs text-purple-700 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Reminder: This check-in does not report, track, or notify anyone. You are an empathetic peer, not an emergency dispatcher.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

