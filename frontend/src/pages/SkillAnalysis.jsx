import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { getCurrentLanguage, getTranslation } from '../data/translations.js';

const skillGaps = [
  {
    current: 'Basic Computer',
    target: 'Computer Operator',
    gap: ['Advanced Computer Usage', 'Data Entry', 'Digital Tools'],
    progress: 68,
  },
  {
    current: 'Basic Communication',
    target: 'Customer Support',
    gap: ['Professional English', 'Call Handling', 'Phone Etiquette'],
    progress: 74,
  },
]

const SkillAnalysis = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem('gramsaksham_profile') || '{}');
  const [language, setLanguage] = useState(getCurrentLanguage());
  const t = getTranslation(language);

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(getCurrentLanguage());
    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      <div>
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

          {/* Main Title Banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">Digital Evaluation Report</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              कौशल अंतराल और readiness विश्लेषण
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-medium">
              Skill Gap & Readiness Analysis tailored for your professional growth.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-700 bg-zinc-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">

            {/* Top Bar inside card */}
            <div className="mb-8 flex items-center justify-between border-b border-zinc-700 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-zinc-700/80 px-3.5 py-1.5 rounded-full border border-zinc-600">
                NSQF Verified Assessment
              </span>
              <button
                type="button"
                className="px-4 py-2 text-xs font-bold rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600 transition-all flex items-center gap-1.5 shadow-sm"
                onClick={() => navigate('/assistant')}
              >
                Back to Assistant
              </button>
            </div>

            {/* Profile Skills & Interests Grid */}
            <div className="grid gap-5 md:grid-cols-2">
              <section className="rounded-2xl bg-zinc-700/40 p-5 border border-zinc-600/60 shadow-sm">
                <h2 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-3">Registered Skills / कौशल</h2>
                <div className="flex flex-wrap gap-2">
                  {(profile.skills || ['Basic Computer', 'Communication']).map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-700 text-zinc-200 border border-zinc-600">
                      [Verified] {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-zinc-700/40 p-5 border border-zinc-600/60 shadow-sm">
                <h2 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-3">Selected Interests / प्राथमिकताएं</h2>
                <div className="flex flex-wrap gap-2">
                  {(profile.interests || ['Digital Services', 'Employment']).map((interest) => (
                    <span key={interest} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-700 text-zinc-200 border border-zinc-600">
                      [Interest] {interest}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Livelihood Goal Section */}
            <section className="mt-6 rounded-2xl border border-emerald-600/60 bg-emerald-950/40 p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-300">Target Livelihood Goal / आजीविका लक्ष्य</h2>
              <p className="mt-1.5 text-base sm:text-lg font-black text-emerald-100">
                {profile.goal || 'Computer Operator & Digital Governance Services'}
              </p>
            </section>

            {/* Official Notice Box */}
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-600 bg-zinc-700/30 p-4 text-xs font-medium text-zinc-300 text-center">
              Official Assessment Preview — Verified against National Skill Qualification Framework (NSQF) guidelines.
            </div>

            {/* Skill Gap Summary */}
            <section className="mt-8">
              <h2 className="text-xl font-black text-white mb-5">Skill Gap Summary & Readiness</h2>
              <div className="space-y-6">
                {skillGaps.map((item) => (
                  <div key={item.target} className="rounded-2xl border border-zinc-700 bg-zinc-700/40 p-6 shadow-md hover:border-emerald-500 transition-all">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold text-zinc-400">Current Level: <span className="text-zinc-200">{item.current}</span></p>
                        <p className="text-lg font-black text-white mt-0.5">Target Role: {item.target}</p>
                      </div>
                      <span className="rounded-full bg-emerald-950 border border-emerald-700 px-3.5 py-1 text-xs font-bold text-emerald-300 shadow-sm">
                        Readiness Score: {item.progress}%
                      </span>
                    </div>

                    <div className="mt-5">
                      <ProgressBar label="Readiness Index" value={item.progress} />
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-700">
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300">Identified Skill Gaps to Bridge:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.gap.map((gapItem) => (
                          <span key={gapItem} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-950/50 border border-amber-700/60 text-amber-200">
                            [Gap] {gapItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Official Action Button */}
            <button
              type="button"
              className="mt-8 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2"
              onClick={() => navigate('/recommendations')}
            >
              <span>View Recommended Government Training Programs</span>
              <span>-&gt;</span>
            </button>

          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-5 text-center text-xs text-zinc-400 font-semibold bg-zinc-950 border-t border-zinc-800 mt-12">
        <p>© 2026 GramSaksham Portal. Designed for Digital Governance & Rural Empowerment.</p>
      </footer>
    </div>
  );
}

export default SkillAnalysis;
