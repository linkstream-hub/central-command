"use client";

import { Phone, MessageSquare, Navigation, Calendar as CalendarIcon, PhoneCall } from "lucide-react";
import { TechStatus } from "@/lib/dashboard-api";
import { Job } from "@/lib/types";
import { motion } from "framer-motion";

interface TechCardProps {
  tech: TechStatus;
  todayJobs: Job[];
  index: number;
  onClick: (tech: TechStatus) => void;
}

export default function TechCard({ tech, todayJobs, index, onClick }: TechCardProps) {
  const isOnJob = tech.status === 'active';
  const onBreak = tech.status === 'on-break';
  const isScheduled = tech.status === 'scheduled';
  const isViolation = tech.violations && tech.violations.length > 0;

  // Compute primary skills to display (lowest score is best)
  const skills = tech.skills || {};
  const topSkills = Object.entries(skills)
    .filter(([_, score]) => score !== null && score !== undefined && score > 0)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3); // top 3 skills

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onClick(tech)}
      className={`relative flex flex-col p-5 rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 group ${
        isViolation ? 'border-urgent/50 bg-urgent/10' : 'bg-[var(--bg-surface)]/80 backdrop-blur-md border-white/10 hover:border-white/20'
      }`}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/0 via-[var(--accent)]/0 to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header Profile */}
      <div className="flex items-start justify-between relative z-10 mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-transform duration-300 group-hover:scale-105 shadow-inner ${
              isOnJob ? 'bg-standard/20 text-standard shadow-standard/20' :
              onBreak ? 'bg-pte/20 text-pte shadow-pte/20' :
              isScheduled ? 'bg-amber-500/20 text-amber-400 shadow-amber-500/20' :
              'bg-white/5 text-[var(--text-muted)] shadow-white/5'
            }`}>
              {(tech.techName || "T N").split(' ').map(n => n[0]).join('')}
            </div>
            {/* Status Indicator Dot */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--bg-surface)] ${
              isOnJob ? 'bg-standard animate-pulse' : onBreak ? 'bg-pte' : isScheduled ? 'bg-amber-400' : 'bg-gray-500'
            }`} />
          </div>

          <div>
            <h3 className="text-base font-black text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent)] transition-colors">
              {tech.techName}
            </h3>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mt-0.5">
              {tech.rank && tech.rank !== '0' ? `${tech.rank} · ` : ''}{tech.role || 'TECHNICIAN'}
            </p>
            {tech.phone && (
              <div className="flex items-center space-x-1.5 mt-1.5 text-[var(--text-secondary)]">
                <Phone size={10} />
                <span className="text-[11px] tracking-wide font-mono">{tech.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Status Strip */}
      <div className="mb-4">
        <div className={`px-3 py-2 rounded-xl border flex items-center justify-between ${
          isOnJob ? 'bg-standard/10 border-standard/20' :
          onBreak ? 'bg-pte/10 border-pte/20' :
          isScheduled ? 'bg-amber-500/10 border-amber-500/20' :
          'bg-white/5 border-white/5'
        }`}>
          <div className="flex items-center space-x-2 truncate">
            <Navigation size={12} className={isOnJob ? 'text-standard' : onBreak ? 'text-pte' : isScheduled ? 'text-amber-400' : 'text-gray-500'} />
            <span className={`text-xs font-bold truncate uppercase tracking-wide ${
              isOnJob ? 'text-standard' : onBreak ? 'text-pte' : isScheduled ? 'text-amber-400' : 'text-gray-500'
            }`}>
              {isOnJob && tech.currentAddress ? `ACTIVE · ${tech.currentAddress}` :
               isOnJob ? 'ACTIVE · EN ROUTE' :
               onBreak ? 'ON MEAL BREAK' :
               isScheduled ? 'SCHEDULED TODAY' : 'UNASSIGNED'}
            </span>
          </div>
          {isOnJob && tech.elapsedMin && tech.elapsedMin > 0 && (
             <span className="text-[10px] font-mono text-standard">{tech.elapsedMin}m</span>
          )}
        </div>
      </div>

      {/* Skills Badges */}
      <div className="flex flex-wrap gap-1.5 mb-5 h-[24px] overflow-hidden">
        {topSkills.length > 0 ? topSkills.map(([skill, grade]) => (
          <div key={skill} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-1.5">
            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">{skill}</span>
            <div className="flex space-x-0.5">
              {/* Visual representation of the grade: 1 is best (filled), higher is worse */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-sm ${i < (6 - grade) ? 'bg-[var(--accent)]' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        )) : (
          <div className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 flex items-center">
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">General Maintenance</span>
          </div>
        )}
      </div>

      {/* Today's Timeline Inline */}
      <div className="flex-1 bg-black/20 rounded-xl p-3 border border-white/5 mb-4">
        <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 flex items-center justify-between">
          <span>Today&apos;s Schedule</span>
          <span>{todayJobs.length} Jobs</span>
        </h4>
        <div className="space-y-2">
          {todayJobs.length > 0 ? todayJobs.map((job, idx) => (
            <div key={job.jobId || idx} className="flex items-start space-x-3 group/job">
              <div className="w-10 text-right shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-[var(--accent)] font-mono">{job.scheduledTime || 'TBD'}</span>
              </div>
              <div className="w-[1px] h-full bg-white/10 shrink-0 relative">
                <div className="absolute top-1 -left-[3px] w-1.5 h-1.5 rounded-full bg-white/20 group-hover/job:bg-[var(--accent)] transition-colors" />
              </div>
              <div className="flex-1 min-w-0 pb-2 border-b border-white/5 last:border-0 last:pb-0">
                <p className="text-[11px] font-semibold text-[var(--text-primary)] truncate">{job.address}</p>
                <p className="text-[9px] text-[var(--text-muted)] uppercase mt-0.5 tracking-wider truncate">{job.serviceCategory} · {job.estimatedHours}h</p>
              </div>
            </div>
          )) : (
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider text-center py-2 opacity-50">
              No assignments today
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-auto grid grid-cols-3 gap-2">
        <button className="flex items-center justify-center space-x-1.5 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[var(--text-secondary)] hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); if (tech.phone) window.location.href=`tel:${tech.phone}`; }}>
          <PhoneCall size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </button>
        <button className="flex items-center justify-center space-x-1.5 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[var(--text-secondary)] hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); if (tech.phone) window.location.href=`sms:${tech.phone}`; }}>
          <MessageSquare size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Msg</span>
        </button>
        <button className="flex items-center justify-center space-x-1.5 py-2 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg transition-colors">
          <CalendarIcon size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Full</span>
        </button>
      </div>

      {/* Status Edge Highlight */}
      <div className={`absolute top-0 bottom-0 left-0 w-1 ${
        isOnJob ? 'bg-standard' : onBreak ? 'bg-pte' : isScheduled ? 'bg-amber-400' : 'bg-transparent'
      }`} />
    </motion.div>
  );
}
