import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle,
  Flame,
  Clock,
  BookOpen,
  Award,
  Compass
} from 'lucide-react';

// Pure Goal-First Predictive Mapping Engine
const generateSmartRoadmap = (branch, goalInput) => {
  const goal = (goalInput || '').toLowerCase();
  
  // ---------------------------------------------------------
  // TRACK 0: BIG TECH INTERNSHIPS (Google, Microsoft, etc.)
  // ---------------------------------------------------------
  if (goal.includes("google") || goal.includes("microsoft") || goal.includes("faang") || goal.includes("meta")) {
    if (goal.includes("market") || goal.includes("growth") || goal.includes("sales")) {
      return {
        title: "Global Tech Business & Marketing Operations",
        tasks: [
          "Study global ad-tech frameworks and optimize product positioning campaigns.",
          "Analyze multi-channel regional acquisition datasets to evaluate customer conversion trends.",
          "Construct comprehensive go-to-market strategies measuring specific localization performance metrics."
        ],
        isPivot: branch !== "Business & Management"
      };
    }
    
    return {
      title: "Google / FAANG Technical Internship Track",
      tasks: [
        "Master foundational Data Structures & Algorithms (Graphs, Trees, DP) and maintain active problem-solving streaks.",
        "Practice whiteboarding and writing clean, production-ready code in an unassisted environment.",
        "Build a deep, high-impact system showcase proving scalability, memory efficiency, and robust backend handling."
      ],
      isPivot: branch !== "Computer Science"
    };
  }

  // ---------------------------------------------------------
  // NEW TRACK: ACADEMIA, TEACHING & EDUCATION
  // ---------------------------------------------------------
  if (goal.includes("teacher") || goal.includes("professor") || goal.includes("lecturer") || goal.includes("educator") || goal.includes("teaching")) {
    return {
      title: `Academic Pedagogy & Educational Strategy (${branch})`,
      tasks: [
        `Develop comprehensive lesson plans and interactive lab modules centered around foundational ${branch} principles.`,
        "Master modern pedagogical communication models, instructional delivery techniques, and technical assessment metrics.",
        "Design clear conceptual visual aids or micro-projects to help students easily bridge the gap between theory and practical application."
      ],
      isPivot: true // Highlights that they are focusing on the educational deployment of their branch
    };
  }

  // ---------------------------------------------------------
  // TRACK 1: MARKETING & GROWTH CHANNELS
  // ---------------------------------------------------------
  if (goal.includes("marketing") || goal.includes("growth") || goal.includes("seo") || goal.includes("brand")) {
    return {
      title: "Marketing Strategy & Growth Operations",
      tasks: [
        "Map out multi-channel customer acquisition funnels and audit conversion drop-off points.",
        "Set up data-driven tracking dashboards measuring CAC (Customer Acquisition Cost) and LTV ratios.",
        "Structure a comprehensive content or performance marketing campaign with defined A/B testing metrics."
      ],
      isPivot: branch !== "Business & Management"
    };
  }

  // ---------------------------------------------------------
  // TRACK 2: PRODUCT MANAGEMENT & CONSULTING
  // ---------------------------------------------------------
  if (goal.includes("product manager") || goal.includes("pm") || goal.includes("consult") || (goal.includes("analyst") && !goal.includes("data"))) {
    return {
      title: "Product Strategy & Product Lifecycle Management",
      tasks: [
        "Draft a comprehensive PRD (Product Requirement Document) outlining feature scopes and user personas.",
        "Map out interactive user journey lines to eliminate onboarding friction vectors.",
        "Prioritize product backlog features using quantitative frameworks like RICE or MoSCoW matrices."
      ],
      isPivot: branch !== "Business & Management" && branch !== "UI/UX Design"
    };
  }

  // ---------------------------------------------------------
  // TRACK 3: DATA SCIENCE & PREDICTIVE ANALYTICS
  // ---------------------------------------------------------
  if (goal.includes("data") || goal.includes("ai") || goal.includes("ml") || goal.includes("intelligence")) {
    return {
      title: "Data Analytics & Predictive Intelligence Pipeline",
      tasks: [
        "Build automated data cleaning and aggregation pipelines using Python (Pandas/NumPy).",
        "Construct interactive visualization stories using relational modeling metrics (SQL/PowerBI).",
        "Train and optimize foundational statistical models to isolate behavioral predictive patterns."
      ],
      isPivot: branch !== "Computer Science"
    };
  }

  // ---------------------------------------------------------
  // TRACK 4: SOFTWARE ENGINEERING & DEVELOPMENT
  // ---------------------------------------------------------
  if (goal.includes("software") || goal.includes("web") || goal.includes("dev") || goal.includes("code") || goal.includes("frontend") || goal.includes("backend")) {
    return {
      title: "Advanced Software Architecture & System Sync",
      tasks: [
        "Optimize backend server queries and implement structured caching layers to drop fetch latencies.",
        "Design production-ready version control tracking branches with explicit documentation structures.",
        "Audit application security variables and map robust RESTful API state architectures."
      ],
      isPivot: branch !== "Computer Science"
    };
  }

  // ---------------------------------------------------------
  // TRACK 5: UI/UX & CREATIVE DIRECTION
  // ---------------------------------------------------------
  if (goal.includes("design") || goal.includes("ux") || goal.includes("ui") || goal.includes("creative") || goal.includes("graphics")) {
    return {
      title: "User Experience Architecture & Design Tokens",
      tasks: [
        "Construct pixel-perfect high-fidelity screens utilizing responsive structural grid boundaries.",
        "Establish standardized UI component libraries and unified interactive design token layers.",
        "Run multi-variant prototype usability testing maps to extract visual layout adjustments."
      ],
      isPivot: branch !== "UI/UX Design"
    };
  }

  // ---------------------------------------------------------
  // CORE BRANCH FALLBACKS (Only runs if no cross-domain role is typed)
  // ---------------------------------------------------------
  if (branch === "Mechanical") {
    return {
      title: "Mechanical Systems & Advanced Automation Sync",
      tasks: [
        "Generate absolute coordinate logic files for custom CNC toolpath tracking profiles.",
        "Calculate geometric thermal tolerances and material solidification metrics across variable molds.",
        "Execute detailed load, torque, and kinematic mass displacement balance formulas."
      ],
      isPivot: false
    };
  }

  if (branch === "Electrical") {
    return {
      title: "Hardware Engineering & Circuit Parameter Sync",
      tasks: [
        "Analyze multi-loop network loops mapping precise loop thresholds and current parameters.",
        "Calibrate operational signal streams to screen out ambient electromagnetic distortions.",
        "Program hardware control execution arrays using foundational embedded processing code."
      ],
      isPivot: false
    };
  }

  if (branch === "Civil Engineering") {
    return {
      title: "Structural Integrity & Infrastructure Planning",
      tasks: [
        "Run structural mass settlement calculations tracking variable foundational load properties.",
        "Formulate precise material compression configurations against safety stress limits.",
        "Draft spatial topographic maps mapping structural elevations across boundary areas."
      ],
      isPivot: false
    };
  }

  if (branch === "Biotechnology" || branch === "Chemical Engineering") {
    return {
      title: "Chemical Unit Operations & Sequencing Controls",
      tasks: [
        "Balance automated mass conservation formulas measuring complex fluid transfer gradients.",
        "Map optimal chemical acceleration parameters inside processing environmental controls.",
        "Monitor biometric culture logs to systematically isolate peak compounding outputs."
      ],
      isPivot: false
    };
  }

  // Standard Baseline Global Path
  return {
    title: "Strategic Industry Optimization Sync",
    tasks: [
      "Audit target skill requirements listed across top-tier competitive market job boards.",
      "Construct a highly detailed technical build showcase proving practical application skill.",
      "Establish routine benchmark cycles evaluating execution speeds against roadmap nodes."
    ],
    isPivot: false
  };
};

