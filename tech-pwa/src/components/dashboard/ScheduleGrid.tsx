import type { Job } from '@/lib/types';
import { TechRow } from './TechRow';

export interface WeekTech {
  techId: string;
  techName: string;
  badge: string;
  rank: string;
}

interface ScheduleGridProps {
  techs: WeekTech[];
  byTech: Record<string, Record<string, Job[]>>;
  selectedDate: string;
  viewMode: 'day' | 'week';
  onJobClick?: (job: Job) => void;
}

function getWeekDates(startDateStr: string): string[] {
  const dates: string[] = [];
  // Ensure we are working with local/provided date strings, simplest is just adding days
  // since weekStart is a Monday YYYY-MM-DD
  for (let i = 0; i < 5; i++) {
    const d = new Date(startDateStr);
    d.setDate(d.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    dates.push(`${yyyy}-${mm}-${dd}`);
  }
  return dates;
}

export function ScheduleGrid({ techs, byTech, selectedDate, viewMode, onJobClick }: ScheduleGridProps) {
  if (techs.length === 0) {
    return (
      <div className="space-y-4">
        <div className="h-16 bg-slate-800/50 rounded animate-pulse" />
        <div className="h-16 bg-slate-800/50 rounded animate-pulse" />
        <div className="h-16 bg-slate-800/50 rounded animate-pulse" />
      </div>
    );
  }

  // Calculate week dates if in week mode. We assume selectedDate is the weekStart (Monday) or we derive it.
  // The plan states weekStart is computed in page.tsx and we can just derive 5 days from it. 
  // Let's assume selectedDate here acts as the weekStart when in week mode, or we just generate 5 days starting from Monday of that week.
  // Actually, standard is to use selectedDate to find Monday.
  const d = new Date(selectedDate);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  const mondayStr = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
  
  const weekDates = viewMode === 'week' ? getWeekDates(mondayStr) : [];

  return (
    <div className="flex flex-col">
      {viewMode === 'week' && (
        <div className="flex border-b border-[var(--border-subtle)] pb-2 mb-2">
          <div className="w-36 flex-shrink-0 pr-4 mr-4" />
          <div className="flex-1 flex">
            {weekDates.map(date => (
              <div key={date} className="flex-1 text-center text-xs font-medium text-[var(--text-muted)]">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' })}
              </div>
            ))}
          </div>
        </div>
      )}

      {techs.map((tech) => {
        if (viewMode === 'day') {
          const jobs = byTech[tech.techName]?.[selectedDate] || [];
          return (
            <TechRow 
              key={tech.techId} 
              techName={tech.techName} 
              rank={tech.rank} 
              jobs={jobs} 
              onJobClick={onJobClick} 
            />
          );
        } else {
          return (
            <div key={tech.techId} data-testid="tech-row" className="flex border-b border-[var(--border-subtle)] py-3">
              <div className="w-36 flex-shrink-0 flex flex-col items-center justify-center border-r border-[var(--border-subtle)] pr-4 mr-4">
                <div className="text-sm font-medium text-[var(--text-primary)] text-center w-full truncate">
                  {tech.techName}
                </div>
                <div className="text-xs text-[var(--text-muted)] text-center w-full truncate mt-0.5">
                  {tech.rank}
                </div>
              </div>
              <div className="flex-1 flex">
                {weekDates.map(date => {
                  const dayJobs = byTech[tech.techName]?.[date] || [];
                  return (
                    <div key={date} className="flex-1 flex flex-col items-center justify-center border-r border-[var(--border-subtle)] last:border-0 px-1">
                      {dayJobs.length > 0 ? (
                        <div className="bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded-full font-variant-numeric tabular-nums">
                          {dayJobs.length} jobs
                        </div>
                      ) : (
                        <span className="text-slate-600 text-xs">-</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
