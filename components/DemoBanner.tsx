'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldAlert, X } from 'lucide-react';

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-xs sm:text-sm py-2 px-4 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full font-semibold text-xs tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Course Demo Prototype
          </span>
          <span className="text-violet-100 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-300 inline-block shrink-0" />
            <span>
              For GLB300 course project. Uses local browser storage only — <strong>not</strong> a medical diagnosis or crisis prediction system.
            </span>
          </span>
          <Link
            href="/about#ethics"
            className="underline underline-offset-2 text-white font-medium hover:text-yellow-200 transition-colors hidden md:inline-block ml-1"
          >
            Learn about our ethical commitments &rarr;
          </Link>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-violet-200 hover:text-white p-1 rounded-md transition-colors shrink-0"
          aria-label="Dismiss banner"
          title="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

