"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Job } from "@/lib/types";
import { StatFilter } from "./SummaryCards";
import { ChevronDown, ChevronUp, MapPin, Phone, ExternalLink, AlertTriangle, User } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { dashboardRequest } from "@/lib/dashboard-api";
import { toast } from "sonner";

function getJobAge(timestamp: string): { hours: number; label: string; level: 'fresh' | 'aging' | 'stale' } {
  if (!timestamp) return { hours: 0, label: '', level: 'fresh' };
  const hours = Math.floor((Date.now() - new Date(timestamp).getTime()) / 3600000);
  if (hours < 24)  return { hours, label: `${hours}h`,       level: 'fresh' };
  if (hours < 48)  return { hours, label: `${Math.floor(hours / 24)}d ${hours % 24}h`, level: 'aging' };
  return           { hours, label: `${Math.floor(hours / 24)}d`,  level: 'stale' };
}

interface JobQueueTableProps {
  jobs: Job[];
  onJobClick?: (job: Job) => void;
  view?: 'coordination' | 'full';
  searchQuery?: string;
  activeStatFilter?: StatFilter;
  statusTab?: StatusTab;
  onStatusTabChange?: (tab: StatusTab) => void;
  onJobStatusChange?: (jobId: string, newStatus: string) => void;
  onFocusSearch?: () => void;
}

type SortKey = 'age' | 'status' | 'priority' | 'category';
type SortDir = 'asc' | 'desc';
export type StatusTab = 'ALL' | 'NEEDS_REVIEW' | 'READY_TO_SCHEDULE' | 'PTE_REQUIRED' | 'SCHEDULED' | 'COMPLETE';

interface SortIndicatorProps {
  k: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
}

const SortIndicator = ({ k, sortKey, sortDir }: SortIndicatorProps) => {
  if (sortKey !== k) return null;
  return sortDir === 'asc' ? <ChevronUp size={10} className="ml-1" /> : <ChevronDown size={10} className="ml-1" />;
};

const STATUS_LABELS: Record<string, string> = {
  'Needs Review':       'NEEDS REVIEW',
  'Ready to Schedule':  'READY TO SCHEDULE',
  'PTE Required':       'PTE REQ',
  'Scheduled':          'SCHEDULED',
  'In Progress':        'IN PROG',
  'Complete':           'COMPLETE',
  'Archived':           'ARCHIVED',
  'New':                'NEEDS REVIEW',
  'Open':               'NEEDS REVIEW',
  'PTE-Pending':        'PTE REQ',
  'Tenant Contacted':   'PTE REQ',
  'Approval Needed':    'NEEDS REVIEW', // Re-map any legacy approval states back to Needs Review
};

