import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { trainings } from '../data/trainings.js';
import { getCurrentLanguage, getTranslation } from '../data/translations.js';

const Recommendations = () => {
  const navigate = useNavigate();
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
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

          {/* Header Banner */}
          <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-zinc-700 bg-zinc-800 p-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Official Recommendations</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Recommended Training Programs</h1>
            </div>
            <button
              type="button"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600 transition-all flex items-center gap-1.5 shadow-sm"
              onClick={() => navigate('/analysis')}
            >
              Back to Analysis
            </button>
          </header>

          {/* Training Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {trainings.map((training) => (
              <article key={training.id} className="rounded-3xl border border-zinc-700 bg-zinc-800 p-6 shadow-lg hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700 mb-3">
                        [NSQF Aligned]
                      </span>
                      <h2 className="text-lg font-black text-white leading-snug">{training.title}</h2>
                    </div>
                    <span className="rounded-full bg-zinc-700 border border-zinc-600 px-3 py-1 text-xs font-bold text-zinc-200 shadow-sm flex-shrink-0">
                      {training.match}% Match
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-semibold text-zinc-300 border-t border-zinc-700 pt-4 mb-4">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Skills Covered:</span>
                      <span className="text-zinc-200 text-right">{training.skills.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Duration:</span>
                      <span className="text-zinc-200">{training.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Center Location:</span>
                      <span className="text-zinc-200">{training.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-700/40 p-3.5 rounded-2xl border border-zinc-700 mb-6">
                    {training.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                  onClick={() => navigate('/opportunities')}
                >
                  <span>View Details & Centers</span>
                  <span>-&gt;</span>
                </button>
              </article>
            ))}
          </div>

        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-5 text-center text-xs text-zinc-400 font-semibold bg-zinc-950 border-t border-zinc-800 mt-12">
        <p>© 2026 GramSaksham Portal. Designed for Digital Governance & Rural Empowerment.</p>
      </footer>
    </div>
  );
};

export default Recommendations;
