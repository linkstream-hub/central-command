/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, LogOut, CheckCircle } from 'lucide-react';
import { getShiftSession, clearShiftSession, setShiftSession, ShiftSession } from '@/lib/tech-session';
import { apiCall } from '@/lib/syncQueue';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/lib/i18n';

interface ClockedInBarProps {
  onShiftEnd?: () => void;
}

export default function ClockedInBar({ onShiftEnd }: ClockedInBarProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
  // useSyncExternalStore: React-idiomatic external store subscription.
  // Subscribes to both 'storage' (cross-tab) and 'apt-shift-change' (same-tab,
  // dispatched by setShiftSession/clearShiftSession in tech-session.ts).
  // Server snapshot returns null (SSR-safe). No setState-in-effect needed.
  const shift = useSyncExternalStore(
    (cb) => {
      window.addEventListener('storage', cb);
      window.addEventListener('apt-shift-change', cb);
      return () => {
        window.removeEventListener('storage', cb);
        window.removeEventListener('apt-shift-change', cb);
      };
    },
    () => getShiftSession(),
    () => null,
  );

  const [elapsed, setElapsed] = useState(0);
  const [ending, setEnding] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Attestation states
  const [showAttestation, setShowAttestation] = useState(false);
  const [attestationSigning, setAttestationSigning] = useState(false);

  // Tick elapsed timer
  useEffect(() => {
    if (!shift) return;
    const tick = () => {
      const start = new Date(shift.clockInTime).getTime();
      const breakSecs = (shift.breakDurationMinutes || 0) * 60;
      setElapsed(Math.max(0, Math.floor((Date.now() - start) / 1000) - breakSecs));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [shift]);

  if (!shift) return null;

  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  const timer = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

  const handleRestPeriod = async () => {
    const isOnBreak = shift.status === 'on-break';
    const action = isOnBreak ? 'endBreak' : 'startBreak';
    const res = await apiCall<any>(action, { shiftId: shift.shiftId });
    if (res.success) {
      const updated: ShiftSession = { 
        ...shift, 
        status: isOnBreak ? 'active' : 'on-break',
        breakDurationMinutes: res.breakDurationMinutes ?? shift.breakDurationMinutes,
      };
      setShiftSession(updated); // dispatches apt-shift-change → useSyncExternalStore re-reads
      toast.info(isOnBreak ? t('toast_break_ended') : t('toast_break_started'));
      navigator.vibrate?.(10);
    }
  };

  const handleEndShift = async () => {
    setEnding(true);
    const coords = { lat: undefined as number|undefined, lng: undefined as number|undefined };
    try {
      await new Promise<void>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (p) => { coords.lat = p.coords.latitude; coords.lng = p.coords.longitude; resolve(); },
          () => resolve(),
          { timeout: 5000 }
        );
      });
    } catch { /* GPS optional */ }

    const res = await apiCall('endShift', { shiftId: shift.shiftId, ...coords });
    if (res.success) {
      setShowAttestation(true);
    } else {
      toast.error('Failed to end shift');
      setEnding(false);
    }
  };

  const handleAttestationConfirm = async () => {
    if (!shift) return;
    setAttestationSigning(true);
    try {
      const totalMinutes = Math.floor((Date.now() - new Date(shift.clockInTime).getTime()) / 60000);
      const netMinutes = totalMinutes - (shift.breakDurationMinutes || 0);
      const mealCompliant = netMinutes < 300 || (shift.breakDurationMinutes || 0) >= 30;
      const restCompliant = true;
      await apiCall('signAttestation', {
        shiftId: shift.shiftId,
        attestationText: '',
        mealCompliant,
        restCompliant,
      });
      clearShiftSession(); // dispatches apt-shift-change → useSyncExternalStore re-reads
      toast.success('Shift ended. Great work!');
      navigator.vibrate?.([50, 30, 50]);
      onShiftEnd?.();
    } catch {
      toast.error('Attestation failed');
    } finally {
      setAttestationSigning(false);
      setShowAttestation(false);
      setShowConfirm(false);
      setEnding(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="shift-bar"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className={`fixed bottom-0 left-0 right-0 z-50
          backdrop-blur-xl border-t 
          px-4 py-3 pb-safe
          flex items-center justify-between gap-4 transition-colors duration-500
          ${shift.status === 'on-break' 
            ? 'bg-purple-900/40 border-purple-500/20 shadow-[0_-10px_40px_rgba(168,85,247,0.15)]' 
            : 'bg-emerald-950/40 border-emerald-500/20 shadow-[0_-10px_40px_rgba(16,185,129,0.15)]'}`}
      >
        {/* Timer */}
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${shift.status === 'on-break' ? 'bg-purple-400 animate-pulse' : 'bg-green-400 animate-pulse'}`} />
          <span className="font-mono text-sm font-black text-[var(--text-primary)] tracking-tight">{timer}</span>
          <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
            {shift.status === 'on-break' ? 'On Break' : 'Shift Active'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestPeriod}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-purple-500/10 border border-purple-500/30
              text-purple-300 text-[9px] font-black uppercase tracking-widest
              hover:bg-purple-500/20 transition-all"
          >
            <Coffee size={12} />
            {shift.status === 'on-break' ? 'End Break' : 'Start Break'}
          </motion.button>

          {!showConfirm ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                bg-red-500/10 border border-red-500/30
                text-red-400 text-[9px] font-black uppercase tracking-widest
                hover:bg-red-500/20 transition-all"
            >
              <LogOut size={12} />
              End Shift
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10
                  text-[9px] font-black text-[var(--text-muted)] uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleEndShift}
                disabled={ending}
                className="px-3 py-1.5 rounded-lg bg-red-600/80 border border-red-500
                  text-[9px] font-black text-white uppercase
                  disabled:opacity-50 transition-all"
              >
                {ending ? 'Ending…' : 'Confirm End'}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Attestation Modal */}
      {showAttestation && (
        <div key="attestation-modal" className="fixed inset-0 z-[110] flex items-end justify-center">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-sm mx-4 mb-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl z-[120]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-black italic uppercase tracking-tight text-lg">{t('attestation_title')}</h3>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{t('attestation_subtitle')}</p>
              </div>
            </div>

            <p className="text-zinc-300 text-sm font-medium leading-relaxed mb-8">
              {t('attestation_text')}
            </p>

            <button
              onClick={handleAttestationConfirm}
              disabled={attestationSigning}
              className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-blue-900/20 active:scale-95"
            >
              {attestationSigning ? t('btn_attestation_loading') : t('btn_attestation_confirm')}
            </button>

            <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest text-center mt-4">
              {t('attestation_footer')}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

