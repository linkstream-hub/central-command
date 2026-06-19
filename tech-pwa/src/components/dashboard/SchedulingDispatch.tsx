"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Job } from "@/lib/types";
import { TechSuggestion, TechSuggestionResponse, dashboardRequest } from "@/lib/dashboard-api";
import { 
  AlertTriangle, CheckCircle, Clock, Phone, Mail, X, ChevronRight, Search, ChevronDown
} from "lucide-react";

// ─────────────────────────────────────
// Types
// ─────────────────────────────────────

export interface TechEntry {
  name: string;
  badge?: string;   // C, L, L1, L2, T (or numeric id)
  skills?: Record<string, number>;
  active?: boolean;
}

interface SchedulingDispatchProps {
  job: Job;
  onUpdate: (patch: Partial<Job>) => void;
  techRoster: TechEntry[];
  weekAvailability: Record<string, Record<string, number>>; // techName → YYYY-MM-DD → committedHours
  tradeDurations: Record<string, number>;
  techSuggestions?: TechSuggestion[];
  onTriggerPTEEmail: () => void;
  outDates?: Record<string, string[]>;
}

// ─────────────────────────────────────
// Static helpers & constants
// ─────────────────────────────────────

const SERVICE_TO_SKILL: Record<string, string> = {
  Plumbing: "P", Electrical: "E", Carpentry: "C",
  "Finish Carpentry": "FC", Structural: "S", Landscaping: "L", Janitorial: "J",
};

const SKILL_BADGE = {
  STRONG:   "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  MODERATE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  WEAK:     "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const DAY_SHORT  = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON_SHORT  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const TIME_SLOTS = (() => {
  const slots: { value: string; label: string }[] = [];
  for (let h = 7; h <= 15; h++) {
    for (const m of [0, 30]) {
      if (h === 15 && m > 0) break;
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const ampm = h < 12 ? "AM" : "PM";
      const dh = h > 12 ? h - 12 : h;
      slots.push({ value: `${hh}:${mm}`, label: `${dh}:${mm} ${ampm}` });
    }
  }
  return slots;
})();

function toDateStr(d: Date) { return d.toISOString().split("T")[0]; }

function getNext7BusinessDays(): Date[] {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  
  // Include "Today" if it's a business day
  if (cursor.getDay() !== 0 && cursor.getDay() !== 6) {
    days.push(new Date(cursor));
  }
  
  while (days.length < 7) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) days.push(new Date(cursor));
  }
  return days;
}

function getSkillMatch(skills: Record<string, number> | undefined, category: string): "STRONG" | "MODERATE" | "WEAK" | null {
  const code = SERVICE_TO_SKILL[category];
  if (!code || !skills) return null;
  const r = skills[code] ?? 0;
  if (r >= 4) return "STRONG";
  if (r >= 2) return "MODERATE";
  if (r >= 1) return "WEAK";
  return null;
}

