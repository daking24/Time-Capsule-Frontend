import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="w-full max-w-2xl mt-12 flex flex-col items-center text-center space-y-8 animate-float">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-6xl font-serif text-royal-gold drop-shadow-lg">
          Send a Letter to the Future
        </h2>
        <p className="text-lg md:text-xl text-gray-300 font-light max-w-lg mx-auto">
          Write a message, record a video, or leave a voice note. 
          We'll keep it safe and deliver it when the time is right.
        </p>
      </div>

      {/* Action Card */}
      <div className="glass-card w-full p-8 mt-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate('/compose?type=text')} 
                  className="p-6 border border-royal-gold/30 rounded-lg hover:bg-royal-gold/10 transition-colors flex flex-col items-center gap-3 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">✍️</span>
            <span className="font-serif text-lg">Write Letter</span>
          </button>
          <button onClick={() => navigate('/compose?type=video')}
                  className="p-6 border border-royal-gold/30 rounded-lg hover:bg-royal-gold/10 transition-colors flex flex-col items-center gap-3 group">
             <span className="text-3xl group-hover:scale-110 transition-transform">📹</span>
             <span className="font-serif text-lg">Record Video</span>
          </button>
        </div>
        
         <div className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate('/compose?type=audio')}
                  className="p-6 border border-royal-gold/30 rounded-lg hover:bg-royal-gold/10 transition-colors flex flex-col items-center gap-3 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">🎙️</span>
            <span className="font-serif text-lg">Voice Note</span>
          </button>
          <button onClick={() => navigate('/compose?type=image')}
                  className="p-6 border border-royal-gold/30 rounded-lg hover:bg-royal-gold/10 transition-colors flex flex-col items-center gap-3 group">
             <span className="text-3xl group-hover:scale-110 transition-transform">📸</span>
             <span className="font-serif text-lg">Upload Photo</span>
          </button>
        </div>
      </div>
    </main>
  );
}
