 
 
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { getSession } from "@/lib/auth";
import { apiCall } from "@/lib/syncQueue";

export default function ChangePinPage() {
  const router = useRouter();
  const session = getSession();

  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If somehow reached without a session, send to login
    if (!session) {
      router.replace('/login');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const firstName = session.techName?.split(' ')[0] ?? 'Tech';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPin.length < 4) {
      setError('PIN must be at least 4 digits.');
      return;
    }
    if (newPin !== confirmPin) {
      setError('PINs do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiCall<any>('changePIN', { newPin });
      if (res.success) {
        router.replace('/jobs');
      } else {
        setError(res.error || 'Failed to update PIN. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <ShieldCheck size={32} className="text-amber-400" />
          </div>
          <h1 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">
            Set Your PIN
          </h1>
          <p className="text-sm text-[var(--text-muted)] text-center leading-relaxed">
            Hi {firstName} — your account is using the default PIN.<br />
            Choose a new one before continuing.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                inputMode="numeric"
                placeholder="New PIN (min. 4 digits)"
                value={newPin}
                onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))}
                maxLength={8}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] p-1"
                tabIndex={-1}
              >
                {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <input
              type={showPin ? 'text' : 'password'}
              inputMode="numeric"
              placeholder="Confirm new PIN"
              value={confirmPin}
              onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              maxLength={8}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !newPin || !confirmPin}
              className="w-full bg-[var(--accent)] text-white font-black uppercase tracking-widest py-3 px-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {loading ? 'Saving…' : 'Set PIN & Continue'}
            </button>
          </form>

          <p className="text-[10px] text-[var(--text-muted)] text-center uppercase tracking-widest">
            You will only be asked once
          </p>
        </div>
      </motion.div>
    </div>
  );
}
