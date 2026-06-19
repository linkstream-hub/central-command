/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, CheckCircle, Clock, Save } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { dashboardRequest, FeedbackItem } from "@/lib/dashboard-api";
import { useSession } from "next-auth/react";

export default function FeedbackPage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    category: "Suggestion" as FeedbackItem["category"],
    subject: "",
    details: "",
    relatedJobId: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loadFeedback = async () => {
    const res = await dashboardRequest<any>("getFeedback");
    if (res.success) setItems(res.items);
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    const fetchFeedback = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (ignore) return;
      setLoading(true);
      const res = await dashboardRequest<any>("getFeedback");
      if (ignore) return;
      if (res.success) setItems(res.items);
      setLoading(false);
    };
    fetchFeedback();
    return () => { ignore = true; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.details) return;

    setSubmitting(true);
    const res = await dashboardRequest<any>("submitFeedback", {
      ...form,
      submittedBy: "Dispatch",
    });

    if (res.success) {
      setSubmitted(true);
      setForm({
        category: "Suggestion",
        subject: "",
        details: "",
        relatedJobId: "",
      });
      setTimeout(() => {
        setSubmitted(false);
        loadFeedback();
      }, 3000);
    }
    setSubmitting(false);
  };

  const handleUpdateStatus = async (item: FeedbackItem, status: string, adminNotes: string) => {
    const res = await dashboardRequest<any>("updateFeedbackStatus", {
      rowIndex: item.rowIndex,
      status,
      adminNotes,
    });
    if (res.success) {
      // Optimistic update
      setItems(prev =>
        prev.map(i =>
          i.rowIndex === item.rowIndex ? { ...i, status: status as FeedbackItem["status"], adminNotes } : i
        )
      );
    }
  };

  const getCategoryStyles = (cat: string) => {
    switch (cat) {
      case "Suggestion":    return "bg-blue-500/20 text-blue-400 border-blue-500/20";
      case "Bug Report":    return "bg-red-500/20 text-red-400 border-red-500/20";
      case "Workflow Note": return "bg-purple-500/20 text-purple-400 border-purple-500/20";
      case "Question":      return "bg-amber-500/20 text-amber-400 border-amber-500/20";
      default:              return "bg-slate-500/20 text-slate-400 border-slate-500/20";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "New":         return "bg-[var(--text-muted)]/20 text-[var(--text-muted)]";
      case "Reviewed":    return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "In Progress": return "bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse";
      case "Done":        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:            return "bg-slate-500/20 text-slate-400";
    }
  };

  const isManagement = session?.permissions?.admin === true;

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-12 pb-20"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">Feedback</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 tracking-tight">
            Share suggestions, report issues, or leave workflow notes. Your input shapes how this system improves.
          </p>
        </div>

        {/* Submit Form */}
        <section className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-[var(--border-subtle)]">
            <h2 className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.3em] mb-6">Submit New Feedback</h2>
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mb-4 shadow-lg shadow-emerald-500/10">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-lg font-black text-[var(--text-primary)]">Got it!</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Your feedback has been recorded. The team will review it shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Category</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(prev => ({ ...prev, category: e.target.value as FeedbackItem["category"] }))}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-black text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                    >
                      <option value="Suggestion">Suggestion</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Workflow Note">Workflow Note</option>
                      <option value="Question">Question</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Related Job ID (Optional)</label>
                    <input
                      type="text"
                      value={form.relatedJobId}
                      onChange={e => setForm(prev => ({ ...prev, relatedJobId: e.target.value }))}
                      placeholder="e.g. 1234 Market St"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-black text-white placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Subject</label>
                    <input
                      required
                      type="text"
                      value={form.subject}
                      onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="One sentence — what's this about?"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-black text-white placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Details</label>
                    <textarea
                      required
                      rows={5}
                      value={form.details}
                      onChange={e => setForm(prev => ({ ...prev, details: e.target.value }))}
                      placeholder="Give as much detail as you can. Specific examples are most helpful."
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl px-4 py-3 text-xs font-medium text-[var(--text-secondary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-all resize-none"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting || !form.subject || !form.details}
                      className="px-8 py-3.5 bg-[var(--accent)] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--accent)]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
                    >
                      {submitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Submission History */}
        <section className="space-y-6">
          <h2 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] flex items-center gap-3">
            Submission History
            {loading && <Clock size={10} className="animate-spin" />}
          </h2>

          <div className="space-y-4">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 space-y-4 animate-pulse">
                  <div className="flex justify-between">
                    <div className="w-24 h-4 bg-white/5 rounded" />
                    <div className="w-16 h-4 bg-white/5 rounded" />
                  </div>
                  <div className="w-3/4 h-6 bg-white/5 rounded" />
                  <div className="w-full h-12 bg-white/5 rounded" />
                </div>
              ))
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl border-dashed">
                <MessageSquare size={32} className="text-[var(--text-muted)] mb-4 opacity-20" />
                <p className="text-sm font-bold text-[var(--text-primary)]">No feedback submitted yet</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Use the form above to share a suggestion or report an issue.</p>
              </div>
            ) : (
              items.map((item, i) => (
                <motion.div
                  key={item.rowIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden hover:border-[var(--accent)]/30 transition-all group"
                >
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${getCategoryStyles(item.category)}`}>
                          {item.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusStyles(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-tighter opacity-40">
                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {item.subject}
                      </h3>
                      {item.relatedJobId && (
                        <p className="text-[9px] font-black text-[var(--accent)] uppercase tracking-widest opacity-60">
                          Job: {item.relatedJobId}
                        </p>
                      )}
                    </div>

                    <div 
                      className={`text-xs font-medium text-[var(--text-secondary)] leading-relaxed cursor-pointer ${expandedId === item.rowIndex ? "" : "line-clamp-3"}`}
                      onClick={() => setExpandedId(expandedId === item.rowIndex ? null : item.rowIndex)}
                    >
                      {item.details}
                    </div>

                    {item.adminNotes && !isManagement && (
                      <div className="mt-4 px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-white/5">
                        <p className="text-[9px] font-black text-[var(--accent)]/60 uppercase tracking-widest mb-1">Team Response</p>
                        <p className="text-xs text-[var(--text-primary)] font-medium italic">{item.adminNotes}</p>
                      </div>
                    )}

                    {isManagement && (
                      <AdminControlPanel item={item} onUpdate={handleUpdateStatus} />
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </motion.div>
    </DashboardLayout>
  );
}

function AdminControlPanel({ item, onUpdate }: { item: FeedbackItem, onUpdate: (item: FeedbackItem, status: string, notes: string) => Promise<void> }) {
  const [status, setStatus] = useState(item.status);
  const [notes, setNotes] = useState(item.adminNotes || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(item, status, notes);
    setSaving(false);
  };

  const hasChanged = status !== item.status || notes !== (item.adminNotes || "");

  return (
    <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Update Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as FeedbackItem["status"])}
            className="w-full bg-[var(--bg-primary)] border border-white/10 rounded-xl px-3 py-2 text-[10px] font-black text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
          >
            <option value="New">New</option>
            <option value="Reviewed">Reviewed</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="flex items-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving || !hasChanged}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-black text-white uppercase tracking-widest transition-all disabled:opacity-20 flex items-center gap-2"
          >
            <Save size={12} className={saving ? "animate-spin" : ""} />
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Admin Notes</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="E.g. Fixed in v2.4, or Great suggestion - adding to backlog."
          rows={2}
          className="w-full bg-[var(--bg-primary)] border border-white/10 rounded-xl p-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)]/40 resize-none transition-all"
        />
      </div>
    </div>
  );
}

