import React from 'react';

const LoadingScreen = ({ fullScreen = true, text = "LOADING" }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 bg-[#fdfdfd] flex flex-col items-center justify-center animate-fade-in" 
    : "w-full py-32 flex flex-col items-center justify-center animate-fade-in";

  return (
    <div className={containerClass}>
      <div className="relative flex items-center justify-center mb-10">
        {/* Outer Ring - Static */}
        <div className="w-20 h-20 border border-gray-100 rounded-full"></div>
        
        {/* Middle Ring - Spinning Slow */}
        <div className="absolute w-14 h-14 border border-gray-200 rounded-full animate-[spin_3s_linear_infinite]"></div>

        {/* Inner Ring - Spinning Fast with Accent */}
        <div className="absolute w-20 h-20 border-t border-black rounded-full animate-spin"></div>
        
        {/* Center Dot - Pulsing */}
        <div className="absolute w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
      </div>
      
      <div className="flex flex-col items-center space-y-3">
        <span className="font-serif text-lg tracking-[0.4em] text-black font-light pl-1">
          {text}
        </span>
        <div className="w-12 h-px bg-gray-200"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