export default function DashboardView({ data, onReset }) {
  const [liveHours, setLiveHours] = useState(parseFloat(data.studyHours) || 2);
  const [liveProjects, setLiveProjects] = useState(parseInt(data.projects) || 0);
  const [liveCgpa, setLiveCgpa] = useState(parseFloat(data.cgpa) || 7.0);

  // Dynamic state scoring variables
  let skillCount = data.skills ? data.skills.split(',').length : 0;
  let baseScore = (liveCgpa * 6) + (liveHours * 4) + (liveProjects * 6) + (skillCount * 2);
  const realityIndex = Math.min(Math.round(baseScore), 100);

  const isBurnout = liveHours > 8 && liveCgpa > 9;
  const isDelusional = realityIndex < 45 && liveHours < 3;

  // Fire the completely overhauled routing system
  const currentPath = generateSmartRoadmap(data.branch, data.goal);

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-2 sm:p-4 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full">
              Dynamic Alignment Model
            </span>
            {currentPath.isPivot && (
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-full animate-pulse">
                Custom Roadmap Sync
              </span>
            )}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-3">
            Target: {data.goal || 'Custom Growth Path'}
          </h2>
          <p className="text-zinc-400 text-base mt-1">
            {currentPath.title} <span className="text-zinc-600 font-mono mx-1">|</span> <span className="text-zinc-500 font-mono text-sm">Background: {data.branch} ({data.year})</span>
          </p>
        </div>
        <button
          onClick={onReset}
          className="w-full md:w-auto mt-4 md:mt-0 md:absolute md:top-6 md:right-6 text-sm font-mono text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-950 px-4 py-2 rounded-xl transition-all duration-200"
        >
          ← Retake Assessment
        </button>
      </div>

      {/* Core Split Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT PANEL: SANDBOX SETTINGS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* INDEX SCORE */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Reality Alignment Index</h3>
                <Activity className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-sm text-zinc-400 mt-1">
                Your probability index mapping tracking metrics straight against targeted marketplace standards.
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-6xl font-black tracking-tight text-white transition-all duration-300">
                  {realityIndex}%
                </span>
              </div>
            </div>

            {/* Warning Boxes */}
            <div className="mt-6 pt-6 border-t border-zinc-800 space-y-4">
              {isBurnout && (
                <div className="flex gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 animate-fade-in">
                  <Flame className="h-5 w-5 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="font-semibold text-sm text-white">High Burnout Velocity</h4>
                    <p className="text-xs text-zinc-400 mt-1">Your daily hours are peaking high. Ensure you are locking in solid execution strategies over pure time volume.</p>
                  </div>
                </div>
              )}

              {isDelusional && (
                <div className="flex gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-amber-400 animate-fade-in">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-white">Execution Gap Notice</h4>
                    <p className="text-xs text-zinc-400 mt-1">Your tracking metrics are sparse relative to the competitive benchmark of your goal. Elevate production builds or output speeds to stabilize.</p>
                  </div>
                </div>
              )}

              {!isBurnout && !isDelusional && (
                <div className="flex gap-3 bg-zinc-950 border border-zinc-850 rounded-xl p-4 text-zinc-400 animate-fade-in">
                  <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-white">Sustainable Progress Vector</h4>
                    <p className="text-xs text-zinc-500 mt-1">Your active parameters look stable and functional. Continue hitting your targeted roadmap milestones.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SANDBOX CONTROLS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-white">Strategic Sandbox Optimizations</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Adjust variables live to monitor real-time alignment scores.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400 flex items-center gap-1.5"><Clock className="h-4 w-4" /> Daily Output Commitment</span>
                  <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-xs">{liveHours} hrs/day</span>
                </div>
                <input 
                  type="range" min="0" max="16" step="0.5"
                  value={liveHours} 
                  onChange={(e) => setLiveHours(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-950 h-2 rounded-lg cursor-pointer appearance-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400 flex items-center gap-1.5"><Award className="h-4 w-4" /> Comprehensive Target Builds</span>
                  <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-xs">{liveProjects} Projects</span>
                </div>
                <input 
                  type="range" min="0" max="10" step="1"
                  value={liveProjects} 
                  onChange={(e) => setLiveProjects(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-950 h-2 rounded-lg cursor-pointer appearance-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400 flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Baseline Tracking Grade Score</span>
                  <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-xs">{liveCgpa.toFixed(2)} Score</span>
                </div>
                <input 
                  type="range" min="5.0" max="10.0" step="0.1"
                  value={liveCgpa} 
                  onChange={(e) => setLiveCgpa(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-950 h-2 rounded-lg cursor-pointer appearance-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: TARGETED ROADMAP */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <Compass className="h-5 w-5" />
            <h3 className="text-lg font-semibold text-white">Targeted Roadmap Vectors</h3>
          </div>
          <p className="text-xs text-zinc-400 mb-4 font-mono">
            Direct priorities generated for your target profile:
          </p>
          <ul className="space-y-3">
            {currentPath.tasks.map((task, index) => (
              <li key={index} className="text-sm text-zinc-300 flex items-start gap-2 bg-zinc-950 p-3 rounded-xl border border-zinc-850 hover:border-zinc-700 transition-colors duration-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}