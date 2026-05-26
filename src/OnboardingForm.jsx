import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Terminal, Layers } from 'lucide-react';

export default function OnboardingForm({ onSubmit }) {
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    goal: '',
    branch: 'Computer Science',
    year: '1st Year',
    cgpa: '',
    projects: '0',
    studyHours: '2',
    skills: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl animate-fade-in">
      {/* Progress Track Dots */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-mono text-zinc-500">STEP {step} OF 3</span>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1 w-8 rounded-full transition-all duration-300 ${
                step >= i ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-zinc-800'
              }`} 
            />
          ))}
        </div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : handleNext} className="space-y-6">
        
        {/* STEP 1: TARGET AMBITION */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Terminal className="h-5 w-5 text-emerald-400" /> Target Ambition
              </h2>
              <p className="text-sm text-zinc-400">Define your exact target career path or industry goal.</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Target Role / Goal</label>
              <input
                required
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="e.g., Software Intern, CAD Designer, Product Manager, Data Analyst"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-sans transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Background Domain / Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Computer Science">Computer Science & Engineering</option>
                <option value="Electrical">Electrical Engineering</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="UI/UX Design">UI/UX Design Track</option>
                <option value="Business & Management">Business & Management</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: METRIC MATRIX */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-400" /> Status Tracking
              </h2>
              <p className="text-sm text-zinc-400">Input your timeline placement and performance metrics.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Current Timeline</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="1st Year">1st Year Student</option>
                  <option value="2nd Year">2nd Year Student</option>
                  <option value="3rd Year">3rd Year Student</option>
                  <option value="4th Year">4th Year Student</option>
                  <option value="Recent Graduate">Recent Graduate (Alumni)</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Career Transitioner">Career Transitioner</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Current CGPA / Percentage</label>
                <input
                  required
                  type="number"
                  name="cgpa"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="e.g., 8.56 (or scale out of 10)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Active Projects</label>
                <select
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                >
                  <option value="0">0 Active Builds</option>
                  <option value="1">1 Active Build</option>
                  <option value="2">2 Portfolio Builds</option>
                  <option value="3">3+ Strategic Builds</option>
                  <option value="5">5+ Production-Ready Builds</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Daily Focus Hours</label>
                <select
                  name="studyHours"
                  value={formData.studyHours}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                >
                  <option value="1">1-2 hrs/day</option>
                  <option value="3">3-4 hrs/day</option>
                  <option value="6">5-7 hrs/day</option>
                  <option value="9">8+ hrs/day</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CAPABILITY SET */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-400" /> Capability Set
              </h2>
              <p className="text-sm text-zinc-400">List core stack tags or industry tools separated by commas.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Stack & Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., React, Python, G-Code, AutoCAD, Figma, Excel"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-sans min-h-[120px] transition-colors resize-none"
              />
            </div>
          </div>
        )}

        {/* CONTROLS HUB */}
        <div className="flex gap-4 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white font-mono text-sm border border-zinc-800 rounded-xl py-3 transition-all duration-200"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="flex-[2] bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl py-3 shadow-[0_4px_12px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            {step === 3 ? (
              <>
                <span>Execute Run Analysis</span>
                <Sparkles className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Continue Tracker Setup</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}