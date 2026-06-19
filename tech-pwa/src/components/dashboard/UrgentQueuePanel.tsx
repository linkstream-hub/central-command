import type { Job } from '@/lib/types';
import { JobChip } from './JobChip';

interface UrgentQueuePanelProps {
  jobs: Job[];
}

export function UrgentQueuePanel({ jobs }: UrgentQueuePanelProps) {
  return (
    <div className="w-64 flex-shrink-0 border-l border-[var(--border-subtle)] flex flex-col bg-[var(--bg-surface)]">
      <div className="p-4 border-b border-[var(--border-subtle)]">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
          Urgent Queue
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {jobs.length === 0 ? (
          <div className="text-slate-600 italic text-sm text-center mt-4">
            No urgent items
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.jobId} className="flex flex-col gap-1 items-start">
              <JobChip job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
