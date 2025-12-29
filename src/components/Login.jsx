import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login({ switchToRegister }) {
    const { login, requestLoginCode, verifyLoginCode } = useAuth();
    const [method, setMethod] = useState('code'); // 'code' or 'password'
    const [step, setStep] = useState('email'); // 'email' or 'verify' (for code flow)
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState('');

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setError('');
        setInfo('');
        setIsLoading(true);
        
        try {
            await requestLoginCode(email);
            setStep('verify');
            setInfo(`Code sent to ${email}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await verifyLoginCode(email, code);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 glass-card border border-royal-gold/20 shadow-2xl animate-fade-in relative overflow-hidden transition-all duration-500">
             {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-royal-gold/20 to-transparent rounded-bl-full pointer-events-none"></div>

            <h2 className="text-4xl font-serif text-royal-gold mb-2 text-center drop-shadow-md">
                {method === 'code' ? 'Magic Entry' : 'Secret Key'}
            </h2>
            <p className="text-gray-400 text-center mb-6 font-light italic">
                {method === 'code' ? 'No password needed.' : 'Enter your credentials.'}
            </p>

            {/* Method Toggle */}
            <div className="flex justify-center mb-8 border-b border-royal-gold/10 pb-4">
                <button 
                    onClick={() => { setMethod('code'); setStep('email'); setError(''); }}
                    className={`px-4 py-2 text-sm font-serif transition-colors ${method === 'code' ? 'text-royal-gold border-b border-royal-gold' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Magic Code
                </button>
                <div className="w-px bg-royal-gold/20 mx-2"></div>
                <button 
                    onClick={() => { setMethod('password'); setError(''); }}
                    className={`px-4 py-2 text-sm font-serif transition-colors ${method === 'password' ? 'text-royal-gold border-b border-royal-gold' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Password
                </button>
            </div>

            {error && (
                <div className="p-3 mb-4 text-xs text-red-200 bg-red-900/30 border border-red-500/30 rounded text-center animate-shake">
                    {error}
                </div>
            )}
            
            {info && (
                <div className="p-3 mb-4 text-xs text-blue-200 bg-blue-900/30 border border-blue-500/30 rounded text-center">
                    {info}
                </div>
            )}

            {method === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6 animate-fade-in">
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

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full btn-royal py-3.5 mt-4 text-lg font-serif tracking-wide hover:scale-[1.02] active:scale-95 transition-all"
                >
                    {isLoading ? 'Unlocking...' : 'Access Vault'}
                </button>
            </form>
            )}

            {method === 'code' && step === 'email' && (
                <form onSubmit={handleRequestCode} className="space-y-6 animate-fade-in">
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
                     <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full btn-royal py-3.5 mt-4 text-lg font-serif tracking-wide hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        {isLoading ? 'Sending...' : 'Send Magic Code'}
                    </button>
                </form>
            )}

            {method === 'code' && step === 'verify' && (
                <form onSubmit={handleVerifyCode} className="space-y-6 animate-fade-in">
                     <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-royal-gold/70">Enter Code</label>
                        <input 
                            type="text" 
                            required
                            className="w-full p-3 bg-black/40 border-b-2 border-royal-gold/30 text-white placeholder-gray-500 focus:outline-none focus:border-royal-gold transition-colors text-lg text-center tracking-[0.5em] font-mono"
                            placeholder="000000"
                            maxLength="6"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                     <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full btn-royal py-3.5 mt-4 text-lg font-serif tracking-wide hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        {isLoading ? 'Verifying...' : 'Unlock Vault'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setStep('email')} 
                        className="w-full text-sm text-gray-500 hover:text-white mt-4"
                    >
                        Try different email
                    </button>
                </form>
            )}

            <div className="mt-8 text-center pt-4 border-t border-royal-gold/10">
                <p className="text-gray-400 text-sm">
                    New? Magic Code creates an account automatically. <br/>
                    Or <button onClick={switchToRegister} className="text-royal-gold hover:text-white underline underline-offset-4 decoration-royal-gold/50 transition-all">create a password account</button>.
                </p>
            </div>
        </div>
    );
}
