'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowLeft,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  Lock,
  Building2,
  Filter,
} from 'lucide-react';

interface SimulatedRequest {
  id: string;
  pseudonym: string;
  topic: string;
  preference: string;
  timeAgo: string;
  moodLevel: number;
  moodEmoji: string;
  status: 'Pending Review' | 'Scheduled' | 'Completed';
  studentNote: string;
}

const FICTIONAL_REQUESTS: SimulatedRequest[] = [
  {
    id: 'req-1',
    pseudonym: 'Student #4092',
    topic: 'Midterm Burnout & Sleep Anxiety',
    preference: 'Confidential 1-on-1 (Online)',
    timeAgo: '2 hours ago',
    moodLevel: 2,
    moodEmoji: '🙁',
    status: 'Pending Review',
    studentNote: 'Overwhelmed with engineering deadlines and finding it hard to sleep before lab exams. Looking for study-break strategies.',
  },
  {
    id: 'req-2',
    pseudonym: 'Student #3815',
    topic: 'First-Year Social Adjustment',
    preference: 'In-Person (Student Center Rm 204)',
    timeAgo: 'Yesterday',
    moodLevel: 2,
    moodEmoji: '🙁',
    status: 'Scheduled',
    studentNote: 'Moved from out-of-town, feeling disconnected from dorm peers. Want to learn about campus social groups.',
  },
  {
    id: 'req-3',
    pseudonym: 'Student #3104',
    topic: 'Time Management Workshop Inquiry',
    preference: 'Small Group Workshop',
    timeAgo: '3 days ago',
    moodLevel: 3,
    moodEmoji: '😐',
    status: 'Completed',
    studentNote: 'Attended the stress-reduction group session in library pod B. Follow-up materials delivered.',
  },
];

export default function CounselorDemoPage() {
  const [selectedRequest, setSelectedRequest] = useState<SimulatedRequest>(FICTIONAL_REQUESTS[0]);
  const [filter, setFilter] = useState<'all' | 'Pending Review' | 'Scheduled'>('all');

  const filteredRequests = filter === 'all'
    ? FICTIONAL_REQUESTS
    : FICTIONAL_REQUESTS.filter((r) => r.status === filter);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900 bg-white px-3 py-1.5 rounded-xl border border-purple-100 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Student Experience</span>
        </Link>
      </div>

      {/* Prominent Demo & Ethics Banner */}
      <div className="bg-amber-500/10 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="text-xs font-black uppercase tracking-wider bg-amber-200 px-2 py-0.5 rounded-md">
            Academic Concept Demonstration Only
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black">
          Simulated University Counselor Interface
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          This view demonstrates how voluntary, student-initiated support referrals could appear to licensed
          university counseling staff in a future production deployment.
          <strong> All records shown here are 100% fictional.</strong> There is no connection to actual student
          data, campus servers, or emergency dispatch.
        </p>
      </div>

      {/* Campus Climate Aggregate Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
            Weekly Student Check-ins
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">342</span>
            <span className="text-xs text-emerald-600 font-bold">+18% this week</span>
          </div>
          <span className="text-[11px] text-slate-400">Anonymous voluntary entries</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
            Average Campus Energy
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">3.6 / 5.0</span>
            <span className="text-xs text-slate-500 font-semibold">Steady / Balanced</span>
          </div>
          <span className="text-[11px] text-slate-400">Non-clinical aggregate index</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
            Campus Belonging Index
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">86%</span>
            <span className="text-xs text-sky-600 font-bold">Felt safe & respected</span>
          </div>
          <span className="text-[11px] text-slate-400">Community sentiment indicator</span>
        </div>
      </div>

      {/* Main Support Request Desk (Split View) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left: Queue List */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-violet-600" />
              <span>Voluntary Requests</span>
            </h3>

            {/* Filter pills */}
            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 py-0.5 rounded-md ${
                  filter === 'all' ? 'bg-violet-600 text-white font-bold' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('Pending Review')}
                className={`px-2 py-0.5 rounded-md ${
                  filter === 'Pending Review' ? 'bg-violet-600 text-white font-bold' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Pending
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filteredRequests.map((req) => {
              const isSelected = selectedRequest.id === req.id;
              return (
                <button
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-violet-50/90 border-violet-400 ring-2 ring-violet-200 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-violet-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] font-bold text-violet-800">
                      {req.pseudonym}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        req.status === 'Pending Review'
                          ? 'bg-amber-100 text-amber-800'
                          : req.status === 'Scheduled'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-800 truncate">{req.topic}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{req.timeAgo}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Request Detail */}
        <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                Case File (Fictional)
              </span>
              <h2 className="text-lg font-black text-slate-900">{selectedRequest.topic}</h2>
              <p className="text-xs text-slate-500">
                Pseudonym: <strong>{selectedRequest.pseudonym}</strong> &bull; Received {selectedRequest.timeAgo}
              </p>
            </div>

            <div className="text-right">
              <span className="text-2xl block">{selectedRequest.moodEmoji}</span>
              <span className="text-[10px] font-bold text-slate-500">
                Level {selectedRequest.moodLevel} Mood
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-700 block mb-1">Student Consultation Preference:</span>
              <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                {selectedRequest.preference}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1">Student Brief Note:</span>
              <p className="p-3 rounded-xl bg-violet-50/50 border border-violet-100 text-slate-700 italic leading-relaxed">
                &quot;{selectedRequest.studentNote}&quot;
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-xs shadow-xs hover:bg-violet-700 transition-colors cursor-pointer"
                onClick={() => alert('Demo action: In a production system, this would assign an intake appointment to counselor calendar via university SSO.')}
              >
                Assign Consultation Time
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => alert('Demo action: Mark case as addressed or refer to peer study group.')}
              >
                Mark as Handled
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Production Security & Governance Charter */}
      <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 text-xs space-y-3">
        <div className="flex items-center gap-2 text-white font-bold">
          <Lock className="w-4 h-4 text-violet-400" />
          <span>Production Security & Privacy Architecture (Phase 2 Blueprint)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-400">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <strong className="text-slate-200 block mb-1">Role-Based Access (RBAC)</strong>
            Only licensed campus counselors with institutional 2FA credentials can access appointment triage.
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <strong className="text-slate-200 block mb-1">Zero Diagnostic AI</strong>
            No machine learning risk scores, emotion surveillance, or algorithmic predictions are used.
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <strong className="text-slate-200 block mb-1">Legal Privacy Compliance</strong>
            Designed to meet university student health confidentiality codes (FERPA / KVKK / GDPR).
          </div>
        </div>
      </div>
    </div>
  );
}

