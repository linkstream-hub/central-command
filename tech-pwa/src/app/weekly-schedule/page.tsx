"use client";

import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { dashboardRequest, TechStatus, WeekScheduleResponse } from "@/lib/dashboard-api";
import { Job } from "@/lib/types";
import { ChevronLeft, ChevronRight, User, Search } from "lucide-react";
import { DateDetailModal } from "@/components/dashboard/SchedulePageComponents";
import JobDetailModal from "@/components/dashboard/JobDetailModal";

function getWeekDates(weekOffset: number = 0): string[] {
  const laFmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
  });
  const todayStr = laFmt.format(new Date());
  const [yr, mo, dy] = todayStr.split("-").map(Number);
  const cursor = new Date(yr, mo - 1, dy);
  const dow = cursor.getDay();
  const toMonday = dow === 0 ? -6 : 1 - dow;
  cursor.setDate(cursor.getDate() + toMonday + weekOffset * 7);

  const dates: string[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(
      cursor.getFullYear(),
      cursor.getMonth(),
      cursor.getDate() + i,
    );
    dates.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
  }
  return dates;
}

function getTodayISO(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
  }).format(new Date());
}

export default function WeeklySchedulePage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [techs, setTechs] = useState<TechStatus[]>([]);
  const [gridData, setGridData] = useState<
    Record<string, Record<string, Job[]>>
  >({});
  const [weekOffset, setWeekOffset] = useState(0);

  // Modals & Search State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const todayISO = useMemo(() => getTodayISO(), []);

  const weekRange = useMemo(() => {
    if (!weekDates.length) return "";
    const fmt = (iso: string) =>
      new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    return `${fmt(weekDates[0])} — ${fmt(weekDates[4])}`;
  }, [weekDates]);

  const fetchSchedule = () => {
    setLoading(true);
    // Reset state to avoid showing stale data during fetch
    setJobs([]);
    setTechs([]);
    setGridData({});
    dashboardRequest<WeekScheduleResponse>("getWeekSchedule", { weekStart: weekDates[0] }).then(
      (res) => {
        if (res.success) {
          if (res.techs) setTechs(res.techs);
          if (res.byTech) setGridData(res.byTech);

          const flattenedJobs: Job[] = [];
          if (res.byTech) {
            Object.values(res.byTech).forEach((dateMap) => {
              Object.values(dateMap as Record<string, Job[]>).forEach(
                (jobArr) => {
                  flattenedJobs.push(...jobArr);
                },
              );
            });
          }
          if (res.unassigned) flattenedJobs.push(...res.unassigned);
          // Deduplicate by jobId — multi-tech jobs appear once per tech in byTech
          setJobs(
            Array.from(
              new Map(flattenedJobs.map((j) => [j.jobId, j])).values(),
            ),
          );
        }
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    // Decouple from render cycle to avoid cascading render warnings
    const timer = setTimeout(() => {
      fetchSchedule();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekDates[0]]);

  // Filter archived & completed
  const scheduledJobs = useMemo(
    () =>
      jobs.filter((j) => j.status !== "Archived" && j.status !== "Complete"),
    [jobs],
  );

  // Apply search query
  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return scheduledJobs;
    const q = searchQuery.toLowerCase();
    return scheduledJobs.filter(
      (j) =>
        String(j.address || "")
          .toLowerCase()
          .includes(q) ||
        String(j.description || "")
          .toLowerCase()
          .includes(q) ||
        String(j.rmName || "")
          .toLowerCase()
          .includes(q) ||
        String(j.assignedTech || "")
          .toLowerCase()
          .includes(q) ||
        String(j.serviceCategory || "")
          .toLowerCase()
          .includes(q),
    );
  }, [scheduledJobs, searchQuery]);

  const jobsByDate = useMemo(() => {
    const map: Record<string, Job[]> = {};
    weekDates.forEach((d) => {
      map[d] = [];
    });
    filteredJobs.forEach((j) => {
      if (j.scheduledDate && map[j.scheduledDate] !== undefined) {
        map[j.scheduledDate].push(j);
      }
    });
    return map;
  }, [filteredJobs, weekDates]);

  const committedHours = filteredJobs.reduce(
    (sum, j) => sum + (Number(j.estimatedHours) || 0),
    0,
  );
  const todayCount = (jobsByDate[todayISO] || []).length;

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-100px)] flex flex-col space-y-6 relative">
        {/* Header with Search and Navigation */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
              WEEKLY <span className="text-[var(--accent)]">SCHEDULE</span>
            </h2>
            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
              {weekRange ? `Week of ${weekRange}` : "Loading..."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Local Search Input */}
            <div className="relative group">
              <Search
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs & techs..."
                className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-2 pl-11 pr-4 text-xs font-black text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 outline-none w-64 transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 border-l border-[var(--border-subtle)] pl-4">
              {weekOffset !== 0 && (
                <button
                  onClick={() => setWeekOffset(0)}
                  className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border border-[var(--accent)]/30 text-[var(--accent)] rounded-full hover:bg-[var(--accent)]/10 transition-all"
                >
                  Today
                </button>
              )}
              <button
                onClick={() => setWeekOffset((w) => w - 1)}
                className="w-10 h-8 flex items-center justify-center rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:border-transparent hover:text-black transition-all shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest min-w-[70px] text-center bg-[var(--bg-surface)] py-1 px-3 rounded-md border border-[var(--border-subtle)]">
                {weekOffset === 0
                  ? "This Week"
                  : weekOffset > 0
                    ? `+${weekOffset} w`
                    : `${weekOffset} w`}
              </span>
              <button
                onClick={() => setWeekOffset((w) => w + 1)}
                className="w-10 h-8 flex items-center justify-center rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:border-transparent hover:text-black transition-all shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4 shrink-0">
          <div className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between glass-panel">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
              Jobs View
            </span>
            <span className="text-xl font-black">{filteredJobs.length}</span>
          </div>
          <div className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between glass-panel">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
              Hrs Committed
            </span>
            <span className="text-xl font-black">
              {committedHours.toFixed(1)}
            </span>
          </div>
          <div className="bg-[var(--bg-surface)]/30 border border-[var(--accent)]/20 rounded-2xl p-4 flex items-center justify-between glass-panel">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">
              Today
            </span>
            <span className="text-xl font-black text-[var(--accent)]">
              {todayCount} job{todayCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Day Columns */}
        <div className="flex-1 flex gap-3 overflow-hidden min-h-0">
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-40">
              Loading schedule...
            </div>
          ) : (
            weekDates.map((dateStr) => {
              const d = new Date(dateStr + "T12:00:00");
              const isToday = dateStr === todayISO;
              const dayJobs = jobsByDate[dateStr] || [];
              const dayHours = dayJobs.reduce(
                (s, j) => s + (Number(j.estimatedHours) || 0),
                0,
              );

              return (
                <div
                  key={dateStr}
                  className={`flex-1 flex flex-col min-w-[160px] rounded-2xl border overflow-hidden ${
                    isToday
                      ? "border-[var(--accent)]/30 bg-[var(--accent)]/5"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)]/50"
                  }`}
                >
                  {/* Day header (Clickable) */}
                  <button
                    onClick={() => setSelectedDate(dateStr)}
                    className={`text-left p-3 border-b shrink-0 transition-colors group cursor-pointer ${
                      isToday
                        ? "border-[var(--accent)]/20 hover:bg-[var(--accent)]/10"
                        : "border-white/5 hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                        isToday
                          ? "text-[var(--accent)] group-hover:text-[var(--accent)]/80"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {d.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-sm font-black text-[var(--text-primary)] mt-0.5 group-hover:opacity-80 transition-opacity">
                      {d.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div
                      className={`text-[9px] font-black mt-1.5 uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity ${
                        isToday
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {dayJobs.length} job{dayJobs.length !== 1 ? "s" : ""} ·{" "}
                      {dayHours.toFixed(1)}h
                    </div>
                  </button>

                  {/* Job cards (Clickable) */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {dayJobs.length === 0 ? (
                      <div className="flex items-center justify-center h-16 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-25">
                        No jobs
                      </div>
                    ) : (
                      dayJobs
                        .sort((a, b) =>
                          (a.scheduledTime || "").localeCompare(
                            b.scheduledTime || "",
                          ),
                        )
                        .map((job, idx) => (
                          <button
                            key={job.jobId || `job-${idx}`}
                            onClick={() => setSelectedJob(job)}
                            className="w-full text-left p-3 block bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent)]/40 hover:bg-white/[0.02] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent)] group"
                          >
                            <p className="text-[10px] font-black text-[var(--text-primary)] truncate leading-snug group-hover:text-[var(--accent)] transition-colors">
                              {job.address}
                            </p>
                            {job.unit && (
                              <p className="text-[8px] text-[var(--text-muted)] uppercase tracking-wide leading-none mt-0.5">
                                Unit {job.unit}
                              </p>
                            )}
                            <p className="text-[8px] text-[var(--accent)] uppercase tracking-wide mt-1.5 truncate font-black opacity-80 group-hover:opacity-100">
                              {job.serviceCategory}
                            </p>
                            <div className="flex items-center justify-between mt-2 gap-1 text-[8px] font-black text-[var(--text-muted)] uppercase">
                              <span className="flex items-center gap-1 truncate min-w-0">
                                <User
                                  size={8}
                                  className="shrink-0 opacity-60"
                                />
                                <span className="truncate">
                                  {(job.assignedTech || "Unassigned").split(';').map(s => s.split(' #')[0].trim()).join(', ')}
                                </span>
                              </span>
                              <span className="whitespace-nowrap shrink-0 group-hover:text-[var(--text-primary)] transition-colors">
                                {job.scheduledTime || "TBD"} ·{" "}
                                {job.estimatedHours || "?"}H
                              </span>
                            </div>
                          </button>
                        ))
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modals */}
        <DateDetailModal
          dateStr={selectedDate}
          techs={techs}
          gridData={gridData}
          isOpen={!!selectedDate}
          onClose={() => setSelectedDate(null)}
          onJobClick={(job) => {
            setSelectedDate(null);
            setSelectedJob(job);
          }}
        />

        <JobDetailModal
          key={selectedJob?.jobId}
          job={selectedJob}
          viewContext="schedule"
          onClose={() => {
            setSelectedJob(null);
            fetchSchedule(); // Refresh data in case of edits
          }}
        />
      </div>
    </DashboardLayout>
  );
}
