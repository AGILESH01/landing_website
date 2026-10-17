import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${iconSize} rounded-xl bg-navy-900 border border-gold-500/40 flex items-center justify-center p-1.5 shadow-sm`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Interwoven 'K' monogram */}
          <path d="M28 15 L28 85" stroke="#C5A059" strokeWidth="12" strokeLinecap="round" />
          <path d="M28 50 L75 18" stroke="#F2E2C2" strokeWidth="11" strokeLinecap="round" />
          <path d="M38 42 L76 85" stroke="#C5A059" strokeWidth="11" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <span className={`font-serif font-bold text-white tracking-wider block ${textSize}`}>
          KARTHIKEYAN
        </span>
        <span className="text-[10px] tracking-widest text-gold-400 uppercase font-sans font-semibold block">
          Admin Portal
        </span>
      </div>
    </div>
  );
};
