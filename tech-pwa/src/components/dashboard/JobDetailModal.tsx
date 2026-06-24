"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Job } from "@/lib/types";
import {
  dashboardRequest,
  type JobComment,
  type TechSuggestion,
  type TechStatus,
  type WeekScheduleResponse,
  type UpdateJobResponse,
  type TechAvailabilityResponse,
  type GenericResponse,
} from "@/lib/dashboard-api";
import {
  X,
  Mail,
  Sparkles,
  Send,
  AlertTriangle,
  Clock,
  Archive,
  Smartphone,
  PlusCircle,
  Link,
  Paperclip,
  Pencil,
  Check,
  CalendarCheck,
  MessageSquare,
} from "lucide-react";
import SchedulingDispatch, {
  TechEntry,
} from "@/components/dashboard/SchedulingDispatch";
import type { ThreadAttachment, ThreadMessage } from "@/lib/types";
import { useToast } from "@/components/Toast";

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onRefresh?: () => void;
  onSave?: () => void;
  viewContext?: 'dispatch' | 'schedule';
}

export const COMM_STAKEHOLDER_TABS = [
  { value: "REQUESTER", label: "REQUESTER" },
  { value: "TENANT", label: "TENANT" },
  { value: "TECH", label: "FIELD" },
  { value: "NOTES", label: "INTERNAL" },
] as const;

export const TECH_CONTACT_SUMMARY = "Field assignment + status";

export const STATUS_OPTIONS = [
  "Needs Review",
  "Ready to Schedule",
  "PTE Required",
  "Awaiting Approval",
  "Scheduled",
] as const;

export const DISPATCH_NOTES_LABEL = "Tech Instructions";
export const WORK_ORDER_CONTEXT_ENABLED = false;

