"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, ChevronLeft } from "lucide-react";
import { getSession } from "@/lib/auth";

type TimeRecord = {
  id: string;
  techId: string;
  clockIn: string;
  clockOut: string | null;
  shiftId: string;
  latIn: number | null;
  lngIn: number | null;
  latOut: number | null;
  lngOut: number | null;
  breakMinutes: number;
  address: string | null;
  unit: string | null;
  mealCompliant: boolean;
  restCompliant: boolean;
  attestationSignature: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function MyHoursPage() {
  const router = useRouter();
  const [records, setRecords] = useState<TimeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getSession()) {
      router.replace("/");
      return;
    }
    async function load() {
      try {
        const res = await fetch("/api/field/hours", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("apt_tech_session") ?? ""}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setRecords(data.records || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [router]);

  // Group by week
  const grouped: Record<string, { totalMinutes: number; count: number; records: TimeRecord[] }> = {};

  records.forEach((r) => {
    const d = new Date(r.clockIn);
    // get monday of that week
    const day = d.getDay() || 7; // 1-7
    const diff = d.getDate() - day + 1;
    const monday = new Date(d);
    monday.setDate(diff);
    
    // label formatting
    const label = `Week of ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(monday)}`;
    
    if (!grouped[label]) {
      grouped[label] = { totalMinutes: 0, count: 0, records: [] };
    }
    grouped[label].records.push(r);
    grouped[label].count++;

    if (r.clockOut) {
      const diffMs = new Date(r.clockOut).getTime() - new Date(r.clockIn).getTime();
      const mins = Math.floor(diffMs / 60000) - (r.breakMinutes || 0);
      if (mins > 0) {
        grouped[label].totalMinutes += mins;
      }
    }
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 text-[var(--text-primary)]">
      <header className="px-6 pt-8 pb-6 border-b border-[var(--border-subtle)] flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-surface)]">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-black tracking-tight">My Hours</h1>
      </header>

      <main className="px-6 mt-6 space-y-8">
        {loading ? (
          <div className="flex justify-center p-8 text-[var(--text-muted)]">
            <Clock className="animate-spin" size={24} />
          </div>
        ) : records.length === 0 ? (
          <div className="text-center p-8 text-[var(--text-muted)]">
            No time records found.
          </div>
        ) : (
          Object.entries(grouped).map(([label, group]) => (
            <div key={label} className="space-y-4">
              <div className="flex justify-between items-end border-b border-[var(--border-subtle)] pb-2">
                <div>
                  <h2 className="font-bold text-lg">{label}</h2>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{group.count} shifts</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-xl text-[var(--accent)]">{(group.totalMinutes / 60).toFixed(1)}h</p>
                </div>
              </div>

              <div className="space-y-3">
                {group.records.map((r) => {
                  const dIn = new Date(r.clockIn);
                  const dateStr = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(dIn);
                  const timeIn = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles" }).format(dIn);
                  let timeOut = "In Progress";
                  let actualHours = null;

                  if (r.clockOut) {
                    const dOut = new Date(r.clockOut);
                    timeOut = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles" }).format(dOut);
                    const diffMs = dOut.getTime() - dIn.getTime();
                    const mins = Math.floor(diffMs / 60000) - (r.breakMinutes || 0);
                    actualHours = Math.max(0, mins / 60).toFixed(1) + "h";
                  }

                  return (
                    <div key={r.id} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-4 flex flex-col gap-1">
                      <p className="font-black text-[var(--text-primary)] text-base truncate">
                        {r.address}{r.unit ? ` #${r.unit}` : ""}
                      </p>
                      <div className="flex justify-between items-start">
                        <p className="font-bold">{dateStr}</p>
                        <p className="font-black text-sm">{actualHours || timeOut}</p>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] flex items-center justify-between">
                        <span>{timeIn} → {timeOut !== "In Progress" ? timeOut : ""}</span>
                        {r.breakMinutes > 0 && (
                          <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-md">
                            -{r.breakMinutes}m break
                          </span>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
