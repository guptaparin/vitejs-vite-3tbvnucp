import React from 'react';
import { 
  Activity, 
  Layers, 
  FileText, 
  Compass, 
  BookOpen, 
  Target, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function Hub({ profileData, setActiveModule }) {
  
  const modulesConfig = [
    {
      id: 'reality',
      title: 'Reality Check Engine',
      desc: 'Calculate probability indexing, process micro skill-gap analysis, and tune sandbox variables.',
      icon: Activity,
      color: 'text-emerald-400 border-emerald-500/20 shadow-emerald-950/10',
      badge: 'Live',
      status: 'Active Vector'
    },
    {
      id: 'skills',
      title: 'Skill Growth Matrix',
      desc: 'Log weekly hours, monitor stack growth distributions, and map visual percentage progress tracks.',
      icon: Layers,
      color: 'text-blue-400 border-blue-500/20 shadow-blue-950/10',
      badge: 'Live',
      status: 'Active Vector'
    },
    {
      id: 'resume',
      title: 'ATS Resume Lab',
      desc: 'Verify file scoring parameters, detect missing metadata blocks, and generate dynamic optimization suggestions.',
      icon: FileText,
      color: 'text-purple-400 border-purple-500/20 shadow-purple-950/10',
      badge: 'Coming Soon',
      status: 'Locked'
    },
    {
      id: 'opps',
      title: 'Opportunity Radar',
      desc: 'Filter live curated global hackathons, niche scholarships, and role openings matched to background domains.',
      icon: Compass,
      color: 'text-amber-400 border-amber-500/20 shadow-amber-950/10',
      badge: 'Coming Soon',
      status: 'Locked'
    },
    {
      id: 'study',
      title: 'Study Assistant Core',
      desc: 'Configure personalized revision cadences, prioritize topic tracking blocks, and forecast test prep maps.',
      icon: BookOpen,
      color: 'text-rose-400 border-rose-500/20 shadow-rose-950/10',
      badge: 'Pipeline',
      status: 'Locked'
    },
    {
      id: 'challenge',
      title: 'Challenge Sprints',
      desc: 'Clear daily focus tasks, maintain consecutive active login streaks, and earn premium performance profile badges.',
      icon: Target,
      color: 'text-cyan-400 border-cyan-500/20 shadow-cyan-400/10',
      badge: 'Live',
      status: 'Active Vector'
    }
  ];

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-850 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <TrendingUp className="h-40 w-40 text-white" />
        </div>
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Welcome back, Operator. <span className="animate-pulse text-emerald-400">⚡</span></h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {profileData 
              ? `Your core dashboard is calibrated to optimize track routing fields for [Target: ${profileData.goal}]. Adjust tracking metrics to scale your index.`
              : "FutureMirror system environment initialized. Launch the Reality Check module to configure baseline academic tracking specifications."}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-zinc-500">Available Sub-Systems</h3>
          <p className="text-xs text-zinc-600 mt-0.5">Toggle sub-routing contexts to view specific analytics blocks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesConfig.map((mod) => {
            const IconComponent = mod.icon;
            const isLocked = mod.badge === 'Pipeline' || mod.badge === 'Coming Soon';

            return (
              <div
                key={mod.id}
                onClick={() => !isLocked && setActiveModule(mod.id)}
                className={`bg-zinc-900 border text-left p-6 rounded-2xl flex flex-col justify-between shadow-xl transition-all duration-300 relative group overflow-hidden ${
                  isLocked ? 'opacity-50 cursor-not-allowed border-zinc-850' : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 cursor-pointer hover:-translate-y-0.5'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-xl bg-zinc-950 border border-zinc-850 shadow-inner ${mod.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isLocked 
                        ? 'bg-zinc-950 text-zinc-500 border border-zinc-850' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {mod.badge}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">{mod.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-950 flex justify-between items-center text-[11px] font-mono">
                  <span className="text-zinc-500">{mod.status}</span>
                  {!isLocked && <span className="text-emerald-500 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Execute <ChevronRight className="h-3 w-3" /></span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}