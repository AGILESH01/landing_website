import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

/**
 * Karthikeyan Textiles Brand Logo
 * Features a custom interwoven 'K' monogram symbolizing vertical warp and diagonal weft
 * threads, paired with editorial serif typography.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-cream-100' : 'text-navy-900';
  const subtextColor = isLight ? 'text-gold-400' : 'text-gold-600';
  const locationColor = isLight ? 'text-cream-300/70' : 'text-slate-600';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base tracking-wide',
    md: 'text-xl tracking-wider',
    lg: 'text-2xl tracking-widest',
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Interwoven 'K' Weave Monogram */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
          aria-hidden="true"
        >
          {/* Subtle Outer Loom Hexagonal/Diamond Frame */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="6"
            className={isLight ? 'stroke-gold-500/40 fill-navy-900/60' : 'stroke-gold-600/30 fill-cream-100'}
            strokeWidth="1.5"
          />

          {/* Vertical Warp Threads (Left pillar of K) */}
          <line x1="14" y1="9" x2="14" y2="39" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="18" y1="9" x2="18" y2="39" stroke={isLight ? '#F7F4EE' : '#0D1B2A'} strokeWidth="2" strokeLinecap="round" />
          
          {/* Interwoven Weft Weave Diagonal Up (Top diagonal arm of K) */}
          <path
            d="M 18 24 L 34 11"
            stroke="#C5A059"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          <path
            d="M 21 27 L 37 14"
            stroke={isLight ? '#F7F4EE' : '#0D1B2A'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />

          {/* Interwoven Weft Weave Diagonal Down (Bottom diagonal leg of K) */}
          <path
            d="M 18 24 L 35 37"
            stroke={isLight ? '#FAF8F5' : '#0D1B2A'}
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          <path
            d="M 23 23 L 38 34"
            stroke="#C5A059"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Centre Weft Cross-tie Node */}
          <circle cx="18" cy="24" r="2.25" fill="#C5A059" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span className={`font-serif font-bold uppercase leading-none ${titleSizes[size]} ${textColor}`}>
          Karthikeyan
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] ${subtextColor}`}>
            Textiles
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-wider uppercase ${locationColor}`}>
            • Pallipalayam, Erode
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] italic text-gold-500 font-serif mt-0.5">
            Quality Woven. Global Reach.
          </span>
        )}
      </div>
    </div>
  );
};
