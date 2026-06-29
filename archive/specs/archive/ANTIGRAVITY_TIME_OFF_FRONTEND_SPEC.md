# ANTIGRAVITY SPEC — Time Off Manager Frontend
# Sprint: Time Off Manager Phase 2 — Frontend
# Date: April 23, 2026
# Author: Claude Code

---

## OVERVIEW

Two surfaces to build:

1. **`/time-off` page (Tech PWA)** — for hourly staff (field techs + Robert).
   Shows balance, request form, history, cancel button.
   Calls TechPWA.gs directly using the session token from localStorage.

2. **`/hr` page updates (CC2.0 dashboard)** — for Ana (approval queue) and salaried staff (submit form).
   Replaces the static AppSheet link with live data from DashboardAPI.gs.

---

## API CALL PATTERNS — READ CAREFULLY

### Calling TechPWA.gs (for `/time-off` page)
- **GET:** `fetch(\`${process.env.NEXT_PUBLIC_API_URL}?action=${action}&token=${token}\`)`
- **POST:** Content-Type must be `text/plain` (not application/json — Apps Script CORS constraint).
  Body is still JSON string.

Use these two helpers inline in `time-off/page.tsx`:

```typescript
const API = process.env.NEXT_PUBLIC_API_URL!;

async function pwaGet(action: string, token: string) {
  const res = await fetch(`${API}?action=${action}&token=${encodeURIComponent(token)}`);
  return res.json();
}

async function pwaPost(action: string, token: string, payload: Record<string, unknown> = {}) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action, token, ...payload }),
  });
  return res.json();
}
```

### Calling DashboardAPI.gs (for `/hr` page)
Use the existing `dashboardRequest` function already in `@/lib/dashboard-api`:
```typescript
import { dashboardRequest } from '@/lib/dashboard-api';
const result = await dashboardRequest('getTimeOffRequests', { filterStatus: 'Pending' });
```

---

## TYPES TO ADD

Add to `tech-pwa/src/lib/types.ts` (append at end, do not modify existing types):

```typescript
export interface TimeOffRequest {
  'Request ID': string;
  'Leave Type': 'Vacation' | 'Sick';
  'Request Type': string;
  'Start Date': string;
  'End Date': string;
  'Hours': number | string;
  'Reason': string;
  'Status': 'Pending' | 'Approved' | 'Denied' | 'Cancelled';
  'Legal Alert': string;
  'Manager Notes': string;
  'Employee ID': string;
  _rowIndex?: number;
  _employee?: { name: string; email: string };
  _employeeId?: string;
}

export interface TimeOffBalance {
  tenureYears: number;
  appliedRule: string;
  sick: { accrued: number; used: number; available: number };
  vacation: { accrued: number; used: number; available: number };
}
```

---

## FILE 1: CREATE `tech-pwa/src/app/time-off/page.tsx`

Full file — create from scratch:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
import { TimeOffRequest, TimeOffBalance } from "@/lib/types";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { CalendarDays, Clock, CheckCircle, XCircle, AlertTriangle, Plus, X, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL!;

async function pwaGet(action: string, token: string) {
  const res = await fetch(`${API}?action=${action}&token=${encodeURIComponent(token)}`);
  return res.json();
}

async function pwaPost(action: string, token: string, payload: Record<string, unknown> = {}) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action, token, ...payload }),
  });
  return res.json();
}

const STATUS_STYLES: Record<string, string> = {
  Pending:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Approved:  "bg-green-500/10  text-green-400  border-green-500/20",
  Denied:    "bg-red-500/10    text-red-400    border-red-500/20",
  Cancelled: "bg-white/5       text-[var(--text-muted)] border-white/10",
};

