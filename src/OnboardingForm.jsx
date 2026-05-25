import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Target, Award, ShieldAlert, Sparkles } from 'lucide-react';

export default function OnboardingForm({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    year: '1st Year',
    branch: 'Computer Science',
    skills: '',
    cgpa: '',
    projects: '0',
    studyHours: '2'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onComplete) {
      onComplete(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-zinc-400 mb-2 font-mono">
          <span>PHASE {step} OF 3</span>
          <span>{Math.round((step / 3) * 100)}% ANALYSIS READY</span>
        </div>
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: THE TARGET */}
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <Target className="text-emerald-400 w-6 h-6" />
              <h2 className="text-xl font-bold tracking-tight">Define Your Ultimate Vision</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">What is your dream career goal?</label>
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="e.g., Google Internship, Startup Founder, AI Engineer"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Current Academic Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Branch / Major</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: THE ARSENAL */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <Award className="text-purple-400 w-6 h-6" />
              <h2 className="text-xl font-bold tracking-tight">Academic & Tech Foundations</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Current CGPA</label>
                <input
                  type="number"
                  name="cgpa"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Number of Projects</label>
                <input
                  type="number"
                  name="projects"
                  min="0"
                  value={formData.projects}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Current Skills (Comma Separated)</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., Python, React, C++, Data Structures"
                rows="3"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 3: THE REALITY CHECK */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="text-cyan-400 w-6 h-6" />
              <h2 className="text-xl font-bold tracking-tight">Daily Commitment Matrix</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Daily Coding / Study Hours: <span className="text-cyan-400 font-mono font-bold">{formData.studyHours}h</span>
              </label>
              <input
                type="range"
                name="studyHours"
                min="1"
                max="16"
                value={formData.studyHours}
                onChange={handleChange}
                className="w-full accent-cyan-400 h-2 bg-zinc-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1 font-mono">
                <span>1 hr</span>
                <span>8 hrs (Intense)</span>
                <span>16 hrs (Max)</span>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-400 flex gap-3 items-start">
              <Sparkles className="text-yellow-400 w-5 h-5 shrink-0 mt-0.5" />
              <p>
                By hitting submit, the engine will parse your data fields through our baseline calibration metrics to map your trajectory gap.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-zinc-800 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft w={4} h={4} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors ml-auto"
            >
              Continue <ArrowRight w={4} h={4} />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 transition-shadow shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] ml-auto"
            >
              Generate Reality Mirror ➔
            </button>
          )}
        </div>
      </form>
    </div>
  );
}