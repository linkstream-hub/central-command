/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { dashboardRequest } from "@/lib/dashboard-api";
import { TimeOffRequest } from "@/lib/types";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Plus, Download, FileText, AlertTriangle,
  CalendarDays, Users, CheckCircle, XCircle, Loader2, ChevronDown, Clock, Search, Filter, History
} from "lucide-react";
import { getTimecardApprovalQueue, approveTimecard, disputeTimecard } from "@/lib/dashboard-api";
import { TimecardRecord } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";

const STATUS_STYLES: Record<string, string> = {
  Pending:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Approved: "bg-green-500/10  text-green-400  border-green-500/20",
  Denied:   "bg-red-500/10    text-red-400    border-red-500/20",
};

export default function HRPage() {
  const [requests, setRequests]     = useState<TimeOffRequest[]>([]);
  const [loadingTOR, setLoadingTOR] = useState(true);
  const [filterStatus, setFilterStatus] = useState("Pending");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [denyTarget, setDenyTarget] = useState<string | null>(null);
  const [denyReason, setDenyReason] = useState("");
  const [actionMsg, setActionMsg]   = useState<string | null>(null);
  const { toast } = useToast();
  const { data: session } = useSession();
  const canApprove = session?.permissions?.admin === true;

  const [activeTab, setActiveTab] = useState<'overview' | 'timecards'>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('tab') === 'timecards'
        ? 'timecards'
        : 'overview';
    }
    return 'overview';
  });

  // Timecards State
  const [timecards, setTimecards] = useState<TimecardRecord[]>([]);
  const [tcLoading, setTcLoading] = useState(false);
  const [tcWeekStart, setTcWeekStart] = useState(''); // '' = current
  const [tcPendingCount, setTcPendingCount] = useState(0);
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorId, setSupervisorId]     = useState("");
  const [disputingRecord, setDisputingRecord] = useState<TimecardRecord | null>(null);
  const [disputeReason, setDisputeReason]     = useState("");
  const [tcActionLoading, setTcActionLoading] = useState<string | null>(null);

  useEffect(() => { 
    if (activeTab === 'overview') loadRequests(); 
    else if (activeTab === 'timecards') loadTimecards();
  }, [activeTab, filterStatus, tcWeekStart]);

  async function loadRequests() {
    setLoadingTOR(true);
    try {
      const res = await dashboardRequest<any>("getTimeOffRequests", { filterStatus });
      setRequests(res.requests || []);
    } catch { /* silent */ }
    finally { setLoadingTOR(false); }
  }

  async function loadTimecards() {
    setTcLoading(true);
    try {
      const res = await getTimecardApprovalQueue(tcWeekStart || undefined);
      if (res.success) {
        setTimecards(res.records);
        setTcPendingCount(res.pendingCount);
      }
    } catch { /* silent */ }
    finally { setTcLoading(false); }
  }

  async function handleApprove(recordId: string) {
    if (!supervisorName) {
      toast.error("Select your name before approving.");
      return;
    }
    setTcActionLoading(recordId);
    try {
      const res = await approveTimecard(recordId, supervisorName, supervisorId);
      if (res.success) {
        toast.success("Timecard approved.");
        await loadTimecards();
      } else {
        toast.error(res.error || "Failed to approve.");
      }
    } catch {
      toast.error("Connection error.");
    } finally {
      setTcActionLoading(null);
    }
  }

  async function handleDisputeSubmit() {
    if (!disputingRecord) return;
    if (!disputeReason.trim()) {
      toast.error("Reason is required to dispute.");
      return;
    }
    setTcActionLoading(disputingRecord.recordId);
    try {
      const res = await disputeTimecard(disputingRecord.recordId, supervisorName, supervisorId, disputeReason);
      if (res.success) {
        toast.success("Timecard disputed.");
        setDisputingRecord(null);
        setDisputeReason("");
        await loadTimecards();
      } else {
        toast.error(res.error || "Failed to dispute.");
      }
    } catch {
      toast.error("Connection error.");
    } finally {
      setTcActionLoading(null);
    }
  }

  async function approve(requestId: string) {
    setActionLoading(requestId);
    const res = await dashboardRequest<any>("approveTimeOff", { requestId });
    if (res.success) { setActionMsg("Approved."); await loadRequests(); }
    else setActionMsg(res.message || "Error approving.");
    setActionLoading(null);
  }

  async function deny(requestId: string) {
    if (!denyReason.trim()) { setActionMsg("Denial reason is required (PAGA compliance)."); return; }
    setActionLoading(requestId);
    const res = await dashboardRequest<any>("denyTimeOff", { requestId, reason: denyReason });
    if (res.success) { setActionMsg("Denied."); setDenyTarget(null); setDenyReason(""); await loadRequests(); }
    else setActionMsg(res.message || res.error || "Error denying.");
    setActionLoading(null);
  }

  const pendingCount = requests.filter(r => r.Status === "Pending").length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
          <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
            HR <span className="text-[var(--accent)]">COMMAND</span>
          </h2>
          <div className="flex items-center justify-between mt-1">
            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">
              Workspace for employee relations and accommodations.
            </p>
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 shadow-inner">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                  activeTab === 'overview'
                    ? "bg-[var(--accent)] text-black shadow-lg"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('timecards')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'timecards'
                    ? "bg-[var(--accent)] text-black shadow-lg"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                Timecards
                {tcPendingCount > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold ${
                    activeTab === 'timecards' ? "bg-black text-[var(--accent)]" : "bg-[var(--accent)] text-black"
                  }`}>
                    {tcPendingCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >

        {/* Top KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Open Accommodations", value: 0 },
            { label: "Active Incidents",    value: 0 },
            { label: "Pending Time Off",    value: pendingCount },
            { label: "Employee Records",    value: 28 },
          ].map((kpi, i) => (
            <div key={i} className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center glass-panel">
              <span className={`text-3xl font-black mb-1 ${i === 2 && pendingCount > 0 ? "text-yellow-400" : "text-[var(--text-primary)]"}`}>{kpi.value}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] text-center">{kpi.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">

            {/* Active Accommodations */}
            <div className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-3xl p-6 glass-panel">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="text-[var(--accent)]" size={16} />
                <h3 className="text-xs font-black uppercase tracking-widest">Active Accommodations</h3>
              </div>
              <div className="border border-dashed border-white/10 rounded-2xl p-8 flex items-center justify-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">No active accommodations on file</span>
              </div>
            </div>

            {/* Incident Log */}
            <div className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-3xl p-6 glass-panel">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="text-[var(--accent)]" size={16} />
                <h3 className="text-xs font-black uppercase tracking-widest">Incident Log</h3>
              </div>
              <div className="border border-dashed border-white/10 rounded-2xl p-8 flex items-center justify-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">No open incidents</span>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Time Off Requests â€” LIVE */}
            <div className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-3xl p-6 glass-panel">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="text-[var(--accent)]" size={16} />
                  <h3 className="text-xs font-black uppercase tracking-widest">Time Off</h3>
                </div>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="appearance-none bg-white/5 border border-white/10 rounded-lg pl-2 pr-6 py-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Denied">Denied</option>
                    <option value="">All</option>
                  </select>
                  <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                </div>
              </div>

              {actionMsg && (
                <div className="mb-3 text-[10px] font-bold text-[var(--accent)] bg-[var(--accent)]/10 rounded-xl px-3 py-2">
                  {actionMsg}
                </div>
              )}

              {loadingTOR ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={18} className="animate-spin text-[var(--text-muted)]" />
                </div>
              ) : requests.length === 0 ? (
                <div className="border border-dashed border-white/10 rounded-2xl p-6 flex items-center justify-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">No {filterStatus.toLowerCase() || ""} requests</span>
                </div>
              ) : (
                <div className="space-y-3 max-h-[420px] overflow-y-auto">
                  {requests.map((req) => (
                    <div key={req["Request ID"]} className="p-3 rounded-2xl border border-white/5 bg-white/2 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-black text-[var(--text-primary)]">
                            {req._employee?.name || req._employeeId || "Unknown"}
                          </div>
                          <div className="text-[9px] text-[var(--text-muted)] mt-0.5">
                            {req["Leave Type"]} Â· {req["Start Date"]}
                            {req["End Date"] && req["End Date"] !== req["Start Date"] ? ` â†’ ${req["End Date"]}` : ""}
                            {req["Hours"] ? ` Â· ${req["Hours"]}h` : ""}
                          </div>
                          {req["Reason"] && (
                            <div className="text-[9px] text-[var(--text-muted)] italic mt-0.5">{req["Reason"]}</div>
                          )}
                          {req["Leave Type"] === "Sick" && (
                            <div className="text-[9px] text-blue-400 font-bold mt-1">CA 246.5 â€” cannot be denied</div>
                          )}
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border shrink-0 ${STATUS_STYLES[req.Status] || ""}`}>
                          {req.Status}
                        </span>
                      </div>

                      {req.Status === "Pending" && req["Leave Type"] !== "Sick" && (
                        denyTarget === req["Request ID"] ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={denyReason}
                              onChange={e => setDenyReason(e.target.value)}
                              placeholder="Denial reason (required)"
                              className="w-full bg-white/5 border border-red-500/30 rounded-lg px-2 py-1.5 text-[9px] text-[var(--text-primary)] focus:outline-none"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => deny(req["Request ID"])}
                                disabled={actionLoading === req["Request ID"]}
                                className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-[9px] font-black uppercase tracking-widest disabled:opacity-40"
                              >
                                {actionLoading === req["Request ID"] ? <Loader2 size={10} className="animate-spin mx-auto" /> : "Confirm Deny"}
                              </button>
                              <button onClick={() => { setDenyTarget(null); setDenyReason(""); }} className="px-3 py-1.5 rounded-lg bg-white/5 text-[var(--text-muted)] text-[9px] font-black uppercase">
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => approve(req["Request ID"])}
                              disabled={!!actionLoading}
                              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-[9px] font-black uppercase tracking-widest disabled:opacity-40 hover:bg-green-500/20 transition-colors"
                            >
                              <CheckCircle size={10} /> Approve
                            </button>
                            <button
                              onClick={() => { setDenyTarget(req["Request ID"]); setActionMsg(null); }}
                              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-[9px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-colors"
                            >
                              <XCircle size={10} /> Deny
                            </button>
                          </div>
                        )
                      )}

                      {req.Status === "Pending" && req["Leave Type"] === "Sick" && (
                        <button
                          onClick={() => approve(req["Request ID"])}
                          disabled={!!actionLoading}
                          className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest disabled:opacity-40"
                        >
                          <CheckCircle size={10} /> Mark Acknowledged
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-3xl p-6 glass-panel">
              <div className="flex items-center gap-2 mb-6">
                <Users className="text-[var(--accent)]" size={16} />
                <h3 className="text-xs font-black uppercase tracking-widest">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-[var(--accent)]/30 bg-white/5 hover:bg-white/10 transition-all text-left group">
                  <span className="text-[10px] font-black uppercase tracking-widest">Log New Accommodation</span>
                  <Plus size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-[var(--accent)]/30 bg-white/5 hover:bg-white/10 transition-all text-left group">
                  <span className="text-[10px] font-black uppercase tracking-widest">File Incident Report</span>
                  <Plus size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-[var(--accent)]/30 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 transition-all text-left group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">Export Records</span>
                  <Download size={14} className="text-[var(--accent)]" />
                </button>
              </div>
            </div>

          </div>
        </div>
        </motion.div>
      ) : (
        <motion.div
          key="timecards"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3 space-y-6">
              {/* Supervisor Identity & Filters */}
              <div className="flex items-center gap-6 p-6 bg-[var(--bg-surface)]/30 border border-white/5 rounded-3xl glass-panel">
                {canApprove && (
                  <>
                    <div className="flex-1 space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                        <Users size={12} className="text-[var(--accent)]" />
                        Approving As
                      </label>
                      <select
                        value={supervisorName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSupervisorName(val);
                          setSupervisorId(val.toLowerCase().replace(/\s+/g, '_'));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent)]/50 transition-all"
                      >
                        <option value="">â€” Select your name â€”</option>
                        <option value="Brandon Bittner">Brandon Bittner</option>
                        <option value="Keith Berry">Keith Berry</option>
                        <option value="Bemenet Petros">Bemenet Petros</option>
                        <option value="Ana">Ana</option>
                      </select>
                    </div>
                    <div className="w-px h-12 bg-white/10" />
                  </>
                )}
                <div className="flex-1 space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                    <CalendarDays size={12} className="text-[var(--accent)]" /> 
                    Pay Period (Week)
                  </label>
                  <select
                    value={tcWeekStart}
                    onChange={e => setTcWeekStart(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent)]/50 transition-all"
                  >
                    <option value="">Current Week</option>
                    {/* Simplified past weeks â€” would ideally be calculated */}
                    <option value="2026-04-20">Week of Apr 20</option>
                    <option value="2026-04-13">Week of Apr 13</option>
                    <option value="2026-04-06">Week of Apr 06</option>
                  </select>
                </div>
              </div>

              {/* Timecard Queue */}
              <div className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-3xl overflow-hidden glass-panel">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-[var(--accent)]" />
                    <h3 className="text-xs font-black uppercase tracking-widest">Timecard Approval Queue</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">{tcPendingCount} Pending</span>
                    </div>
                    <button onClick={loadTimecards} disabled={tcLoading} className="text-[var(--text-muted)] hover:text-white transition-colors">
                      <Loader2 size={14} className={tcLoading ? "animate-spin" : ""} />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-black/20 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        <th className="px-6 py-4">Technician</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Hours</th>
                        <th className="px-6 py-4">Employee</th>
                        <th className="px-6 py-4">Status</th>
                        {canApprove && <th className="px-6 py-4">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {tcLoading ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center">
                            <Loader2 size={24} className="animate-spin text-[var(--accent)] mx-auto mb-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Loading queue...</span>
                          </td>
                        </tr>
                      ) : timecards.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center">
                            <CheckCircle size={24} className="text-zinc-600 mx-auto mb-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">No timecards in this window</span>
                          </td>
                        </tr>
                      ) : (
                        timecards.map(rec => (
                          <tr key={rec.recordId} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4">
                              <div className="text-[11px] font-bold text-white">{rec.techName}</div>
                              <div className="text-[9px] text-[var(--text-muted)]">#{rec.techId}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-[10px] font-medium text-zinc-300">{rec.date}</div>
                              <div className="text-[8px] text-zinc-500 uppercase tracking-widest">{rec.address}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{rec.category}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-[11px] font-black text-white">{rec.actualHours.toFixed(2)}h</div>
                              {rec.mealWarning && (
                                <span className="text-[8px] font-black text-red-400 uppercase tracking-widest">Meal Warning</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${
                                rec.attestation === 'Signed' 
                                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              }`}>
                                {rec.attestation}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${
                                rec.supervisorStatus === 'Approved' 
                                  ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                rec.supervisorStatus === 'Disputed'
                                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              }`}>
                                {rec.supervisorStatus}
                              </span>
                            </td>
                            {canApprove && (
                              <td className="px-6 py-4">
                                {rec.supervisorStatus === 'Pending' ? (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleApprove(rec.recordId)}
                                      disabled={!!tcActionLoading}
                                      className="p-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all disabled:opacity-30"
                                      title="Approve"
                                    >
                                      {tcActionLoading === rec.recordId ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                                    </button>
                                    <button
                                      onClick={() => setDisputingRecord(rec)}
                                      disabled={!!tcActionLoading}
                                      className="p-2 rounded-lg bg-amber-600/10 hover:bg-amber-600 text-amber-400 hover:text-white transition-all disabled:opacity-30"
                                      title="Dispute"
                                    >
                                      <AlertTriangle size={14} />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-[9px] text-zinc-500 italic">
                                    by {rec.supervisorName || 'System'}
                                  </div>
                                )}
                              </td>
                            )}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Compliance Stats */}
              <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 glass-panel">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="text-amber-500" size={16} />
                  <h3 className="text-xs font-black uppercase tracking-widest">Compliance Pulse</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                    <div className="text-2xl font-black text-amber-400">12%</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-1">Pending Approval</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                    <div className="text-2xl font-black text-red-400">3</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-1">Meal Violations</div>
                  </div>
                </div>
              </div>

              {/* Documentation Quick Link */}
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">PAGA Safe Mode</h4>
                <p className="text-[11px] text-blue-200/70 leading-relaxed">
                  Supervisor approval creates a legally binding trail of audit-ready time records.
                </p>
                <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
                  View Compliance Handbook <ChevronDown size={12} className="-rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* Dispute Modal */}
      <AnimatePresence>
        {disputingRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDisputingRecord(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl z-50">
              <div className="space-y-1 mb-6">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Dispute Timecard</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">PAGA paper trail required</p>
              </div>
              
              <div className="mb-6 p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="text-[11px] font-bold text-white">{disputingRecord.techName}</div>
                <div className="text-[10px] text-zinc-400 mt-1">{disputingRecord.date} Â· {disputingRecord.actualHours.toFixed(2)}h</div>
              </div>

              <textarea
                value={disputeReason}
                onChange={e => setDisputeReason(e.target.value)}
                placeholder="Explain why this record is being disputed..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white h-32 focus:border-amber-500/50 transition-all outline-none resize-none mb-6"
              />

              <div className="flex gap-3">
                <button
                  onClick={handleDisputeSubmit}
                  disabled={!!tcActionLoading || !disputeReason.trim()}
                  className="flex-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-black font-black uppercase tracking-widest rounded-xl py-4 transition-all"
                >
                  {tcActionLoading === disputingRecord.recordId ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Submit Dispute"}
                </button>
                <button
                  onClick={() => { setDisputingRecord(null); setDisputeReason(""); }}
                  className="px-6 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

