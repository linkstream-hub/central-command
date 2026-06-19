/* eslint-disable @typescript-eslint/no-unused-vars */
 
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  dashboardRequest,
  CalendarResponse,
  CalendarTeamEntry
} from "@/lib/dashboard-api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

export default function CalendarPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { status } = useSession();
  const [calData, setCalData] = useState<CalendarResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState<string>(() => {
    const laFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
    return laFmt.format(new Date()).slice(0, 7);
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') { router.replace('/login'); return; }
  }, [status, router]);

  const loadCalendar = async () => {
    if (status !== 'authenticated') return;
    const res = await dashboardRequest<CalendarResponse>('getCalendarData', { month: currentMonth, view: 'team' });
    if (res.success) {
      setCalData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    const fetchCalendar = async () => {
      if (status !== 'authenticated') return;
      // Yield to avoid synchronous setState inside effect
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (ignore) return;
      setLoading(true);
      const res = await dashboardRequest<CalendarResponse>('getCalendarData', { month: currentMonth, view: 'team' });
      if (ignore) return;
      if (res.success) {
        setCalData(res);
      }
      setLoading(false);
    };
    fetchCalendar();
    return () => { ignore = true; };
  }, [currentMonth, status]);

  function shiftMonth(delta: number) {
    const [yr, mo] = currentMonth.split('-').map(Number);
    const next = new Date(yr, mo - 1 + delta, 1);
    const pad = (n: number) => String(n).padStart(2, '0');
    setCurrentMonth(`${next.getFullYear()}-${pad(next.getMonth() + 1)}`);
    setSelectedDay(null);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">

        {/* â”€â”€ HEADER â”€â”€ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">
              {t('calendar_title')}
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {t('calendar_subtitle')}
            </p>
          </div>
        </div>

        {/* â”€â”€ MONTH NAVIGATION â”€â”€ */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => shiftMonth(-1)}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all outline-none"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-base font-black text-[var(--text-primary)] uppercase tracking-widest min-w-[140px] text-center">
            {new Date(currentMonth + '-15T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => shiftMonth(1)}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all outline-none"
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => {
              const laFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
              setCurrentMonth(laFmt.format(new Date()).slice(0, 7));
              setSelectedDay(null);
            }}
            className="ml-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] border border-[var(--border-subtle)] rounded-lg hover:bg-white/5 hover:text-[var(--text-primary)] transition-all"
          >
            {t('btn_today')}
          </button>
        </div>

        {/* â”€â”€ MONTH GRID â”€â”€ */}
        {loading ? (
          <CalendarSkeleton />
        ) : (
          <MonthGrid
            month={currentMonth}
            calData={calData}
            selectedDay={selectedDay}
            onDayClick={(date) => {
              if (date === selectedDay) setSelectedDay(null);
              else setSelectedDay(date);
            }}
          />
        )}

        {/* â”€â”€ DAY DETAIL PANEL â”€â”€ */}
        <AnimatePresence>
          {selectedDay && calData && (
            <DayDetailPanel
              date={selectedDay}
              teamEntries={calData.teamDays[selectedDay] ?? []}
              onClose={() => setSelectedDay(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}

function MonthGrid({
  month, calData, selectedDay, onDayClick
}: {
  month: string;
  calData: CalendarResponse | null;
  selectedDay: string | null;
  onDayClick: (date: string) => void;
}) {
  const { t } = useTranslation();
  const laFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
  const todayStr = laFmt.format(new Date());
  const DOW_LABELS = [
    t('day_mon'), t('day_tue'), t('day_wed'), t('day_thu'), t('day_fri'), t('day_sat'), t('day_sun')
  ];

  function getMonthDays(monthStr: string): Array<{ date: string; isCurrentMonth: boolean }> {
    const [yr, mo] = monthStr.split('-').map(Number);
    const firstDay = new Date(yr, mo - 1, 1);
    const lastDay  = new Date(yr, mo, 0);
    const result: Array<{ date: string; isCurrentMonth: boolean }> = [];

    const firstDow = firstDay.getDay();
    const padDays  = firstDow === 0 ? 6 : firstDow - 1;
    for (let i = padDays - 1; i >= 0; i--) {
      const d = new Date(yr, mo - 1, -i);
      result.push({ date: fmt(d), isCurrentMonth: false });
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      result.push({ date: `${yr}-${String(mo).padStart(2,'0')}-${String(i).padStart(2,'0')}`, isCurrentMonth: true });
    }
    while (result.length % 7 !== 0) {
      const parts = result[result.length - 1].date.split('-').map(Number);
      const last = new Date(parts[0], parts[1] - 1, parts[2] + 1, 12, 0, 0);
      result.push({ date: fmt(last), isCurrentMonth: false });
    }
    return result;
  }

  function fmt(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  const days = getMonthDays(month);

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-white/[0.02] overflow-hidden tabular-nums">
      <div className="grid grid-cols-7 border-b border-[var(--border-subtle)]">
        {DOW_LABELS.map(d => (
          <div key={d} className="py-3 text-center text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map(({ date, isCurrentMonth }) => {
          const teamEntries = calData?.teamDays[date] ?? [];
          const hasAny     = teamEntries.length > 0;
          const isToday    = date === todayStr;
          const isSelected = date === selectedDay;

          const chips = teamEntries.slice(0, 3).map((e, idx) => (
            <span
              key={`${e.name}-${idx}`}
              className={`text-[11px] font-bold truncate px-1.5 py-0.5 rounded-md max-w-full block ${
                e.leaveType === 'Sick'
                  ? 'bg-green-500/15 text-green-400'
                  : 'bg-amber-500/15 text-amber-400'
              }`}
            >
              {t('label_out')}: {e.name.split(' ')[0]}
            </span>
          ));
          const overflow = teamEntries.length - 3;

          return (
            <motion.div
              key={date}
              onClick={() => hasAny && onDayClick(date)}
              whileHover={hasAny ? { backgroundColor: 'rgba(255,255,255,0.04)' } : {}}
              className={`min-h-[100px] p-2 border-r border-b border-[var(--border-subtle)] flex flex-col gap-1 relative transition-colors ${
                !isCurrentMonth ? 'opacity-25' : ''
              } ${hasAny ? 'cursor-pointer' : ''} ${
                isSelected ? 'bg-[var(--accent)]/5 ring-1 ring-inset ring-[var(--accent)]/30' : ''
              }`}
            >
              <span className={`text-xs font-black self-start leading-none mb-1 ${
                isToday
                  ? 'bg-[var(--accent)] text-white w-6 h-6 flex items-center justify-center rounded-full text-[11px]'
                  : isCurrentMonth
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)]'
              }`}>
                {parseInt(date.split('-')[2])}
              </span>

              <div className="flex flex-col gap-1 overflow-hidden">
                {chips}
                {overflow > 0 && (
                  <span className="text-[8px] text-[var(--text-muted)] font-black uppercase tracking-widest pl-1 mt-0.5">+{overflow} {t('calendar_more')}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DayDetailPanel({
  date, teamEntries, onClose
}: {
  date: string;
  teamEntries: CalendarTeamEntry[];
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const parts = date.split('-').map(Number);
  const formatted = new Date(parts[0], parts[1]-1, parts[2], 12, 0, 0).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-white/[0.03] backdrop-blur-md p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{formatted}</h2>
        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          {t('calendar_close')}
        </button>
      </div>

      <div className="space-y-2">
        {teamEntries.length === 0 ? (
          <p className="text-xs text-[var(--text-muted)] italic">{t('no_timeoff_today')}</p>
        ) : (
          teamEntries.map((e, idx) => (
            <div key={`${e.name}-${idx}`} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
              e.leaveType === 'Sick'
                ? 'bg-green-500/5 border-green-500/10'
                : 'bg-amber-500/5 border-amber-500/10'
            }`}>
              <span className="text-sm font-bold text-[var(--text-primary)]">{e.name}</span>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                e.leaveType === 'Sick'
                  ? 'text-green-400 bg-green-500/10'
                  : 'text-amber-400 bg-amber-500/10'
              }`}>
                {e.leaveType === 'Sick' ? t('leave_sick') : t('leave_vacation')}
              </span>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function CalendarSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-white/[0.02] overflow-hidden animate-pulse">
      <div className="grid grid-cols-7 border-b border-[var(--border-subtle)]">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="py-3 flex justify-center">
            <div className="h-3 w-8 bg-white/10 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="min-h-[100px] p-2 border-r border-b border-[var(--border-subtle)]">
            <div className="h-4 w-5 bg-white/10 rounded mb-2" />
            {(i % 5 === 0) && <div className="h-3 w-full bg-white/5 rounded mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
