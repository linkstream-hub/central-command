"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { dashboardRequest } from "@/lib/dashboard-api";

const SERVICE_CATEGORIES = [
  'Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'Painting',
  'Landscaping', 'Janitorial', 'Multi-Trade', 'Inspection', 'Other'
];

const PRIORITIES = [
  { value: '1-URGENT', label: 'Urgent' },
  { value: '2-TURNOVER', label: 'Turnover' },
  { value: '3-PTE-PENDING', label: 'PTE Pending' },
  { value: '4-STANDARD', label: 'Standard' },
];

interface ManualJobCreateModalProps {
  techName: string;
  scheduledDate: string;   // ISO YYYY-MM-DD
  scheduledTime: string;   // HH:MM
  onClose: () => void;
  onJobCreated: () => void;
}

export default function ManualJobCreateModal({
  techName, scheduledDate, scheduledTime, onClose, onJobCreated
}: ManualJobCreateModalProps) {
  const [form, setForm] = useState({
    address: '',
    unit: '',
    description: '',
    serviceCategory: 'Plumbing',
    priority: '4-STANDARD',
    tenantName: '',
    tenantPhone: '',
    tenantEmail: '',
    accessInfo: '',
    rmName: '',
    rmEmail: '',
    estHours: 2,
    notes: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(field: string, value: string | number) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.address.trim()) { setError('Address is required.'); return; }
    if (!form.description.trim()) { setError('Description is required.'); return; }
    setError('');
    setSaving(true);
    const res = await dashboardRequest('createManualJob', {
      ...form,
      assignedTech: techName,
      scheduledDate,
      scheduledTime,
    });
    setSaving(false);
    if (res.success) {
      onJobCreated();
      onClose();
    } else {
      setError('Failed to create job. Please try again.');
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
            <div>
              <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">New Job</h2>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                {techName} · {scheduledDate} at {scheduledTime}
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Address */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => set('address', e.target.value)}
                  placeholder="123 Main St"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Unit</label>
                <input
                  type="text"
                  value={form.unit}
                  onChange={e => set('unit', e.target.value)}
                  placeholder="4B"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                />
              </div>
            </div>

            {/* Category + Priority */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Category</label>
                <select
                  value={form.serviceCategory}
                  onChange={e => set('serviceCategory', e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                >
                  {SERVICE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Priority</label>
                <select
                  value={form.priority}
                  onChange={e => set('priority', e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                >
                  {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Description *</label>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Describe the work to be done..."
                rows={3}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none resize-none"
              />
            </div>

            {/* Access Info */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Access / Lockbox Info</label>
              <input
                type="text"
                value={form.accessInfo}
                onChange={e => set('accessInfo', e.target.value)}
                placeholder="Lockbox code, parking, key location..."
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
              />
            </div>

            {/* Tenant */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Tenant</label>
              <div className="grid grid-cols-3 gap-3">
                <input type="text" value={form.tenantName} onChange={e => set('tenantName', e.target.value)} placeholder="Name" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
                <input type="tel" value={form.tenantPhone} onChange={e => set('tenantPhone', e.target.value)} placeholder="Phone" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
                <input type="email" value={form.tenantEmail} onChange={e => set('tenantEmail', e.target.value)} placeholder="Email" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
              </div>
            </div>

            {/* RM + Est Hours */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Property Manager</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={form.rmName} onChange={e => set('rmName', e.target.value)} placeholder="Name" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
                  <input type="email" value={form.rmEmail} onChange={e => set('rmEmail', e.target.value)} placeholder="Email" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Est. Hours</label>
                <select
                  value={form.estHours}
                  onChange={e => set('estHours', Number(e.target.value))}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                >
                  {[1,2,3,4,5,6,7,8].map(h => <option key={h} value={h}>{h}h</option>)}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Internal Notes</label>
              <input
                type="text"
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder="Optional dispatcher notes..."
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
              />
            </div>

            {error && (
              <p className="text-xs font-black text-red-400">{error}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
            >
              <Plus size={12} />
              {saving ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
