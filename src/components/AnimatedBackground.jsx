import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#fdfdfd]">
      {/* Circle 1 - Top Left */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-gray-200 opacity-80 mix-blend-multiply filter blur-3xl animate-[float_20s_ease-in-out_infinite]"
      ></div>

      {/* Circle 2 - Bottom Right */}
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-gray-100 opacity-80 mix-blend-multiply filter blur-3xl animate-[float_25s_ease-in-out_infinite_reverse]"
      ></div>

      {/* Triangle - Center (Using SVG) */}
      <div className="absolute top-[30%] left-[40%] opacity-30 animate-[spin_60s_linear_infinite]">
        <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 20L180 180H20L100 20Z" stroke="#d1d5db" strokeWidth="3" />
        </svg>
      </div>

      {/* Square - Bottom Left */}
      <div
        className="absolute bottom-[20%] left-[10%] w-40 h-40 border-4 border-gray-200 opacity-40 rotate-45 animate-[float_15s_ease-in-out_infinite_2s]"
      ></div>

      {/* Small Circle - Top Right */}
      <div
        className="absolute top-[15%] right-[20%] w-20 h-20 border-2 border-gray-300 rounded-full opacity-50 animate-[float_18s_ease-in-out_infinite_5s]"
      ></div>

      {/* Extra Shape - Middle Right */}
      <div
        className="absolute top-[50%] right-[10%] w-16 h-16 bg-gray-100 rotate-12 opacity-60 animate-[float_22s_ease-in-out_infinite_3s]"
      ></div>

       {/* Dotted Pattern Overlay */}
       <div
         className="absolute inset-0 opacity-[0.05]"
         style={{backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '40px 40px'}}
       ></div>
    </div>
  );
};

export default AnimatedBackground;
