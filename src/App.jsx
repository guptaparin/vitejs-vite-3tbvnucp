import React, { useState } from 'react';
import OnboardingForm from './OnboardingForm'; // Fixed import path
import DashboardView from './DashboardView';   // Fixed import path

export default function App() {
  const [profileData, setProfileData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState("");

  const handleFormSubmit = (data) => {
    setIsAnalyzing(true);
    setAnalysisStage("Initializing Predictive Engine...");
    
    setTimeout(() => {
      setAnalysisStage("Mapping track metrics against baseline values...");
    }, 800);
    
    setTimeout(() => {
      setAnalysisStage("Synthesizing dynamic roadmap modules...");
    }, 1600);

    setTimeout(() => {
      setIsAnalyzing(false);
      setProfileData(data); 
    }, 2500);
  };

  const handleReset = () => {
    setProfileData(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center p-4">
      
      {/* HEADER NAVBAR LOGO */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold tracking-wider text-white font-mono flex items-center justify-center gap-2">
          FutureMirror <span className="text-emerald-400">⚡</span>
        </h1>
      </div>

      {/* CORE ROUTING GATE */}
      {isAnalyzing ? (
        <div className="max-w-md mx-auto w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[420px] text-center space-y-6 animate-fade-in">
          <div className="relative flex items-center justify-center h-20 w-20">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping"></div>
            <div className="h-16 w-16 rounded-full border-2 border-dashed border-emerald-400 animate-spin"></div>
            <div className="absolute h-4 w-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-white font-mono uppercase tracking-widest">
              Analyzing Profile
            </h3>
            <p className="text-xs text-zinc-400 font-mono min-h-[32px] max-w-xs transition-all duration-300">
              {analysisStage}
            </p>
          </div>

          <div className="w-full bg-zinc-950 border border-zinc-850 h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-full origin-left animate-pulse rounded-full"></div>
          </div>
        </div>
      ) : profileData ? (
        <DashboardView data={profileData} onReset={handleReset} />
      ) : (
        <OnboardingForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}