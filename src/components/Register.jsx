import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register({ switchToLogin }) {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        setIsLoading(true);
        try {
            await register(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 glass-card border border-royal-gold/20 shadow-2xl animate-fade-in relative overflow-hidden">
             {/* Decorative Corner */}
             <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-royal-gold/20 to-transparent rounded-br-full pointer-events-none"></div>


            <h2 className="text-4xl font-serif text-royal-gold mb-2 text-center drop-shadow-md">Begin the Journey</h2>
            <p className="text-gray-400 text-center mb-8 font-light italic">Start your legacy today.</p>

            {error && (
                <div className="p-3 mb-4 text-xs text-red-200 bg-red-900/30 border border-red-500/30 rounded text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-royal-gold/70">Email Address</label>
                    <input 
                        type="email" 
                        required
                        className="w-full p-3 bg-black/40 border-b-2 border-royal-gold/30 text-white placeholder-gray-500 focus:outline-none focus:border-royal-gold transition-colors text-lg"
                        placeholder="you@future.me"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-royal-gold/70">Password</label>
                    <input 
                        type="password" 
                        required
                        className="w-full p-3 bg-black/40 border-b-2 border-royal-gold/30 text-white placeholder-gray-500 focus:outline-none focus:border-royal-gold transition-colors text-lg"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-royal-gold/70">Confirm Password</label>
                    <input 
                        type="password" 
                        required
                        className="w-full p-3 bg-black/40 border-b-2 border-royal-gold/30 text-white placeholder-gray-500 focus:outline-none focus:border-royal-gold transition-colors text-lg"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full btn-royal py-3.5 mt-4 text-lg font-serif tracking-wide hover:scale-[1.02] active:scale-95 transition-all"
                >
                    {isLoading ? 'Creating Vault...' : 'Join TimeCapsule'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                    Already have a vault? 
                    <button onClick={switchToLogin} className="ml-2 text-royal-gold hover:text-white underline underline-offset-4 decoration-royal-gold/50 transition-all">
                        Access it here
                    </button>
                </p>
            </div>
        </div>
    );
}
