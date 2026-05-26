import React, { useState } from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';

export default function RealityCheck({ profileData, setProfileData, onBack }) {
  const [formData, setFormData] = useState(() => {
    return profileData || {
      name: '',
      goal: '',
      cgpa: '',
      backlogs: '0',
      year: '3rd Year'
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const academicYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.goal.trim() || !formData.cgpa) return;

    setProfileData(formData);
    localStorage.setItem('fm_profile', JSON.stringify(formData));
    
    // Clear out the challenge cache key so ChallengeMode naturally regenerates on next mount
    localStorage.removeItem('fm_missions_list');

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div>
        <button onClick={onBack} className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
          ← Return to OS Hub
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-950 pb-4">
          <Activity className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white font-mono uppercase">Reality Check Calibration</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-zinc-500">Name</label>
              <input 
                type="text" required placeholder="Your name..." value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-zinc-500">Target Goal</label>
              <input 
                type="text" required placeholder="e.g., CNC Engineering, Circuits" value={formData.goal}
                onChange={e => setFormData({ ...formData, goal: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-zinc-500">Academic Standing</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {academicYears.map((yr) => (
                <button
                  key={yr} type="button" onClick={() => setFormData({ ...formData, year: yr })}
                  className={`text-xs font-mono py-2.5 rounded-xl border transition-all ${
                    formData.year === yr ? 'bg-emerald-500 text-zinc-950 font-bold border-emerald-400' : 'bg-zinc-950 text-zinc-400 border-zinc-850'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-zinc-500">CGPA</label>
              <input 
                type="number" step="0.01" min="0" max="10" required placeholder="e.g., 8.00" value={formData.cgpa}
                onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-zinc-500">Backlogs</label>
              <select
                value={formData.backlogs} onChange={e => setFormData({ ...formData, backlogs: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              >
                <option value="0">0 Active Blocks</option>
                <option value="1">1 Structural Flag</option>
                <option value="2">2 Structural Flags</option>
                <option value="3">3+ Critical Flags</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-mono font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md">
              Commit Parameters
            </button>
            {savedSuccess && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-500/5 border border-emerald-500/10 px-3 py-2 rounded-xl">
                <CheckCircle2 className="h-4 w-4" /> Parameters Serialized!
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}