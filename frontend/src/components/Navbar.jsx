import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentLanguage, getTranslation } from '../data/translations.js';
import LanguageSelector from './LanguageSelector.jsx';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [language, setLanguage] = useState(getCurrentLanguage());

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(getCurrentLanguage());
    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  const t = getTranslation(language);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-transparent backdrop-blur-[2px] transition-all duration-300">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-transparent px-4 py-1.5 text-[11px] tracking-wider text-slate-300 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300/80" />
          <span className="font-normal text-slate-300">{t.government}</span>
        </div>
        <div className="hidden items-center gap-4 text-[10px] font-light text-slate-400 sm:flex">
          <span>{t.helpline}</span>
          <span>|</span>
          <span className="text-slate-300">{t.official}</span>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 bg-transparent px-4 py-3.5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none tracking-tight text-white">{t.brand}</span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-slate-400">{t.portal}</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSelector />

          <Link
            to="/assistant"
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-200 ${
              isActive('/assistant')
                ? 'border-white/50 bg-white/20 text-white shadow-xl ring-1 ring-white/30'
                : 'border-white/15 bg-white/10 text-slate-200 hover:bg-white/15'
            }`}
          >
            <svg className="h-4 w-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {t.assistant}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