const TYPE_MAP: Record<string, { label: string, class: string }> = {
  'lapham_form':     { label: 'WORK ORDER', class: 'text-slate-400 border-slate-400/30 bg-slate-400/10' },
  'turnover':        { label: 'TURNOVER', class: 'text-purple-400 border-purple-400/30 bg-purple-400/10' },
  'inspection':      { label: 'INSPECTION', class: 'text-blue-400 border-blue-400/30 bg-blue-400/10' },
  'adhoc_workorder': { label: 'WORK ORDER', class: 'text-slate-400 border-slate-400/30 bg-slate-400/10' },
  'new_inquiry':     { label: 'NEW INQUIRY', class: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' },
};

const STATUS_TRANSITIONS: Record<string, string[]> = {
  'Needs Review':       ['Ready to Schedule', 'PTE Required', 'Archived'],
  'Ready to Schedule':  ['Scheduled', 'PTE Required', 'Archived'],
  'PTE Required':       ['Ready to Schedule', 'Archived'],
  'Scheduled':          ['In Progress', 'Complete', 'Archived'],
  'In Progress':        ['Complete', 'Archived'],
  'Complete':           ['Archived'],
  'Archived':           ['Needs Review'],
};

const STATUS_ORDER = [
  'Needs Review',
  'Ready to Schedule',
  'PTE Required',
  'Scheduled',
  'In Progress',
  'Complete',
  'Archived'
];

function matchScore(job: Job, q: string): number {
  const id = String(job.jobId || '').toLowerCase();
  if (id === q) return 3;           // exact WO# match
  if (id.startsWith(q)) return 2;  // prefix match
  if (id.includes(q)) return 1;    // substring match
  return 0;                         // no jobId match (matched another field)
}

export default function JobQueueTable({ 
  jobs, 
  onJobClick, 
  view = 'full', 
  searchQuery = "", 
  activeStatFilter = null,
  statusTab: externalStatusTab,
  onStatusTabChange,
  onJobStatusChange,
  onFocusSearch
}: JobQueueTableProps) {
  const prefersReduced = useReducedMotion();
  const [internalStatusTab, setInternalStatusTab] = useState<StatusTab>('ALL');
  const statusTab = externalStatusTab !== undefined ? externalStatusTab : internalStatusTab;
  const setStatusTab = onStatusTabChange || setInternalStatusTab;

  const [sortKey, setSortKey] = useState<SortKey>('age');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [showArchived, setShowArchived] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'all' | 'inspection' | 'turnover'>('all');

  const [focusedIdx, setFocusedIdx] = useState<number>(-1);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch('/api/comms/unread');
        const data = await res.json();
        if (data.success) {
          setUnreadCounts(data.counts);
        }
      } catch {
        // unread count is non-critical; fail silently
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPriorityInfo = (priority: string) => {
    const p = (priority || '').toUpperCase();
    if (p.includes("URGENT")) return { label: "URGENT", class: "text-urgent border-urgent/30 bg-urgent-bg/50", weight: 4 };
    if (p.includes("TURNOVER")) return { label: "TURNOVER", class: "text-turnover border-turnover/30 bg-turnover-bg/50", weight: 3 };
    if (p.includes("PTE")) return { label: "PTE", class: "text-pte border-pte/30 bg-pte-bg/50", weight: 2 };
    return { label: "ROUTINE", class: "text-text-muted border-white/10 bg-white/5", weight: 1 };
  };

  const getStatusColor = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s.includes("complete")) return "text-[var(--text-primary)] border-standard opacity-60";
    if (s.includes("scheduled")) return "text-scheduled border-scheduled/30 bg-scheduled/10";
    if (s.includes("in progress")) return "text-scheduled border-scheduled/50 bg-scheduled/20 animate-pulse";
    if (s.includes("pte-pending") || s.includes("access") || s.includes("contacted") || s.includes("pte required")) return "text-pte border-pte/30 bg-pte/10";
    if (s.includes("approval")) return "text-urgent border-urgent/30 bg-urgent/10";
    return "text-turnover border-turnover/30 bg-turnover/10";
  };

  const getTypeInfo = (type?: string) => {
    return TYPE_MAP[type || ''] || { label: 'GENERAL', class: 'text-slate-500 border-white/5 bg-white/5' };
  };

  const filteredAndSortedJobs = useMemo(() => {
    let list = [...jobs];

    if (!showArchived) {
      list = list.filter(j => j.status !== 'Archived' && j.status !== 'Complete');
    }

    const isDrillDown = !!activeStatFilter || searchQuery.trim().length > 0;

    if (!isDrillDown) {
      if (statusTab !== 'ALL') {
        switch (statusTab) {
          case 'NEEDS_REVIEW':
            list = list.filter(j => (j.status || '').trim().toLowerCase() === 'needs review');
            break;
          case 'READY_TO_SCHEDULE':
            list = list.filter(j => (j.status || '').trim().toLowerCase() === 'ready to schedule');
            break;
          case 'PTE_REQUIRED':
            list = list.filter(j => (j.status || '').trim().toLowerCase() === 'pte required');
            break;
          case 'SCHEDULED':
            list = list.filter(j => (j.status || '').trim().toLowerCase() === 'scheduled');
            break;
          case 'COMPLETE':
            list = list.filter(j => (j.status || '').trim().toLowerCase() === 'complete');
            break;
        }
      } else if (view === 'coordination') {
        list = list.filter(j => {
          const st = (j.status || '').trim().toLowerCase();
          return st === 'needs review' || 
                 st === 'ready to schedule' ||
                 st === 'pte required' || 
                 st === 'awaiting approval';
        });
      }
    }

    if (activeStatFilter) {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' };
      const formatter = new Intl.DateTimeFormat('en-CA', options);
      const todayStr = formatter.format(now);
      const weekAgoDate = new Date(now.getTime() - 7 * 86400000);
      const weekAgo = formatter.format(weekAgoDate);

      switch (activeStatFilter) {
        case 'urgent':
          list = list.filter(j => j.priority === '1-URGENT');
          break;
        case 'needs-action':
          list = list.filter(j => j.status === 'Needs Review' || j.status === 'Ready to Schedule');
          break;
        case 'pte-pending':
          list = list.filter(j => j.status === 'PTE Required');
          break;
        case 'scheduled-today':
          list = list.filter(j => j.scheduledDate === todayStr);
          break;
        case 'completed-week':
          list = list.filter(j => j.status === 'Complete' && j.scheduledDate >= weekAgo);
          break;
      }
    }

    if (searchQuery?.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(j => 
        String(j.jobId || '').toLowerCase().includes(q) ||
        String(j.address || '').toLowerCase().includes(q) ||
        String(j.description || '').toLowerCase().includes(q) ||
        String(j.rmName || '').toLowerCase().includes(q) ||
        String(j.assignedTech || '').toLowerCase().includes(q)
      );
      list = list.sort((a, b) => matchScore(b, q) - matchScore(a, q));
    }

    if (typeFilter !== 'all') {
      list = list.filter(j => j.emailType === typeFilter);
    }

    return list.sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'age') {
        const timeA = new Date(a.timestamp || 0).getTime();
        const timeB = new Date(b.timestamp || 0).getTime();
        comparison = timeA - timeB;
      } else if (sortKey === 'status') {
        comparison = (STATUS_LABELS[a.status] || a.status).localeCompare(STATUS_LABELS[b.status] || b.status);
      } else if (sortKey === 'priority') {
        comparison = getPriorityInfo(a.priority).weight - getPriorityInfo(b.priority).weight;
      } else if (sortKey === 'category') {
        comparison = a.serviceCategory.localeCompare(b.serviceCategory);
      }
      return sortDir === 'asc' ? comparison : -comparison;
    });
  }, [jobs, sortKey, sortDir, statusTab, showArchived, searchQuery, activeStatFilter, view, typeFilter]);

  const groupedJobs = useMemo(() => {
    const groups: Record<string, Job[]> = {};
    STATUS_ORDER.forEach(s => groups[s] = []);
    
    // Paginate before grouping so we don't render massive DOM lists
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedJobs = filteredAndSortedJobs.slice(startIndex, startIndex + itemsPerPage);

    paginatedJobs.forEach(job => {
      // Find the proper matched casing from STATUS_ORDER, or default to Archived
      const rawStatus = (job.status || 'Needs Review').trim().toLowerCase();
      let s = 'Archived';
      
      if (rawStatus === 'needs review') s = 'Needs Review';
      else if (rawStatus === 'pte required') s = 'PTE Required';
      else if (rawStatus === 'ready to schedule') s = 'Ready to Schedule';
      else if (rawStatus === 'scheduled') s = 'Scheduled';
      else if (rawStatus === 'in progress') s = 'In Progress';
      else if (rawStatus === 'complete') s = 'Complete';
      
      if (groups[s]) {
        groups[s].push(job);
      } else {
        groups['Archived'].push(job);
      }
    });
    
    return groups;
  }, [filteredAndSortedJobs, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortKey, sortDir, statusTab, showArchived, searchQuery, activeStatFilter, view, typeFilter]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  async function handleInlineStatusChange(job: Job, newStatus: string) {
    onJobStatusChange?.(job.jobId, newStatus);
    try {
      await dashboardRequest('updateJob', {
        job: {
          jobId: job.jobId,
          rowIndex: job.rowIndex,
          assignedTech: job.assignedTech,
          scheduledDate: job.scheduledDate,
          scheduledTime: job.scheduledTime,
          estHours: job.estimatedHours,
          status: newStatus,
          notes: job.notes,
          address: job.address,
          unit: job.unit,
          description: job.description,
          serviceCategory: job.serviceCategory,
          tenantName: job.tenantName,
          tenantPhone: job.tenantPhone,
          tenantEmail: job.tenantEmail,
          rmName: job.rmName,
          rmEmail: job.rmEmail,
          accessInfo: job.accessInfo,
        },
      });
    } catch {
      onJobStatusChange?.(job.jobId, job.status);
      toast.error('Failed to update status');
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIdx(i => Math.min(i + 1, filteredAndSortedJobs.length - 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIdx(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        if (focusedIdx >= 0 && filteredAndSortedJobs[focusedIdx]) {
          onJobClick?.(filteredAndSortedJobs[focusedIdx]);
        }
      } else if (e.key === 'Escape') {
        setFocusedIdx(-1);
      } else if (e.key === '/') {
        e.preventDefault();
        onFocusSearch?.();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredAndSortedJobs, focusedIdx, onJobClick, onFocusSearch]);

  useEffect(() => {
    if (focusedIdx >= 0 && rowRefs.current[focusedIdx]) {
      rowRefs.current[focusedIdx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedIdx]);

  return (
    <div className="w-full h-full flex flex-col relative space-y-6">
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 shrink-0 custom-scrollbar">
        {(view === 'coordination' 
          ? [
              { key: 'ALL'               as StatusTab, label: 'All Jobs' },
              { key: 'NEEDS_REVIEW'      as StatusTab, label: 'Needs Review' },
              { key: 'READY_TO_SCHEDULE' as StatusTab, label: 'Ready to Schedule' },
              { key: 'PTE_REQUIRED'      as StatusTab, label: 'PTE Required' },
            ]
          : [
              { key: 'ALL'               as StatusTab, label: 'All' },
              { key: 'NEEDS_REVIEW'      as StatusTab, label: 'Needs Review' },
              { key: 'READY_TO_SCHEDULE' as StatusTab, label: 'Ready to Schedule' },
              { key: 'PTE_REQUIRED'      as StatusTab, label: 'PTE Required' },
              { key: 'SCHEDULED'         as StatusTab, label: 'Scheduled' },
              { key: 'COMPLETE'          as StatusTab, label: 'Complete' },
            ]
        ).map(tab => (
          <button
            key={tab.key}
            onClick={() => setStatusTab(tab.key)}
            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
              statusTab === tab.key
                ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}

        <div className="w-px h-4 bg-[var(--border-subtle)] mx-2" />

        {(['all', 'inspection', 'turnover'] as const).map(type => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
              typeFilter === type
                ? 'bg-[var(--accent)]/20 border-[var(--accent)]/40 text-[var(--accent)]'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}

        <div className="ml-auto pl-4 shrink-0 border-l border-[var(--border-subtle)]">
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
              showArchived
                ? 'bg-[var(--text-muted)]/20 border-[var(--text-muted)]/30 text-[var(--text-muted)]'
                : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-muted)]/40 hover:text-[var(--text-muted)]'
            }`}
          >
            {showArchived ? 'Hide Archived' : 'Show Archived'}
          </button>
        </div>
      </div>

      <div className="border border-[var(--border-subtle)] rounded-2xl overflow-hidden bg-[var(--bg-primary)] flex flex-col flex-1 min-h-0 shadow-lg">
        <div className="h-[44px] sticky top-0 z-30 flex items-center shrink-0 px-4 py-3 text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/95 backdrop-blur-md select-none">
          <div className="w-24 px-4 flex items-center cursor-pointer hover:text-[var(--text-primary)] transition-colors" onClick={() => toggleSort('priority')}>
            Priority <SortIndicator k="priority" sortKey={sortKey} sortDir={sortDir} />
          </div>
          <div className="w-24">Type</div>
          <div className="flex-1 px-4">Address & Details</div>
          <div className="w-32 flex items-center cursor-pointer hover:text-[var(--text-primary)] transition-colors" onClick={() => toggleSort('category')}>
            Category <SortIndicator k="category" sortKey={sortKey} sortDir={sortDir} />
          </div>
          <div className="w-36 flex items-center cursor-pointer hover:text-[var(--text-primary)] transition-colors" onClick={() => toggleSort('status')}>
            Status <SortIndicator k="status" sortKey={sortKey} sortDir={sortDir} />
          </div>
          <div className="w-24 flex items-center cursor-pointer hover:text-[var(--text-primary)] transition-colors" onClick={() => toggleSort('age')}>
            Date Received <SortIndicator k="age" sortKey={sortKey} sortDir={sortDir} />
          </div>
          <div className="w-32"></div>
        </div>
        <div className="space-y-[1px] bg-[var(--border-subtle)] flex-1 overflow-y-auto custom-scrollbar">
          {(() => {
            let globalIdx = 0;
            return STATUS_ORDER.map(status => {
              const jobsInStatus = groupedJobs[status];
              if (jobsInStatus.length === 0) return null;

              return (
                <div key={status} data-status-section={status}>
                  <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]/50 backdrop-blur-xl shadow-sm">
                    <span className="text-[13px] font-bold uppercase tracking-wide text-[var(--accent)]">{status}</span>
                    <span className="text-[9px] font-bold text-[var(--text-muted)] bg-white/10 px-2.5 py-0.5 rounded-full">{jobsInStatus.length}</span>
                  </div>
                  {jobsInStatus.map((job) => {
                    const i = globalIdx++;
                    const pInfo = getPriorityInfo(job.priority);
                    const tInfo = getTypeInfo(job.emailType);
                    const priorityTopBorder = (() => {
                      const p = (job.priority || '').toUpperCase();
                      if (p.includes('URGENT'))   return 'border-t-red-500';
                      if (p.includes('TURNOVER')) return 'border-t-orange-500';
                      if (p.includes('PTE'))      return 'border-t-yellow-500';
                      return 'border-t-blue-500';
                    })();

                    const displayStatus = STATUS_LABELS[job.status] || job.status;

                    return (
                      <motion.div
                        key={job.jobId ? `${job.jobId}-${i}` : `job-${status}-${i}`}
                        data-job-id={job.jobId}
                        ref={(el) => { rowRefs.current[i] = el; }}
                        initial={prefersReduced ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReduced ? { duration: 0 } : { delay: Math.min(i * 0.02, 0.25), ease: [0.25, 1, 0.5, 1], duration: 0.25 }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFocusedIdx(i); onJobClick?.(job); } }}
                        onClick={() => { setFocusedIdx(i); onJobClick?.(job); }}
                        aria-label={`Job at ${job.address}${job.unit ? ` Unit ${job.unit}` : ''}, ${job.status}`}
                        className={`group flex items-center h-16 transition-all relative cursor-pointer border-t-2 border-b border-b-white/[0.03] ${priorityTopBorder} ${
                          i === focusedIdx
                            ? 'bg-white/[0.08] ring-1 ring-inset ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                            : pInfo.label === 'URGENT'
                              ? 'bg-red-500/[0.03] hover:bg-red-500/[0.06]'
                              : pInfo.label === 'TURNOVER'
                                ? 'bg-orange-500/[0.03] hover:bg-orange-500/[0.06]'
                                : 'bg-white/[0.02] hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="w-24 px-4 shrink-0 relative">
                          {unreadCounts[job.jobId] > 0 && (
                            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)] z-10" />
                          )}
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-widest border ${pInfo.class}`}>
                            {pInfo.label}
                          </span>
                        </div>

                        <div className="w-24 shrink-0">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-widest border ${tInfo.class}`}>
                            {tInfo.label}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 px-4">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-[13px] font-semibold text-[var(--text-primary)] truncate leading-none group-hover:text-[var(--accent)] transition-colors tracking-normal">
                              {job.address} {job.unit && <span className="text-[11px] font-normal text-[var(--text-secondary)] opacity-40 ml-1">· Unit {job.unit}</span>}
                            </h3>
                            {unreadCounts[job.jobId] > 0 && (
                              <motion.span
                                initial={prefersReduced ? false : { scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.2 }}
                                className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-white text-[9px] font-black shadow-lg shadow-orange-500/30 shrink-0"
                              >
                                {unreadCounts[job.jobId]}
                              </motion.span>
                            )}
                            {job.status === 'PTE Required' && (
                              <span className="shrink-0 tracking-widest text-amber-400 font-black text-[9px] uppercase flex items-center gap-1">
                                <Phone size={10} /> CONTACT TENANT
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 mt-1.5">
                            <div className="flex items-center text-[11px] font-normal tracking-normal text-[var(--text-muted)] gap-2">
                              <span className="truncate">
                                {job.rmName ? (
                                  <>
                                    Requester: <span className="text-[var(--text-secondary)] font-medium border-b border-[var(--accent)]/30 pb-px">{job.rmName}</span>
                                  </>
                                ) : (
                                  <span className="opacity-45">Requester Unknown</span>
                                )}
                              </span>
                            </div>
                            {job.assignedTech && job.assignedTech !== 'Unassigned' && (
                              <div className="text-[11px] font-medium tracking-normal text-[var(--accent)]/80 truncate flex items-center gap-1">
                                <User size={10} className="shrink-0" /> {job.assignedTech}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address + (job.unit ? ` Unit ${job.unit}` : ''))}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-blue-400 transition-colors"
                            >
                              <MapPin size={10} />
                              Maps
                            </a>
                            {job.tenantPhone && (
                              <a
                                href={`tel:${job.tenantPhone}`}
                                onClick={e => e.stopPropagation()}
                                className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-green-400 transition-colors"
                              >
                                <Phone size={10} />
                                {job.tenantPhone}
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="w-32 flex items-center shrink-0">
                          <span className="text-[9px] font-bold text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] uppercase tracking-widest truncate">
                            {job.serviceCategory}
                          </span>
                        </div>

                        <div className="w-36 flex flex-col items-start shrink-0 gap-1 pr-4">
                          <div className="flex items-center gap-1 max-w-full">
                            <DropdownMenu.Root>
                              <DropdownMenu.Trigger asChild>
                                <button
                                  onClick={e => e.stopPropagation()}
                                  className="flex items-center gap-1 max-w-full group/status outline-none"
                                >
                                  <span className={`status-pill !text-[9px] font-bold uppercase tracking-widest truncate cursor-pointer hover:ring-1 hover:ring-[var(--accent)]/50 transition-all ${getStatusColor(job.status)}`}>
                                    {displayStatus}
                                  </span>
                                  <ChevronDown size={10} className="text-[var(--text-muted)] group-hover/status:text-[var(--accent)] transition-colors" />
                                </button>
                              </DropdownMenu.Trigger>
                              <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                  className="z-50 min-w-[160px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1 shadow-2xl shadow-black/40"
                                  sideOffset={4}
                                  onClick={e => e.stopPropagation()}
                                >
                                  {(STATUS_TRANSITIONS[job.status] ?? []).map(next => (
                                    <DropdownMenu.Item
                                      key={next}
                                      onSelect={() => handleInlineStatusChange(job, next)}
                                      className="flex items-center px-3 py-2 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--accent)]/10 rounded-lg cursor-pointer outline-none transition-colors"
                                    >
                                      {next}
                                    </DropdownMenu.Item>
                                  ))}
                                </DropdownMenu.Content>
                              </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                          </div>
                          {job.assignedTech && (
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25 truncate max-w-full">
                              <User size={9} className="shrink-0" /> {(() => {
                                 const techs = job.assignedTech.includes(';') 
                                   ? job.assignedTech.split(';').map(s => s.trim()) 
                                   : job.assignedTech.split(',').map(s => s.trim());
                                 if (techs.length > 1) {
                                   return `${techs[0].split(' #')[0]} +${techs.length - 1}`;
                                 }
                                 return techs[0].split(' #')[0];
                               })()}
                            </span>
                          )}
                        </div>

                        <div className="w-24 shrink-0 px-4">
                          {(() => {
                            const age = getJobAge(job.timestamp || "");
                            const isStagnant = age.hours > 24 && job.status !== 'Scheduled' && job.status !== 'In Progress' && job.status !== 'Complete';
                            return (
                              <span className={`text-[11px] tracking-normal tabular-nums flex items-center gap-1 ${
                                isStagnant 
                                  ? 'text-red-400 font-bold' 
                                  : 'text-[var(--text-secondary)] font-normal'
                              }`}>
                                {isStagnant && <AlertTriangle size={10} className="animate-pulse text-red-400 shrink-0" />}
                                {age.label}
                              </span>
                            );
                          })()}
                        </div>

                        <div className="w-32 px-4 flex justify-end">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); onJobClick?.(job); }}
                              aria-label={`Open details for ${job.address}`}
                              className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-lg transition-all"
                            >
                              <ExternalLink size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            });
          })()}
          {filteredAndSortedJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)]">
              <span className="text-xs font-black uppercase tracking-[0.3em] opacity-20">No matching work</span>
            </div>
          )}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
            <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
              Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedJobs.length)} of {filteredAndSortedJobs.length} jobs
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-[var(--border-subtle)] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>
              <div className="px-4 text-[10px] font-black text-[var(--text-primary)]">
                {currentPage} / {totalPages}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-[var(--border-subtle)] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
