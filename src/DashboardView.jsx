import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  Clock, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';

const roleTemplates = {
  "Computer Science": {
    title: "Software Engineering Sync",
    tasks: ["Optimize database queries", "Fix broken API endpoints", "Review GitHub Pull Requests"]
  },
  "Electrical": {
    title: "Hardware & Circuit Lab",
    tasks: ["Analyze circuit breadboard layouts", "Verify Thevenin resistance values", "Calibrate oscilloscope signals"]
  },
  "Mechanical": {
    title: "Manufacturing & Core Ops",
    tasks: ["Generate lathe G-code coordinates", "Calculate casting solidification times", "Inspect CNC tool paths"]
  },
  "Civil Engineering": {
    title: "Structural Design & Infrastructure",
    tasks: ["Review concrete mix designs", "Analyze beam load-bearing calculations", "Check structural AutoCAD layouts"]
  },
  "Biotechnology": {
    title: "Bioinformatics & Lab Ops",
    tasks: ["Analyze DNA sequencing data", "Calibrate bioreactor parameters", "Review enzyme kinetic graphs"]
  },
  "Chemical Engineering": {
    title: "Process Design & Unit Operations",
    tasks: ["Calculate mass balance equations", "Monitor distillation column pressure", "Review P&ID safety schematics"]
  },
  "UI/UX Design": {
    title: "Creative Canvas & Experience",
    tasks: ["Map out interactive user journeys", "Build low-fidelity Figma wireframes", "Conduct user testing interviews"]
  },
  "Business & Management": {
    title: "Product Strategy & Operations",
    tasks: ["Draft marketing sprint milestones", "Analyze customer acquisition funnels", "Prepare financial quarterly forecasts"]
  }
};

export default function DashboardView({ data, onReset }) {
  const cgpaNum = parseFloat(data.cgpa) || 7.0;
  const hoursNum = parseFloat(data.studyHours) || 2;
  const projectCount = parseInt(data.projects) || 0;

  // Track the active template layout based on user dropdown selection
  const currentRole = roleTemplates[data.branch] || roleTemplates["Computer Science"];

  // Calculate Reality Index
  let skillCount = data.skills ? data.skills.split(',').length : 0;
  let baseScore = 0;
  cgpaNum * 6 + hoursNum * 3 + projectCount * 5 + skillCount * 2;
  const realityIndex = Math.min(Math.round(baseScore), 100);

  const isBurnout = hoursNum > 8 && cgpaNum > 9;
  const isDelusional = realityIndex < 45 && hoursNum < 3;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-2 sm:p-4 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full">
            Analysis Complete
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-3">
            Target: {data.goal || 'Software Engineer'}
          </h2>
          <p className="text-zinc-400 text-base mt-1">
            {currentRole.title} — {data.year} Year
          </p>
        </div>
        <button
          onClick={onReset}
          className="w-full md:w-auto mt-4 md:mt-0 md:absolute md:top-6 md:right-6 text-sm font-mono text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-950 px-4 py-2 rounded-xl transition-all duration-200"
        >
          ← Retake Assessment
        </button>
      </div>

      {/* Core Metrics Split Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* BIG REALITY INDEX PANEL */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Reality Index</h3>
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-sm text-zinc-400 mt-1">
              Based on your metrics, here is your alignment probability score.
            </p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-6xl font-black tracking-tight text-white">{realityIndex}%</span>
            </div>
          </div>
        </div>

        {/* DYNAMIC TASKS PANEL */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="text-lg font-semibold text-white">Recommended Roadmap</h3>
          </div>
          <p className="text-xs text-zinc-400 mb-4 font-mono">
            Focus fields for {data.branch || 'Your Track'}:
          </p>
          <ul className="space-y-3">
            {currentRole.tasks.map((task, index) => (
              <li key={index} className="text-sm text-zinc-300 flex items-start gap-2 bg-zinc-950 p-3 rounded-xl border border-zinc-850">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}