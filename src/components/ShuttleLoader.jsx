import React from 'react';

export default function ShuttleLoader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in">
      <div className="relative w-16 h-16">
        {/* Rocket Body */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce">
          🚀
        </div>
        
        {/* Orbit Ring */}
        <div className="absolute inset-0 border-2 border-royal-gold rounded-full animate-spin-slow opacity-50 border-t-transparent"></div>
        <div className="absolute inset-2 border-2 border-white/20 rounded-full animate-spin-reverse opacity-30 border-b-transparent"></div>
      </div>
      <p className="text-royal-gold font-serif tracking-widest text-sm animate-pulse">
        INITIALIZING MISSION CONTROL...
      </p>
    </div>
  );
}