const TYPE_BADGES: Record<string, { label: string; class: string }> = {
  lapham_form: {
    label: "WORK ORDER",
    class: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  },
  turnover: {
    label: "TURNOVER",
    class: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  inspection: {
    label: "INSPECTION",
    class: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  adhoc_workorder: {
    label: "WORK ORDER",
    class: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  },
  new_inquiry: {
    label: "NEW INQUIRY",
    class: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
};


function formatTechName(raw: string): string {
  const withoutBadge = raw.split(" #")[0].trim();
  if (withoutBadge.includes(",")) {
    const [last, first] = withoutBadge.split(",").map((s) => s.trim());
    return `${first} ${last}`;
  }
  return withoutBadge;
}

function AttachmentRow({
  attachments,
  isOutbound,
}: {
  attachments: ThreadAttachment[];
  isOutbound: boolean;
}) {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="mt-2 space-y-1.5">
      {attachments.map((att, i) => {
        const isImage = att.mimeType.startsWith("image/");

        if (isImage && att.url) {
          return (
            <div key={i} className="rounded-xl overflow-hidden max-w-[220px]">
              <Image
                src={att.url}
                alt={att.name}
                width={220}
                height={150}
                className="w-full object-cover"
                unoptimized
              />
            </div>
          );
        }

        const sizeLabel =
          att.size < 1024 * 1024
            ? Math.round(att.size / 1024) + " KB"
            : (att.size / (1024 * 1024)).toFixed(1) + " MB";

        return (
          <a
            key={i}
            href={att.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border max-w-[220px] transition-opacity hover:opacity-80 ${
              isOutbound
                ? "bg-[var(--accent)]/20 border-[var(--accent)]/30"
                : "bg-white/5 border-white/10"
            }`}
          >
            <Paperclip size={11} className="text-zinc-400 flex-shrink-0" />
            <span className="text-[10px] text-zinc-300 truncate flex-1">
              {att.name}
            </span>
            <span className="text-[8px] text-zinc-500 flex-shrink-0">
              {sizeLabel}
            </span>
          </a>
        );
      })}
    </div>
  );
}

const normalizeName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

function formatMsgTimestamp(ts: string): string {
  if (!ts || ts === 'Just now') return ts;
  const d = new Date(ts.replace(/ at /i, ' '));
  if (isNaN(d.getTime())) return ts;
  return (
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  );
}

export default function JobDetailModal({
  job,
  onClose,
  onSave,
  viewContext = 'schedule'
}: JobDetailModalProps) {
  const isDispatch = viewContext === 'dispatch';
  const { toast } = useToast();
  const [activeJob, setActiveJob] = useState<Job | null>(job);
  const [prevJob, setPrevJob] = useState<Job | null>(job);
  const [thread, setThread] = useState<ThreadMessage[]>([]);
  const [replyBody, setReplyBody] = useState("");
  const [techRoster, setTechRoster] = useState<TechEntry[]>([]);
  const [tradeDurations, setTradeDurations] = useState<Record<string, number>>(
    {},
  );
  const [techSuggestions, setTechSuggestions] = useState<TechSuggestion[]>([]);
  const [weekAvailability, setWeekAvailability] = useState<
    Record<string, Record<string, number>>
  >({});
  const [outDates, setOutDates] = useState<Record<string, string[]>>({});

  type EditingSection =
    | "jobDetails"
    | "requester"
    | "tenant"
    | "context"
    | "access"
    | "status"
    | null;
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const toggleSection = (s: EditingSection) =>
    setEditingSection((prev) => (prev === s ? null : s));

  const [updateMasterDirectory, setUpdateMasterDirectory] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [schedLinkUrl, setSchedLinkUrl] = useState("");
  const [schedLinkLoading, setSchedLinkLoading] = useState(false);

  if (job !== prevJob) {
    setPrevJob(job);
    setActiveJob(job);
    setConfirmArchive(false);
    setEditingSection(null);
    setSchedLinkUrl("");
  }
  const [commStakeholder, setCommStakeholder] = useState<
    "REQUESTER" | "TENANT" | "TECH" | "NOTES"
  >("REQUESTER");
  const [comments, setComments] = useState<JobComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commChannel, setCommChannel] = useState<"EMAIL" | "SMS">("EMAIL");


  const [scopeExpansion, setScopeExpansion] = useState({
    open: false,
    additionalWork: "",
    hoursToAdd: 0,
    reassignTech: "",
  });

  const [loading, setLoading] = useState(() => ({
    thread: Boolean(job?.gmailMsgId),
    roster: true,
    action: false,
  }));
  const threadEndRef = useRef<HTMLDivElement>(null);

  const phase = !activeJob
    ? "COORDINATION"
    : activeJob.status === "In Progress"
      ? "EXECUTION"
      : ["Scheduled", "Ready to Schedule"].includes(activeJob.status)
        ? "DISPATCH"
        : ["Complete", "Archived"].includes(activeJob.status)
          ? "POST-JOB"
          : "COORDINATION";

  const traineeWarning = useMemo(() => {
    if (!activeJob?.assignedTech || !techRoster.length) return null;
    const names = activeJob.assignedTech
      .split(activeJob.assignedTech.includes(";") ? ";" : ",")
      .map((s) => s.trim().split(" #")[0].trim().toLowerCase())
      .filter(Boolean);
    if (!names.length) return null;
    const assigned = techRoster.filter((t) =>
      names.some((n) => (t.name || "").toLowerCase() === n),
    );
    if (!assigned.length) return null;
    const hasTrainee = assigned.some(
      (t) => (t.badge || "").toUpperCase() === "T",
    );
    const hasSupervisor = assigned.some(
      (t) => ["C", "L", "L1", "L2"].includes((t.badge || "").toUpperCase()),
    );
    return hasTrainee && !hasSupervisor
      ? "Trainee — must be paired with a Captain or Lieutenant. Verify a senior tech is on-site."
      : null;
  }, [activeJob?.assignedTech, techRoster]);

  const typeInfo =
    TYPE_BADGES[activeJob?.emailType || "adhoc_workorder"] ||
    TYPE_BADGES.adhoc_workorder;

  const filteredNotes = (activeJob?.notes || "")
    .split("\n")
    .filter((line) => !line.includes("Reconciled from scheduling sheet"))
    .join("\n");

  const fetchThread = useCallback(
    async () => {
      if (!job?.jobId) {
        setLoading((prev) => ({ ...prev, thread: false }));
        return;
      }
      try {
        const response = await fetch(`/api/comms/${encodeURIComponent(job.jobId)}`);
        const data = await response.json() as { success: boolean; messages?: ThreadMessage[]; error?: string };

        if (data.success && Array.isArray(data.messages)) {
          setThread(data.messages as ThreadMessage[]);
        } else if (data.error) {
          console.error("Comms API error:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch thread:", error);
      }
      setLoading((prev) => ({ ...prev, thread: false }));
    },
    [job],
  );

  useEffect(() => {
    if (job?.jobId) {
      setTimeout(() => fetchThread(), 0);
    }
  }, [job?.jobId, fetchThread]);

  useEffect(() => {
    if (!activeJob?.jobId || commStakeholder !== "NOTES") return;

    let isCurrent = true;
    setTimeout(() => {
      if (isCurrent) setCommentsLoading(true);
    }, 0);
    fetch(`/api/job-comments/${encodeURIComponent(activeJob.jobId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (isCurrent && data.success) setComments(data.comments ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (isCurrent) setCommentsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [activeJob?.jobId, commStakeholder]);

  useEffect(() => {
    async function loadSchedulingData() {
      const [techRes, durRes, schedRes, suggRes, availRes] = await Promise.all([
        dashboardRequest<{ success: boolean; techs: TechStatus[] }>(
          "getTechList",
        ),
        dashboardRequest<{
          success: boolean;
          durations: Record<string, number>;
        }>("getTradeDurations"),
        dashboardRequest<WeekScheduleResponse>("getWeekSchedule"),
        dashboardRequest<{ success: boolean; suggestions: TechSuggestion[] }>(
          "suggestTechs",
          { leadId: activeJob?.jobId },
        ),
        dashboardRequest<TechAvailabilityResponse>("getTechAvailability"),
      ]);
      if (techRes.success) {
        setTechRoster(
          (techRes.techs || []).map((t) => ({
            name: t.techName || (t as unknown as { name?: string }).name || "",
            badge: t.badge,
            skills: t.skills,
            active: t.active !== false,
          })),
        );
      }
      if (durRes.success) setTradeDurations(durRes.durations || {});
      if (suggRes.success) setTechSuggestions(suggRes.suggestions || []);
      if (availRes.success) setOutDates(availRes.outDates || {});

      if (schedRes.success) {
        const avail: Record<string, Record<string, number>> = {};
        const byTech = (schedRes.byTech || {}) as Record<
          string,
          Record<string, { estHours?: string | number }[]>
        >;
        Object.entries(byTech).forEach(([name, days]) => {
          const normName = normalizeName(name);
          if (!avail[normName]) avail[normName] = {};
          Object.entries(days).forEach(([date, jobsArr]) => {
            avail[normName][date] = jobsArr.reduce(
              (sum, j) => sum + parseFloat(String(j.estHours ?? "2")),
              0,
            );
          });
        });
        setWeekAvailability(avail);
      }
      setLoading((prev) => ({ ...prev, roster: false }));
    }
    if (activeJob?.jobId && !isDispatch) {
      setTimeout(() => loadSchedulingData(), 0);
    }
  }, [activeJob?.jobId, isDispatch]);

  useEffect(() => {
    if (threadEndRef.current)
      threadEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  useEffect(() => {
    if (commStakeholder === "TENANT" && activeJob?.jobId) {
      fetch(`/api/comms/${activeJob.jobId}`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      }).catch(err => console.error("Failed to mark as read", err));
    }
  }, [commStakeholder, activeJob?.jobId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!activeJob) return null;

  const handleUpdateField = <K extends keyof Job>(field: K, value: Job[K]) => {
    setActiveJob((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleMarkPTEGranted = async () => {
    setLoading((prev) => ({ ...prev, action: true }));
    const res = await dashboardRequest<UpdateJobResponse>("updateJob", {
      job: {
        jobId: activeJob.jobId,
        rowIndex: activeJob.rowIndex,
        pteGranted: "Yes",
        status: "Ready to Schedule",
      },
    });
    if (res.success) {
      handleUpdateField("pteGranted", "Yes");
      handleUpdateField("status", "Ready to Schedule");
      toast.success("PTE Granted — Dispatch Unlocked");
    }
    setLoading((prev) => ({ ...prev, action: false }));
  };

  const handleSave = async () => {
    setLoading((prev) => ({ ...prev, action: true }));
    let finalStatus = activeJob!.status;
    if (
      activeJob!.assignedTech &&
      activeJob!.scheduledDate &&
      activeJob!.scheduledTime &&
      finalStatus !== "In Progress"
    ) {
      finalStatus = "Scheduled";
    }
    const res = await dashboardRequest<UpdateJobResponse>("updateJob", {
      job: {
        jobId: activeJob!.jobId,
        rowIndex: activeJob!.rowIndex,
        assignedTech: activeJob!.assignedTech,
        scheduledDate: activeJob!.scheduledDate,
        scheduledTime: activeJob!.scheduledTime,
        estHours: activeJob!.estimatedHours,
        status: finalStatus,
        notes: activeJob!.notes,
        address: activeJob!.address,
        unit: activeJob!.unit,
        description: activeJob!.description,
        serviceCategory: activeJob!.serviceCategory,
        tenantName: activeJob!.tenantName,
        tenantPhone: activeJob!.tenantPhone,
        tenantEmail: activeJob!.tenantEmail,
        rmName: activeJob!.rmName,
        rmEmail: activeJob!.rmEmail,
        accessInfo: activeJob!.accessInfo,
      },
      updateMasterDirectory,
    });
    if (res.success) {
      toast.success("Job saved");
      onSave?.();
      onClose();
    } else {
      if (res.error === "PTE_REQUIRED_GATE") {
        toast.error(
          res.message ||
            "PTE Required: Permission must be granted before scheduling.",
        );
      } else {
        toast.error("Save failed");
      }
    }
    setLoading((prev) => ({ ...prev, action: false }));
  };

  const handleArchive = async () => {
    setLoading((prev) => ({ ...prev, action: true }));
    const res = await dashboardRequest<GenericResponse>("archiveJob", {
      jobId: activeJob.jobId,
      rowIndex: activeJob.rowIndex,
    });
    if (res.success) {
      toast.success("Job archived");
      onSave?.();
      onClose();
    } else {
      toast.error("Archive failed");
    }
    setLoading((prev) => ({ ...prev, action: false }));
  };

  const handleGenerateScheduleLink = async () => {
    setSchedLinkLoading(true);
    const res = await dashboardRequest<{ success: boolean; url?: string }>(
      "generateTenantScheduleLink",
      { jobId: activeJob.jobId, leadId: activeJob.jobId },
    );
    if (res.success && res.url) {
      setSchedLinkUrl(res.url);
    }
    setSchedLinkLoading(false);
  };

  const handleSaveExpansion = async () => {
    setLoading((prev) => ({ ...prev, action: true }));
    const res = await dashboardRequest<GenericResponse>("expandScope", {
      jobId: activeJob.jobId,
      leadId: activeJob.jobId,
      rowIndex: activeJob.rowIndex,
      additionalWork: scopeExpansion.additionalWork,
      hoursToAdd: scopeExpansion.hoursToAdd,
      reassignTech: scopeExpansion.reassignTech,
    });
    if (res.success) {
      toast.success("Scope expanded");
      setScopeExpansion({
        open: false,
        additionalWork: "",
        hoursToAdd: 0,
        reassignTech: "",
      });
      onSave?.();
    }
    setLoading((prev) => ({ ...prev, action: false }));
  };

  const handleSendReply = async () => {
    if (!replyBody) return;
    setLoading((prev) => ({ ...prev, action: true }));
    const res = await dashboardRequest<GenericResponse>("replyToThread", {
      jobId: activeJob.jobId,
      msgId: activeJob.gmailMsgId,
      replyBody,
      stakeholder: commStakeholder,
      channel: commChannel,
    });
    if (res.success) {
      const stakeholderEmail =
        commStakeholder === "TENANT"
          ? activeJob.tenantEmail || ""
          : commStakeholder === "REQUESTER"
            ? activeJob.rmEmail || ""
            : "";
      setThread((prev) => [
        ...prev,
        {
          stakeholder: commStakeholder as "TENANT" | "REQUESTER" | "TECH",
          from: "Dispatch",
          fromEmail: "dispatch@aptmaintenanceinc.com",
          toEmail: stakeholderEmail,
          text: replyBody,
          timestamp: "Just now",
          isOutbound: true,
          attachments: [],
        },
      ]);
      setReplyBody("");
    }
    setLoading((prev) => ({ ...prev, action: false }));
  };

  const handleEmailTenantPTE = () => {
    setCommStakeholder("TENANT");
    setCommChannel("EMAIL");
    const template = `Hi ${activeJob.tenantName || "Tenant"},\n\nWe have a maintenance request scheduled for your unit at ${activeJob.address}${activeJob.unit ? ` Unit ${activeJob.unit}` : ""}. \n\nWe'd like to confirm — do we have your permission to enter if you are not home?\n\nPlease reply to confirm or call us at your convenience.\n\nThank you,\nAPT Maintenance`;
    setReplyBody(template);
  };

  const handleTextTenantPTE = () => {
    setCommStakeholder("TENANT");
    setCommChannel("SMS");
    const first = activeJob.tenantName?.split(" ")[0] || "there";
    const unit = activeJob.unit ? ` Unit ${activeJob.unit}` : "";
    const template = `Hi ${first}, this is APT Maintenance. We have a work order for ${activeJob.address}${unit}. Do we have your permission to enter if you're not home? Reply YES or call us. Thank you.`;
    setReplyBody(template);
  };

  const handleNotesChange = (val: string) => {
    const systemNotes = (activeJob?.notes || "")
      .split("\n")
      .filter((line) => line.includes("Reconciled from scheduling sheet"))
      .join("\n");
    handleUpdateField("notes", systemNotes ? `${val}\n${systemNotes}` : val);
  };

  const handleAddComment = async () => {
    const body = newComment.trim();
    if (!body || submittingComment || !activeJob?.jobId) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(
        `/api/job-comments/${encodeURIComponent(activeJob.jobId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body, role: "dispatch" }),
        },
      );
      const data = await res.json();
      if (data.success && data.comment) {
        setComments((prev) => [...prev, data.comment]);
        setNewComment("");
      }
    } catch {
      // silent
    }
    setSubmittingComment(false);
  };

  const handleGenerateEstimate = async () => {
    setLoading((prev) => ({ ...prev, action: true }));
    const res = await dashboardRequest<{
      success: boolean;
      replyBody?: string;
      subject?: string;
    }>("getDraftReply", {
      jobData: activeJob,
      jobId: activeJob.jobId,
      leadId: activeJob.jobId,
      replyType: "estimate",
    });
    if (res.success && res.replyBody) {
      setReplyBody(res.replyBody);
      setCommStakeholder("REQUESTER");
      setCommChannel("EMAIL");
    }
    setLoading((prev) => ({ ...prev, action: false }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          role="dialog"
          className="relative w-[95vw] h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
        >
          <header className="h-[56px] px-8 border-b border-white/5 flex items-center justify-between bg-[var(--bg-surface)] shrink-0">
            <div className="flex items-center gap-4">
              <span className="text-sm font-black text-[var(--accent)] tracking-tighter uppercase italic">
                {activeJob.jobId}
              </span>
              <div className="h-4 w-[1px] bg-white/10" />
              <span
                className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest border ${typeInfo.class}`}
              >
                {typeInfo.label}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--text-muted)] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 flex overflow-hidden">
            {/* LEFT PANEL: COMMUNICATION HUB (45%) */}
            <div className="w-[45%] border-r border-white/5 flex flex-col bg-[var(--bg-primary)]">
              <div className="h-8 px-6 flex items-center border-b border-white/5 bg-white/[0.01] shrink-0">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-50">
                  Coordination
                </span>
              </div>

              {/* STAKEHOLDER SWITCHER */}
              <div className="flex h-[88px] border-b border-white/5 shrink-0">
                {COMM_STAKEHOLDER_TABS
                  .map(({ value: s, label }) => (
                    <button
                      key={s}
                      onClick={() => setCommStakeholder(s)}
                      className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all relative ${commStakeholder === s ? "text-white" : "text-[var(--text-muted)] hover:text-white"}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        {label}
                      </span>
                      {commStakeholder === s && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]"
                        />
                      )}
                    </button>
                  ),
                )}
              </div>

              {/* COMPACT CONTACT CARD */}
              {commStakeholder !== "NOTES" && (
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-black text-white uppercase tracking-tight">
                        {commStakeholder === "TENANT"
                          ? activeJob.tenantName || "No Tenant Name"
                          : commStakeholder === "TECH"
                            ? activeJob.assignedTech
                              ? formatTechName(
                                  activeJob.assignedTech.split(";")[0],
                                )
                              : "No Tech Assigned"
                            : activeJob.rmName || "No RM Name"}
                      </p>
                      <p className="text-[9px] font-medium text-[var(--text-muted)]">
                        {commStakeholder === "TENANT"
                          ? [activeJob.tenantEmail, activeJob.tenantPhone].filter(Boolean).join(' · ') || 'No Contact Info'
                          : commStakeholder === "TECH"
                            ? TECH_CONTACT_SUMMARY
                            : activeJob.rmEmail || "No Email"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {commStakeholder !== "TECH" && (
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            toggleSection(
                              commStakeholder === "TENANT"
                                ? "tenant"
                                : "requester",
                            );
                          }}
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[var(--text-muted)] hover:text-white transition-all"
                        >
                          <Pencil size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {commStakeholder === "NOTES" ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {commentsLoading ? (
                      <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-14 rounded-xl bg-white/5 animate-pulse"
                          />
                        ))}
                      </div>
                    ) : comments.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 gap-3 opacity-30">
                        <MessageSquare size={24} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          No internal notes
                        </span>
                      </div>
                    ) : (
                      comments.map((c, i) => (
                        <div
                          key={i}
                          className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-tight">
                              {c.author}
                            </span>
                            <span className="text-[9px] text-[var(--text-muted)]">
                              {c.timestamp
                                ? new Date(c.timestamp).toLocaleString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "2-digit",
                                    },
                                  )
                                : ""}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                            {c.body}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-4 border-t border-white/5 flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleAddComment();
                        }
                      }}
                      placeholder="Add internal note..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-all"
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || submittingComment}
                      className="px-4 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-black disabled:opacity-40 hover:opacity-90 transition-all"
                    >
                      <Send size={13} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                    {/* PTE action card — inside scroll area, only in TENANT tab */}
                    {phase === "COORDINATION" &&
                      activeJob.status === "PTE Required" &&
                      commStakeholder === "TENANT" && (
                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl space-y-3">
                          <div className="flex items-center gap-2">
                            <AlertTriangle
                              size={14}
                              className="text-amber-500 shrink-0"
                            />
                            <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">
                              Coordination Required
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={handleEmailTenantPTE}
                              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col items-center gap-1.5 transition-all active:scale-95"
                            >
                              <Mail
                                size={13}
                                className="text-[var(--accent)]"
                              />
                              <span className="text-[8px] font-black uppercase tracking-widest">
                                Email PTE
                              </span>
                            </button>
                            <button
                              onClick={handleTextTenantPTE}
                              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col items-center gap-1.5 transition-all active:scale-95"
                            >
                              <Smartphone
                                size={13}
                                className="text-[var(--accent)]"
                              />
                              <span className="text-[8px] font-black uppercase tracking-widest">
                                Text Tenant
                              </span>
                            </button>
                          </div>
                          <button
                            onClick={handleMarkPTEGranted}
                            className="w-full py-3 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
                          >
                            Mark PTE Granted — Unlock Dispatch
                          </button>
                        </div>
                      )}
                    {commStakeholder === "TENANT" &&
                    !activeJob.tenantEmail &&
                    !activeJob.tenantPhone ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-10 gap-3 opacity-40">
                        <Smartphone size={28} />
                        <p className="text-[10px] font-black uppercase tracking-widest">
                          No Tenant on File
                        </p>
                        <p className="text-[9px] text-[var(--text-muted)] leading-relaxed">
                          Add tenant contact info in the right panel to enable
                          tenant communication.
                        </p>
                      </div>
                    ) : loading.thread ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-24 bg-white/5 rounded-2xl animate-pulse"
                          />
                        ))}
                      </div>
                    ) : thread.length > 0 ? (
                      thread
                        .filter((msg) => {
                          // Use pre-categorized stakeholder if available from API
                          if (msg.stakeholder) {
                            if (commStakeholder === "TENANT")
                              return msg.stakeholder === "TENANT";
                            if (commStakeholder === "TECH")
                              return msg.stakeholder === "TECH";
                            if (commStakeholder === "REQUESTER")
                              return msg.stakeholder === "REQUESTER";
                            return true;
                          }

                          // Fallback to legacy manual matching if stakeholder is missing
                          const rmEmail = (
                            activeJob.rmEmail || ""
                          ).toLowerCase();
                          const tenantEmail = (
                            activeJob.tenantEmail || ""
                          ).toLowerCase();
                          const to = (msg.toEmail || "").toLowerCase();
                          const from = (msg.fromEmail || "").toLowerCase();

                          if (commStakeholder === "TENANT") {
                            if (!tenantEmail) return false;
                            return msg.isOutbound
                              ? to.includes(tenantEmail)
                              : from.includes(tenantEmail);
                          }

                          if (commStakeholder === "TECH") {
                            if (msg.isOutbound) {
                              if (!to) return false;
                              return (
                                (!rmEmail || !to.includes(rmEmail)) &&
                                (!tenantEmail || !to.includes(tenantEmail))
                              );
                            }
                            return (
                              (!rmEmail || !from.includes(rmEmail)) &&
                              (!tenantEmail || !from.includes(tenantEmail))
                            );
                          }

                          // REQUESTER: show entire thread except messages explicitly sent outbound to tenant
                          if (
                            msg.isOutbound &&
                            tenantEmail &&
                            to &&
                            to.includes(tenantEmail)
                          )
                            return false;
                          return true;
                        })
                        .map((msg, idx) => (
                          <div
                            key={idx}
                            className={`p-5 rounded-2xl border ${msg.isOutbound ? "bg-[var(--accent)]/20 border-[var(--accent)]/30 ml-12" : "bg-white/[0.08] border-white/10 mr-12"}`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                                  {msg.isOutbound
                                    ? 'APT Dispatch'
                                    : (msg.from ?? '').split(' <')[0] || 'Unknown'}
                                </span>
                                {msg.stakeholder && (
                                  <span
                                    className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${
                                      msg.stakeholder === "TENANT"
                                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                        : msg.stakeholder === "TECH"
                                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                          : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                                    }`}
                                  >
                                    {msg.stakeholder}
                                  </span>
                                )}
                              </div>
                              <span className="text-[9px] font-medium text-[var(--text-muted)] opacity-40">
                                {formatMsgTimestamp(msg.timestamp ?? '')}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                              {msg.text ?? ''}
                            </p>
                            <AttachmentRow
                              attachments={msg.attachments ?? []}
                              isOutbound={msg.isOutbound}
                            />
                          </div>
                        ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-30">
                        <Mail size={32} />
                      </div>
                    )}
                    <div ref={threadEndRef} />
                  </div>

                  <div className="p-6 border-t border-white/5 bg-[var(--bg-surface)]/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCommChannel("EMAIL")}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border transition-all ${commChannel === "EMAIL" ? "bg-[var(--accent)] text-white border-[var(--accent)]" : "bg-white/5 text-[var(--text-muted)] border-white/10"}`}
                        >
                          Email
                        </button>
                        <button
                          onClick={() => setCommChannel("SMS")}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border transition-all ${commChannel === "SMS" ? "bg-[var(--accent)] text-white border-[var(--accent)]" : "bg-white/5 text-[var(--text-muted)] border-white/10"}`}
                        >
                          SMS
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <textarea
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        placeholder={`Send ${commChannel}...`}
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-medium text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/50 resize-none"
                      />
                      <button
                        onClick={handleSendReply}
                        disabled={!replyBody || loading.action}
                        className="absolute bottom-4 right-4 p-3 bg-[var(--accent)] text-white rounded-xl shadow-lg hover:scale-105 active:scale-95"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT PANEL: ASSIGNMENT & SCHEDULING (55%) */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[var(--bg-surface)]/20">
              <div className="h-8 px-8 flex items-center border-b border-white/5 bg-white/[0.01] shrink-0">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-50">
                  {isDispatch ? "Dispatch Status" : "Assignment · Scheduling"}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-8 space-y-8 pb-24">
                  {/* ── JOB DETAILS ── */}
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                        Job Details
                      </h4>
                      <button
                        onClick={() => toggleSection("jobDetails")}
                        className={`p-1.5 rounded-lg transition-all ${editingSection === "jobDetails" ? "text-[var(--accent)] bg-[var(--accent)]/10" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"}`}
                      >
                        {editingSection === "jobDetails" ? (
                          <Check size={13} />
                        ) : (
                          <Pencil size={13} />
                        )}
                      </button>
                    </div>
                    <div className="bg-[var(--bg-surface)] rounded-2xl border border-white/10 backdrop-blur-sm p-5 space-y-3">
                      {editingSection === "jobDetails" ? (
                        <div className="space-y-3">
                          <div>
                            <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                              Address
                            </label>
                            <input
                              value={activeJob.address}
                              onChange={(e) =>
                                handleUpdateField("address", e.target.value)
                              }
                              className="w-full bg-white/5 border border-[var(--accent)]/30 focus:border-[var(--accent)] rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-primary)] outline-none transition-all"
                              placeholder="Property address"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                                Unit
                              </label>
                              <input
                                value={activeJob.unit || ""}
                                onChange={(e) =>
                                  handleUpdateField("unit", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 focus:border-[var(--accent)] rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-primary)] outline-none transition-all"
                                placeholder="Unit #"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                                Trade / Type
                              </label>
                              <select
                                value={activeJob.serviceCategory}
                                onChange={(e) =>
                                  handleUpdateField(
                                    "serviceCategory",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-[#1a1a1b] border border-white/20 focus:border-[var(--accent)] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none transition-all cursor-pointer"
                              >
                                {Object.keys(tradeDurations).map((cat) => (
                                  <option
                                    key={cat}
                                    value={cat}
                                    className="bg-[#111318] text-white"
                                  >
                                    {cat}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                                Est. Hours
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={activeJob.estimatedHours || 2}
                                onChange={(e) =>
                                  handleUpdateField("estimatedHours", parseInt(e.target.value) || 2)
                                }
                                className="w-full bg-white/5 border border-white/10 focus:border-[var(--accent)] rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-primary)] outline-none transition-all"
                                placeholder="Hours"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <p className="text-sm font-black text-[var(--text-primary)]">
                            {activeJob.address}
                            {activeJob.unit && (
                              <span className="text-[var(--text-muted)] font-medium">
                                {" "}
                                · Unit {activeJob.unit}
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest">
                            {activeJob.serviceCategory}
                          </p>
                          {activeJob.preferredTiming && (
                            <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
                              <Clock
                                size={10}
                                className="text-[var(--accent)]"
                              />
                              {activeJob.preferredTiming}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </section>

                  {(activeJob.tenantName || activeJob.tenantPhone || activeJob.tenantEmail) && (
                    <section className="space-y-3">
                      <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                        Tenant Contact
                      </h4>
                      <div className="bg-[var(--bg-surface)] rounded-2xl border border-white/10 backdrop-blur-sm p-5 space-y-3">
                        {activeJob.tenantName && (
                          <div>
                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Name</p>
                            <p className="text-sm text-[var(--text-primary)]">{activeJob.tenantName}</p>
                          </div>
                        )}
                        {activeJob.tenantPhone && (
                          <div>
                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Phone</p>
                            <p className="text-sm text-[var(--text-primary)]">{activeJob.tenantPhone}</p>
                          </div>
                        )}
                        {activeJob.tenantEmail && (
                          <div>
                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Email</p>
                            <p className="text-sm text-[var(--text-primary)]">{activeJob.tenantEmail}</p>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* ── JOB STATUS ── */}
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                        Job Status
                      </h4>
                      <button
                        onClick={() => toggleSection("status")}
                        className={`p-1.5 rounded-lg transition-all ${editingSection === "status" ? "text-[var(--accent)] bg-[var(--accent)]/10" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"}`}
                      >
                        {editingSection === "status" ? (
                          <Check size={13} />
                        ) : (
                          <Pencil size={13} />
                        )}
                      </button>
                    </div>

                    {/* Status display — context-appropriate */}
                    {activeJob.status === "In Progress" ? (
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                          <Clock size={20} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.15em]">
                            Job In Progress
                          </p>
                          <p className="text-[9px] text-emerald-500/60 uppercase tracking-wider mt-0.5 italic">
                            {formatTechName(
                              activeJob.assignedTech?.split(";")[0] || "",
                            )}{" "}
                            · clocked in{" "}
                            {activeJob.clockedInAt
                              ? new Date(
                                  activeJob.clockedInAt,
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                  timeZone: "America/Los_Angeles",
                                })
                              : "time pending"}
                          </p>
                        </div>
                      </div>
                    ) : activeJob.status === "Scheduled" ? (
                      <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          <CalendarCheck size={20} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.15em]">
                            Scheduled & Assigned
                          </p>
                          <p className="text-[9px] text-blue-400/60 uppercase tracking-wider mt-0.5 italic">
                            {formatTechName(
                              activeJob.assignedTech?.split(";")[0] || "",
                            )}
                            {activeJob.scheduledDate
                              ? ` · ${new Date(activeJob.scheduledDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`
                              : ""}
                            {activeJob.scheduledTime
                              ? ` at ${activeJob.scheduledTime}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="p-5 bg-[var(--bg-surface)] border border-white/5 rounded-2xl cursor-pointer hover:border-[var(--accent)]/30 transition-all"
                        onClick={() => toggleSection("status")}
                        title="Click to change status"
                      >
                        <span className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider">
                          {activeJob.status}
                        </span>
                      </div>
                    )}

                    {/* Status edit — override dropdown */}
                    {editingSection === "status" && (
                      <div className="p-4 bg-[var(--bg-surface)] border border-[var(--accent)]/20 rounded-2xl space-y-3">
                        <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block">
                          Override Status
                        </label>
                        <select
                          value={activeJob.status}
                          onChange={(e) =>
                            handleUpdateField(
                              "status",
                              e.target.value as Job["status"],
                            )
                          }
                          className="w-full bg-[#1a1a1b] border border-white/20 rounded-xl px-3 py-2.5 text-xs font-bold text-white outline-none focus:border-[var(--accent)] transition-all cursor-pointer"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option
                              key={s}
                              value={s}
                              className="bg-[#111318] text-white"
                            >
                              {s}
                            </option>
                          ))}
                        </select>
                        {isDispatch && ["Needs Review", "PTE Required", "Awaiting Approval"].includes(activeJob.status) && (
                          <button
                            onClick={() => handleUpdateField("status", "Ready to Schedule")}
                            className="w-full py-3 bg-[var(--accent)] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[var(--accent)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                          >
                            Ready to Schedule
                          </button>
                        )}
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={activeJob.pteGranted === "Yes"}
                              onChange={(e) =>
                                handleUpdateField(
                                  "pteGranted",
                                  e.target.checked ? "Yes" : "No",
                                )
                              }
                              className="w-3 h-3 rounded border-white/20 bg-transparent text-[var(--accent)] focus:ring-[var(--accent)]"
                            />
                            <span className="text-[9px] font-black text-[var(--text-muted)] group-hover:text-white uppercase tracking-tight transition-colors">
                              PTE Granted
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </section>

                  {phase === "DISPATCH" && (
                    <>
                      {!isDispatch && (
                        <SchedulingDispatch
                          job={activeJob}
                          onUpdate={(patch) =>
                            setActiveJob((prev) =>
                              prev ? ({ ...prev, ...patch } as Job) : null,
                            )
                          }
                          techRoster={techRoster}
                          weekAvailability={weekAvailability}
                          outDates={outDates}
                          tradeDurations={tradeDurations}
                          techSuggestions={techSuggestions}
                          onTriggerPTEEmail={handleEmailTenantPTE}
                        />
                      )}

                      {/* Trainee warning — shown when trainee is solo-assigned */}
                      {traineeWarning && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
                        >
                          <AlertTriangle
                            size={13}
                            className="text-amber-400 shrink-0 mt-0.5"
                          />
                          <p className="text-[10px] font-bold text-amber-400 leading-snug">
                            {traineeWarning}
                          </p>
                        </motion.div>
                      )}

                      {/* Tenant Self-Scheduling Link */}
                      {!isDispatch && (
                        <section className="mt-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02] space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Link
                                size={12}
                                className="text-[var(--text-muted)]"
                              />
                              <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                                Tenant Self-Scheduling
                              </span>
                              {activeJob.tenantScheduled && (
                                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                                  ✓ Tenant Scheduled
                                </span>
                              )}
                            </div>
                            <button
                              onClick={handleGenerateScheduleLink}
                              disabled={
                                schedLinkLoading || activeJob.tenantScheduled
                              }
                              className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 disabled:opacity-30 transition-all"
                            >
                              {schedLinkLoading ? "…" : "Generate Link"}
                            </button>
                          </div>
                          {schedLinkUrl && (
                            <div className="flex items-center gap-2">
                              <input
                                readOnly
                                value={schedLinkUrl}
                                className="flex-1 bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-[var(--text-muted)] font-mono focus:outline-none"
                              />
                              <button
                                onClick={() =>
                                  navigator.clipboard.writeText(schedLinkUrl)
                                }
                                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all"
                              >
                                Copy
                              </button>
                            </div>
                          )}
                          {!schedLinkUrl && !activeJob.tenantScheduled && (
                            <p className="text-[9px] text-[var(--text-muted)] leading-relaxed">
                              Generate a secure link for the tenant to pick their
                              own appointment window.
                            </p>
                          )}
                        </section>
                      )}
                    </>
                  )}

                  {phase === "EXECUTION" && (
                    <section className="space-y-6">
                      {/* Expand Scope */}
                      {!scopeExpansion.open ? (
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() =>
                            setScopeExpansion((prev) => ({
                              ...prev,
                              open: true,
                            }))
                          }
                          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all"
                        >
                          <PlusCircle size={16} />
                          <span className="text-[11px] font-black uppercase tracking-widest">
                            Expand Scope
                          </span>
                        </motion.button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-5"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                              <PlusCircle size={14} /> Expand Scope
                            </h4>
                            <button
                              onClick={() =>
                                setScopeExpansion({
                                  open: false,
                                  additionalWork: "",
                                  hoursToAdd: 0,
                                  reassignTech: "",
                                })
                              }
                              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                              Additional Work Discovered
                            </label>
                            <textarea
                              value={scopeExpansion.additionalWork}
                              onChange={(e) =>
                                setScopeExpansion((prev) => ({
                                  ...prev,
                                  additionalWork: e.target.value,
                                }))
                              }
                              placeholder="e.g. Water damage behind drywall — plumber needed for supply line leak"
                              rows={3}
                              className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-4 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-amber-500/40 resize-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                              Extend Hours{" "}
                              <span className="ml-2 text-amber-400">
                                (current: {activeJob!.estimatedHours || 0}h
                                {scopeExpansion.hoursToAdd > 0
                                  ? ` → ${(activeJob!.estimatedHours || 0) + scopeExpansion.hoursToAdd}h`
                                  : ""}
                                )
                              </span>
                            </label>
                            <div className="flex gap-2">
                              {[0, 1, 2, 4, 8].map((h) => (
                                <button
                                  key={h}
                                  onClick={() =>
                                    setScopeExpansion((prev) => ({
                                      ...prev,
                                      hoursToAdd: h,
                                    }))
                                  }
                                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${scopeExpansion.hoursToAdd === h ? "bg-amber-500 text-black" : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)]"}`}
                                >
                                  {h === 0 ? "None" : `+${h}h`}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                              Reassign Tech (optional)
                            </label>
                            <select
                              value={
                                scopeExpansion.reassignTech ||
                                activeJob!.assignedTech ||
                                ""
                              }
                              onChange={(e) =>
                                setScopeExpansion((prev) => ({
                                  ...prev,
                                  reassignTech: e.target.value,
                                }))
                              }
                              className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-amber-500/40 transition-all"
                            >
                              <option value="">— Keep current tech —</option>
                              {techRoster?.map((t: TechEntry) => (
                                <option key={t.name} value={t.name}>
                                  {t.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleSaveExpansion}
                            disabled={
                              (!scopeExpansion.additionalWork.trim() &&
                                scopeExpansion.hoursToAdd === 0) ||
                              loading.action
                            }
                            className="w-full py-4 rounded-xl bg-amber-500 text-black text-[11px] font-black uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10"
                          >
                            {loading.action ? "Saving…" : "Save Expansion"}
                          </motion.button>
                        </motion.div>
                      )}

                      {/* Live Photo Feed */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                            Live Photo Feed
                          </h4>
                          <span className="text-[8px] font-black text-[var(--accent)] uppercase tracking-widest cursor-pointer hover:underline">
                            View All
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="aspect-square bg-[var(--bg-surface)] rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2 transition-opacity"
                            >
                              <Smartphone size={20} className="text-white/50" />
                              <span className="text-[7px] font-black text-white/5 uppercase">
                                No Photo
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[9px] text-[var(--text-muted)] font-black uppercase text-center tracking-widest italic">
                          Photos stream live as{" "}
                          {
                            activeJob.assignedTech
                              ?.split(/[;,]/)[0]
                              ?.split(" ")[0]
                          }{" "}
                          uploads from the field
                        </p>
                      </div>
                    </section>
                  )}

                  {phase === "POST-JOB" && (
                    <div className="p-8 border border-white/5 rounded-2xl bg-[var(--bg-surface)] text-center space-y-3">
                      <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">
                        Job Finalized
                      </h4>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                        Pending Quality Assurance & Billing Review
                      </p>
                    </div>
                  )}

                  {/* ── WORK ORDER CONTEXT ── */}
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                        Work Order Context
                      </h4>
                      <button
                        onClick={() => toggleSection("context")}
                        className={`p-1.5 rounded-lg transition-all ${editingSection === "context" ? "text-[var(--accent)] bg-[var(--accent)]/10" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"}`}
                      >
                        {editingSection === "context" ? (
                          <Check size={13} />
                        ) : (
                          <Pencil size={13} />
                        )}
                      </button>
                    </div>

                    {/* Trainee warning — persists across phases */}
                    {traineeWarning && phase !== "DISPATCH" && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
                      >
                        <AlertTriangle
                          size={13}
                          className="text-amber-400 shrink-0 mt-0.5"
                        />
                        <p className="text-[10px] font-bold text-amber-400 leading-snug">
                          {traineeWarning}
                        </p>
                      </motion.div>
                    )}

                    <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                      {editingSection === "context" ? (
                        <textarea
                          value={activeJob.description || ""}
                          onChange={(e) =>
                            handleUpdateField("description", e.target.value)
                          }
                          className="w-full h-32 bg-transparent text-xs font-medium text-[var(--text-secondary)] leading-relaxed outline-none border-b border-[var(--accent)]/30 focus:border-[var(--accent)] p-0 resize-none"
                          placeholder="Work order description..."
                        />
                      ) : (
                        <p className="text-xs font-medium text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                          {activeJob.description || (
                            <span className="text-[var(--text-muted)] italic opacity-50">
                              No description provided.
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </section>

                  {/* ── PROPERTY ACCESS ── */}
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                        Property Access
                      </h4>
                      <div className="flex items-center gap-2">
                        {editingSection === "access" && (
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={updateMasterDirectory}
                              onChange={(e) =>
                                setUpdateMasterDirectory(e.target.checked)
                              }
                              className="w-3 h-3 rounded border-white/20 bg-transparent text-[var(--accent)] focus:ring-[var(--accent)]"
                            />
                            <span className="text-[8px] font-black text-amber-500/80 group-hover:text-amber-500 uppercase tracking-tighter transition-colors">
                              Update Master Directory
                            </span>
                          </label>
                        )}
                        <button
                          onClick={() => toggleSection("access")}
                          className={`p-1.5 rounded-lg transition-all ${editingSection === "access" ? "text-[var(--accent)] bg-[var(--accent)]/10" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"}`}
                        >
                          {editingSection === "access" ? (
                            <Check size={13} />
                          ) : (
                            <Pencil size={13} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="p-5 bg-orange-400/5 border-l-4 border-orange-400 rounded-r-2xl">
                      {editingSection === "access" ? (
                        <textarea
                          value={activeJob.accessInfo || ""}
                          onChange={(e) =>
                            handleUpdateField("accessInfo", e.target.value)
                          }
                          className="w-full bg-transparent text-xs font-black text-orange-400 leading-relaxed outline-none border-b border-orange-400/30 focus:border-orange-400 h-16 resize-none"
                          placeholder="E.g. Building Code 1234, Lockbox on pipe..."
                        />
                      ) : (
                        <p className="text-xs font-black text-orange-400 leading-relaxed whitespace-pre-wrap uppercase tracking-tight">
                          {activeJob.accessInfo || (
                            <span className="opacity-40 font-medium normal-case tracking-normal">
                              No access info on file.
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </section>

                  {/* ── DISPATCH NOTES ── */}
                  <section className="space-y-3 pt-6 border-t border-white/5">
                    <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                      {DISPATCH_NOTES_LABEL}
                    </h4>
                    <textarea
                      value={filteredNotes}
                      onChange={(e) => handleNotesChange(e.target.value)}
                      className="w-full h-36 bg-[var(--bg-surface)] border border-white/10 rounded-2xl p-5 text-xs font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-white/20 transition-all resize-none shadow-inner custom-scrollbar"
                      placeholder="Notes for the tech or for internal dispatch coordination..."
                    />
                  </section>
                </div>
              </div>
            </div>
          </div>

          <footer className="h-20 px-8 border-t border-white/5 flex items-center justify-between bg-[var(--bg-surface)] shrink-0">
            {!confirmArchive ? (
              <button
                onClick={() => setConfirmArchive(true)}
                className="flex items-center gap-2 text-red-400/60 text-[10px] font-black uppercase"
              >
                <Archive size={16} /> Archive Job
              </button>
            ) : (
              <button
                onClick={handleArchive}
                className="px-4 py-2 bg-red-500/20 text-red-400 text-[10px] font-black uppercase rounded-lg"
              >
                Confirm Archive
              </button>
            )}
            <div className="flex items-center gap-4">
              <button
                onClick={handleGenerateEstimate}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl text-[10px] font-black text-[var(--accent)] uppercase"
              >
                <Sparkles size={14} /> Generate Estimate
              </button>
              <div className="flex items-center gap-6">
                <button
                  onClick={onClose}
                  className="text-[10px] font-black text-[var(--text-muted)] uppercase"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading.action}
                  className="px-10 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-xl text-[10px] font-black uppercase shadow-xl shadow-white/5"
                >
                  {loading.action ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
