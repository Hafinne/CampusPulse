'use client';

import React from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  ShieldAlert,
  HeartHandshake,
  X,
  LifeBuoy,
  Clock,
  Lock,
} from 'lucide-react';

interface CrisisHotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDemoTrigger?: boolean;
}

export default function CrisisHotlineModal({
  isOpen,
  onClose,
  isDemoTrigger = false,
}: CrisisHotlineModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-pop-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-rose-300 shadow-2xl overflow-hidden">
        {/* Top Emergency Header */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-500 p-5 sm:p-6 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                    Tier 2 Safety Protocol • 24/7 Support
                  </span>
                  {isDemoTrigger && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full">
                      Demo Preview
                    </span>
                  )}
                </div>
                <h2 id="crisis-modal-title" className="text-lg sm:text-xl font-black mt-1">
                  You don&apos;t have to carry this alone
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close emergency support modal"
              className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            It sounds like you might be going through a really heavy moment right now.
            Please reach out to someone who can support you immediately — free, confidential,
            and available 24/7.
          </p>

          {/* 24/7 Hotline Cards */}
          <div className="space-y-2.5">
            <a
              href="tel:112"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-100/70 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-rose-700 block">
                    Immediate Emergency (Turkey / EU)
                  </span>
                  <strong className="text-base font-black text-slate-900">
                    Call 112 — Acil Çağrı Merkezi
                  </strong>
                </div>
              </div>
              <span className="text-xs font-extrabold text-rose-700 bg-white px-3 py-1 rounded-xl border border-rose-200">
                24/7
              </span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="tel:183"
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-violet-300 hover:bg-violet-50/40 transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-wide text-violet-700 block">
                  Sosyal Destek (TR)
                </span>
                <strong className="text-sm font-black text-slate-900 block mt-0.5">
                  Alo 183
                </strong>
                <span className="text-[11px] text-slate-500">
                  24/7 psychological &amp; social support
                </span>
              </a>

              <a
                href="tel:988"
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-violet-300 hover:bg-violet-50/40 transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-wide text-violet-700 block">
                  International / US
                </span>
                <strong className="text-sm font-black text-slate-900 block mt-0.5">
                  988 Lifeline
                </strong>
                <span className="text-[11px] text-slate-500">
                  Free, confidential crisis support
                </span>
              </a>
            </div>

            <div className="p-3.5 rounded-2xl bg-violet-50/70 border border-violet-200 flex items-start gap-2.5 text-xs">
              <HeartHandshake className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <div className="text-slate-700">
                <strong className="text-violet-950 block">
                  Campus Counseling Center (PDRM)
                </strong>
                <span>
                  On-duty campus counselors are available for confidential walk-ins and referrals
                  (Student Center, Mon–Fri 09:00–17:00).
                </span>
              </div>
            </div>
          </div>

          {/* Privacy & Non-Diagnostic Transparency */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Client-side safety check:</strong> This prompt was triggered locally in your
              browser. CampusPulse does not replace professional counseling or automatically track
              your identity.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
            <Link
              href="/support"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-700 transition-colors"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>View All Campus Support Resources</span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Return to Check-in</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
