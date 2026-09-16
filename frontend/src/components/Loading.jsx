import React from 'react';

const Loading = ({ message = 'Loading secure portal data...' }) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-8 min-h-[200px] bg-zinc-800 backdrop-blur-sm rounded-3xl border border-zinc-700 shadow-xl transition-all duration-300"
      aria-live="polite"
      role="status"
    >
      {/* Modern Government Portal Spinner */}
      <div className="relative flex items-center justify-center mb-4">
        {/* Outer glowing ring */}
        <div className="w-12 h-12 rounded-full border-4 border-zinc-700 animate-pulse"></div>

        {/* Inner spinning ring (Professional Emerald theme) */}
        <div className="absolute w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>

        {/* Center dot */}
        <div className="absolute w-2 h-2 bg-emerald-400 rounded-full"></div>
      </div>

      {/* Loading Message */}
      <p className="text-sm font-bold text-white tracking-wide animate-pulse">
        {message}
      </p>

      <p className="text-xs text-zinc-400 mt-1">
        Please do not refresh or close the window.
      </p>
    </div>
  );
};

export default Loading;
