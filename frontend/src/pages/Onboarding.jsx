import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { getCurrentLanguage, getTranslation } from '../data/translations.js';

const skillOptions = [
  { name: 'Farming' },
  { name: 'Tailoring' },
  { name: 'Cooking' },
  { name: 'Driving' },
  { name: 'Computer' },
  { name: 'Construction' },
  { name: 'Handicraft' },
  { name: 'Other' },
];

const interestOptions = [
  { name: 'Agriculture' },
  { name: 'Technology' },
  { name: 'Business' },
  { name: 'Healthcare' },
  { name: 'Handicraft' },
  { name: 'Education' },
  { name: 'Other' },
];

const livelihoodGoals = [
  { title: 'Find a Job', desc: 'Secure employment in local or government sectors' },
  { title: 'Start a Business', desc: 'Launch a micro-enterprise with government backing' },
  { title: 'Learn a New Skill', desc: 'Upskill via National Skill Qualification Framework certified programs' },
  { title: 'Improve Current Work', desc: 'Enhance productivity in your existing livelihood' },
];

const STORAGE_KEY = 'gramsaksham_profile';

const Onboarding = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [goal, setGoal] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [stateName, setStateName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState(getCurrentLanguage());
  const recognitionRef = useRef(null);
  const t = getTranslation(language);

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(getCurrentLanguage());
    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  const toggleSelection = (value, list, setter) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setFeedback('Location access is not supported in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          const data = await response.json();
          const address = data.address || {};
          setVillage(address.village || address.town || address.suburb || '');
          setDistrict(address.state_district || address.county || address.city || '');
          setStateName(address.state || '');
          setFeedback(t.locationSuccess);
        } catch (e) {
          setFeedback('GPS coordinates captured, but address resolution failed. Please enter details manually.');
          setVillage(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
        }
      },
      () => {
        setFeedback(t.locationError);
      },
    );
  };

  const handleVoiceAssistantToggle = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setFeedback(t.voiceListening);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setFeedback(`Recognized speech: "${transcript}"`);

      if (transcript.includes('computer') && !selectedSkills.includes('Computer')) {
        setSelectedSkills((prev) => [...prev, 'Computer']);
      }
      if (transcript.includes('farming') && !selectedSkills.includes('Farming')) {
        setSelectedSkills((prev) => [...prev, 'Farming']);
      }
      if (transcript.includes('job') && !goal) {
        setGoal('Find a Job');
      }
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setFeedback('Voice recognition error. Please select options manually.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleContinue = () => {
    if (!selectedSkills.length) {
      setFeedback(t.feedback);
      return;
    }

    if (!selectedInterests.length) {
      setFeedback(t.feedback);
      return;
    }

    if (!goal) {
      setFeedback(t.feedback);
      return;
    }

    if (!village || !district || !stateName) {
      setFeedback(t.feedback);
      return;
    }

    const formattedLocation = `${village}, ${district}, ${stateName}`;

    const profile = {
      skills: selectedSkills,
      interests: selectedInterests,
      goal,
      location: formattedLocation,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    navigate('/assistant');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      <div>
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">{t.step}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t.onboardingTitle}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-medium">
              {t.onboardingSubtitle}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-700 bg-zinc-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
            <div className="flex items-center justify-between gap-3 border-b border-zinc-700 pb-5">
              <button
                type="button"
                className="px-4 py-2 text-xs font-bold rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600 transition-all flex items-center gap-1.5 shadow-sm"
                onClick={() => navigate('/language')}
              >
                {t.back}
              </button>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-zinc-700/80 px-3.5 py-1.5 rounded-full border border-zinc-600">
                {t.portalLocalization}
              </div>
            </div>

            <div className="flex gap-2 text-xs font-bold flex-wrap">
              <span className="rounded-xl bg-emerald-600 text-white px-4 py-2 shadow-md border border-emerald-500 flex items-center gap-1.5">
                1. {t.profileSkills}
              </span>
              <span className="rounded-xl bg-zinc-700 text-zinc-300 px-4 py-2 border border-zinc-600">2. AI</span>
              <span className="rounded-xl bg-zinc-700 text-zinc-300 px-4 py-2 border border-zinc-600">3. {t.opportunitiesTitle}</span>
            </div>

            <div className="rounded-2xl border border-emerald-600/60 bg-emerald-950/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">{t.voicePrompt}</span>
                <p className="text-xs text-zinc-300 mt-0.5">{t.voiceListening}</p>
              </div>
              <button
                type="button"
                onClick={handleVoiceAssistantToggle}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-md flex items-center gap-2 ${
                  isListening
                    ? 'bg-red-600 text-white border-red-500 animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                }`}
              >
                <span>{isListening ? t.voiceListening : t.voicePrompt}</span>
              </button>
            </div>

            <section className="bg-zinc-700/40 p-6 rounded-2xl border border-zinc-600/60 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                  A. {t.profileSkills} <span className="text-emerald-400">*</span>
                </h2>
                <span className="text-[11px] text-zinc-400">{t.selected}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 mt-4">
                {skillOptions.map((item) => {
                  const selected = selectedSkills.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => toggleSelection(item.name, selectedSkills, setSelectedSkills)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border flex items-center gap-1.5 ${
                        selected
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-800'
                          : 'bg-zinc-700 text-zinc-200 border-zinc-600 hover:bg-zinc-600'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="ml-1 text-[10px]">{selected ? '[Selected]' : '[+]'}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="bg-zinc-700/40 p-6 rounded-2xl border border-zinc-600/60 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                  B. {t.interests} <span className="text-emerald-400">*</span>
                </h2>
                <span className="text-[11px] text-zinc-400">{t.select}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 mt-4">
                {interestOptions.map((item) => {
                  const selected = selectedInterests.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => toggleSelection(item.name, selectedInterests, setSelectedInterests)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border flex items-center gap-1.5 ${
                        selected
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-800'
                          : 'bg-zinc-700 text-zinc-200 border-zinc-600 hover:bg-zinc-600'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="ml-1 text-[10px]">{selected ? '[Selected]' : '[+]'}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="bg-zinc-700/40 p-6 rounded-2xl border border-zinc-600/60 shadow-sm">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-200">
                C. {t.goal} <span className="text-emerald-400">*</span>
              </h2>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {livelihoodGoals.map((item) => {
                  const isSelected = goal === item.title;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setGoal(item.title)}
                      className={`rounded-2xl border p-4 text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/60 text-white shadow-md ring-2 ring-emerald-800'
                          : 'border-zinc-600 bg-zinc-700 text-zinc-200 hover:bg-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${isSelected ? 'bg-emerald-900 text-emerald-200 border-emerald-600' : 'bg-zinc-600 text-zinc-200 border-zinc-500'}`}>
                          {isSelected ? t.selected : t.select}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-emerald-300' : 'text-zinc-300'}`}>{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="bg-zinc-700/40 p-6 rounded-2xl border border-zinc-600/60 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                  D. {t.locationPlaceholder} <span className="text-emerald-400">*</span>
                </h2>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="text-xs font-bold text-emerald-400 hover:underline"
                >
                  {t.useLocation}
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 mt-4">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Village / Town / Ward</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Rampur"
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-xl px-3.5 py-3 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">District / Block</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Jabalpur"
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-xl px-3.5 py-3 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">State / Province</label>
                  <input
                    type="text"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="e.g. Madhya Pradesh"
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-xl px-3.5 py-3 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-900"
                  />
                </div>
              </div>
            </section>

            {feedback && (
              <div className="rounded-2xl border border-amber-600 bg-amber-950/60 px-4 py-3 text-xs sm:text-sm font-bold text-amber-200 flex items-center justify-between shadow-sm">
                <span>{feedback}</span>
                <button onClick={() => setFeedback('')} className="font-bold text-amber-100 px-2 py-1">X</button>
              </div>
            )}

            <button
              type="button"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2"
              onClick={handleContinue}
            >
              <span>{t.saveProceed}</span>
              <span>-&gt;</span>
            </button>
          </div>
        </main>
      </div>

      <footer className="relative z-10 py-5 text-center text-xs text-zinc-400 font-semibold bg-zinc-800 border-t border-zinc-700 mt-12">
        <p>© 2026 GramSaksham Portal. Designed for Digital Governance & Rural Empowerment.</p>
      </footer>
    </div>
  );
};

export default Onboarding;
