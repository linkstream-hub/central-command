import React from 'react';
import Image from 'next/image';
import { Delete } from 'lucide-react';

interface TechLoginViewProps {
  badgeId: string;
  pin: string;
  loading: boolean;
  error: string;
  onBadgeChange: (val: string) => void;
  onPinChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TechLoginView({
  badgeId,
  pin,
  loading,
  error,
  onBadgeChange,
  onPinChange,
  onSubmit,
}: TechLoginViewProps) {
  const handleKeyPress = (digit: string) => {
    if (badgeId.length < 3) {
      onBadgeChange(badgeId + digit);
    } else if (pin.length < 4) {
      onPinChange(pin + digit);
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      onPinChange(pin.slice(0, -1));
    } else if (badgeId.length > 0) {
      onBadgeChange(badgeId.slice(0, -1));
    }
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-8 p-6">
      <Image
        src="https://aptmaintenanceinc.com/wp-content/uploads/2024/05/apt-logo.webp"
        alt="APT Maintenance"
        width={64}
        height={64}
        className="rounded-xl object-contain"
      />

      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl font-[700] tabular-nums text-white tracking-widest min-h-[60px] flex items-center justify-center">
          {badgeId ? badgeId : <span className="text-slate-600">· · ·</span>}
        </div>
        
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index < pin.length
                  ? 'bg-amber-500'
                  : 'bg-slate-700 border border-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {keys.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handleKeyPress(key)}
            className="w-16 h-16 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.95] text-white text-xl font-[500] transition-all duration-150 flex items-center justify-center mx-auto"
          >
            {key}
          </button>
        ))}
        
        {/* Bottom row */}
        <div className="w-16 h-16 mx-auto"></div>
        <button
          type="button"
          onClick={() => handleKeyPress('0')}
          className="w-16 h-16 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.95] text-white text-xl font-[500] transition-all duration-150 flex items-center justify-center mx-auto"
        >
          0
        </button>
        <button
          type="button"
          onClick={handleBackspace}
          className="w-16 h-16 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.95] text-white text-xl font-[500] transition-all duration-150 flex items-center justify-center mx-auto"
        >
          <Delete size={24} />
        </button>
      </div>

      <button
        type="button"
        disabled={loading || (badgeId.length === 0 && pin.length === 0)}
        onClick={(e) => onSubmit(e as unknown as React.FormEvent)}
        className="bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-black font-semibold w-full max-w-xs py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Verifying...' : 'Confirm'}
      </button>
    </div>
  );
}
