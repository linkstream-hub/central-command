"use client";

import { useEffect, useState, use } from "react";
import { Navigation, CheckCircle, Info } from "lucide-react";
import { Job } from "@/lib/types";

/**
 * PUBLIC Tenant Live Tracker Page (CC2.0 Phase 3)
 * No authentication required for viewing.
 */
export default function TenantTrackPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracking() {
      try {
        // In CC2.0, we would have a dedicated public endpoint.
        // For now, we mock the tracking data based on the Job ID.
        // Fetching from DashboardAPI (if public access is enabled or if we create a public shim).
        const response = await fetch(`/api/public/track?jobId=${jobId}`);
        const data = await response.json();
        if (data.success) {
          setJob(data.job);
        }
      } catch (e) {
        console.warn("Failed to fetch live tracking:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchTracking();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
        <p className="text-xs font-black text-white uppercase tracking-widest animate-pulse">Initializing Live Link...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Info size={48} className="text-white/20" />
        <p className="text-sm font-black text-white uppercase tracking-widest">Link Expired or Invalid</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6 md:p-12 space-y-12">
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="px-4 py-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full text-[10px] font-black text-[var(--accent)] uppercase tracking-widest">
          APT Resident Services
        </div>
        <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">
          Live <span className="text-[var(--accent)]">Maintenance</span> Tracker
        </h1>
        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">
          Tracking Order #{job.jobId}
        </p>
      </header>

      <main className="max-w-xl mx-auto space-y-6">
        {/* Status Card */}
        <div className="bg-[var(--bg-surface)] border border-white/5 rounded-3xl p-10 space-y-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              job.status === 'In Progress' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
            }`} />
            <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{job.status}</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">Service Item</p>
            <p className="text-xl font-black text-white uppercase tracking-tight italic">{job.serviceCategory}</p>
          </div>

          <div className="h-[1px] bg-white/5 w-full" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--accent)]">
                <Navigation size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">ETA</span>
                <span className="text-lg font-black text-white uppercase tracking-tighter">Calculating...</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Technician</span>
                <span className="text-lg font-black text-white uppercase tracking-tighter">{job.assignedTech?.split(' ')[0] || 'Pending'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="p-8 space-y-8">
           {[
             { label: 'Dispatch Received', done: true },
             { label: 'Technician Assigned', done: !!job.assignedTech },
             { label: 'Commencing Work', done: job.status === 'In Progress' },
             { label: 'Job Finalized', done: job.status === 'Complete' },
           ].map((step, i) => (
             <div key={i} className={`flex items-center gap-6 ${step.done ? 'opacity-100' : 'opacity-20'}`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${step.done ? 'bg-[var(--accent)] text-white' : 'bg-white/10 text-white'}`}>
                   {step.done ? <CheckCircle size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{step.label}</span>
             </div>
           ))}
        </div>
      </main>

      <footer className="pt-20 text-center opacity-30">
        <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
          Secured by APT WhiteJesus Protocols
        </p>
      </footer>
    </div>
  );
}
