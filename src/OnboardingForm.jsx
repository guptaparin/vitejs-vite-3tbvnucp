import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Target, Award, ShieldAlert, Sparkles, BookOpen, Clock } from 'lucide-react';

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
    if (step === 3) {
      onComplete(formData);
    } else {
      nextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 my-8 shadow-xl animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-mono text-zinc-500 mb-2">
          <span>PHASE {step} OF 3</span>
          <span>{Math.round((step / 3) * 100)}% ANALYSIS READY</span>
        </div>
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-5 animate-slide-in">
            <div className="flex items-center gap-2 text-emerald-400">
              <Target className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">Define Your Ultimate Vision</h3>
            </div>
            
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                What is your dream career goal?
              </label>
              <input
                required
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="e.g., Google Internship, Startup Founder, AI Engineer"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Current Academic Year
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Branch / Major
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Chemical Engineering">Chemical Engineering</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Business & Management">Business & Management</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-slide-in">
            <div className="flex items-center gap-2 text-emerald-400">
              <Award className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">Current Asset Check</h3>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Skills & Tech Stack
              </label>
              <p className="text-xs text-zinc-500 mb-2">Separate your entries with commas</p>
              <input
                required
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., React, Python, Figma, Excel"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Current CGPA
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="e.g., 8.5"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Builds / Projects
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-slide-in">
            <div className="flex items-center gap-2 text-emerald-400">
              <Clock className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">Daily Hustle Audit</h3>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Daily Study / Coding Hours (Outside Classes)
              </label>
              <input
                required
                type="number"
                min="0"
                max="24"
                name="studyHours"
                value={formData.studyHours}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 flex gap-3 items-start">
              <ShieldAlert className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400 leading-relaxed">
                <span className="text-amber-500 font-semibold">Note:</span> The system running this calculation values authentic data inputs. Providing overly inflated metrics defaults to a flagged layout response.
              </p>
            </div>
          </div>
        )}

        {/* Form Action Controls */}
        <div className="flex gap-4 pt-2 border-t border-zinc-850">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center justify-center gap-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-200 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
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