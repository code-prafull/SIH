import React from 'react';

const OpportunityCard = ({ opportunity, onViewDetails }) => {
  return (
    <article className="group relative rounded-3xl border border-zinc-700 bg-zinc-800 p-5 shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Header: Type Badge & Distance */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {opportunity.type}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-700 px-2.5 py-1 text-xs font-semibold text-zinc-300 border border-zinc-600">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {opportunity.distance}
          </span>
        </div>

        {/* Opportunity Title */}
        <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 mb-3">
          {opportunity.title}
        </h3>

        {/* Metadata Details List */}
        <div className="space-y-2 text-xs text-zinc-300 border-t border-zinc-700 pt-3 mb-4">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-zinc-200 min-w-[65px]">Location:</span>
            <span className="text-zinc-300 truncate">{opportunity.location}</span>
          </div>

          <div className="flex items-start gap-2">
            <span className="font-semibold text-zinc-200 min-w-[65px]">Skills:</span>
            <span className="text-zinc-300 line-clamp-1">{opportunity.requiredSkills?.join(', ')}</span>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-400">
            <span>Source: <strong className="text-zinc-300">{opportunity.source}</strong></span>
            <span>Updated: {opportunity.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Interactive Action Button */}
      <button
        type="button"
        onClick={() => onViewDetails ? onViewDetails(opportunity) : console.log('View details:', opportunity.id)}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 group/btn"
      >
        <span>View Scheme Details</span>
        <svg className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </article>
  );
};

export default OpportunityCard;
