import React from 'react';
import Link from 'next/link';
import {
  Globe2,
  ShieldCheck,
  Award,
  Database,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Users,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold border border-violet-200">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>GLB300 Interdisciplinary Social Impact Project</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About Campus<span className="text-violet-600">Pulse</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          CampusPulse (KampüsNabız) was created as an interdisciplinary project to explore how
          human-centered technology can cultivate emotional self-reflection and compassionate
          campus communities.
        </p>
      </div>

      {/* CORE SOCIAL IMPACT & UN SDGs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Alignment with UN Sustainable Development Goals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How CampusPulse supports global sustainability and student welfare frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SDG 3 */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-2 border-emerald-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-2.5 py-1 rounded-full">
                UN Goal 3
              </span>
              <Globe2 className="w-6 h-6 text-emerald-600" />
            </div>

            <h3 className="text-xl font-bold text-emerald-950">
              Good Health and Well-Being
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Target 3.4 focuses on promoting mental health and well-being. CampusPulse fosters daily
              emotional literacy among university students, encouraging proactive awareness before burnout
              or acute anxiety sets in, and normalizing conversations around emotional health on campus.
            </p>

            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Encourages daily mindfulness and micro-reflection</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Direct signposting to campus psychological services</span>
              </li>
            </ul>
          </div>

          {/* SDG 16 */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-50 via-indigo-50 to-white border-2 border-sky-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-sky-800 bg-sky-200/80 px-2.5 py-1 rounded-full">
                UN Goal 16
              </span>
              <ShieldCheck className="w-6 h-6 text-sky-600" />
            </div>

            <h3 className="text-xl font-bold text-sky-950">
              Peace, Justice & Safe Institutions
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Higher education institutions thrive when their environments are psychologically safe,
              inclusive, and respectful. CampusPulse gives students a voice to reflect on campus
              comfort, promoting empathy for isolated peers without invasive peer-monitoring or disciplinary surveillance.
            </p>

            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Monitors general campus climate ethically</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Nurtures peer-to-peer solidarity and empathy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ETHICAL COMMITMENTS & PRIVACY BY DESIGN */}
      <div id="ethics" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-violet-400 bg-violet-950 px-2.5 py-0.5 rounded-full border border-violet-800">
            Ethics Charter
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
            Our Ethical Commitments & Privacy Manifesto
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            As future computer engineers, we uphold stringent ethical guardrails against algorithmic harm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-violet-300 font-bold">
              <Lock className="w-4 h-4 text-violet-400" />
              <span>100% Voluntary & Anonymous</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Check-ins are never mandatory. We do not collect student ID numbers, full names, IP addresses,
              or device fingerprints.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-violet-300 font-bold">
              <AlertCircle className="w-4 h-4 text-violet-400" />
              <span>Strictly Non-Diagnostic</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              CampusPulse is not a psychiatric diagnosis tool. It will never assign medical categories,
              pathology labels, or risk scores to any individual.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-violet-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span>No Surveillance or Prediction</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We reject violence prediction algorithms and disciplinary reporting. Peer check questions
              do not record classmate names or trigger automated investigations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-violet-300 font-bold">
              <Database className="w-4 h-4 text-violet-400" />
              <span>Client-Side Prototype Transparency</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In this first phase, data lives solely in your browser&apos;s localStorage. You can clear or
              reset it at any time from your dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* TECH STACK & ARCHITECTURE (FOR COMPUTER ENGINEERING DEMO) */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-purple-100 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-violet-600 bg-violet-100 px-2.5 py-0.5 rounded-full">
            Engineering Blueprint
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            Prototype Architecture & Future Roadmap
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Built cleanly with modern frontend foundations, ready for future institutional scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="font-bold text-slate-800 text-sm mb-1">Current Prototype</h4>
            <ul className="space-y-1 text-slate-600">
              <li>• Next.js App Router & React 19</li>
              <li>• Tailwind CSS v4 design system</li>
              <li>• TypeScript strict types</li>
              <li>• Browser localStorage state</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200">
            <h4 className="font-bold text-violet-900 text-sm mb-1">Phase 2: Supabase</h4>
            <ul className="space-y-1 text-violet-800">
              <li>• Row Level Security (RLS)</li>
              <li>• Pseudonymous student tokens</li>
              <li>• Aggregated heatmaps for campus climate</li>
              <li>• Opt-in counselor appointment booking</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="font-bold text-slate-800 text-sm mb-1">Institutional Governance</h4>
            <ul className="space-y-1 text-slate-600">
              <li>• University Ethics Board (IRB) review</li>
              <li>• Student Union oversight committee</li>
              <li>• Transparent open data audits</li>
              <li>• Zero ad-tech / marketing trackers</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Presented for GLB300 Project Fair • Computer Engineering</span>
          </div>

          <Link
            href="/check-in"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-700 shadow-sm transition-colors"
          >
            <span>Try the Interactive Check-in</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
