import React from 'react';
import {
  Heart,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Clock,
  Compass,
  MapPin,
  ExternalLink,
  Coffee,
} from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Campus Support & Resources
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Seeking support is a sign of strength and self-awareness. You don&apos;t have to carry everything alone.
        </p>
      </div>

      {/* SECTION 1: GENERAL CAMPUS SUPPORT INFORMATION */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-violet-100 text-violet-700">
            <Heart className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Everyday Well-Being & Peer Support
            </h2>
            <p className="text-xs text-slate-500">Simple ways to reset during stressful weeks.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-violet-50/60 border border-violet-100 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-violet-950">
              <Coffee className="w-4 h-4 text-violet-600" />
              <span>Connect with Peers</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Grab a quick coffee or tea with a friend. Sharing honest feelings often shows you aren&apos;t the only one feeling stretched.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sky-950">
              <Compass className="w-4 h-4 text-sky-600" />
              <span>Campus Quiet Spaces</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Take advantage of quiet study corners, campus green lawns, or student club lounges when you need a 15-minute mental breather.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Academic Advisors</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              If course loads feel impossible, talk to course instructors or academic mentors about extensions or study strategies.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: VOLUNTARY COUNSELING REFERRAL PLACEHOLDER */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-purple-100 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
              University Center Placeholder
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Campus Psychological Counseling & Guidance (PDRM)
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Confidential & Free for Students
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Most universities provide free, strictly confidential psychological counseling sessions for
          enrolled students. Below is a placeholder for your university&apos;s verified public office details:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-violet-600" />
              <span>Location</span>
            </div>
            <p className="text-slate-500">
              [DEMO PLACEHOLDER: Student Center, Building B, Room 204]
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Clock className="w-4 h-4 text-violet-600" />
              <span>Hours</span>
            </div>
            <p className="text-slate-500">
              [DEMO PLACEHOLDER: Mon – Fri: 09:00 - 17:00]
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ExternalLink className="w-4 h-4 text-violet-600" />
              <span>Appointments</span>
            </div>
            <p className="text-slate-500">
              [DEMO PLACEHOLDER: Official portal e.g. pdrm.university.edu]
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Evaluation Transparency:</strong> CampusPulse is a demonstration frontend. It does not contact or transmit data to university counselors. Please book directly with your campus center.
          </p>
        </div>
      </div>

      {/* SECTION 3: CLEARLY IDENTIFIED EMERGENCY SUPPORT RESOURCES */}
      <div className="bg-rose-50/70 rounded-3xl p-6 sm:p-7 border-2 border-rose-300 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-600 text-white shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-rose-950">
              Immediate Safety & Crisis Helplines
            </h2>
            <p className="text-xs text-rose-800">
              If you or someone around you is in acute emotional distress or immediate danger:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-rose-200 space-y-1">
            <span className="font-bold text-rose-600 uppercase text-[11px] block">
              National Emergency Dispatch
            </span>
            <p className="text-base font-black text-slate-900">
              112 (EU / Turkey) &bull; 911 (US)
            </p>
            <p className="text-slate-500 text-[11px]">
              Call directly for urgent ambulance, police, or emergency assistance.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-rose-200 space-y-1">
            <span className="font-bold text-rose-600 uppercase text-[11px] block">
              National Crisis Hotline
            </span>
            <p className="text-base font-black text-slate-900">
              988 (Suicide & Crisis Lifeline)
            </p>
            <p className="text-slate-500 text-[11px]">
              Free, confidential 24/7 mental health crisis support hotline.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-rose-900/80 leading-relaxed">
          <strong>Important:</strong> CampusPulse does not dispatch emergency services and has no automated intervention capability. Always reach out to public emergency numbers for acute safety situations.
        </p>
      </div>
    </div>
  );
}
