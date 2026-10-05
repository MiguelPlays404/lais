import React from 'react';

interface RecargaCoinsLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Official Logo for "Recarga Coins" - Modeled after the attached Coin Logo (Image 2):
 * Features the golden coin emblem with outer rim, inner golden disc, and central glyph,
 * completely replacing the old TikTok chromatic musical note.
 */
export const RecargaCoinsLogo: React.FC<RecargaCoinsLogoProps> = ({ 
  className = '', 
  size = 32, 
  showText = true 
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 font-bold select-none ${className}`}>
      {/* Coin Logo Emblem (Image 2) */}
      <div 
        className="relative flex items-center justify-center shrink-0 drop-shadow-md"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoCoinRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9C4" />
              <stop offset="40%" stopColor="#FEE770" />
              <stop offset="100%" stopColor="#FBC02D" />
            </linearGradient>
            <linearGradient id="logoCoinInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCA28" />
              <stop offset="60%" stopColor="#FFB92E" />
              <stop offset="100%" stopColor="#FF8F00" />
            </linearGradient>
          </defs>

          {/* Outer golden rim */}
          <circle cx="50" cy="50" r="48" fill="url(#logoCoinRimGrad)" stroke="#F57F17" strokeWidth="1.5" />

          {/* Inner rim metallic highlight */}
          <circle cx="50" cy="50" r="41" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />

          {/* Inner warm golden disc */}
          <circle cx="50" cy="50" r="37.5" fill="url(#logoCoinInnerGrad)" />

          {/* Clean flat white center coin glyph */}
          <path
            d="M50.5 28.5V54.5C48.2 50.8 44.2 48.5 39.5 48.5C31.5 48.5 25 55 25 63C25 71 31.5 77.5 39.5 77.5C47.2 77.5 53.5 71.5 53.9 64V41.8C59.8 46.2 64.8 48 70 48.2V37.2C64.5 36.8 59.8 33.8 55.8 28.5H50.5Z"
            fill="#FFFFFF"
          />
          {/* Inner circle cutout for the note head */}
          <circle cx="39.5" cy="63" r="6.2" fill="#FFB92E" />
        </svg>
      </div>

      {showText && (
        <span className="text-xl tracking-tight font-black font-sans text-white flex items-center">
          Recarga
          <span className="ml-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold uppercase bg-gradient-to-r from-[#FE2C55] to-[#FF004F] text-white tracking-wider shadow-sm">
            Coins
          </span>
        </span>
      )}
    </div>
  );
};

// Backwards compatibility alias
export const TikTokLogo = RecargaCoinsLogo;
