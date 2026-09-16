import { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState(() => {
    if (typeof window === 'undefined') return 'hi';
    return localStorage.getItem('gramsaksham_language') || 'hi';
  });

  useEffect(() => {
    localStorage.setItem('gramsaksham_language', selectedLang);
    document.documentElement.lang = selectedLang;
  }, [selectedLang]);

  const handleLanguageChange = (event) => {
    setSelectedLang(event.target.value);
  };

  return (
    <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-white/15 px-4 py-2.5 rounded-2xl shadow-xl hover:border-blue-500/50 transition-all duration-300">
      {/* Official Globe / Translate Icon Box */}
      <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-sm flex-shrink-0">
        🌐
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="language"
          className="text-[10px] uppercase tracking-widest font-extrabold text-blue-400 leading-none mb-1"
        >
          Language / भाषा
        </label>
        <select
          id="language"
          value={selectedLang}
          onChange={handleLanguageChange}
          className="bg-transparent text-xs font-extrabold text-white focus:outline-none cursor-pointer pr-4 [&>option]:bg-slate-900 [&>option]:text-white"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="ta">தமிழ் (Tamil)</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
