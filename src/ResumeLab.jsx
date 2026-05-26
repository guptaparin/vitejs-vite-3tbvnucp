import React, { useState } from 'react';
import { FileText, UploadCloud, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ResumeLab({ onBack }) {
  const [fileName, setFileName] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [score, setScore] = useState(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFileName("Resume_Draft_Final.pdf");
    setAnalyzing(true);
    
    // Simulate interactive scanner loops
    setTimeout(() => {
      setAnalyzing(false);
      setScore(74);
    }, 1500);
  };

  return (
    <div className="space-y-6 w-full animate-fade-in">
      <div>
        <button onClick={onBack} className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl transition-colors">
          ← Return to OS Hub
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: FILE DROP INTAKE AREA */}
        <div className="lg:col-span-2 space-y-6">
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-zinc-800 hover:border-purple-500/40 bg-zinc-900/30 rounded-2xl p-10 text-center transition-all cursor-pointer group"
          >
            <div className="max-w-sm mx-auto space-y-4">
              <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-purple-400 group-hover:scale-105 transition-transform">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">Drop your resume PDF here</p>
                <p className="text-xs text-zinc-500 font-mono">Supports raw text parsing standard file blocks</p>
              </div>
              <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 px-4 py-2 rounded-xl font-mono transition-colors">
                Select Local File
              </button>
            </div>
          </div>

          {/* RUNTIME SCANNER STATE METRIC */}
          {analyzing && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-2">
              <div className="h-2 w-24 bg-purple-500 rounded-full animate-bounce mx-auto"></div>
              <p className="text-xs font-mono text-purple-400 uppercase tracking-widest">Compiling ATS parsing layers...</p>
            </div>
          )}

          {/* PARSED SUGGESTIONS BLOCKS */}
          {score !== null && !analyzing && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                <ShieldAlert className="h-4 w-4 text-purple-400" /> Scanner Optimization Directives
              </h3>

              <div className="space-y-3 pt-1">
                <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-zinc-200">Missing Quantifiable Metrics</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">Add percentage markers or structural metrics to experience descriptions to bypass impact qualifiers.</p>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-zinc-200">Complex Layout Formatting Flagged</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">Multi-column layouts or graphic blocks frequently trip legacy systems. Standard single-column alignment recommended.</p>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-zinc-200">Contact Block Verified</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">Email, GitHub profile parameters, and LinkedIn hyperlinks successfully identified by standard metadata readers.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SCOREBOARD GAUGES */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-zinc-500 tracking-widest">Parsed ATS Performance Matrix</h4>
            
            <div className="py-4">
              <div className="h-28 w-28 rounded-full border-4 border-purple-500/20 bg-purple-500/5 mx-auto flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white tracking-tighter">
                  {score !== null ? `${score}` : '--'}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Score</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {score !== null 
                ? "Target criteria scoring parameters verified. Address highlighted vulnerabilities to approach the 90+ threshold."
                : "Awaiting candidate file integration payload streams to calculate structural keyword alignment parameters."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}