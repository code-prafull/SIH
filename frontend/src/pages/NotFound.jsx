import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { getCurrentLanguage, getTranslation } from '../data/translations.js';

const NotFound = () => {
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
        <main className="flex items-center justify-center px-4 py-20 sm:px-6">
          <div className="w-full max-w-md rounded-3xl border border-zinc-700 bg-zinc-800 p-8 text-center shadow-xl">

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-950/50 text-red-300 font-black text-xl mb-4 border border-red-700/60">
              404
            </div>

            <div className="inline-block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-300 bg-red-950/60 px-3 py-1 rounded-full border border-red-700/60 mb-2">
                {t.pageNotFound}
              </p>
            </div>

            <h1 className="mt-2 text-2xl font-black text-white">{t.pageNotFoundTitle}</h1>

            <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
              {t.invalidLinkText}
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:bg-emerald-500 gap-2"
            >
              <span>{t.returnHome}</span>
              <span>-&gt;</span>
            </Link>

          </div>
        </main>
      </div>

      <footer className="relative z-10 py-5 text-center text-xs text-zinc-400 font-semibold bg-zinc-950 border-t border-zinc-800 mt-12">
        <p>© 2026 GramSaksham Portal. Designed for Digital Governance & Rural Empowerment.</p>
      </footer>
    </div>
  );
};

export default NotFound;
