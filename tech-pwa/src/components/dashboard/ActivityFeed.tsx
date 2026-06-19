"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Job } from "@/lib/types";
import { TechStatus } from "@/lib/dashboard-api";

interface ActivityFeedProps {
  jobs: Job[];
  techs: TechStatus[];
}

interface ActivityEvent {
  id: string;
  type: 'violation' | 'urgent' | 'clock' | 'stale' | 'generic';
  text: string;
  icon: React.ElementType;
  color: string;
  priority: number; // For sorting
}

export default function ActivityFeed({ jobs, techs }: ActivityFeedProps) {
  const events = useMemo(() => {
    const derived: ActivityEvent[] = [];
    const now = new Date();

    // Priority 0 — CA compliance violations (highest urgency)
    techs.forEach(tech => {
      if (tech.violations && tech.violations.length > 0) {
        derived.push({
          id: `violation-${tech.techId}`,
          type: 'violation',
          text: `VIOLATION — ${tech.techName}: ${tech.violations[0].replace(/_/g, ' ')}`,
          icon: AlertCircle,
          color: "text-urgent",
          priority: 0
        });
      }
      // CA meal threshold warning (>270 min on job = approaching 4.5h without break)
      if (tech.status === 'active' && (tech.minutesWorked ?? 0) > 270) {
        derived.push({
          id: `ca-warn-${tech.techId}`,
          type: 'violation',
          text: `CA RISK — ${tech.techName} approaching meal break threshold`,
          icon: AlertCircle,
          color: "text-urgent",
          priority: 0
        });
      }
    });

    // Priority 1 — Urgent jobs not yet assigned
    jobs.forEach(job => {
      if (job.priority === '1-URGENT' && !job.assignedTech &&
          job.status !== 'Archived' && job.status !== 'Complete') {
        derived.push({
          id: `urgent-${job.jobId}`,
          type: 'urgent',
          text: `URGENT UNASSIGNED — ${job.address}${job.unit ? ` Unit ${job.unit}` : ''}`,
          icon: AlertCircle,
          color: "text-urgent",
          priority: 1
        });
      }
    });

    // Priority 2 — Jobs awaiting approval (blocking scheduling)
    jobs.forEach(job => {
      if (job.status === 'Awaiting Approval') {
        derived.push({
          id: `approval-${job.jobId}`,
          type: 'stale',
          text: `NEEDS APPROVAL — ${job.address}${job.unit ? ` Unit ${job.unit}` : ''}`,
          icon: AlertCircle,
          color: "text-pte",
          priority: 2
        });
      }
    });

    // Priority 3 — Stale jobs (New >48h or Ready to Schedule >72h without assignment)
    jobs.forEach(job => {
      if (!job.timestamp) return;
      const diffHours = (now.getTime() - new Date(job.timestamp).getTime()) / (1000 * 60 * 60);

      if (job.status === 'Needs Review' && diffHours > 48) {
        derived.push({
          id: `stale-new-${job.jobId}`,
          type: 'stale',
          text: `STALE ${Math.floor(diffHours / 24)}d — New: ${job.address}`,
          icon: Clock,
          color: "text-urgent",
          priority: 3
        });
      } else if (job.status === 'Ready to Schedule' && diffHours > 72) {
        derived.push({
          id: `stale-rts-${job.jobId}`,
          type: 'stale',
          text: `STALE ${Math.floor(diffHours / 24)}d — Unscheduled: ${job.address}`,
          icon: Clock,
          color: "text-pte",
          priority: 3
        });
      } else if (job.status === 'PTE Required' && diffHours > 24) {
        derived.push({
          id: `stale-pte-${job.jobId}`,
          type: 'stale',
          text: `PTE PENDING ${Math.floor(diffHours / 24)}d — ${job.address}`,
          icon: Clock,
          color: "text-pte",
          priority: 3
        });
      }
    });

    // If nothing needs attention, show nominal status — do NOT show clock events
    if (derived.length === 0) {
      derived.push({
        id: 'nominal',
        type: 'generic',
        text: "Queue clear — no immediate action required",
        icon: CheckCircle2,
        color: "text-accent",
        priority: 99
      });
    }

    return derived.sort((a, b) => a.priority - b.priority);
  }, [jobs, techs]);

  // If no events, show a default status
  const displayEvents = events.length > 0 ? events : [
    { id: 'default', type: 'generic', text: "Systems Nominal. Monitoring field activity...", icon: CheckCircle2, color: "text-accent", priority: 99 }
  ];

  return (
    <div className="h-10 bg-[var(--bg-primary)]/80 backdrop-blur-md border-t border-[var(--border-subtle)] flex items-center overflow-hidden whitespace-nowrap px-8 relative z-40">
      <div className="flex-shrink-0 mr-8 flex items-center space-x-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] pt-0.5">Live Feed</span>
      </div>

      <motion.div 
        animate={{ x: events.length > 5 ? ["0%", "-50%"] : "0%" }}
        transition={{ 
          duration: Math.max(20, events.length * 5), 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex items-center space-x-12"
      >
        {/* Double entries for smooth marquee loop if there are enough items */}
        {(events.length > 5 ? [...displayEvents, ...displayEvents] : displayEvents).map((event, i) => (
          <div key={`${event.id}-${i}`} className="flex items-center space-x-3 group cursor-pointer hover:opacity-100 transition-opacity opacity-70">
            <event.icon size={12} className={event.color} />
            <span className={`text-[11px] font-bold tracking-tight ${event.type === 'violation' ? 'text-urgent' : 'text-[var(--text-secondary)]'}`}>
              {event.text}
            </span>
            <span className="text-[var(--text-muted)] opacity-20 font-black">·</span>
          </div>
        ))}
      </motion.div>

      {/* Fade Gradients */}
      <div className="absolute inset-y-0 left-32 w-16 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
    </div>
  );
}
