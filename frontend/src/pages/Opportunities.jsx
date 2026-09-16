import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapView from '../components/MapView.jsx';
import Navbar from '../components/Navbar.jsx';
import OpportunityCard from '../components/OpportunityCard.jsx';
import { opportunities } from '../data/opportunities.js';
import { getCurrentLanguage, getTranslation } from '../data/translations.js';

const Opportunities = () => {
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
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold tracking-[0.2em] text-emerald-300 uppercase">GIS Livelihood Network</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Jobs & Livelihood Opportunities</h1>
            </div>
            <button
              type="button"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600 transition-all flex items-center gap-1.5 shadow-sm"
              onClick={() => navigate('/recommendations')}
            >
              Back to Recommendations
            </button>
          </header>

          {/* Main Grid: Map & Opportunity Cards */}
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="order-1 rounded-3xl overflow-hidden border border-zinc-700 bg-zinc-800 p-2 shadow-xl">
              <MapView opportunities={opportunities} />
            </div>

            <div className="order-2 space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="rounded-3xl border border-zinc-700 bg-zinc-800 p-4 shadow-md">
                  <OpportunityCard
                    opportunity={opportunity}
                    onViewDetails={(opp) => console.log('Selected opportunity:', opp.title)}
                  />
                </div>
              ))}
            </div>
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

export default Opportunities;
