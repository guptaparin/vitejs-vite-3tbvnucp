import React, { useState, useEffect } from 'react';
import { Layers, Plus, AlertCircle, Sparkles, Target, Trash2 } from 'lucide-react';

export default function SkillTracker({ onBack }) {
  // Fetch tracking profiles straight from localized system state
  const [profile] = useState(() => {
    const saved = localStorage.getItem('fm_profile');
    return saved ? JSON.parse(saved) : null;
  });

  // Dynamically initialize state based on what the user actually typed in their profile
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('fm_skills_matrix');
    if (savedSkills) return JSON.parse(savedSkills);

    // Default Fallback Stack IF they haven't run an assessment, customized to their actual input
    if (profile && profile.skills) {
      return profile.skills.split(',').map((s, index) => ({
        id: index,
        name: s.trim(),
        progress: 30, // Default starting milestone
        category: 'Profile Core'
      }));
    }

    // Baseline configuration if profile is completely clean
    return [
      { id: 1, name: 'Core Domain Fundamentals', progress: 40, category: 'Technical' },
      { id: 2, name: 'Professional Communication', progress: 60, category: 'Soft Skills' }
    ];
  });
  
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCat, setNewSkillCat] = useState('Technical');

  // Sync changes to persistence storage layers automatically
  useEffect(() => {
    localStorage.setItem('fm_skills_matrix', JSON.stringify(skills));
  }, [skills]);

  // Dynamic calculations for growth insights
  const avgProgress = skills.length ? Math.round(skills.reduce((acc, curr) => acc + curr.progress, 0) / skills.length) : 0;
  const weakSkills = skills.filter(s => s.progress < 50);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    
    setSkills([...skills, {
      id: Date.now(),
      name: newSkillName.trim(),
      progress: 10,
      category: newSkillCat
    }]);
    setNewSkillName('');
  };

  const handleProgressChange = (id, val) => {
    setSkills(skills.map(s => s.id === id ? { ...s, progress: parseInt(val) } : s));
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 w-full animate-fade-in">
      {/* Return Back Header Bar */}
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl transition-colors">
          ← Return to OS Hub
        </button>

        {profile && (
          <div className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-850 px-4 py-1.5 rounded-xl text-xs font-mono text-zinc-400">
            <Target className="h-3.5 w-3.5 text-emerald-400" />
            <span>Targeting: <strong className="text-white">{profile.goal}</strong></span>
          </div>
        )}
      </div>

      {/* Grid Layout Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: SKILL MATRICES CONTROLLER */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-400" /> Custom Track Matrix
              </h3>
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                {skills.length} Tracked Nodes
              </span>
            </div>

            {/* List Tracking Array mapping slider parameters */}
            <div className="space-y-5 pt-2">
              {skills.length > 0 ? (
                skills.map(skill => (
                  <div key={skill.id} className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl space-y-3 group/item">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-100">{skill.name}</h4>
                        <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">{skill.category}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">
                          {skill.progress}%
                        </span>
                        <button 
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="opacity-0 group-hover/item:opacity-100 p-1 text-zinc-500 hover:text-red-400 rounded transition-all duration-150"
                          title="Remove Skill Node"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="0" max="100" step="5"
                        value={skill.progress}
                        onChange={(e) => handleProgressChange(skill.id, e.target.value)}
                        className="flex-1 accent-blue-500 bg-zinc-900 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 border border-dashed border-zinc-800 rounded-xl">
                  <p className="text-xs text-zinc-500 font-mono">No skill vectors registered. Inject parameters below to begin.</p>
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC SKILL INJECTION INTAKE */}
          <form onSubmit={handleAddSkill} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px] space-y-1.5">
              <label className="text-xs font-mono uppercase text-zinc-500">Inject Target Skill Parameter</label>
              <input 
                type="text" placeholder="e.g., SEO Strategy, G-Code Logic, Pedagogical Models"
                value={newSkillName} onChange={e => setNewSkillName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full sm:w-48 space-y-1.5">
              <label className="text-xs font-mono uppercase text-zinc-500">Classification</label>
              <select 
                value={newSkillCat} onChange={e => setNewSkillCat(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Technical">Technical Stack</option>
                <option value="Soft Skills">Soft Core/Biz</option>
                <option value="Core Domain">Core Domain</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-xl h-9 flex items-center gap-1 transition-colors w-full sm:w-auto justify-center">
              <Plus className="h-4 w-4" /> Add Metric
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: ANALYTICS HUB */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h4 className="text-sm font-mono font-bold uppercase text-zinc-400 tracking-wider">Overall Track Alignment</h4>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tight text-white">{avgProgress}%</span>
            </div>
            <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden mt-4 border border-zinc-850">
              <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${avgProgress}%` }}></div>
            </div>
          </div>

          {/* DYNAMIC WEAK AREA DETECTOR */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-zinc-500 tracking-widest flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-amber-500" /> Vulnerable Metrics
            </h4>
            
            {weakSkills.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-zinc-400 leading-relaxed">The tracking engine isolated these nodes falling short of optimal deployment standards:</p>
                <div className="space-y-1.5 pt-1">
                  {weakSkills.map(s => (
                    <div key={s.id} className="text-xs text-amber-400 bg-amber-500/5 border border-amber-500/10 rounded-lg p-2.5 font-mono">
                      ⚠ {s.name} ({s.progress}%)
                    </div>
                  ))}
                </div>
              </div>
            ) : skills.length > 0 ? (
              <div className="text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 font-mono flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Comprehensive mastery status confirmed! Track parameters look functional.
              </div>
            ) : (
              <p className="text-xs text-zinc-500 font-mono">Waiting for active track inputs...</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}