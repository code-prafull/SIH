import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { getCurrentLanguage, getTranslation, setCurrentLanguage } from '../data/translations.js';

const languages = [
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'en', label: 'English' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
];

const Language = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLanguage());
  const t = getTranslation(selectedLanguage);

  useEffect(() => {
    setCurrentLanguage(selectedLanguage);
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      <div>
        <Navbar />
        <main className="mx-auto max-w-md px-4 py-12 sm:px-6">
          <div className="rounded-3xl border border-zinc-700 bg-zinc-800 p-6 sm:p-8 shadow-xl">
            <div className="mb-6 flex items-center justify-between border-b border-zinc-700 pb-4">
              <button
                type="button"
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600 transition-all flex items-center gap-1.5 shadow-sm"
                onClick={() => navigate('/')}
              >
                {t.back}
              </button>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-zinc-700/80 px-3.5 py-1.5 rounded-full border border-zinc-600">
                {t.portalLocalization}
              </span>
            </div>

            <header className="mb-6">
              <h1 className="text-2xl font-black text-white tracking-tight">{t.languageTitle}</h1>
              <p className="text-xs text-zinc-300 mt-1 font-medium">{t.languageSubtitle}</p>
            </header>

            <div className="space-y-3">
              {languages.map((language) => {
                const isSelected = selectedLanguage === language.code;

                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => setSelectedLanguage(language.code)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-950/60 text-white shadow-md ring-2 ring-emerald-800'
                        : 'border-zinc-700 bg-zinc-700/40 text-zinc-200 hover:bg-zinc-700'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="text-sm sm:text-base font-bold">{language.label}</span>
                    {isSelected ? (
                      <span className="text-xs font-bold bg-emerald-900 text-emerald-200 border border-emerald-600 px-3 py-1 rounded-full shadow-sm">{t.selected}</span>
                    ) : (
                      <span className="text-xs text-zinc-400 font-semibold">{t.select}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-8 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2"
              onClick={() => navigate('/onboarding')}
            >
              <span>{t.continue}</span>
              <span>-&gt;</span>
            </button>
          </div>
        </main>
      </div>

      <footer className="relative z-10 py-5 text-center text-xs text-zinc-400 font-semibold bg-zinc-950 border-t border-zinc-800 mt-12">
        <p>© 2026 GramSaksham Portal. Designed for Digital Governance & Rural Empowerment.</p>
      </footer>
    </div>
  );
};

export default Language;
