/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { dashboardRequest } from "@/lib/dashboard-api";
import { ShieldCheck, AlertCircle, Clock, User, AlertTriangle, CheckCircle2, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

interface TimeRecord {
  techName: string;
  clockIn: string | null;
  clockOut: string | null;
  clockedOut: boolean;
  elapsedMin: number;
  workedMin: number;
  breakMin: number;
  actualHrs: number;
  status: 'OK' | 'AT_RISK' | 'VIOLATION' | 'CRITICAL';
  violations: string[];
  recordStatus: 'active' | 'on-break' | 'complete';
}

interface ComplianceData {
  date: string;
  atRiskCount: number;
  records: TimeRecord[];
  thresholds: {
    restMin: number;
    mealMin: number;
    secondMealMin: number;
  };
}

export default function CompliancePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ComplianceData | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await dashboardRequest<any>('getComplianceStatus');
      if (res.success) {
        setData(res.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const records = data?.records || [];
  const violationCount = records.filter((r) => r.violations && r.violations.length > 0).length;

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic flex items-center gap-2">
              <ShieldCheck className="text-scheduled" />
              Compliance <span className="text-[var(--accent)]">Audit</span>
            </h2>
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">
              Wage & Hour Monitoring â€” {data?.date || new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="h-24 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)]" />
            <div className="h-96 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)]" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Tool Bar */}
            <div className="flex flex-wrap gap-4">
               <div className="glass-panel px-6 py-4 rounded-xl border border-[var(--border-subtle)] flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-urgent/10 flex items-center justify-center text-urgent border border-urgent/20">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block">At-Risk Cases</span>
                    <span className="text-xl font-black text-[var(--text-primary)]">{data?.atRiskCount || 0}</span>
                  </div>
               </div>

               <div className="glass-panel px-6 py-4 rounded-xl border border-[var(--border-subtle)] flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-urgent/20 flex items-center justify-center text-urgent border border-urgent/30 animate-pulse">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block">Violations Detected</span>
                    <span className="text-xl font-black text-[var(--text-primary)]">{violationCount}</span>
                  </div>
               </div>

               <div className="glass-panel px-6 py-4 rounded-xl border border-[var(--border-subtle)] flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-scheduled/10 flex items-center justify-center text-scheduled border border-scheduled/20">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block">Total Records</span>
                    <span className="text-xl font-black text-[var(--text-primary)]">{records.length}</span>
                  </div>
               </div>
            </div>

            {/* Roster Compliance Detail */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
               <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-[0.2em]">Live Compliance Roster</h3>
                  <div className="flex items-center space-x-4">
                     <span className="flex items-center space-x-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-scheduled" />
                        <span className="text-[8px] font-black text-[var(--text-muted)] uppercase">OK</span>
                     </span>
                     <span className="flex items-center space-x-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-pte" />
                        <span className="text-[8px] font-black text-[var(--text-muted)] uppercase">At-Risk</span>
                     </span>
                     <span className="flex items-center space-x-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-urgent" />
                        <span className="text-[8px] font-black text-[var(--text-muted)] uppercase">Violation / Critical</span>
                     </span>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  {records.length === 0 ? (
                    <div className="p-20 flex flex-col items-center justify-center opacity-30">
                      <Clock size={48} className="mb-4" />
                      <p className="text-sm font-black uppercase tracking-[0.2em]">No active time records for today</p>
                    </div>
                  ) : (
                    <table className="w-full border-collapse">
                      <thead>
                         <tr className="bg-[var(--bg-primary)]/50">
                            <th className="p-4 text-left border-b border-[var(--border-subtle)] px-8">
                               <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Technician</span>
                            </th>
                            <th className="p-4 text-center border-b border-[var(--border-subtle)]">
                               <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Clock In</span>
                            </th>
                            <th className="p-4 text-center border-b border-[var(--border-subtle)]">
                               <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Elapsed Hrs</span>
                            </th>
                            <th className="p-4 text-center border-b border-[var(--border-subtle)]">
                               <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Break Taken</span>
                            </th>
                            <th className="p-4 text-center border-b border-[var(--border-subtle)]">
                               <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Status</span>
                            </th>
                            <th className="p-4 text-left border-b border-[var(--border-subtle)] px-8">
                               <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Alerts / Violations</span>
                            </th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-subtle)]">
                         {records.map((record, i) => (
                            <motion.tr 
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="group hover:bg-[var(--bg-primary)] transition-colors"
                            >
                               <td className="p-4 px-8">
                                  <div className="flex items-center space-x-3">
                                     <div className="w-8 h-8 rounded-lg bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)] font-black text-[10px] border border-[var(--border-subtle)] shadow-inner">
                                        {record.techName.split(' ').map((n) => n[0]).join('')}
                                     </div>
                                     <span className="text-xs font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">{record.techName}</span>
                                  </div>
                               </td>
                               <td className="p-4 text-center">
                                  <span className="text-xs font-bold text-[var(--text-primary)]">{record.clockIn || '--'}</span>
                               </td>
                               <td className="p-4 text-center">
                                  <span className="text-xs font-bold text-[var(--text-secondary)]">{record.actualHrs?.toFixed(1) || (record.elapsedMin ? (record.elapsedMin / 60).toFixed(1) : '0.0')}h</span>
                               </td>
                               <td className="p-4 text-center">
                                  <span className={`text-xs font-bold ${record.breakMin < 30 && record.elapsedMin > 300 ? 'text-urgent' : 'text-[var(--text-muted)]'}`}>
                                     {record.breakMin || 0}m
                                  </span>
                               </td>
                               <td className="p-4 text-center">
                                  <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                     record.status === 'OK' ? 'bg-scheduled/10 text-scheduled border-scheduled/20' :
                                     record.status === 'AT_RISK' ? 'bg-pte/10 text-pte border-pte/20' :
                                     'bg-urgent/10 text-urgent border-urgent/20'
                                  }`}>
                                     {record.status}
                                  </span>
                               </td>
                               <td className="p-4 px-8">
                                  <div className="flex flex-wrap gap-2">
                                     {record.violations && record.violations.length > 0 ? (
                                       record.violations.map((v, idx) => (
                                         <span key={idx} className="bg-urgent/10 text-urgent text-[8px] font-black uppercase px-2 py-0.5 rounded border border-urgent/20">
                                           {v.replace(/_/g, ' ')}
                                         </span>
                                       ))
                                     ) : (
                                       <span className="text-[9px] text-[var(--text-muted)] font-bold tracking-widest uppercase">No Violations</span>
                                      )}
                                  </div>
                               </td>
                            </motion.tr>
                         ))}
                      </tbody>
                    </table>
                   )}
               </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