export default function TimeOffPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [balance, setBalance]   = useState<TimeOffBalance | null>(null);
  const [history, setHistory]   = useState<TimeOffRequest[]>([]);
  const [loading, setLoading]   = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form state
  const [leaveType,   setLeaveType]   = useState<"Vacation" | "Sick">("Vacation");
  const [requestType, setRequestType] = useState<"Full Day(s)" | "Partial Day">("Full Day(s)");
  const [startDate,   setStartDate]   = useState("");
  const [endDate,     setEndDate]     = useState("");
  const [hours,       setHours]       = useState("");
  const [reason,      setReason]      = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session) { router.push("/login"); return; }
    setToken(session.token);
    loadData(session.token);
  }, [router]);

  async function loadData(tok: string) {
    setLoading(true);
    try {
      const [balRes, histRes] = await Promise.all([
        pwaGet("getTimeOffBalance", tok),
        pwaGet("getTimeOffHistory", tok),
      ]);
      if (balRes.success)  setBalance(balRes);
      if (histRes.success) setHistory(histRes.requests || []);
    } catch {
      setError("Failed to load time off data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !startDate) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await pwaPost("requestTimeOff", token, {
        leaveType,
        requestType,
        startDate,
        endDate: endDate || startDate,
        hours: hours ? parseFloat(hours) : undefined,
        reason,
      });
      if (res.success) {
        setSuccessMsg(res.message || "Request submitted.");
        setShowForm(false);
        setStartDate(""); setEndDate(""); setHours(""); setReason("");
        await loadData(token);
      } else {
        setError(res.message || res.error || "Submission failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCancel(requestId: string) {
    if (!token) return;
    const res = await pwaPost("cancelTimeOff", token, { requestId });
    if (res.success) {
      setSuccessMsg("Request cancelled.");
      await loadData(token);
    } else {
      setError(res.message || res.error || "Could not cancel request.");
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
              Time <span className="text-[var(--accent)]">OFF</span>
            </h2>
            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
              Request and track your leave
            </p>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setError(null); setSuccessMsg(null); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            New Request
          </button>
        </div>

        {/* Alerts */}
        {error      && <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-xs text-red-400 font-bold">{error}</div>}
        {successMsg && <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-xs text-green-400 font-bold">{successMsg}</div>}

        {/* Request Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[var(--bg-surface)]/30 border border-white/10 rounded-3xl p-6 glass-panel space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-black uppercase tracking-widest">New Request</h3>
              <button type="button" onClick={() => setShowForm(false)}><X size={16} className="text-[var(--text-muted)]" /></button>
            </div>

            {leaveType === "Sick" && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <AlertTriangle size={14} className="text-blue-400 shrink-0" />
                <span className="text-[10px] text-blue-400 font-bold">Sick leave is auto-approved per CA Labor Code 246.5. No manager approval required.</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={e => setLeaveType(e.target.value as "Vacation" | "Sick")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50"
                >
                  <option value="Vacation">Vacation</option>
                  <option value="Sick">Sick</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Type</label>
                <select
                  value={requestType}
                  onChange={e => setRequestType(e.target.value as "Full Day(s)" | "Partial Day")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50"
                >
                  <option value="Full Day(s)">Full Day(s)</option>
                  <option value="Partial Day">Partial Day</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Start Date</label>
                <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">End Date</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50" />
              </div>
            </div>

            {requestType === "Partial Day" && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Hours</label>
                <input type="number" min="0.5" max="7.5" step="0.5" value={hours} onChange={e => setHours(e.target.value)}
                  placeholder="e.g. 4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50" />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Reason</label>
              <input type="text" value={reason} onChange={e => setReason(e.target.value)}
                placeholder="Brief description..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50" />
            </div>

            <button
              type="submit"
              disabled={submitting || !startDate}
              className="w-full py-3 rounded-xl bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest disabled:opacity-40 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        )}

        {/* Balance Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="animate-spin text-[var(--text-muted)]" />
          </div>
        ) : balance ? (
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Sick Leave", icon: Clock, data: balance.sick, color: "blue" },
              { label: "Vacation",   icon: CalendarDays, data: balance.vacation, color: "purple" },
            ].map(({ label, icon: Icon, data, color }) => (
              <div key={label} className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-3xl p-5 glass-panel">
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={14} className={`text-${color}-400`} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                </div>
                <div className="text-3xl font-black text-[var(--text-primary)] mb-1">{data.available}<span className="text-sm font-bold text-[var(--text-muted)]">h</span></div>
                <div className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Available</div>
                <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs font-black">{data.accrued}h</div>
                    <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest">Accrued</div>
                  </div>
                  <div>
                    <div className="text-xs font-black">{data.used}h</div>
                    <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest">Used</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Request History */}
        <div className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-3xl p-6 glass-panel">
          <div className="flex items-center gap-2 mb-6">
            <CalendarDays size={14} className="text-[var(--accent)]" />
            <h3 className="text-xs font-black uppercase tracking-widest">Request History</h3>
          </div>

          {history.length === 0 ? (
            <div className="border border-dashed border-white/10 rounded-2xl p-8 flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">No requests on file</span>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((req) => {
                const canCancel =
                  req.Status === "Pending" ||
                  (req.Status === "Approved" && req["Leave Type"] === "Sick");
                return (
                  <div key={req["Request ID"]} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/2">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[var(--text-primary)]">{req["Leave Type"]}</span>
                          {req["Leave Type"] === "Sick" && req.Status === "Approved" && (
                            <span className="text-[9px] font-bold text-blue-400 uppercase">Auto-approved</span>
                          )}
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                          {req["Start Date"]}{req["End Date"] && req["End Date"] !== req["Start Date"] ? ` → ${req["End Date"]}` : ""}
                          {req["Hours"] ? ` · ${req["Hours"]}h` : ""}
                        </div>
                        {req["Reason"] && (
                          <div className="text-[9px] text-[var(--text-muted)] mt-0.5 italic">{req["Reason"]}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${STATUS_STYLES[req.Status] || STATUS_STYLES.Cancelled}`}>
                        {req.Status}
                      </span>
                      {canCancel && (
                        <button
                          onClick={() => handleCancel(req["Request ID"])}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-colors"
                          title="Cancel request"
                        >
                          <X size={12} />
                        </button>
                      )}
                      {req.Status === "Approved" && req["Leave Type"] !== "Sick" && (
                        <CheckCircle size={14} className="text-green-400" />
                      )}
                      {req.Status === "Denied" && (
                        <XCircle size={14} className="text-red-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
```

---

## FILE 2: MODIFY `tech-pwa/src/app/hr/page.tsx`

Replace the entire file with this. The structure is the same — same KPI grid, same Accommodations and Incident panels — but the Time Off section is now live, and the KPI count is dynamic.

```tsx
"use client";

import { useEffect, useState } from "react";
import { dashboardRequest } from "@/lib/dashboard-api";
import { TimeOffRequest } from "@/lib/types";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Plus, Download, FileText, AlertTriangle,
  CalendarDays, Users, CheckCircle, XCircle, Loader2, ChevronDown
} from "lucide-react";

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

  useEffect(() => { loadRequests(); }, [filterStatus]);

  async function loadRequests() {
    setLoadingTOR(true);
    try {
      const res = await dashboardRequest("getTimeOffRequests", { filterStatus });
      setRequests(res.requests || []);
    } catch { /* silent */ }
    finally { setLoadingTOR(false); }
  }

  async function approve(requestId: string) {
    setActionLoading(requestId);
    const res = await dashboardRequest("approveTimeOff", { requestId });
    if (res.success) { setActionMsg("Approved."); await loadRequests(); }
    else setActionMsg(res.message || "Error approving.");
    setActionLoading(null);
  }

  async function deny(requestId: string) {
    if (!denyReason.trim()) { setActionMsg("Denial reason is required (PAGA compliance)."); return; }
    setActionLoading(requestId);
    const res = await dashboardRequest("denyTimeOff", { requestId, reason: denyReason });
    if (res.success) { setActionMsg("Denied."); setDenyTarget(null); setDenyReason(""); await loadRequests(); }
    else setActionMsg(res.message || res.error || "Error denying.");
    setActionLoading(null);
  }

  const pendingCount = requests.filter(r => r.Status === "Pending").length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
            HR <span className="text-[var(--accent)]">COMMAND</span>
          </h2>
          <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
            Workspace for employee relations and accommodations.
          </p>
        </div>

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

            {/* Time Off Requests — LIVE */}
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
                            {req["Leave Type"]} · {req["Start Date"]}
                            {req["End Date"] && req["End Date"] !== req["Start Date"] ? ` → ${req["End Date"]}` : ""}
                            {req["Hours"] ? ` · ${req["Hours"]}h` : ""}
                          </div>
                          {req["Reason"] && (
                            <div className="text-[9px] text-[var(--text-muted)] italic mt-0.5">{req["Reason"]}</div>
                          )}
                          {req["Leave Type"] === "Sick" && (
                            <div className="text-[9px] text-blue-400 font-bold mt-1">CA 246.5 — cannot be denied</div>
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
      </div>
    </DashboardLayout>
  );
}
```

---

## FILE 3: MODIFY `tech-pwa/src/components/dashboard/AppSidebar.tsx`

Add "Time Off" as a nav item visible to all roles (every employee can request time off).
Do not show the item if no session is present.

Find the nav items array in AppSidebar.tsx and add this entry — place it after the Jobs/Schedule items and before HR/Compliance:

```tsx
{ href: '/time-off', label: 'Time Off', icon: CalendarDays }
```

Import `CalendarDays` from `lucide-react` if not already imported.

---

## WHAT NOT TO CHANGE

- Do NOT modify `dashboard-api.ts` — the existing `dashboardRequest` function handles DashboardAPI calls correctly.
- Do NOT modify `syncQueue.ts` — time off calls are direct fetches, not queued.
- Do NOT modify any `.gs` files.
- Keep the Accommodations and Incident Log panels exactly as they are in hr/page.tsx — placeholder state is intentional.

---

## DEPLOYMENT

This is a Next.js Vercel deployment — no clasp required.

After implementing, run:
```
cd tech-pwa && npx tsc --noEmit
```

Fix any TypeScript errors, then push to main. Vercel auto-deploys.

---

## VERIFICATION

1. Log in as a tech → sidebar shows "Time Off" link
2. Navigate to `/time-off` → balance cards load (sick + vacation hours)
3. Submit a Sick leave request → immediately shows "Approved" + "Auto-approved" badge + CA 246.5 message
4. Submit a Vacation request → shows "Pending" status
5. Cancel the Pending vacation → status changes to "Cancelled", disappears from active list
6. Log in as hr/admin → navigate to `/hr` → pending vacation request appears in Time Off panel
7. Click Deny on vacation without entering reason → shows "Denial reason required" error
8. Enter reason and confirm deny → status changes to Denied
9. Sick request in HR panel shows "CA 246.5 — cannot be denied" label and only "Mark Acknowledged" button (no Deny button)
