import React from 'react';

const ProgressBar = ({ label, value, colorClass = 'bg-emerald-600', showPercentage = true }) => {
  // Ensure value stays between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="space-y-2 w-full">
      {/* Label and Value Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-white">
        <span className="tracking-wide">{label}</span>
        {showPercentage && (
          <span className="font-bold text-emerald-300 bg-emerald-950 px-3 py-0.5 rounded-full text-xs border border-emerald-700 shadow-sm">
            {clampedValue}%
          </span>
        )}
      </div>

      {/* Progress Track */}
      <div className="h-3.5 w-full overflow-hidden rounded-full bg-zinc-950 border border-zinc-700 p-0.5 shadow-inner">
        {/* Animated Fill Bar */}
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${colorClass}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
