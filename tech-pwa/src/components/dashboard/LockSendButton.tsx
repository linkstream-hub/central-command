'use client';

import { useState } from 'react';
import { SendHorizonal, Loader2 } from 'lucide-react';

interface LockSendButtonProps {
  date: string;
  onSuccess?: (result: { techCount: number; jobCount: number }) => void;
  disabled?: boolean;
}

export function LockSendButton({ date, onSuccess, disabled }: LockSendButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/schedule/lock-and-send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ date }),
      });

      if (res.status === 409) {
        alert('Already dispatched for this date');
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success) {
        onSuccess?.({ techCount: data.techCount, jobCount: data.jobCount });
      } else {
        console.error('[LockSendButton] failed:', data.message);
      }
    } catch (error) {
      console.error('[LockSendButton] fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      data-testid="lock-send-btn"
      onClick={handleClick}
      disabled={isDisabled}
      className={`flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200 active:scale-[0.98] ${
        isDisabled ? 'opacity-50 cursor-not-allowed active:scale-100 hover:bg-amber-500' : ''
      }`}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <SendHorizonal size={18} />
          Lock and Send
        </>
      )}
    </button>
  );
}
