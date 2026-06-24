"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DispatchTimelineBoard from "@/components/dashboard/DispatchTimelineBoard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import JobQueueTable, { StatusTab } from "@/components/dashboard/JobQueueTable";
import KanbanBoard from "@/components/dashboard/KanbanBoard";
import { Search, LayoutDashboard, CalendarDays, Calendar, List } from "lucide-react";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import JobDetailModal from "@/components/dashboard/JobDetailModal";
import {
  dashboardRequest,
  ComplianceAlert,
  DispatchDataResponse,
  ComplianceAlertsResponse,
  TechStatus,
} from "@/lib/dashboard-api";
import type { DashboardStats } from "@/lib/types";
import { Job, JobStatus } from "@/lib/types";
import { LockSendButton } from '@/components/dashboard/LockSendButton';
import { ConfirmationScreen } from '@/components/dashboard/ConfirmationScreen';

const TAB_PARAM_MAP: Record<string, StatusTab> = {
  review: "NEEDS_REVIEW",
  ready: "READY_TO_SCHEDULE",
  pte: "PTE_REQUIRED",
  scheduled: "SCHEDULED",
  complete: "COMPLETE",
};

function TabSync({ onTab }: { onTab: (t: StatusTab) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam && TAB_PARAM_MAP[tabParam]) {
      onTab(TAB_PARAM_MAP[tabParam]);
    }
  }, [searchParams, onTab]);
  return null;
}

type WorkspaceView = "triage" | "dispatch" | "table";

