'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  LifeBuoy,
  RotateCcw,
  ShieldCheck,
  Heart,
  Timer,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import MoodSelector from '../../components/MoodSelector';
import CampusFeelingSelector from '../../components/CampusFeelingSelector';
import PeerSupportSelector from '../../components/PeerSupportSelector';
import ConfettiCelebration from '../../components/ConfettiCelebration';
import CrisisHotlineModal from '../../components/CrisisHotlineModal';
import { saveCheckIn } from '../../lib/storage';
import { scanForCrisisKeywords } from '../../lib/crisisScanner';
import { CampusFeeling, CheckInEntry, MOOD_CONFIGS, MoodLevel, PeerObservation } from '../../lib/types';

function CheckInForm() {
  const searchParams = useSearchParams();
  const initialMoodParam = searchParams.get('mood');

  // Steps: 1 (Mood), 2 (Campus), 3 (Peer), 4 (Note)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [campusFeeling, setCampusFeeling] = useState<CampusFeeling | null>(null);
  const [peerObservation, setPeerObservation] = useState<PeerObservation | null>(null);
  const [reflection, setReflection] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedEntry, setSubmittedEntry] = useState<CheckInEntry | null>(null);

  // Sub-15s ergonomics timer
  const startTimeRef = useRef<number | null>(null);
  const [completionSeconds, setCompletionSeconds] = useState<number | null>(null);

  // Tier 2 client-side crisis modal state
  const [crisisModalOpen, setCrisisModalOpen] = useState<boolean>(false);
  const [isDemoCrisisTrigger, setIsDemoCrisisTrigger] = useState<boolean>(false);
  const hasAutoOpenedModalRef = useRef<boolean>(false);

  const crisisScan = scanForCrisisKeywords(reflection);

  const totalSteps = 4;
  const maxChars = 140;

  // Record check-in start timestamp on mount
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Pre-fill mood from URL if passed from homepage
  useEffect(() => {
    if (initialMoodParam) {
      const parsed = parseInt(initialMoodParam, 10);
      if (parsed >= 1 && parsed <= 5) {
        const timer = setTimeout(() => {
          setSelectedMood(parsed as MoodLevel);
          setCurrentStep(2); // Jump straight to step 2 for ultra-fast check-in!
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [initialMoodParam]);

  const canProceed = () => {
    if (currentStep === 1) return selectedMood !== null;
    if (currentStep === 2) return campusFeeling !== null;
    return true; // Steps 3 and 4 are optional/quick
  };

  const handleNext = () => {
    setErrorMessage(null);
    if (!canProceed()) {
      if (currentStep === 1) setErrorMessage('Please pick an emoji to continue.');
      if (currentStep === 2) setErrorMessage('Please select how you felt on campus.');
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setErrorMessage(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReflectionChange = (value: string) => {
    setReflection(value);
    const scan = scanForCrisisKeywords(value);
    if (scan.triggered && !hasAutoOpenedModalRef.current) {
      hasAutoOpenedModalRef.current = true;
      setIsDemoCrisisTrigger(false);
      setCrisisModalOpen(true);
    } else if (!scan.triggered) {
      hasAutoOpenedModalRef.current = false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (currentStep < totalSteps) {
      handleNext();
      return;
    }

    if (!selectedMood) {
      setCurrentStep(1);
      setErrorMessage('Please select your mood.');
      return;
    }
    if (!campusFeeling) {
      setCurrentStep(2);
      setErrorMessage('Please indicate your campus comfort.');
      return;
    }

    // Calculate check-in completion time in seconds
    const elapsedMs = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    const elapsedSec = Math.max(0.5, Number((elapsedMs / 1000).toFixed(1)));
    setCompletionSeconds(elapsedSec);

    const config = MOOD_CONFIGS[selectedMood];
    const newEntry = saveCheckIn({
      mood: selectedMood,
      moodLabel: config.label,
      moodEmoji: config.emoji,
      campusFeeling,
      peerObservation: peerObservation || 'prefer-not-to-say',
      reflection: reflection.trim() || undefined,
    });

    setSubmittedEntry(newEntry);
    setIsSubmitted(true);

    // Ensure Tier 2 modal surfaces if acute distress wording is present on submit
    if (scanForCrisisKeywords(reflection).triggered) {
      setIsDemoCrisisTrigger(false);
      setCrisisModalOpen(true);
    }
  };

  const handleResetForAnother = () => {
    setSelectedMood(null);
    setCampusFeeling(null);
    setPeerObservation(null);
    setReflection('');
    setCurrentStep(1);
    setIsSubmitted(false);
    setSubmittedEntry(null);
    setErrorMessage(null);
    setCompletionSeconds(null);
    hasAutoOpenedModalRef.current = false;
    startTimeRef.current = Date.now();
  };

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto min-h-[75vh] flex flex-col justify-center">
      {/* SUCCESS CELEBRATION */}
      {isSubmitted && submittedEntry ? (
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 border-2 border-purple-200 shadow-2xl text-center animate-pop-in overflow-hidden">
          <ConfettiCelebration />

          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-500 via-pink-500 to-amber-400 flex items-center justify-center text-white mx-auto shadow-md animate-pulse-gentle">
              <Sparkles className="w-8 h-8 text-yellow-200" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
                All done!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Thank you for checking in!
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Your daily check-in is saved in your browser storage.
              </p>

              {/* Sub-15s Ergonomics Completion Time Badge */}
              {completionSeconds !== null && (
                <div className="mt-3 flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      completionSeconds <= 15
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-violet-50 text-violet-800 border-violet-200'
                    }`}
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span>
                      Completed in {completionSeconds}s
                      {completionSeconds <= 15
                        ? ' • Target (<15s) Met!'
                        : ' • Take all the time you need'}
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Concise Summary */}
            <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-500 uppercase tracking-wide">Summary</span>
                <span className="text-slate-400">{submittedEntry.time}</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-2xl">{submittedEntry.moodEmoji}</span>
                <div>
                  <span className="text-slate-500 block">Mood:</span>
                  <strong className="text-slate-800 text-sm">
                    Level {submittedEntry.mood} ({submittedEntry.moodLabel})
                  </strong>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-slate-600">
                <span>Campus Feeling: <strong className="capitalize text-slate-800">{submittedEntry.campusFeeling}</strong></span>
                <span>Peer Note: <strong className="capitalize text-slate-800">{submittedEntry.peerObservation.replace(/-/g, ' ')}</strong></span>
              </div>

              {submittedEntry.reflection && (
                <p className="text-slate-700 italic bg-white p-2 rounded-lg border border-slate-200 mt-1">
                  &quot;{submittedEntry.reflection}&quot;
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <BarChart2 className="w-4 h-4" />
                <span>View My Progress</span>
              </Link>

              <Link
                href="/support"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:border-violet-300 hover:text-violet-700 transition-all"
              >
                <LifeBuoy className="w-4 h-4 text-slate-400" />
                <span>Campus Support</span>
              </Link>

              <button
                type="button"
                onClick={handleResetForAnother}
                className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 py-1 px-2 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try again</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* STEP-BY-STEP CHECK-IN */
        <div className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-purple-100 shadow-xl relative overflow-hidden">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span className="text-violet-700 font-extrabold">Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Validation Alert */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 animate-pop-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Mood */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-pop-in">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    How is your energy and mood today?
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Tap an emoji to select.</p>
                </div>

                <MoodSelector
                  selectedMood={selectedMood}
                  onSelect={(m) => {
                    setSelectedMood(m);
                    setErrorMessage(null);
                  }}
                />
              </div>
            )}

            {/* Step 2: Campus belonging */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-pop-in">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Did you feel safe, comfortable, and respected on campus today?
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Reflect on your campus experience today.</p>
                </div>

                <CampusFeelingSelector
                  value={campusFeeling}
                  onSelect={(v) => {
                    setCampusFeeling(v);
                    setErrorMessage(null);
                  }}
                />
              </div>
            )}

            {/* Step 3: Peer support (Optional) */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-pop-in">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      Noticed a classmate who might need support?
                    </h2>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Promotes peer empathy. We do not ask for names or identifiers.
                  </p>
                </div>

                <PeerSupportSelector
                  value={peerObservation}
                  onSelect={(v) => {
                    setPeerObservation(v);
                    setErrorMessage(null);
                  }}
                />
              </div>
            )}

            {/* Step 4: Reflection (Optional) */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-pop-in">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Anything on your mind?
                      </h2>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        Optional
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      A brief personal note (max 140 chars) with client-side safety check.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDemoCrisisTrigger(true);
                      setCrisisModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold hover:bg-rose-100 transition-colors cursor-pointer"
                    title="Preview the Tier 2 24/7 Emergency Hotline Modal for demo/jury evaluation"
                  >
                    <Zap className="w-3 h-3 text-rose-600" />
                    <span>Test Tier 2 Modal</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    maxLength={maxChars}
                    value={reflection}
                    onChange={(e) => handleReflectionChange(e.target.value)}
                    placeholder="e.g. Good discussion in algorithms class today..."
                    className={`w-full p-4 rounded-2xl border-2 outline-none text-sm text-slate-800 placeholder:text-slate-400 resize-none transition-all ${
                      crisisScan.triggered
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-200/50 bg-rose-50/30'
                        : 'border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-200/50'
                    }`}
                  />
                  <div className="text-right text-[11px] text-slate-400 font-mono mt-1">
                    {reflection.length}/{maxChars}
                  </div>
                </div>

                {/* Inline Tier 2 Alert Banner if crisis keyword is detected */}
                {crisisScan.triggered && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 animate-pop-in">
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Support is available 24/7.</strong> If you are feeling overwhelmed or in distress,
                        you can view immediate helpline contacts right now.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDemoCrisisTrigger(false);
                        setCrisisModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-[11px] hover:bg-rose-700 transition-colors shrink-0 cursor-pointer"
                    >
                      Open 24/7 Helplines
                    </button>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-violet-50 text-[11px] text-violet-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>
                    Client-side safety check active • Please do not enter real names or sensitive personal identifiers.
                  </span>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  key="next-step-btn"
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  key="submit-checkin-btn"
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-violet-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                  <span>Submit Check-in</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Reassurance footer */}
      <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <Heart className="w-3.5 h-3.5 text-rose-400" />
        <span>CampusPulse is voluntary and non-diagnostic.</span>
      </div>

      {/* Tier 2 Emergency 24/7 Hotline Modal */}
      <CrisisHotlineModal
        isOpen={crisisModalOpen}
        onClose={() => setCrisisModalOpen(false)}
        isDemoTrigger={isDemoCrisisTrigger}
      />
    </div>
  );
}

export default function CheckInPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading check-in...</div>}>
      <CheckInForm />
    </Suspense>
  );
}
