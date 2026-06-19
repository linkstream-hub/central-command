"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Receipt, TrendingUp, Clock, CheckCircle } from "lucide-react";

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
            BILLING <span className="text-[var(--accent)]">& AR</span>
          </h2>
          <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
            Completed workorders · Invoicing · QuickBooks integration
          </p>
        </div>

        {/* Stub KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Pending Invoice', value: '—', icon: Clock },
            { label: 'Invoiced This Month', value: '—', icon: Receipt },
            { label: 'Collected This Month', value: '—', icon: TrendingUp },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between glass-panel">
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-[var(--accent)] opacity-60" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{label}</span>
              </div>
              <span className="text-xl font-black text-[var(--text-muted)] opacity-30">{value}</span>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div className="bg-[var(--bg-surface)]/20 border border-white/5 rounded-3xl p-16 flex flex-col items-center justify-center gap-4 glass-panel">
          <CheckCircle size={40} className="text-[var(--accent)] opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-40 text-center">
            QuickBooks integration · Phase 3
          </p>
          <p className="text-[9px] text-[var(--text-muted)] opacity-25 uppercase tracking-widest text-center max-w-xs">
            Job close-out → QB invoice auto-creation ships in Phase 3 Finance module
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
