import React, { useState } from 'react';

const VoiceButton = ({ onVoiceClick }) => {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    const nextState = !isListening;
    setIsListening(nextState);

    // Callback or external logic trigger
    if (onVoiceClick) {
      onVoiceClick(nextState);
    } else {
      console.log(nextState ? "Voice assistant activated..." : "Voice assistant stopped.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative group w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-bold text-xs tracking-wide transition-all duration-300 shadow-xl border backdrop-blur-xl ${
        isListening
          ? 'bg-red-700 text-white border-red-500 shadow-red-700/40 animate-pulse ring-4 ring-red-500/20'
          : 'bg-slate-900/90 hover:bg-slate-900 text-white border-white/15 hover:border-blue-400/50 hover:shadow-2xl'
      }`}
      aria-label="Voice Assistant"
    >
      {/* Listening Pulse Waves (Visible only when active) */}
      {isListening && (
        <span className="absolute -inset-1 rounded-2xl bg-red-600 opacity-30 animate-ping pointer-events-none"></span>
      )}

      {/* Professional Microphone SVG Icon */}
      <div className={`p-2 rounded-xl transition-transform duration-300 ${isListening ? 'bg-red-800 animate-bounce' : 'bg-blue-600/20 text-blue-400 border border-blue-500/30'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
        </svg>
      </div>

      <div className="flex flex-col text-left leading-tight">
        <span className="text-sm font-black">{isListening ? 'Listening to your voice...' : 'Voice Assistant'}</span>
        <span className={`text-[10px] font-extrabold tracking-wide uppercase mt-0.5 ${isListening ? 'text-red-100' : 'text-blue-400'}`}>
          {isListening ? 'Speak now in your preferred language' : 'Voice-Enabled Navigation'}
        </span>
      </div>
    </button>
  );
};

export default VoiceButton;
