import React, { useState } from 'react';
import { Compass, ExternalLink, Sparkles, Building2, Calendar } from 'lucide-react';

export default function OpportunityRadar({ onBack }) {
  const [activeTag, setActiveTag] = useState('All');

  const rawOpps = [
    {
      id: 1,
      title: 'Global Generation AI Hackathon',
      host: 'Anthropic Core Systems',
      type: 'Hackathon',
      reward: '$50,000 Sandbox Grant Pool',
      deadline: 'June 18, 2026',
      link: 'https://devpost.com',
      matchScore: 94
    },
    {
      id: 2,
      title: 'Junior Technical Product Internship',
      host: 'Stripe Global Infrastructure',
      type: 'Internships',
      reward: 'Remote / Competitive Stipend',
      deadline: 'July 02, 2026',
      link: 'https://linkedin.com',
      matchScore: 88
    },
    {
      id: 3,
      title: 'Emerging Scholars Research Fellowship',
      host: 'Schmidt Futures Foundation',
      type: 'Scholarships',
      reward: '$12,000 Operational Allowance',
      deadline: 'June 30, 2026',
      link: 'https://google.com',
      matchScore: 75
    }
  ];

  const categories = ['All', 'Hackathon', 'Internships', 'Scholarships'];
  const filteredOpps = activeTag === 'All' ? rawOpps : rawOpps.filter(opp => opp.type === activeTag);

  return (
    <div className="space-y-6 w-full animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <button onClick={onBack} className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl transition-colors">
          ← Return to OS Hub
        </button>

        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-850 p-1 rounded-xl">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTag(cat)}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-colors ${
                activeTag === cat ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpps.map(opp => (
          <div key={opp.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> {opp.matchScore}% Match
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded">
                  {opp.type}
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight pt-2 group-hover:text-amber-400 transition-colors">
                  {opp.title}
                </h4>
                <p className="text-xs text-zinc-400 flex items-center gap-1 font-medium">
                  <Building2 className="h-3.5 w-3.5 text-zinc-500" /> {opp.host}
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-3 text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">REWARD:</span>
                  <span className="text-zinc-300 font-bold">{opp.reward}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">DEADLINE:</span>
                  <span className="text-zinc-400 flex items-center gap-1"><Calendar className="h-3 w-3" /> {opp.deadline}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-950 flex justify-between items-center">
              <span className="text-[11px] font-mono text-zinc-500">Calibrated</span>
              <a href={opp.link} target="_blank" rel="noreferrer" className="text-xs font-mono font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1">
                Launch Portal <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}