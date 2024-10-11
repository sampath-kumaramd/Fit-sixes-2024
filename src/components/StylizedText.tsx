import React from 'react';

interface StylizedTextProps {
  mainText: string;
  highlightText: string;
}

const StylizedText: React.FC<StylizedTextProps> = ({ mainText, highlightText }) => {
  return (
    <div className="relative font-extrabold font-druktrial">
      {/* Shadow text */}
      <div className="absolute inset-0 flex justify-center items-center text-white/20 -z-10  text-9xl">
        {mainText} {highlightText}
      </div>
      {/* Main text */}
      <div className="flex justify-center items-center  text-8xl font-druktrial">
        <span className="text-yellow">{mainText}</span>{' '}
        <span className="text-white">{highlightText}</span>
      </div>
    </div>
  );
};

export default StylizedText;