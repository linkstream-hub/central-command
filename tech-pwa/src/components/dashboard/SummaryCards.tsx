"use client";

import { motion } from "framer-motion";
import type { DashboardStats } from "@/lib/types";
import { Clock, CheckCircle2, Calendar, ShieldAlert, Sparkles } from "lucide-react";

export type StatFilter = 'urgent' | 'needs-action' | 'pte-pending' | 'scheduled-today' | 'completed-week' | null;

interface SummaryCardsProps {
  stats: DashboardStats;
  activeFilter: StatFilter;
  onCardClick: (f: StatFilter) => void;
}

export default function SummaryCards({ stats, activeFilter, onCardClick }: SummaryCardsProps) {
  const cards = [
    { 
      label: "New Leads", 
      count: stats.urgentCount, 
      icon: Sparkles, 
      severity: "bg-[#3b82f6]", // Electric Blue
      filter: 'urgent' as StatFilter
    },
    { 
      label: "Blocked", 
      count: stats.needsActionCount, 
      icon: ShieldAlert, 
      severity: "bg-urgent", // Red
      filter: 'needs-action' as StatFilter
    },
    { 
      label: "Ready to Dispatch", 
      count: stats.ptePendingCount, 
      icon: Clock, 
      severity: "bg-pte", // Amber
      filter: 'pte-pending' as StatFilter
    },
    { 
      label: "Active Today", 
      count: stats.todayScheduledCount, 
      icon: Calendar, 
      severity: "bg-turnover", // Purple/Pink
      filter: 'scheduled-today' as StatFilter
    },
    { 
      label: "Completed Today", 
      count: stats.doneThisWeekCount, 
      icon: CheckCircle2, 
      severity: "bg-standard", // Slate/Teal
      filter: 'completed-week' as StatFilter
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onCardClick(card.filter)}
          className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group shadow-xl ${
            activeFilter === card.filter && card.filter
              ? 'ring-2 ring-[var(--accent)] border-[var(--accent)] scale-[1.02]'
              : 'border-[var(--border-subtle)] hover:border-white/20 hover:bg-[#162032] hover:-translate-y-1'
          }`}
        >
          {/* Subtle Glow Background based on severity color */}
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${card.severity} blur-[60px] opacity-10 group-hover:opacity-20 transition-all`} />

          <div className="flex flex-col space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-xl bg-white/5 border border-white/5 shadow-inner`}>
                <card.icon size={18} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
              </div>
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-black text-white tracking-tighter drop-shadow-md"
              >
                {card.count}
              </motion.span>
            </div>
            
            <div className="pt-1">
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] group-hover:text-[var(--text-secondary)] transition-colors">
                {card.label}
              </p>
            </div>
          </div>
          
          {/* Premium Bottom Bar Line */}
          <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${card.severity} opacity-70 group-hover:opacity-100 transition-opacity`} />
        </motion.div>
      ))}
    </div>
  );
}
