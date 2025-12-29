import React from 'react';

export default function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
      
      {/* Background Starfield (Simplified with Tailwind for MVP, could use Particles.js) */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-10 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/3 left-1/2 w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
          
          {/* Nebula Effect */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="z-10 animate-float">
        <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-6 tracking-tighter">
          TIMECAPSULE
        </h1>
        <p className="text-xl md:text-2xl text-blue-200/80 font-light max-w-2xl mx-auto mb-12 tracking-wide">
          Send a message across the cosmos of time. <br/>
          Secure. Timeless. Eternal.
        </p>

        <button 
            onClick={onEnter}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-purple-500/50 hover:border-purple-400 transition-all duration-300"
        >
            <div className="absolute inset-0 w-0 bg-purple-500/20 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-purple-100 font-serif tracking-widest uppercase text-sm group-hover:text-white">
                Enter the Vault
            </span>
        </button>
      </div>

      <div className="absolute bottom-6 z-10">
        <p className="text-xs text-purple-500/50 uppercase tracking-[0.3em]">
            Est. 2025 • Earth Station
        </p>
      </div>
    </div>
  );
}
