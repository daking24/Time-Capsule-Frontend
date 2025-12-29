import React from 'react';
import { useReactMediaRecorder } from "react-media-recorder";

const MediaRecorder = ({ type, onStop, onCancel }) => {
  const handleStop = (blobUrl, blob) => {
      onStop(blobUrl, blob);
  };

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ video: type === 'video', audio: true, onStop: handleStop });

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-black/20 rounded-lg border border-royal-gold/20">
      <div className="flex space-x-4 items-center">
        <div className={`w-4 h-4 rounded-full ${status === 'recording' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
        <p className="text-royal-gold font-serif capitalize">{status}</p>
      </div>

      {type === 'video' && status === 'recording' && (
          <div className="w-full max-w-xs bg-black aspect-video rounded flex items-center justify-center text-gray-500">
             (Camera Preview Placeholder) 
          </div>
      )}
      
       {mediaBlobUrl && status === 'stopped' && (
        <div className="w-full max-w-[300px]">
           {type === 'video' ? (
             <video src={mediaBlobUrl} controls className="w-full rounded border border-royal-gold/30" />
           ) : (
             <audio src={mediaBlobUrl} controls className="w-full" />
           )}
        </div>
      )}

      <div className="flex space-x-4">
        {status !== 'recording' && !mediaBlobUrl && (
            <button type="button" onClick={startRecording} className="btn-royal py-2 px-4 text-sm">
                Start Recording
            </button>
        )}
        {status === 'recording' && (
             <button type="button" onClick={stopRecording} className="px-4 py-2 border border-red-500 text-red-400 rounded hover:bg-red-500/10 transition-colors">
                Stop
            </button>
        )}
        {mediaBlobUrl && (
            <button type="button" onClick={clearBlobUrl} className="text-gray-400 text-sm hover:text-white underline">
                Retake
            </button>
        )}
         <button type="button" onClick={onCancel} className="text-gray-400 text-sm hover:text-white">
            Cancel
        </button>
      </div>
    </div>
  );
};

export default MediaRecorder;
