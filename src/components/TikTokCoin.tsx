import React from 'react';

interface TikTokCoinProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

/**
 * Coin Icon - Faithfully modeled after the attached Image 1:
 * - Outer pale yellow border (#FEE770)
 * - Inner warm golden disc (#FFB92E)
 * - Pure white flat center note glyph
 */
export const TikTokCoin: React.FC<TikTokCoinProps> = ({ 
  className = '', 
  size = 24,
  animated = false 
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${animated ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer pale yellow rim - Exactly matching Image 1 */}
        <circle cx="50" cy="50" r="49" fill="#FEE770" />

        {/* Inner golden orange circle */}
        <circle cx="50" cy="50" r="37.5" fill="#FFB92E" />

        {/* Clean flat white center glyph from Image 1 */}
        <path
          d="M50.5 28.5V54.5C48.2 50.8 44.2 48.5 39.5 48.5C31.5 48.5 25 55 25 63C25 71 31.5 77.5 39.5 77.5C47.2 77.5 53.5 71.5 53.9 64V41.8C59.8 46.2 64.8 48 70 48.2V37.2C64.5 36.8 59.8 33.8 55.8 28.5H50.5Z"
          fill="#FFFFFF"
        />
        {/* Inner circle cutout for the note head */}
        <circle cx="39.5" cy="63" r="6.2" fill="#FFB92E" />
      </svg>
    </div>
  );
};
