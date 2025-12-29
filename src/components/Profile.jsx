import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function Profile() {
    const { user, token } = useAuth();
    const [displayName, setDisplayName] = useState(user?.display_name || '');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    // If user data isn't loaded yet
    if (!user) return <div className="text-white">Loading Profile...</div>;

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            // 1. Upload Image
            const uploadRes = await fetch(`${API_BASE}/api/upload`, {
                method: 'POST',
                body: formData, // No Auth header needed for public upload endpoint (simplification)
            });
            
            if (!uploadRes.ok) throw new Error("Image upload failed");
            const uploadData = await uploadRes.json();

            // 2. Update Profile with Image URL
            await updateProfile({ profile_image_url: uploadData.url });
            setMessage('Commander Badge Updated!');
        } catch (error) {
            console.error(error);
            setMessage('Deployment Failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleNameUpdate = async (e) => {
        e.preventDefault();
        await updateProfile({ display_name: displayName });
        setMessage('Call Sign Updated!');
    };

    const updateProfile = async (updates) => {
        try {
            const res = await fetch(`${API_BASE}/api/users/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error("Update failed");
            
            // Reload page to refresh context (lazy way for MVP) or we could expose setUser from context
            window.location.reload(); 
        } catch (error) {
            setMessage('Update Failed');
        }
    }

    return (
        <div className="glass-card p-8 max-w-2xl mx-auto mt-10 border-t-4 border-royal-gold relative overflow-hidden">
             {/* Sci-Fi Grid Background Overlay */}
             <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/demo/image/upload/v1654674773/grid_bg.png')] opacity-10 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 rounded-full border-2 border-royal-gold p-1 shadow-[0_0_20px_rgba(212,175,55,0.3)] group cursor-pointer"
                         onClick={() => fileInputRef.current.click()}>
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 rounded-full overflow-hidden z-20 pointer-events-none">
                             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-gold/10 to-transparent animate-scan"></div>
                        </div>

                        <img 
                            src={user.profile_image_url || `https://ui-avatars.com/api/?name=${user.email}&background=0D8ABC&color=fff`} 
                            alt="Commander" 
                            className="w-full h-full rounded-full object-cover bg-black/50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-royal-gold font-bold text-xs uppercase tracking-widest">Upload ID</span>
                        </div>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                    />
                    {uploading && <span className="text-royal-gold text-xs animate-pulse">Transmitting...</span>}
                </div>

                {/* Details Section */}
                <div className="flex-1 w-full space-y-6">
                    <div>
                        <h2 className="text-3xl font-serif text-white mb-1">COMMANDER PROFILE</h2>
                        <p className="text-gray-400 font-mono text-xs tracking-[0.2em] uppercase">UNSC // SECURITY CLEARANCE: ALPHA</p>
                    </div>

                    <form onSubmit={handleNameUpdate} className="space-y-4">
                        <div>
                            <label className="block text-royal-gold text-xs uppercase tracking-widest mb-2 font-bold">Call Sign</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="flex-1 bg-black/40 border border-royal-gold/30 p-2 text-white font-mono focus:border-royal-gold focus:outline-none focus:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
                                    placeholder="Enter your name"
                                />
                                <button type="submit" className="border border-royal-gold text-royal-gold px-4 py-2 hover:bg-royal-gold hover:text-black transition-colors font-bold uppercase text-xs tracking-wider">
                                    Update
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-gray-500 text-xs uppercase tracking-widest mb-1">Communication Channel</label>
                            <p className="text-gray-300 font-mono">{user.email}</p>
                        </div>
                    </form>

                    {message && <div className="p-2 border border-royal-gold/50 bg-royal-gold/10 text-royal-gold text-center text-sm font-mono animate-pulse">{message}</div>}
                </div>
            </div>
        </div>
    );
}
