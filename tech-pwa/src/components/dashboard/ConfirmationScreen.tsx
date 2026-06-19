import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfirmationScreenProps {
  techCount: number;
  jobCount: number;
  date: string;
  onClose: () => void;
}

export function ConfirmationScreen({ techCount, jobCount, date, onClose }: ConfirmationScreenProps) {
  // Format the date (e.g., "2024-06-03" -> "Monday, June 3")
  const dateObj = new Date(date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-[var(--bg-surface)] rounded-xl p-8 max-w-md w-full shadow-2xl border border-[var(--border-subtle)] flex flex-col items-center text-center">
        <CheckCircle className="text-amber-500 w-12 h-12 mb-4" />
        <h2 className="text-2xl font-[700] text-white mb-2">Dispatched</h2>
        <div className="text-lg text-slate-300 tabular-nums mb-1">
          {techCount} techs &middot; {jobCount} jobs
        </div>
        <div className="text-sm text-slate-500 mb-8">
          {formattedDate}
        </div>
        <button
          onClick={onClose}
          className="bg-amber-500 hover:bg-amber-400 text-black font-[600] px-6 py-2 rounded-lg transition-all duration-200 active:scale-[0.98] w-full"
        >
          Done
        </button>
      </div>
    </div>
  );
}
