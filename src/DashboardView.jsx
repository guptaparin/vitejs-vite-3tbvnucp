import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Clock,
  Activity,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

export default function DashboardView({ data, onReset }) {
  const cgpaNum = parseFloat(data.cgpa) || 7.0;
  const hoursNum = parseFloat(data.studyHours) || 2;
  const projectCount = parseInt(data.projects) || 0;

  // Calculate Reality Index
  let skillCount = data.skills ? data.skills.split(',').length : 0;
  let baseScore =
    cgpaNum * 6 + hoursNum * 3 + projectCount * 5 + skillCount * 2;
  const realityIndex = Math.min(Math.round(baseScore), 100);

  const isBurnout = hoursNum > 8 && cgpaNum > 9;
  const isDelusional = realityIndex < 45 && hoursNum < 3;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-2 sm:p-4 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md">
            Analysis Complete
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-3">
            Target: {data.goal || 'Software Engineer'}
          </h2>
          <p className="text-zinc-400 text-base mt-1">
            {data.branch} — {data.year}
          </p>
        </div>
        <button
          onClick={onReset}
          className="w-full md:w-auto text-sm font-mono text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800 hover:border-zinc-700 px-5 py-2.5 rounded-xl transition-all shadow-sm"
        >
          ← Retake Assessment
        </button>
      </div>

      {/* Core Metrics Split Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* BIG REALITY INDEX PANEL */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-6">
            Your Reality Index
          </span>

          <div className="relative flex items-center justify-center mb-6">
            {/* Outer Glowing Ring */}
            <div className="w-44 h-44 rounded-full border-4 border-zinc-800 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.05)]">
              <div className="text-center">
                <span className="text-5xl font-black font-mono text-white tracking-tight">
                  {realityIndex}%
                </span>
                <span className="block text-[10px] text-zinc-500 font-mono mt-1">
                  PROBABILITY MATCH
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-200">
              {realityIndex > 75
                ? 'Strong Alignment'
                : realityIndex > 50
                ? 'Moderate Trajectory'
                : 'High Risk Gap'}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed px-2">
              {realityIndex > 75
                ? 'Your current academic standing and daily preparation time match your target milestone. Focus on building advanced projects to lock it in.'
                : realityIndex > 50
                ? 'Your profile is competitive but has key vulnerabilities. Elevating your daily tech stack execution will significantly close the drift.'
                : 'Your goal requires higher input metrics. Increasing deliberate daily skill-building hours will drastically minimize your target vector risk.'}
            </p>
          </div>
        </div>

        {/* DETAILED DIAGNOSTIC CRITIQUE */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 lg:col-span-2 space-y-6 shadow-xl">
          <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Core Profile
            Verification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5">
              <div className="flex items-center gap-3 text-purple-400 mb-2">
                <Clock className="w-5 h-5" />
                <h4 className="font-semibold text-zinc-200 text-base">
                  Execution Speed
                </h4>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                You are logging{' '}
                <span className="text-white font-bold font-mono bg-zinc-900 px-1.5 py-0.5 rounded">
                  {hoursNum} hours
                </span>{' '}
                per day. For high-tier tech goals, scaling this gradually to 4-5
                hours of dedicated coding will hyper-accelerate your progress.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5">
              <div className="flex items-center gap-3 text-cyan-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-semibold text-zinc-200 text-base">
                  Portfolio Density
                </h4>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Current project count:{' '}
                <span className="text-white font-bold font-mono bg-zinc-900 px-1.5 py-0.5 rounded">
                  {projectCount}
                </span>
                . Aim to hit at least 3 high-grade web applications or
                system-level tools before campus recruitment timelines open up.
              </p>
            </div>
          </div>

          {/* Alert Callouts */}
          {isBurnout && (
            <div className="border border-red-900/40 bg-red-950/10 rounded-2xl p-5 flex gap-4 text-red-300 text-sm leading-relaxed">
              <AlertTriangle className="w-6 h-6 shrink-0 text-red-400" />
              <div>
                <strong className="text-red-200 block mb-0.5">
                  Sustained Burnout Risk
                </strong>
                Your inputs are incredibly high. Ensure your pace is sustainable
                so you do not hit exhaustion before peak placement months.
              </div>
            </div>
          )}

          {isDelusional && (
            <div className="border border-yellow-950 bg-yellow-950/10 rounded-2xl p-5 flex gap-4 text-yellow-300 text-sm leading-relaxed">
              <AlertTriangle className="w-6 h-6 shrink-0 text-yellow-500" />
              <div>
                <strong className="text-yellow-200 block mb-0.5">
                  Execution Mismatch Detected
                </strong>
                Your career goal is highly competitive, but your daily input
                speed is on the lower side. Boost daily coding practice to
                bridge the competitive gap.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DEEP ADVICE & STRATEGIC ACTION ITEMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CONCRETE ACTION CHECKLIST */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Immediate Action Plan
            </h3>
            <p className="text-zinc-400 text-xs mt-0.5 font-mono">
              STEP-BY-STEP STRATEGY TO GROW YOUR INDEX
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 items-start bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/40">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  Defend the Academic Line
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Keep your current CGPA robust. Maintaining your score above
                  the critical 8.0 baseline ensures seamless clearance for core
                  company screening rounds on campus.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/40">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  Expand the Arsenal Array
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Your listed skills:{' '}
                  <span className="text-purple-300 font-mono">
                    {data.skills || 'None listed yet'}
                  </span>
                  . Map out your path to learn complex architectures like
                  backend REST APIs, system databases, or modern state
                  management.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/40">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  Build 1 Custom Capstone Asset
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Stop building basic tutorial clones. Create an application
                  that solves an actual real-world issue, and push the source
                  code directly to GitHub.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOM TIMELINE ROADMAP */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Structured Timeline Milestones
            </h3>
            <p className="text-zinc-400 text-xs mt-0.5 font-mono">
              YOUR STRATEGIC CAMPUS ROADMAP
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
            <div className="relative pl-8 group">
              <div className="absolute left-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-zinc-950" />
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-zinc-200">
                  Phase 1: Deep Core Mastery
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  Months 1-3
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Dedicate your time to robust Data Structures & Algorithms (DSA)
                principles and clean code styling. Solve 2-3 structured problems
                daily on platforms to sharpen your approach.
              </p>
            </div>

            <div className="relative pl-8 group">
              <div className="absolute left-[7px] top-1.5 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-zinc-950" />
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-zinc-200">
                  Phase 2: Deployment & Open Source
                </h4>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                  Months 4-6
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Tie your backend logic together with smooth frontend interfaces.
                Learn deployment tools like Vercel, Docker, or AWS to host your
                applications live where recruiters can test them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
