import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../context/AuthContext';
import MediaRecorder from '../components/MediaRecorder';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function Compose() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [mediaType, setMediaType] = useState('text'); // default

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) setMediaType(type);
  }, [searchParams]);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    message: '',
    date: new Date(),
    mediaUrl: null,
    mediaBlob: null 
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState(''); 

  const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      if(file) await uploadFile(file);
  }

  const handleRecordingStop = async (blobUrl) => {
      const response = await fetch(blobUrl);
      const blob = await response.blob(); 
      const file = new File([blob], `recording.${mediaType === 'video' ? 'mp4' : 'wav'}`, { type: blob.type });
      await uploadFile(file);
  }

  const uploadFile = async (file) => {
    setIsUploading(true);
    setStatus('Uploading media...');

    const uploadData = new FormData();
    uploadData.append('file', file);
    
    // Authorization header added for upload if needed in future

    try {
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: uploadData,
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({ ...formData, mediaUrl: data.url });
        setStatus('Media uploaded! Ready to submit.');
      } else {
        setStatus(`Upload failed: ${data.detail}`);
      }
    } catch (err) {
      setStatus('Upload error involved.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending letter to the future...');
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_BASE}/api/letters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          // Email inferred from token
          content_text: formData.message,
          media_url: formData.mediaUrl,
          media_type: mediaType,
          delivery_date: formData.date.toISOString()
        }),
      });
      
      if (response.ok) {
        setStatus('Success! Your time capsule is sealed.');
        setTimeout(() => {
            navigate('/dashboard'); // Redirect to dashboard on success
            setStatus('');
        }, 2000);
      } else {
        const errorData = await response.json();
        setStatus(`Failed to submit: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      setStatus('Submission error.');
      console.error(err);
    }
  };

  return (
    <main className="w-full max-w-2xl mt-8 flex flex-col items-center animate-fade-in">
      <h2 className="text-3xl font-serif text-royal-gold mb-6">
          Compose Your {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
      </h2>
      
      <form onSubmit={handleSubmit} className="glass-card w-full p-8 space-y-6">
          <div className="space-y-2">
              <label className="text-sm font-serif text-royal-gold">Recipient Email (You)</label>
              <input 
                  type="email" 
                  required 
                  readOnly
                  className="w-full p-3 bg-black/40 border border-royal-gold/30 rounded text-gray-400 cursor-not-allowed"
                  value={formData.email}
              />
          </div>

          <div className="space-y-2 flex flex-col">
              <label className="text-sm font-serif text-royal-gold">Deliver Date</label>
              <DatePicker 
                  selected={formData.date} 
                  onChange={(date) => setFormData({...formData, date})} 
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full p-3 bg-black/40 border border-royal-gold/30 rounded text-white focus:outline-none focus:border-royal-gold cursor-pointer"
                  wrapperClassName="w-full"
              />
          </div>

          {mediaType === 'text' && (
          <div className="space-y-2">
              <label className="text-sm font-serif text-royal-gold">Your Message</label>
              <textarea 
                  rows="6"
                  className="w-full p-3 bg-black/40 border border-royal-gold/30 rounded text-white focus:outline-none focus:border-royal-gold"
                  placeholder="Dear Future Me..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
          </div>
          )}

           {/* In-Browser Recording Logics */}
           {(mediaType === 'video' || mediaType === 'audio') && (
              <div className="space-y-2">
                  <label className="text-sm font-serif text-royal-gold mb-2 block">Record {mediaType}</label>
                  
                  {!formData.mediaUrl ? (
                       <MediaRecorder 
                          type={mediaType} 
                          onStop={handleRecordingStop} 
                          onCancel={() => setMediaType('text')} 
                       />
                  ) : (
                      <div className="p-4 border border-green-500/50 rounded bg-green-900/10 text-center">
                          <p className="text-green-400 mb-2">Recording Uploaded Successfully!</p>
                          <button type="button" onClick={() => setFormData({...formData, mediaUrl: null})} className="text-xs text-gray-400 underline">Record New</button>
                      </div>
                  )}
              </div>
          )}

          {/* File Upload Fallback / Image Upload */}
          {(mediaType === 'image') && (
          <div className="space-y-2">
              <label className="text-sm font-serif text-royal-gold">Upload {mediaType}</label>
              <input 
                  type="file" 
                  accept={`${mediaType}/*`}
                  onChange={handleFileUpload}
                  className="w-full p-3 bg-black/40 border border-royal-gold/30 rounded text-white"
              />
              {isUploading && <p className="text-sm text-yellow-400 animate-pulse">Uploading...</p>}
              {formData.mediaUrl && <p className="text-sm text-green-400">Media attached!</p>}
          </div>
          )}
          
          {status && <p className="text-center text-royal-gold font-bold">{status}</p>}

          <div className="flex justify-between pt-4">
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isUploading}
                className="btn-royal opacity-90 hover:opacity-100 disabled:opacity-50"
              >
                Seal Time Capsule
              </button>
          </div>
      </form>
    </main>
  );
}
