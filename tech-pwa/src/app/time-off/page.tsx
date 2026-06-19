/* eslint-disable @typescript-eslint/no-explicit-any */
 
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle, ChevronLeft, AlertCircle } from "lucide-react";
import { apiGet, apiCall } from "@/lib/syncQueue";
import { getSession } from "@/lib/auth";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "@/lib/i18n";

type RequestType = 'sick' | 'vacation' | 'personal';

interface Balance {
  accrued: number;
  used: number;
  available: number;
}

interface TimeOffRequest {
  requestId: string;
  type: RequestType;
  startDate: string;
  endDate: string;
  notes: string;
  status: 'Pending' | 'Approved' | 'Denied';
  submittedAt: string;
}

export default function TimeOffPage() {
  const router = useRouter();
  const session = getSession();
  const { toast } = useToast();
  const { t } = useTranslation();

  const [sickBalance, setSickBalance]     = useState<Balance | null>(null);
  const [vacBalance, setVacBalance]       = useState<Balance | null>(null);
  const [history, setHistory]             = useState<TimeOffRequest[]>([]);
  const [loading, setLoading]             = useState(true);

  const [type, setType]         = useState<RequestType>('sick');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');
  const [notes, setNotes]         = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  useEffect(() => {
    if (!session) { router.replace('/login'); return; }
    async function load() {
      const [balRes, histRes] = await Promise.all([
        apiGet<any>('getTimeOffBalance'),
        apiGet<any>('getTimeOffHistory'),
      ]);
      if (balRes.success) {
        setSickBalance(balRes.sick ?? null);
        setVacBalance(balRes.vacation ?? null);
      }
      if (histRes.success) setHistory(histRes.requests ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    setSubmitting(true);
    const res = await apiCall<any>('requestTimeOff', {
      type,
      startDate,
      endDate,
      notes,
      employeeId: session?.employeeId,
    });
    if (res.success) {
      setSubmitted(true);
      setStartDate(''); setEndDate(''); setNotes('');
      toast.success(t('toast_time_off_success'));
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      toast.error(t('toast_time_off_error'));
    }
    setSubmitting(false);
  };

  const TYPE_LABELS: Record<RequestType, string> = {
    sick: t('leave_sick'), 
    vacation: t('leave_vacation'), 
    personal: t('leave_personal'),
  };

  const STATUS_STYLE: Record<string, string> = {
    'Pending':  'bg-amber-500/20 text-amber-400',
    'Approved': 'bg-emerald-500/20 text-emerald-400',
    'Denied':   'bg-red-500/20 text-red-400',
  };

  const STATUS_LABELS: Record<string, string> = {
    'Pending':  t('status_pending') || 'Pending',
    'Approved': t('status_approved') || 'Approved',
    'Denied':   t('status_denied') || 'Denied',
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4">
        <button onClick={() => router.push('/jobs')}
          className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-all active:scale-90">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-black text-[var(--text-primary)] tracking-tight">{t('timeoff_title')}</h1>
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{t('timeoff_subtitle')}</p>
        </div>
      </header>

      <main className="px-6 space-y-8">
        {/* Balance Cards */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 animate-pulse">
            <div className="h-24 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)]" />
            <div className="h-24 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: t('balance_sick') || 'Sick Leave', bal: sickBalance, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { label: t('balance_vacation') || 'Vacation',   bal: vacBalance,  color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            ].map(({ label, bal, color, bg }) => (
              <div key={label} className={`rounded-2xl border p-5 space-y-1 ${bg}`}>
                <p className={`text-[9px] font-black uppercase tracking-widest ${color}`}>{label}</p>
                <p className={`text-3xl font-black tracking-tight ${color}`}>{bal?.available ?? 0}<span className="text-sm font-bold ml-1">h</span></p>
                <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                  {bal?.accrued ?? 0}h {t('accrued')} Â· {bal?.used ?? 0}h {t('used')}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Sick leave auto-approve notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 text-[10px] font-bold text-blue-400 uppercase tracking-wide">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <span>{t('sick_auto_approve')}</span>
        </div>

        {/* Request Form */}
        <section className="space-y-4">
          <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.3em]">{t('form_new_request')}</p>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 gap-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <p className="text-base font-black text-[var(--text-primary)]">{t('request_submitted')}</p>
                <p className="text-xs text-[var(--text-muted)]">{t('request_submitted_note')}</p>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 space-y-5">

                {/* Type selector */}
                <div className="flex gap-2">
                  {(['sick', 'vacation', 'personal'] as RequestType[]).map(t => (
                    <button type="button" key={t}
                      onClick={() => setType(t)}
                      className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                        type === t
                          ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                          : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                      }`}>
                      {TYPE_LABELS[t]}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar size={10} /> {t('label_start_date')}
                    </label>
                    <input required type="date" value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={10} /> {t('label_end_date')}
                    </label>
                    <input required type="date" value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">{t('label_notes')}</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)}
                    rows={3} placeholder={t('notes_placeholder')}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-all resize-none" />
                </div>

                <button type="submit" disabled={submitting || !startDate || !endDate}
                  className="w-full py-4 bg-[var(--accent)] text-white font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-lg shadow-[var(--accent)]/20 disabled:opacity-30 active:scale-95 transition-all">
                  {submitting ? t('btn_submitting') : t('btn_submit_request')}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </section>

        {/* Request History */}
        {history.length > 0 && (
          <section className="space-y-4">
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">{t('past_requests')}</p>
            <div className="space-y-3">
              {history.map((req) => (
                <div key={req.requestId}
                  className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-black text-[var(--text-primary)]">{TYPE_LABELS[req.type]}</p>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                      {req.startDate} â†’ {req.endDate}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shrink-0 ${STATUS_STYLE[req.status] ?? 'bg-slate-500/20 text-slate-400'}`}>
                    {STATUS_LABELS[req.status] || req.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

