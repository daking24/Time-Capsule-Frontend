import React from 'react';

export default function SkeletonTable({ rows = 3 }) {
  return (
    <div className="w-full animate-pulse">
        <div className="w-full h-8 bg-royal-gold/10 rounded mb-4"></div>
        {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex space-x-4 border-b border-white/10 py-4">
                <div className="h-4 bg-white/20 rounded w-1/4"></div>
                <div className="h-4 bg-white/20 rounded w-1/4"></div>
                <div className="h-4 bg-white/20 rounded w-1/4"></div>
                <div className="h-4 bg-white/20 rounded w-1/4"></div>
            </div>
        ))}
    </div>
  );
}
