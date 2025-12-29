import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import SkeletonTable from './SkeletonTable';

export default function Dashboard({ onBack }) {
    const { token } = useAuth();
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLetters = async () => {
            try {
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// ...
                const response = await fetch(`${API_BASE}/api/letters`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setLetters(data);
                } else {
                    setError('Failed to retrieve logs. Auth token might be expired.');
                }
            } catch (error) {
                console.error("Failed to fetch letters", error);
                setError('Connection failed. Is the server running?');
            } finally {
                setLoading(false);
            }
        };
        fetchLetters();
    }, [token]);

    return (
        <div className="w-full max-w-4xl p-8 glass-card border border-royal-gold/20 shadow-2xl animate-fade-in mt-8">
            <div className="flex justify-between items-center mb-8 border-b border-royal-gold/10 pb-4">
                <h2 className="text-3xl font-serif text-royal-gold">Flight Logs</h2>
                <button onClick={onBack} className="text-sm text-gray-400 hover:text-white transition-colors">
                    ← Back to Home
                </button>
            </div>

            {error ? (
                <div className="text-red-400 text-center py-10 border border-red-500/20 bg-red-900/10 rounded">
                    ⚠️ {error}
                </div>
            ) : loading ? (
                 <SkeletonTable rows={5} />
            ) : letters.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-400 mb-4">You haven't sent any letters yet.</p>
                    <button onClick={onBack} className="text-royal-gold hover:underline">Write your first letter</button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-royal-gold/60 text-xs uppercase tracking-wider border-b border-royal-gold/10">
                                <th className="pb-3 pl-2">Created</th>
                                <th className="pb-3">Delivery Date</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-royal-gold/5">
                            {letters.map((letter) => (
                                <tr key={letter.id} className="text-gray-300 hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-2 font-light">{format(new Date(letter.created_at), 'MMM d, yyyy')}</td>
                                    <td className="py-4 font-serif text-white">{format(new Date(letter.delivery_date), 'MMMM d, yyyy')}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-xs border ${letter.is_sent ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'}`}>
                                            {letter.is_sent ? 'DELIVERED' : 'LOCKED'}
                                        </span>
                                    </td>
                                    <td className="py-4 capitalize text-sm text-gray-500">{letter.media_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
