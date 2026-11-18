'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowLeft,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  Lock,
  RotateCcw,
  Clock,
} from 'lucide-react';
import {
  getCounselorRequests,
  INITIAL_COUNSELOR_REQUESTS,
  resetCounselorRequests,
  updateCounselorRequestStatus,
} from '../../lib/storage';
import { CounselorRequest } from '../../lib/types';

export default function CounselorDemoPage() {
  const [requests, setRequests] = useState<CounselorRequest[]>(INITIAL_COUNSELOR_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<CounselorRequest>(
    INITIAL_COUNSELOR_REQUESTS[0]
  );
  const [filter, setFilter] = useState<'all' | 'Pending Review' | 'Scheduled'>('all');
  const [slotInput, setSlotInput] = useState<string>('Tomorrow, 14:00 • Online / Rm 204');
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loaded = getCounselorRequests();
      setRequests(loaded);
      if (loaded.length > 0) {
        setSelectedRequest(loaded[0]);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const filteredRequests =
    filter === 'all' ? requests : requests.filter((r) => r.status === filter);

  const handleAssignSlot = () => {
    if (!selectedRequest) return;
    const chosenSlot = slotInput.trim() || 'Tomorrow, 14:00 • Confidential Session';
    const updated = updateCounselorRequestStatus(selectedRequest.id, 'Scheduled', chosenSlot);
    setRequests(updated);
    const updatedItem = updated.find((r) => r.id === selectedRequest.id);
    if (updatedItem) setSelectedRequest(updatedItem);
    setFeedbackBanner(
      `Consultation scheduled for ${selectedRequest.pseudonym} (${chosenSlot}). Synced with Student Dashboard!`
    );
  };

  const handleMarkCompleted = () => {
    if (!selectedRequest) return;
    const updated = updateCounselorRequestStatus(selectedRequest.id, 'Completed');
    setRequests(updated);
    const updatedItem = updated.find((r) => r.id === selectedRequest.id);
    if (updatedItem) setSelectedRequest(updatedItem);
    setFeedbackBanner(`Marked ${selectedRequest.pseudonym}'s request as Completed.`);
  };

  const handleResetQueue = () => {
    const reset = resetCounselorRequests();
    setRequests(reset);
    setSelectedRequest(reset[0]);
    setFeedbackBanner('Counselor queue reset to default demonstration records.');
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Top Bar: Back button & Reset Queue */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900 bg-white px-3.5 py-2 rounded-xl border border-purple-100 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Progress</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={handleResetQueue}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer"
          title="Reset counselor queue to initial 3 demo requests"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Queue</span>
        </button>
      </div>

      {/* Prominent Demo & Ethics Banner */}
      <div className="bg-amber-500/10 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="text-xs font-black uppercase tracking-wider bg-amber-200 px-2 py-0.5 rounded-md">
            Interactive Counselor Queue • Live Synced with Student Dashboard
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black">
          University Counselor Triage & Referral Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          This view demonstrates how voluntary, student-initiated <strong>Tier 1 Soft-Nudge</strong> referrals
          appear to licensed university counseling staff under salted cryptographic pseudonyms.
          Try submitting a request from <strong>My Progress</strong> and scheduling it here!
        </p>
      </div>

      {feedbackBanner && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between gap-2 animate-pop-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackBanner(null)}
            className="text-emerald-700 hover:text-emerald-950 text-[11px] font-bold px-2 py-0.5 rounded-md cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Campus Climate Aggregate Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
            Active Support Queue
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{requests.length}</span>
            <span className="text-xs text-violet-700 font-bold">
              {requests.filter((r) => r.status === 'Pending Review').length} pending review
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Voluntary pseudonymous referrals</span>
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
              <span>Voluntary Requests ({filteredRequests.length})</span>
            </h3>

            {/* Filter pills */}
            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 py-0.5 rounded-md cursor-pointer ${
                  filter === 'all' ? 'bg-violet-600 text-white font-bold' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('Pending Review')}
                className={`px-2 py-0.5 rounded-md cursor-pointer ${
                  filter === 'Pending Review' ? 'bg-violet-600 text-white font-bold' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('Scheduled')}
                className={`px-2 py-0.5 rounded-md cursor-pointer ${
                  filter === 'Scheduled' ? 'bg-violet-600 text-white font-bold' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Scheduled
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filteredRequests.map((req) => {
              const isSelected = selectedRequest?.id === req.id;
              return (
                <button
                  key={req.id}
                  onClick={() => {
                    setSelectedRequest(req);
                    setFeedbackBanner(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-violet-50/90 border-violet-400 ring-2 ring-violet-200 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-violet-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 gap-1 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-violet-800">
                        {req.pseudonym}
                      </span>
                      {req.isLiveUserRequest && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase bg-violet-600 text-white px-1.5 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                          Live
                        </span>
                      )}
                    </div>
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
        {selectedRequest && (
          <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    {selectedRequest.isLiveUserRequest ? 'Live Student Soft-Nudge Request' : 'Case File (Demo)'}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedRequest.status === 'Pending Review'
                        ? 'bg-amber-100 text-amber-800'
                        : selectedRequest.status === 'Scheduled'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {selectedRequest.status}
                  </span>
                </div>
                <h2 className="text-lg font-black text-slate-900 mt-1">{selectedRequest.topic}</h2>
                <p className="text-xs text-slate-500">
                  Pseudonym: <strong>{selectedRequest.pseudonym}</strong> &bull; Received{' '}
                  {selectedRequest.timeAgo}
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
                <span className="font-bold text-slate-700 block mb-1">
                  Student Consultation Preference:
                </span>
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

              {selectedRequest.scheduledSlot && (
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>
                    <strong>Assigned Appointment Slot:</strong> {selectedRequest.scheduledSlot}
                  </span>
                </div>
              )}

              {/* Interactive Counselor Scheduling Box */}
              <div className="pt-2 border-t border-slate-100 space-y-2.5">
                <label className="block font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-violet-600" />
                  <span>Propose / Update Consultation Time Slot:</span>
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={slotInput}
                    onChange={(e) => setSlotInput(e.target.value)}
                    placeholder="e.g., Tomorrow, 14:00 • Online / Rm 204"
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:border-violet-500 focus:bg-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAssignSlot}
                    className="px-4 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs shadow-xs hover:bg-violet-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Assign Consultation Time
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleMarkCompleted}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mark Case as Completed</span>
                  </button>

                  {selectedRequest.isLiveUserRequest && (
                    <Link
                      href="/dashboard"
                      className="text-[11px] font-bold text-violet-700 hover:underline"
                    >
                      Check status on Student Dashboard →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
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

