import React from 'react';

const TrainingCard = ({
  title,
  duration = '4 weeks',
  category = 'Vocational Training',
  stipend = 'Available',
  onEnroll
}) => {
  return (
    <article className="group relative rounded-3xl border border-white/15 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Header: Category & Stipend Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            {category}
          </span>
          {stipend && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-400 border border-emerald-500/20 shadow-sm">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Stipend: {stipend}
            </span>
          )}
        </div>

        {/* Training Course Title */}
        <h3 className="text-base font-black text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-5">
          {title}
        </h3>

        {/* Metadata: Duration & Mode */}
        <div className="flex items-center gap-6 text-xs font-bold text-slate-300 border-t border-white/10 pt-4 mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Duration: <strong className="text-white">{duration}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span>Mode: <strong className="text-white">Offline Center</strong></span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => onEnroll ? onEnroll(title) : console.log('Enrolled in:', title)}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold py-3 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group/btn"
      >
        <span>Enroll for Training</span>
        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </article>
  );
};

export default TrainingCard;
