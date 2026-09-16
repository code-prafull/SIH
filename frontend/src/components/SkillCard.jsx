import React from 'react';

const SkillCard = ({ title, level = 'Beginner', category = 'Technical' }) => {
  // Helper to assign glowing glassmorphic badge styles based on skill level
  const getLevelBadgeStyle = (lvl) => {
    switch (lvl.toLowerCase()) {
      case 'expert':
      case 'advanced':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm';
      case 'intermediate':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-sm';
      case 'beginner':
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-sm';
    }
  };

  return (
    <article className="group rounded-3xl border border-white/15 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex items-center justify-between gap-4">
      {/* Skill Info */}
      <div className="flex items-center gap-4">
        {/* Icon / Indicator Box */}
        <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-blue-400 transition-all duration-300 border border-white/10 font-black text-base shadow-md">
          {title ? title.charAt(0).toUpperCase() : 'S'}
        </div>

        <div>
          <h3 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-0.5">
            {category}
          </p>
        </div>
      </div>

      {/* Level Badge */}
      <span className={`px-3.5 py-1 rounded-full text-xs font-black border ${getLevelBadgeStyle(level)}`}>
        {level}
      </span>
    </article>
  );
};

export default SkillCard;
