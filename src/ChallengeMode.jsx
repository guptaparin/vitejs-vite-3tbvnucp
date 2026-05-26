import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Flame, Plus } from 'lucide-react';

export default function ChallengeMode({ gamification, setGamification, onBack }) {
  const [profile] = useState(() => {
    const saved = localStorage.getItem('fm_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [customMissionText, setCustomMissionText] = useState('');

  // The task logic setup: reads the goal keyword directly from your profile form data
  const getInitialTasks = () => {
    const goalText = profile ? profile.goal.toLowerCase() : '';
    
    if (goalText.includes('cnc') || goalText.includes('mechanical') || goalText.includes('manufacturing') || goalText.includes('cad')) {
      return [
        { id: 1, text: 'Validate tool compensation offsets and G-code absolute positioning coordinates on a sample profile layout', completed: false, xp: 50 },
        { id: 2, text: 'Perform a solidification cooling time simulation calculation using Chvorinov’s rule variations', completed: false, xp: 40 },
        { id: 3, text: 'Audit standard metric fits and tolerances tables to isolate upper deviation limits for type J hole zones', completed: false, xp: 60 }
      ];
    }
    
    if (goalText.includes('circuit') || goalText.includes('electrical') || goalText.includes('electronics') || goalText.includes('ee')) {
      return [
        { id: 1, text: 'Construct a multi-loop circuit node schematic and derive open-circuit voltage via Thevenin’s equivalent model', completed: false, xp: 50 },
        { id: 2, text: 'Calculate maximum power transfer impedance parameters across complex reactive loads', completed: false, xp: 40 },
        { id: 3, text: 'Debug signal attenuation matrices or calculate acoustic reverberation times using Sabine’s formula factors', completed: false, xp: 60 }
      ];
    }

    if (goalText.includes('dev') || goalText.includes('code') || goalText.includes('software') || goalText.includes('web') || goalText.includes('fullstack')) {
      return [
        { id: 1, text: 'Optimize sub-routing states and implement custom data-persistence hooks using window local storage matrices', completed: false, xp: 50 },
        { id: 2, text: 'Audit network latency payloads and map raw API fetch payloads inside an asynchronous rendering lifecycle loop', completed: false, xp: 40 },
        { id: 3, text: 'Profile runtime computation loops to isolate structural memory bottlenecks or layout reflow paint delays', completed: false, xp: 60 }
      ];
    }

    // Standard baseline tasks if profile goal isn't set yet
    return [
      { id: 1, text: 'Audit top-tier technical portfolio documentation architectures matching current goals', completed: false, xp: 50 },
      { id: 2, text: 'Isolate structural parameters and run a 45-minute isolated sandbox optimization sprint', completed: false, xp: 40 },
      { id: 3, text: 'Draft a visual micro functional deployment sketch file mapping out module data dependencies', completed: false, xp: 60 }
    ];
  };

  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem('fm_missions_list');
    return saved ? JSON.parse(saved) : getInitialTasks();
  });

  useEffect(() => {
    localStorage.setItem('fm_missions_list', JSON.stringify(missions));
  }, [missions]);

  const handleToggleMission = (id, isCompleted, xpValue) => {
    setMissions(missions.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
    
    setGamification(prev => {
      const modifier = !isCompleted ? xpValue : -xpValue;
      let newXp = prev.xp + modifier;
      let newLevel = prev.level;

      if (newXp >= 200) {
        newXp = newXp - 200;
        newLevel += 1;
      } else if (newXp < 0) {
        newXp = 200 + newXp;
        newLevel = Math.max(1, newLevel - 1);
      }

      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const handleAddCustomMission = (e) => {
    e.preventDefault();
    if (!customMissionText.trim()) return;

    setMissions([...missions, {
      id: Date.now(),
      text: customMissionText.trim(),
      completed: false,
      xp: 30
    }]);
    setCustomMissionText('');
  };

  const completedCount = missions.filter(m => m.completed).length;

  return (
    <div className="space-y-6 w-full">
      <div>
        <button onClick={onBack} className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
          ← Return to OS Hub
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Target className="h-5 w-5 text-cyan-400" /> Active Daily Sprints
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                {completedCount}/{missions.length} Finished
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {missions.map(mission => (
                <div 
                  key={mission.id} onClick={() => handleToggleMission(mission.id, mission.completed, mission.xp)}
                  className={`border p-4 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none ${
                    mission.completed ? 'bg-zinc-950/40 border-emerald-500/20 text-zinc-500' : 'bg-zinc-950 border-zinc-850 text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${mission.completed ? 'text-emerald-500' : 'text-zinc-700'}`} />
                    <span className={`text-sm tracking-wide ${mission.completed ? 'line-through' : ''}`}>{mission.text}</span>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${mission.completed ? 'bg-zinc-900 text-zinc-600' : 'bg-cyan-500/10 text-cyan-400'}`}>
                    +{mission.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleAddCustomMission} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex gap-4 items-end">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-mono uppercase text-zinc-500">Inject Custom Sprint Node</label>
              <input 
                type="text" placeholder="Inject a custom personal milestone..." value={customMissionText} 
                onChange={e => setCustomMissionText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm px-4 py-2 rounded-xl h-9 flex items-center gap-1 transition-colors">
              <Plus className="h-4 w-4" /> Inject
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold px-2.5 py-1 rounded-xl text-xs font-mono">
              <Flame className="h-4 w-4 fill-amber-500/20" /> {gamification.streak} DAY STREAK
            </div>
            <div className="pt-4">
              <div className="h-16 w-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-inner text-cyan-400 text-xl font-bold font-mono">
                Lvl {gamification.level}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Ecosystem Operational Target</h4>
              <p className="text-[11px] text-cyan-400 font-mono mt-1 uppercase tracking-wider bg-cyan-500/5 py-1 px-2 rounded border border-cyan-500/10 inline-block max-w-full truncate">
                🎯 {profile ? profile.goal : "Uncalibrated"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}