function getRankInfo(badge?: string) {
  const b = (badge || "").toUpperCase();
  if (b === "C")  return { label: "CPT",    cls: "bg-blue-500/20 text-blue-400 border-blue-500/30", isSupervisor: true,  isTrainee: false };
  if (b === "L")  return { label: "LT",     cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", isSupervisor: true,  isTrainee: false };
  if (b === "L1") return { label: "1LT",    cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", isSupervisor: true,  isTrainee: false };
  if (b === "L2") return { label: "2LT",    cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", isSupervisor: true,  isTrainee: false };
  if (b === "T")  return { label: "TRN",    cls: "bg-amber-500/20 text-amber-400 border-amber-500/30", isSupervisor: false, isTrainee: true };
  
  // Handle numeric badge IDs (e.g., employee numbers)
  if (/^\d+$/.test(b)) {
    return { label: `#${b}`, cls: "bg-white/5 text-[var(--text-muted)] border-white/10 text-[7px]", isSupervisor: false, isTrainee: false };
  }
  
  return { label: b || "—", cls: "bg-white/5 text-slate-400 border-white/10", isSupervisor: false, isTrainee: false };
}

// ─────────────────────────────────────
// Main Component
// ─────────────────────────────────────

export default function SchedulingDispatch({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  job, onUpdate, techRoster, weekAvailability, tradeDurations, techSuggestions: _techSuggestions = [], onTriggerPTEEmail, outDates = {}
}: SchedulingDispatchProps) {
  const [search, setSearch]               = useState("");
  const [isOpen, setIsOpen]               = useState(false);
  const [suggestions, setSuggestions]     = useState<TechSuggestion[]>([]);
  const dropdownRef                        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (job.jobId) {
      dashboardRequest<TechSuggestionResponse>("suggestTechs", { 
        serviceCategory: job.serviceCategory,
        address: job.address,
        proposedDate: job.scheduledDate || undefined,
      })
        .then(res => {
          if (res.success) setSuggestions(res.suggestions);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job.jobId]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>(() => {
    if (!job.assignedTech) return [];
    // If it contains a semicolon, it's the new format
    if (job.assignedTech.includes(';')) {
      return job.assignedTech.split(';').map(s => s.trim()).filter(Boolean);
    }
    // Handle comma-separated legacy if it's not a single name with a comma (e.g., "Doe, John")
    if (job.assignedTech.includes(',') && !job.assignedTech.includes(';')) {
      // If there are multiple commas or we can't find a direct roster match for the whole string, split it
      const rosterNames = techRoster.map(t => t.name);
      if (!rosterNames.includes(job.assignedTech.trim())) {
        return job.assignedTech.split(',').map(s => s.trim()).filter(Boolean);
      }
    }
    // Legacy fallback: try to match against roster names since they may contain commas
    const rosterNames = techRoster.map(t => t.name);
    if (rosterNames.length > 0) {
      // Sort by length descending to match longest names first (prevent partial matches)
      const sortedNames = [...rosterNames].sort((a, b) => b.length - a.length);
      const escaped = sortedNames.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const regex = new RegExp(escaped.join('|'), 'g');
      const matches = job.assignedTech.match(regex);
      if (matches) return matches;
    }
    // Last resort
    return job.assignedTech.split(',').map(s => s.trim()).filter(Boolean);
  });
  const [selectedDate, setSelectedDate]   = useState(job.scheduledDate || "");
  const [selectedTime, setSelectedTime]   = useState(job.scheduledTime || "");
  const [estHours, setEstHours]           = useState<number>(
    () => job.estimatedHours || tradeDurations[job.serviceCategory] || 2
  );

  const status = job.status;
  const normalizeName = (name: string) => (name ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

  // ── Unlock conditions
  const step2Unlocked = selectedTechs.length > 0;
  const step3Unlocked = step2Unlocked && Boolean(selectedDate);

  // ── Trainee-only check
  const hasTraineeOnly = useMemo(() => {
    if (!selectedTechs.length) return false;
    const entries = techRoster.filter(t => selectedTechs.includes(t.name));
    return entries.some(t => getRankInfo(t.badge).isTrainee) &&
          !entries.some(t => getRankInfo(t.badge).isSupervisor);
  }, [selectedTechs, techRoster]);

  // ── Sorted tech list
  const sortedTechs = useMemo(() => {
    const today = toDateStr(new Date());
    const suggNames = new Set(suggestions.map(s => s.name));

    return techRoster
      .filter(t => t && t.active !== false && (t.name ?? '').toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        // 1. Suggestions first
        const isSuggA = suggNames.has(a.name) ? 1 : 0;
        const isSuggB = suggNames.has(b.name) ? 1 : 0;
        if (isSuggA !== isSuggB) return isSuggB - isSuggA;

        // 2. Skill match
        const order = { STRONG: 3, MODERATE: 2, WEAK: 1, null: 0 };
        const sA = order[getSkillMatch(a.skills, job.serviceCategory) as keyof typeof order] ?? 0;
        const sB = order[getSkillMatch(b.skills, job.serviceCategory) as keyof typeof order] ?? 0;
        if (sA !== sB) return sB - sA;

        // 3. Availability (normalized name lookup)
        const hA = weekAvailability[normalizeName(a.name)]?.[today] ?? 0;
        const hB = weekAvailability[normalizeName(b.name)]?.[today] ?? 0;
        return hA - hB; 
      });
  }, [techRoster, search, job.serviceCategory, weekAvailability, suggestions]);

  // ── Day cards
  const businessDays = useMemo(() => getNext7BusinessDays(), []);

  const getBottleneckLoad = (date: Date): number => {
    const ds = toDateStr(date);
    if (!selectedTechs.length) return 0;
    return Math.max(...selectedTechs.map(n => weekAvailability[normalizeName(n)]?.[ds] ?? 0));
  };

  // ── Confirmation summary
  const confirm = useMemo(() => {
    if (!selectedTechs.length || !selectedDate || !selectedTime) return null;
    const d    = new Date(selectedDate + "T12:00:00");
    const dateLabel = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const slot      = TIME_SLOTS.find(s => s.value === selectedTime);
    const maxLoad   = Math.max(...selectedTechs.map(n => weekAvailability[normalizeName(n)]?.[selectedDate] ?? 0));
    return { dateLabel, timeLabel: slot?.label || selectedTime, remaining: Math.max(0, 8 - maxLoad - estHours), existingLoad: maxLoad };
  }, [selectedTechs, selectedDate, selectedTime, estHours, weekAvailability]);

  // ── Handlers — each selection immediately propagates to parent
  const toggleTech = (name: string) => {
    const next = selectedTechs.includes(name)
      ? selectedTechs.filter(n => n !== name)
      : [...selectedTechs, name];
    setSelectedTechs(next);
    // Canonical format: Semicolon separated (First Last; First Last)
    onUpdate({ assignedTech: next.join("; ") });
  };

  const handleDateSelect = (ds: string) => {
    setSelectedDate(ds);
    onUpdate({ scheduledDate: ds });
  };

  const handleTimeSelect = (t: string) => {
    setSelectedTime(t);
    onUpdate({ scheduledTime: t });
  };

  const handleHoursChange = (h: number) => {
    setEstHours(h);
    onUpdate({ estimatedHours: h });
  };

  // ─────────────────────────────────────
  // State-specific renders
  // ─────────────────────────────────────

  if (status === "Needs Review") {
    return (
      <section className="space-y-4 pt-6 border-t border-white/5">
        <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Work Order Coordination</h4>
        <div className="p-6 bg-[var(--bg-surface)] border border-white/5 rounded-2xl space-y-5">
          <p className="text-xs font-black text-[var(--text-primary)]">
            Does this job require tenant permission to enter?
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onUpdate({ status: "PTE Required" })}
              className="py-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[10px] font-black text-amber-400 uppercase tracking-widest hover:bg-amber-500/20 transition-all">
              ⚠ Yes — PTE Required
            </button>
            <button onClick={() => onUpdate({ status: "Ready to Schedule" })}
              className="py-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest hover:bg-blue-500/20 transition-all">
              ✓ No — Ready to Schedule
            </button>
          </div>
          <div className="flex gap-3 pt-2 border-t border-white/5">
            <button onClick={() => onUpdate({ status: "Awaiting Approval" })}
              className="flex-1 py-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl text-[9px] font-black text-purple-400 uppercase tracking-widest hover:bg-purple-500/20 transition-all">
              Needs Estimate Approval
            </button>
            <button onClick={() => onUpdate({ status: "Archived" })}
              className="flex-1 py-2.5 bg-red-500/5 border border-red-500/20 rounded-xl text-[9px] font-black text-red-400/70 uppercase tracking-widest hover:bg-red-500/10 transition-all">
              Archive
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (status === "PTE Required") {
    return (
      <section className="space-y-4 pt-6 border-t border-white/5">
        <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Dispatch — PTE Required</h4>
        <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl space-y-5">
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-amber-400 shrink-0" />
            <p className="text-[11px] font-black text-amber-400 uppercase tracking-wide">
              Scheduling locked — obtain tenant PTE first
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-[var(--text-primary)]">{job.tenantName || "Tenant — Not On File"}</p>
            {job.tenantPhone && (
              <a href={`tel:${job.tenantPhone}`} className="flex items-center gap-2 text-[var(--accent)] hover:underline text-[11px] font-bold">
                <Phone size={11} /> {job.tenantPhone}
              </a>
            )}
          </div>
          <div className="flex gap-3">
            {job.tenantEmail && (
              <button onClick={onTriggerPTEEmail}
                className="flex-1 py-3 bg-[var(--bg-primary)] border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-[var(--accent)] transition-all flex items-center justify-center gap-2">
                <Mail size={12} className="text-[var(--accent)]" /> Email PTE
              </button>
            )}
            {job.tenantPhone && (
              <a href={`tel:${job.tenantPhone}`}
                className="flex-1 py-3 bg-[var(--bg-primary)] border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-[var(--accent)] transition-all flex items-center justify-center gap-2">
                <Phone size={12} className="text-[var(--accent)]" /> Call Tenant
              </a>
            )}
          </div>
          <button onClick={() => onUpdate({ status: "Ready to Schedule", pteGranted: "Yes" })}
            className="w-full py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-[10px] font-black text-green-400 uppercase tracking-widest hover:bg-green-500/20 transition-all">
            ✓ Mark PTE Granted — Proceed to Schedule
          </button>
        </div>
      </section>
    );
  }

  if (status === "Awaiting Approval") {
    return (
      <section className="space-y-4 pt-6 border-t border-white/5">
        <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Dispatch — Awaiting Approval</h4>
        <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl space-y-4">
          <p className="text-[11px] font-black text-purple-400 uppercase">Estimate sent — waiting for RM sign-off</p>
          <button onClick={() => onUpdate({ status: "Ready to Schedule" })}
            className="w-full py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest hover:bg-blue-500/20 transition-all">
            ✓ Approval Received — Ready to Schedule
          </button>
        </div>
      </section>
    );
  }

  if (status === "Scheduled") {
    return (
      <section className="space-y-4 pt-6 border-t border-white/5">
        <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Dispatch — Scheduled</h4>
        <div className="p-6 bg-green-500/5 border border-green-500/30 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Confirmed</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {(job.assignedTech || '').split(',').map(name => name.trim()).filter(Boolean).map(name => (
              <span key={name} className="text-[10px] font-black text-[var(--text-primary)] bg-white/5 rounded px-2 py-0.5">
                {name}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] font-bold">
            {job.scheduledDate && new Date(job.scheduledDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            {job.scheduledTime && ` · ${TIME_SLOTS.find(s => s.value === job.scheduledTime)?.label || job.scheduledTime}`}
            {job.estimatedHours ? ` · ~${job.estimatedHours} hrs` : ""}
          </p>
          <div className="flex gap-3 pt-2 border-t border-white/5">
            <button onClick={() => onUpdate({ status: "Ready to Schedule" })}
              className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-white/20 transition-all">
              Reschedule
            </button>
            <button onClick={() => onUpdate({ status: "Complete" })}
              className="flex-1 py-2.5 bg-green-500/10 border border-green-500/30 rounded-xl text-[9px] font-black text-green-400 uppercase tracking-widest hover:bg-green-500/20 transition-all">
              Mark Complete
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (status === "In Progress") {
    return (
      <section className="space-y-4 pt-6 border-t border-white/5">
        <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Dispatch — In Progress</h4>
        <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Tech On Site</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {(job.assignedTech || '').split(',').map(name => name.trim()).filter(Boolean).map(name => (
              <span key={name} className="text-[10px] font-black text-[var(--text-primary)] bg-white/5 rounded px-2 py-0.5">
                {name}
              </span>
            ))}
          </div>
          {job.clockedInAt && (
            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest flex items-center gap-2">
              <Clock size={11} /> Clocked in: {new Date(job.clockedInAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </p>
          )}
        </div>
      </section>
    );
  }

  if (status === "Complete") {
    return (
      <section className="space-y-4 pt-6 border-t border-white/5">
        <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Dispatch — Complete</h4>
        <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Job Complete</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {(job.assignedTech || '').split(',').map(name => name.trim()).filter(Boolean).map(name => (
              <span key={name} className="text-[10px] font-black text-[var(--text-primary)] bg-white/5 rounded px-2 py-0.5">
                {name}
              </span>
            ))}
          </div>
          <button disabled className="w-full py-2.5 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-30 cursor-not-allowed">
            Ready to Invoice (Phase 3)
          </button>
        </div>
      </section>
    );
  }

  if (status === "Archived") {
    return (
      <section className="space-y-4 pt-6 border-t border-white/5">
        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
          <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-40">This job has been archived</p>
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────
  // READY TO SCHEDULE — 3-step wizard
  // ─────────────────────────────────────
  return (
    <section className="space-y-8 pt-6 border-t border-white/5">

      {/* ── STEP 1: TECH PICKER */}
      <div className="space-y-4 relative">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-[9px] font-black text-white">1</div>
          <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">Select Technician(s)</span>
        </div>

        {/* Selected Chips */}
        {selectedTechs.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTechs.map(name => (
              <div key={name} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full text-[9px] font-black text-[var(--accent)]">
                {name}
                <button onClick={() => toggleTech(name)} className="hover:text-white transition-colors ml-1">
                  <X size={9} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Dropdown Toggle */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-[var(--bg-primary)] border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between text-xs font-black text-[var(--text-primary)] hover:border-[var(--accent)]/50 transition-all outline-none"
          >
            <div className="flex items-center gap-2">
              <Search size={14} className="text-[var(--text-muted)]" />
              <span>{selectedTechs.length > 0 ? `${selectedTechs.length} Technician${selectedTechs.length > 1 ? 's' : ''} Selected` : 'Choose Technicians'}</span>
            </div>
            <ChevronDown size={14} className={`text-[var(--text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                className="absolute top-full left-0 right-0 z-[100] mt-2 bg-[var(--bg-surface)] border border-white/10 rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                <div className="p-2 border-b border-white/5 bg-white/[0.01]">
                  <input
                    autoFocus
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Filter by name..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar divide-y divide-white/[0.03]">
                  {sortedTechs.map(tech => {
                    if (!tech || !tech.name) return null;
                    const rank    = getRankInfo(tech.badge);
                    const skill   = getSkillMatch(tech.skills, job.serviceCategory);
                    const isSel   = selectedTechs.includes(tech.name);
                    const isSugg  = suggestions.some(s => s.name === tech.name);
                    const today   = toDateStr(new Date());
                    const committed  = weekAvailability[normalizeName(tech.name)]?.[today] ?? 0;
                    const available  = Math.max(0, 8 - committed);
                    const availCls   = available >= 4 ? "text-emerald-400" : available >= 1 ? "text-yellow-400" : "text-red-400";

                    return (
                      <button
                        key={tech.name}
                        onClick={() => toggleTech(tech.name)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${isSel ? "bg-[var(--accent)]/10" : "hover:bg-white/[0.02]"}`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isSel ? "bg-[var(--accent)] border-[var(--accent)]" : "border-white/20"}`}>
                          {isSel && <CheckCircle size={10} className="text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-[var(--text-primary)] truncate">{tech.name}</span>
                            {isSugg && (
                              <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-[7px] font-black uppercase tracking-widest translate-y-[-1px]">Best Match</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`px-1.5 py-0.5 rounded text-[7px] font-black border uppercase ${rank.cls}`}>{rank.label}</span>
                            {skill && (
                              <span className={`px-1.5 py-0.5 rounded text-[7px] font-black border uppercase ${SKILL_BADGE[skill]}`}>{skill}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`text-[9px] font-black uppercase block ${availCls}`}>{committed}/8 HRS</span>
                          <span className="text-[8px] text-[var(--text-muted)] font-black uppercase tracking-tighter opacity-40">Today</span>
                        </div>
                      </button>
                    );
                  })}
                  {sortedTechs.length === 0 && (
                    <div className="py-8 text-center text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest opacity-30">No techs found</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trainee warning */}
        {hasTraineeOnly && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
          >
            <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[10px] font-bold text-amber-400 leading-snug">
              Trainee — must be paired with a Captain or Lieutenant. Verify a senior tech is on-site.
            </p>
          </motion.div>
        )}
      </div>

      {/* ── STEP 2: DATE CARDS */}
      <div className={`space-y-4 transition-opacity duration-200 ${step2Unlocked ? "opacity-100" : "opacity-25 pointer-events-none"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black ${step2Unlocked ? "bg-[var(--accent)] text-white" : "bg-white/10 text-[var(--text-muted)]"}`}>2</div>
          <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">Select Date</span>
          {!step2Unlocked && <span className="text-[8px] text-[var(--text-muted)] uppercase">(pick a tech first)</span>}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {businessDays.map(day => {
            const ds        = toDateStr(day);
            const load      = getBottleneckLoad(day);
            const remaining = Math.max(0, 8 - load);
            const isFull    = load >= 8;
            const isSel     = selectedDate === ds;
            
            // Check for Approved Leave (OUT)
            // If ANY selected tech is out, the day is blocked
            const isOut = selectedTechs.some(name => outDates[name]?.includes(ds));

            return (
              <button
                key={ds}
                disabled={isFull || isOut}
                onClick={() => handleDateSelect(ds)}
                className={`flex flex-col items-center p-3 rounded-xl border min-w-[76px] shrink-0 transition-all ${
                  isFull || isOut ? "opacity-30 cursor-not-allowed bg-white/2 border-white/5"
                  : isSel ? "bg-[var(--accent)]/10 border-[var(--accent)] shadow-lg shadow-[var(--accent)]/10"
                          : "bg-[var(--bg-surface)] border-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-[8px] font-black text-[var(--text-muted)] uppercase">{DAY_SHORT[day.getDay()]}</span>
                <span className={`text-[11px] font-black mt-0.5 ${isSel ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}>
                  {isOut ? "OUT" : `${MON_SHORT[day.getMonth()]} ${day.getDate()}`}
                </span>
                <span className={`text-[8px] font-black mt-1.5 uppercase ${isOut ? "text-amber-400" : isFull ? "text-red-400" : remaining >= 4 ? "text-emerald-400" : "text-yellow-400"}`}>
                  {isOut ? "⚠ OFF" : isFull ? "⛔ FULL" : `${remaining} hrs`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 3: ARRIVAL + HOURS */}
      <div className={`space-y-4 transition-opacity duration-200 ${step3Unlocked ? "opacity-100" : "opacity-25 pointer-events-none"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black ${step3Unlocked ? "bg-[var(--accent)] text-white" : "bg-white/10 text-[var(--text-muted)]"}`}>3</div>
          <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">Arrival Window & Hours</span>
          {!step3Unlocked && <span className="text-[8px] text-[var(--text-muted)] uppercase">(pick a date first)</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Arrival Time</label>
            <select
              value={selectedTime}
              onChange={e => handleTimeSelect(e.target.value)}
              className="w-full bg-[var(--bg-surface)] border border-white/10 rounded-xl px-4 py-3 text-xs font-black text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            >
              <option value="">Select time...</option>
              {TIME_SLOTS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
              Est. Hours <span className="opacity-40 font-medium normal-case tracking-normal">(system estimate)</span>
            </label>
            <input
              type="number" min="0.5" max="12" step="0.5"
              value={estHours}
              onChange={e => handleHoursChange(parseFloat(e.target.value) || 2)}
              className="w-full bg-[var(--bg-surface)] border border-white/10 rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>

        {/* Confirmation summary */}
        <AnimatePresence>
          {confirm && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-[var(--bg-surface)] border border-white/10 rounded-xl space-y-2"
            >
              <p className="text-xs font-black text-[var(--text-primary)]">{selectedTechs.join(" + ")}</p>
              <p className="text-[10px] text-[var(--text-secondary)] font-bold">{confirm.dateLabel} · {confirm.timeLabel}</p>
              <p className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest">
                Est. {estHours} hrs — leaves {confirm.remaining.toFixed(1)} hrs capacity
              </p>
              {confirm.existingLoad > 0 && (
                <p className="text-[9px] text-yellow-400 font-black uppercase tracking-widest">
                  ⚠ Tech has {confirm.existingLoad.toFixed(1)} hrs already committed this day
                </p>
              )}
              <div className="flex items-center gap-2 pt-1 text-[9px] text-[var(--text-muted)] uppercase tracking-widest">
                <ChevronRight size={10} className="text-[var(--accent)]" />
                <span>Click <strong className="text-[var(--text-primary)]">Save Changes</strong> to commit</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
