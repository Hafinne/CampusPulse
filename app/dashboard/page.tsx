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
  Lock,
  Calendar,
  Send,
  ExternalLink,
  MessageSquareHeart,
  X,
} from 'lucide-react';
import MoodTrendChart from '../../components/MoodTrendChart';
import {
  clearAllCheckIns,
  deleteCheckIn,
  getCheckIns,
  resetDemoData,
  checkTier1LowMood,
  simulateFourLowMoodDays,
  getOrCreateStudentPseudonym,
  getCounselorRequests,
  createCounselorRequest,
} from '../../lib/storage';
import { CheckInEntry, CounselorRequest, MOOD_CONFIGS, MoodLevel } from '../../lib/types';

export default function DashboardPage() {
  const [entries, setEntries] = useState<CheckInEntry[]>([]);
  const [pseudonym, setPseudonym] = useState<string>('Student #----');
  const [myRequests, setMyRequests] = useState<CounselorRequest[]>([]);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>('Academic Stress & Burnout');
  const [preference, setPreference] = useState<string>('Confidential 1-on-1 (Online)');
  const [studentNote, setStudentNote] = useState<string>('');
  const [justSubmittedId, setJustSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadedEntries = getCheckIns();
      setEntries(loadedEntries);
      const pseudo = getOrCreateStudentPseudonym();
      setPseudonym(pseudo);
      const allReqs = getCounselorRequests();
      setMyRequests(allReqs.filter((r) => r.isLiveUserRequest || r.pseudonym === pseudo));
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
    if (simulated[0]?.reflection && !studentNote) {
      setStudentNote(simulated[0].reflection);
    }
  };

  const handleClear = () => {
    clearAllCheckIns();
    setEntries([]);
  };

  const handleOpenBooking = () => {
    if (!studentNote && entries[0]?.reflection) {
      setStudentNote(entries[0].reflection);
    }
    setShowBookingForm(true);
  };

  const handleSubmitCounselorRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const latestMood = (entries[0]?.mood as MoodLevel) || 2;
    const created = createCounselorRequest({
      topic,
      preference,
      studentNote,
      moodLevel: latestMood,
    });
    const allReqs = getCounselorRequests();
    setMyRequests(allReqs.filter((r) => r.isLiveUserRequest || r.pseudonym === pseudonym));
    setJustSubmittedId(created.id);
    setShowBookingForm(false);
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
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Progress
            </h1>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-[11px] font-mono font-bold text-violet-800"
              title="Salted cryptographic pseudonym stored locally — no real name or student ID is collected"
            >
              <Lock className="w-3 h-3 text-violet-600" />
              <span>ID: {pseudonym}</span>
            </span>
          </div>
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
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
            title="Simulate 4 consecutive low mood days to test the Tier 1 Rule"
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Test Tier 1 Rule</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
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
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm animate-pop-in space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[11px] font-black uppercase tracking-wider bg-amber-200/90 text-amber-950 px-2.5 py-0.5 rounded-full">
              Tier 1 Soft-Nudge • 4 Consecutive Low-Mood Days
            </span>
            <span className="text-[11px] font-mono font-bold text-amber-900 bg-white/70 px-2.5 py-0.5 rounded-full border border-amber-200">
              Pseudonym: {pseudonym}
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Taking care of yourself matters 💛
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We noticed your last 4 reflections indicate your mood and energy have been lower than usual.
              University coursework and life transitions can feel heavy. Would you like to send an{' '}
              <strong>anonymous consultation request</strong> to a campus counselor under your pseudonym (
              <span className="font-mono font-bold text-amber-900">{pseudonym}</span>)?
            </p>
          </div>

          {!showBookingForm ? (
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-700 shadow-sm transition-all cursor-pointer"
              >
                <MessageSquareHeart className="w-4 h-4 text-pink-200" />
                <span>Request Anonymous Counselor Chat</span>
              </button>

              <Link
                href="/support"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100/60 transition-colors"
              >
                <LifeBuoy className="w-3.5 h-3.5 text-amber-600" />
                <span>View Self-Care & Helplines</span>
              </Link>

              <span className="text-[11px] text-amber-800/80">
                100% voluntary & confidential • Appears live in Counselor Demo
              </span>
            </div>
          ) : (
            /* INLINE SOFT-NUDGE APPOINTMENT BOOKING FORM */
            <form
              onSubmit={handleSubmitCounselorRequest}
              className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-sm space-y-4 text-xs animate-pop-in"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-violet-600" />
                  <span className="font-black text-slate-900 text-sm">
                    Schedule Voluntary Counselor Check-in
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    What would you like to talk about?
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 font-medium focus:border-violet-500 focus:bg-white outline-none"
                  >
                    <option value="Academic Stress & Burnout">Academic Stress & Burnout</option>
                    <option value="Feeling Isolated or Disconnected">Feeling Isolated or Disconnected</option>
                    <option value="Sleep & Energy Exhaustion">Sleep & Energy Exhaustion</option>
                    <option value="General Well-Being Check-in">General Well-Being Check-in</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Preferred Meeting Format
                  </label>
                  <select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 font-medium focus:border-violet-500 focus:bg-white outline-none"
                  >
                    <option value="Confidential 1-on-1 (Online)">Confidential 1-on-1 (Online)</option>
                    <option value="In-Person (Student Center Rm 204)">In-Person (Student Center Rm 204)</option>
                    <option value="Anonymous Async Text Chat">Anonymous Async Text Chat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Brief Context Note for Counselor (Optional)
                </label>
                <textarea
                  rows={2}
                  maxLength={200}
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  placeholder="e.g., Feeling drained over the past 4 days with midterm deadlines..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 focus:border-violet-500 focus:bg-white outline-none resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Sent pseudonymously as <strong>{pseudonym}</strong>
                  </span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request to Counselor</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* LIVE COUNSELOR REQUEST TRACKER (IF STUDENT SENT ANY REQUEST) */}
      {myRequests.length > 0 && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-violet-200 shadow-xs space-y-3 animate-pop-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-violet-100 text-violet-700">
                <MessageSquareHeart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  My Anonymous Support Requests ({myRequests.length})
                </h3>
                <p className="text-[11px] text-slate-500">
                  Synced live with the Counselor Demo queue under <strong>{pseudonym}</strong>
                </p>
              </div>
            </div>

            <Link
              href="/counselor-demo"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-50 border border-violet-200 text-violet-800 font-bold text-xs hover:bg-violet-100 transition-colors"
            >
              <span>View in Counselor Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {justSubmittedId && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Request sent!</strong> Open the Counselor Demo page to see your request at the top of the intake queue.
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {myRequests.map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-violet-700">{req.pseudonym}</span>
                    <span className="font-bold text-slate-900">{req.topic}</span>
                    <span className="text-slate-400 text-[11px]">• {req.preference}</span>
                  </div>
                  <p className="text-slate-600 italic">&quot;{req.studentNote}&quot;</p>
                  {req.scheduledSlot && (
                    <p className="text-sky-800 font-bold text-[11px] pt-0.5">
                      📅 Counselor Assigned Slot: {req.scheduledSlot}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
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
              </div>
            ))}
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
