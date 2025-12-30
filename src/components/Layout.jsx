import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-royal-gradient text-royal-text flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center py-6 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold tracking-wider cursor-pointer" onClick={() => navigate('/')}>
          Time<span className="text-white">Capsule</span>
        </h1>
        <div className='flex items-center gap-6'>
            {/* Profile Link */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/profile')}>
                <div className="text-right hidden md:block">
                     <p className="text-xs text-royal-gold font-bold uppercase tracking-widest">{user?.display_name || 'Commander'}</p>
                     <p className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: {user?.email?.split('@')[0]}</p>
                </div>
                <div className="relative w-10 h-10 rounded-full border border-royal-gold p-0.5 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-shadow">
                     <img 
                        src={user?.profile_image_url || `https://ui-avatars.com/api/?name=${user?.email}&background=0D8ABC&color=fff`} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover bg-black"
                    />
                </div>
            </div>

             <button onClick={() => navigate('/dashboard')} className="btn-royal text-sm md:text-base px-4 py-2">
            Flight Logs
            </button>
             <button onClick={logout} className="text-sm text-gray-400 hover:text-white">Sign Out</button>

        </div>
      </header>

      {/* Main Content */}
      {children || <Outlet />}

      <footer className="mt-auto py-6 text-royal-muted text-sm">
        &copy; {new Date().getFullYear()} TimeCapsule. Preserving memories for tomorrow.
      </footer>
    </div>
  );
}
