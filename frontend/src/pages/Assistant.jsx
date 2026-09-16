import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { getCurrentLanguage, getTranslation } from '../data/translations.js';

const getMockAssistantReply = (message) => {
  const lower = message.toLowerCase();

  if (lower.includes('computer') || lower.includes('digital') || lower.includes('computer operator')) {
    return 'Aapke profile ke basis par Computer Operator aur Digital Skills training sabse suitable ho sakti hai. Kya aap iska center check karna chahte hain?';
  }

  if (lower.includes('business') || lower.includes('startup') || lower.includes('loan')) {
    return 'Aapke liye small business setup, Mudra loan guidance aur entrepreneurship training useful rahegi.';
  }

  if (lower.includes('job') || lower.includes('employment') || lower.includes('naukri')) {
    return 'Aapke liye customer service, data entry aur local job readiness coaching best fit hai.';
  }

  if (lower.includes('tailoring') || lower.includes('stitch') || lower.includes('silai')) {
    return 'Tailoring aur garment design training aapke skills ke liye highly relevant hai. Isme government certification bhi milti hai.';
  }

  return 'Aapke goal aur location ke basis par practical skill training aur nearby government scheme guidance recommend kiya ja sakta hai. Aap aur kya janna chahte hain?';
}

const Assistant = () => {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [language, setLanguage] = useState(getCurrentLanguage());
  const [status, setStatus] = useState('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: 'Namaste! Main GramSaksham AI Assistant hoon. Aapko kis tarah ki training, job ya government scheme ki jankari chahiye? Aap bolkar ya type karke pooch sakte hain.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const t = getTranslation(language);

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(getCurrentLanguage());
    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus('ERROR');
      setErrorMessage('Speech recognition is not supported in this browser. Please use text input instead.');
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : language === 'bn' ? 'bn-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setStatus('LISTENING');
      setErrorMessage('');
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ');

      if (!transcript.trim()) {
        setStatus('IDLE');
        return;
      }

      setStatus('PROCESSING');

      const userMessage = {
        id: Date.now(),
        role: 'user',
        text: transcript,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setTimeout(() => {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          text: getMockAssistantReply(transcript),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((previous) => [...previous, userMessage, assistantMessage]);
        setStatus('IDLE');
      }, 600);
    };

    recognition.onerror = (err) => {
      console.error('Speech recognition error:', err);
      setStatus('ERROR');
      setErrorMessage('Voice recognition failed or permission denied. Please try typing.');
    };

    recognition.onend = () => {
      setStatus((current) => (current === 'LISTENING' ? 'IDLE' : current));
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const startListening = () => {
    if (!recognitionRef.current) {
      setStatus('ERROR');
      setErrorMessage('Voice recognition is not available.');
      return;
    }

    try {
      setErrorMessage('');
      recognitionRef.current.start();
    } catch (error) {
      console.error('Start listening error:', error);
      try {
        recognitionRef.current.stop();
        recognitionRef.current.start();
      } catch (e) {
        setStatus('ERROR');
        setErrorMessage('Could not start microphone. Please check permissions.');
      }
    }
  };

  const handleSend = (textToSend) => {
    const queryText = typeof textToSend === 'string' ? textToSend : draft;
    const trimmed = queryText.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setStatus('PROCESSING');
    setMessages((previous) => [...previous, userMessage]);
    if (!textToSend) setDraft('');

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        text: getMockAssistantReply(trimmed),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((previous) => [...previous, assistantMessage]);
      setStatus('IDLE');
    }, 600);
  };

  const getStatusLabel = () => {
    if (status === 'LISTENING') return 'Sun raha hoon... Kripya bolein (Listening...)';
    if (status === 'PROCESSING') return 'Soch raha hoon... (Processing reply...)';
    if (status === 'ERROR') return errorMessage || 'Voice recognition issue.';
    return 'Microphone button dabayein aur bolkar sawaal poochein';
  };

  const quickPrompts = [
    "Computer & Digital Skills",
    "Tailoring & Silai Training",
    "Small Business & Loan",
    "Local Job Opportunities"
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      <div>
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

          {/* Top Title Banner */}
          <header className="mb-6 flex items-center justify-between rounded-3xl border border-zinc-700 bg-zinc-800 px-6 py-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center font-black text-white shadow-md">
                AI
              </div>
              <div>
                <div className="font-bold text-base text-white">GramSaksham AI Saathi</div>
                <div className="text-xs text-zinc-400 font-semibold flex items-center gap-1.5 mt-0.5 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Active Mode: <strong className="text-emerald-300">{language}</strong></span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/analysis')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600 transition-all flex items-center gap-1.5 shadow-sm"
            >
              View Analysis
            </button>
          </header>

          {/* Main AI Interaction Box */}
          <section className="rounded-3xl border border-zinc-700 bg-zinc-800 p-6 sm:p-10 shadow-2xl">

            {/* Voice Mic Centerpiece with Glowing Waves */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative flex items-center justify-center my-4">
                {status === 'LISTENING' && (
                  <>
                    <div className="absolute w-28 h-28 rounded-full bg-emerald-500/20 animate-ping"></div>
                    <div className="absolute w-36 h-36 rounded-full bg-emerald-600/10 animate-pulse"></div>
                  </>
                )}

                <button
                  type="button"
                  onClick={startListening}
                  className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    status === 'LISTENING'
                      ? 'bg-red-600 text-white shadow-red-500/50 ring-4 ring-red-500/30 animate-bounce'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 border border-emerald-500'
                  }`}
                  aria-label="Start voice assistant"
                >
                  {status === 'LISTENING' ? '🔴' : '🎙️'}
                </button>
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl font-black text-white tracking-tight">
                Main aapki kaise madad kar sakta hoon?
              </h1>
              <p className={`mt-2 text-xs sm:text-sm font-semibold transition-colors ${status === 'LISTENING' ? 'text-red-400 animate-pulse' : 'text-zinc-400'}`}>
                {getStatusLabel()}
              </p>
            </div>

            {/* Error Notice */}
            {errorMessage && (
              <div className="mt-4 rounded-2xl border border-red-700/60 bg-red-950/50 px-4 py-3 text-xs sm:text-sm text-red-200 flex items-center justify-between">
                <span>{errorMessage}</span>
                <button onClick={() => setErrorMessage('')} className="font-bold text-white ml-2">✕</button>
              </div>
            )}

            {/* Quick Action Chips */}
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
                Quick Suggestions / अक्सर पूछे जाने वाले सवाल:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(promptText)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-700/60 hover:bg-emerald-600 hover:text-white text-zinc-200 border border-zinc-600 transition-all text-left"
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat History Container */}
            <div className="mt-6 rounded-3xl border border-zinc-700 bg-zinc-900/80 p-5 shadow-inner">
              <div className="max-h-80 space-y-4 overflow-y-auto pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-md ${
                        message.role === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none font-semibold'
                          : 'bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-bl-none font-semibold'
                      }`}
                    >
                      <p className="leading-relaxed">{message.text}</p>
                      <span className={`block text-[10px] mt-1.5 text-right font-semibold ${message.role === 'user' ? 'text-emerald-200' : 'text-zinc-400'}`}>
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box & Send Bar */}
              <div className="mt-4 flex gap-2 pt-3 border-t border-zinc-700">
                <input
                  id="assistant-input"
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleSend();
                  }}
                  placeholder="Apna sawaal yahan type karein (Type your question)..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Send</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={startListening}
                className="px-5 py-3 text-xs font-bold rounded-2xl bg-zinc-700 hover:bg-zinc-600 text-zinc-200 border border-zinc-600 transition-all"
              >
                Try Voice Again
              </button>
              <button
                type="button"
                onClick={() => navigate('/analysis')}
                className="px-6 py-3 text-xs font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
              >
                View Full Profile Analysis -&gt;
              </button>
            </div>

          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-5 text-center text-xs text-zinc-400 font-semibold bg-zinc-950 border-t border-zinc-800 mt-12">
        <p>© 2026 GramSaksham Portal. Designed for Digital Governance & Rural Empowerment.</p>
      </footer>
    </div>
  );
};

export default Assistant;
