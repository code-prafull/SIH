import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import videoSource from '../assets/WhatsApp Video 2026-09-16 at 10.45.29 AM.mp4';
import Navbar from '../components/Navbar.jsx';
import { getCurrentLanguage, getTranslation } from '../data/translations.js';

const Home = () => {
  const [language, setLanguage] = useState(getCurrentLanguage());

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(getCurrentLanguage());
    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  const t = getTranslation(language);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-slate-950 text-white">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover filter brightness-75 scale-105">
        <source src={videoSource} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-900/40 to-slate-950/50 backdrop-blur-[2px]" />

      <div className="relative z-20">
        <Navbar />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center px-4 py-20 sm:py-32 my-auto">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-slate-200 border border-white/20 shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {t.heroBadge}
        </div>

        <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight drop-shadow-md">
          {t.heroTitle}
        </h1>

        <div className="mt-5 flex items-center justify-center gap-2 text-slate-300 font-medium text-sm sm:text-base">
          <span className="bg-white/10 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md">
            {t.heroMeta1}
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-300">{t.heroMeta2}</span>
        </div>

        <p className="mt-5 text-sm sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
          {t.heroText}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/language"
            className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-4 px-10 rounded-2xl shadow-2xl shadow-blue-600/50 transition-all duration-300 flex items-center justify-center gap-3 text-sm sm:text-base border border-blue-400/40 group"
          >
            <span>{t.getStarted}</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>

          <Link
            to="/assistant"
            className="bg-white/10 hover:bg-white/15 text-white font-extrabold py-4 px-10 rounded-2xl border border-white/20 transition-all duration-300 text-sm sm:text-base"
          >
            {t.openAssistant}
          </Link>
        </div>
      </main>

      <footer className="relative z-10 py-5 text-center text-xs text-slate-400 font-medium bg-transparent backdrop-blur-xl border-t border-white/10">
        <p>© 2026 {t.brand}. Designed for Digital Governance & Rural Empowerment.</p>
      </footer>
    </div>
  );
};

export default Home;