export default function LivePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [techs, setTechs] = useState<TechStatus[]>([]);
  const [complianceAlerts, setComplianceAlerts] = useState<ComplianceAlert[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [statusTab, setStatusTab] = useState<StatusTab>("ALL");
  const [workspaceView, setWorkspaceView] = useState<WorkspaceView>("dispatch");
  const [confirmationData, setConfirmationData] = useState<{ techCount: number; jobCount: number } | null>(null);
  
  const searchRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<number>(0);

  const loadLiveData = async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    const [jobsRes, complianceRes, techsRes] = await Promise.all([
      dashboardRequest<DispatchDataResponse>("getDispatchData"),
      dashboardRequest<ComplianceAlertsResponse>("getComplianceAlerts"),
      dashboardRequest<{success: boolean; techs: TechStatus[]}>("getTechList"),
    ]);

    if (jobsRes.success) {
      setJobs(jobsRes.jobs);
      if (jobsRes.stats) setStats(jobsRes.stats);
    }
    if (complianceRes.success) setComplianceAlerts(complianceRes.alerts);
    if (techsRes.success && techsRes.techs) setTechs(techsRes.techs);

    if (showSpinner) setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadLiveData();

    const jobInterval = setInterval(() => {
      loadLiveData(false);
    }, 120000);

    const complianceInterval = setInterval(async () => {
      const complianceRes = await dashboardRequest<ComplianceAlertsResponse>("getComplianceAlerts");
      if (complianceRes.success) setComplianceAlerts(complianceRes.alerts);
    }, 60000);

    return () => {
      clearInterval(jobInterval);
      clearInterval(complianceInterval);
    };
  }, []);

  return (
    <DashboardLayout>
      <Suspense fallback={null}>
        <TabSync onTab={setStatusTab} />
      </Suspense>

      {/* Main Workspace Container */}
      <div className="flex flex-col h-[calc(100vh-6rem)] relative bg-[#09090b] overflow-hidden -mx-8 -mt-8 rounded-b-xl border-x border-b border-zinc-800/50 shadow-2xl">
        
        {/* Cockpit Toolbar */}
        <div className="h-14 shrink-0 border-b border-zinc-800 bg-[#0f1115] flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-zinc-800/60">
            <button
              onClick={() => setWorkspaceView('triage')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                workspaceView === 'triage'
                  ? 'bg-[#1a1f2e] text-[var(--text-primary)] shadow-md border border-[var(--border-subtle)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'
              }`}
            >
              <LayoutDashboard size={14} className={workspaceView === 'triage' ? 'text-blue-400' : ''} />
              Review Queue
            </button>
            <button
              onClick={() => setWorkspaceView('dispatch')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                workspaceView === 'dispatch'
                  ? 'bg-[#1a1f2e] text-[var(--text-primary)] shadow-md border border-[var(--border-subtle)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'
              }`}
            >
              <CalendarDays size={14} className={workspaceView === 'dispatch' ? 'text-blue-400' : ''} />
              Dispatch Board
            </button>
            <button
              onClick={() => setWorkspaceView('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                workspaceView === 'table'
                  ? 'bg-[#1a1f2e] text-[var(--text-primary)] shadow-md border border-[var(--border-subtle)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'
              }`}
            >
              <List size={14} className={workspaceView === 'table' ? 'text-blue-400' : ''} />
              All Work Orders
            </button>
          </div>

          <div className="relative group">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[var(--accent)] transition-colors"
            />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search address or WO..."
              className="bg-black/40 border border-zinc-800 rounded-lg py-1.5 pl-9 pr-4 text-[11px] font-bold text-white focus:border-[var(--accent)] focus:bg-[#0f1115] focus:ring-1 focus:ring-[var(--accent)]/30 outline-none w-64 transition-all"
            />
          </div>
          
          {workspaceView === "dispatch" && (
            <div className="ml-4 pl-4 border-l border-zinc-800">
               <LockSendButton 
                 date={new Date().toISOString().split('T')[0]}
                 disabled={loading}
                 onSuccess={(result) => setConfirmationData(result)}
               />
            </div>
          )}
        </div>

        {/* Dynamic Workspace Area */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          
          {loading ? (
             <div className="absolute inset-0 flex items-center justify-center bg-[#09090b]/80 z-50">
               <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
             </div>
          ) : null}

          {/* VIEW: TRIAGE (KANBAN) */}
          {workspaceView === "triage" && (
            <div className="flex-1 flex flex-col h-full overflow-hidden p-6 bg-[#09090b]">
              <div className="shrink-0 mb-4 px-2">
                <h2 className="text-lg font-black text-white uppercase tracking-widest">Review Queue</h2>
                <p className="text-xs text-zinc-400 font-bold tracking-wide mt-1">Review incoming work orders, request scopes, and advance jobs until they are Ready to Dispatch.</p>
              </div>
              <KanbanBoard
                jobs={jobs}
                searchQuery={searchQuery}
                onJobClick={(job) => setSelectedJob(job)}
                onJobStatusChange={(jobId, newStatus) => {
                  setJobs((prev) =>
                    prev.map((j) =>
                      j.jobId === jobId ? { ...j, status: newStatus as JobStatus } : j
                    )
                  );
                }}
              />
            </div>
          )}

          {/* VIEW: FULL TABLE */}
          {workspaceView === "table" && (
            <div className="flex-1 flex flex-col h-full overflow-hidden p-6 bg-[#09090b]">
              <div className="shrink-0 mb-4 px-2">
                <h2 className="text-lg font-black text-white uppercase tracking-widest">All Work Orders</h2>
                <p className="text-xs text-zinc-400 font-bold tracking-wide mt-1">Search, filter, and audit the entire master list of all active and historical work orders.</p>
              </div>
              <JobQueueTable
                jobs={jobs}
                view="full"
                searchQuery={searchQuery}
                statusTab={statusTab}
                onStatusTabChange={setStatusTab}
                onFocusSearch={() => searchRef.current?.focus()}
                onJobClick={(job) => setSelectedJob(job)}
                onJobStatusChange={(jobId, newStatus) => {
                  setJobs((prev) =>
                    prev.map((j) =>
                      j.jobId === jobId ? { ...j, status: newStatus as JobStatus } : j
                    )
                  );
                }}
              />
            </div>
          )}

          {/* VIEW: DISPATCH COCKPIT (SPLIT PANE) */}
          {workspaceView === "dispatch" && (
            <div className="flex-1 flex flex-col bg-[#09090b] overflow-hidden relative p-4">
              <div className="shrink-0 mb-3 px-2 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-white uppercase tracking-widest">Dispatch Board</h2>
                  <p className="text-xs text-zinc-400 font-bold tracking-wide mt-1">Drag and drop jobs from the Ready to Dispatch queue onto technician timelines.</p>
                </div>
              </div>
              <DispatchTimelineBoard 
                jobs={jobs} 
                roster={techs} 
                searchQuery={searchQuery}
                onJobClick={(job) => setSelectedJob(job)}
                onJobUpdated={(updatedJob) => {
                  setJobs((prev) =>
                    prev.map((j) =>
                      j.jobId === updatedJob.jobId ? updatedJob : j
                    )
                  );
                }}
              />
            </div>
          )}

        </div>
      </div>

      {/* Pinned Bottom Activity Feed */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <ActivityFeed jobs={jobs} techs={[]} />
      </div>

      {/* Overlays */}
      <JobDetailModal
        key={selectedJob?.jobId}
        job={selectedJob}
        viewContext="dispatch"
        onClose={() => setSelectedJob(null)}
        onSave={() => loadLiveData()}
      />

      {confirmationData && (
        <ConfirmationScreen 
          techCount={confirmationData.techCount} 
          jobCount={confirmationData.jobCount} 
          date={new Date().toISOString().split('T')[0]} 
          onClose={() => setConfirmationData(null)} 
        />
      )}
    </DashboardLayout>
  );
}
