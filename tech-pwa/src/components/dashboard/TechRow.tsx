import type { Job } from '@/lib/types';
import { JobChip } from './JobChip';

interface TechRowProps {
  techName: string;
  rank?: string;
  jobs: Job[];
  onJobClick?: (job: Job) => void;
}

function getInitials(name: string) {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function TechRow({ techName, rank, jobs, onJobClick }: TechRowProps) {
  return (
    <div data-testid="tech-row" className="flex border-b border-[var(--border-subtle)] py-3">
      <div className="w-36 flex-shrink-0 flex flex-col items-center justify-center border-r border-[var(--border-subtle)] pr-4 mr-4">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold text-white mb-2">
          {getInitials(techName)}
        </div>
        <div className="text-sm font-medium text-[var(--text-primary)] text-center w-full truncate">
          {techName}
        </div>
        {rank && (
          <div className="text-xs text-[var(--text-muted)] text-center w-full truncate mt-0.5">
            {rank}
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-wrap gap-2 items-center">
        {jobs.length === 0 ? (
          <div className="text-slate-600 italic text-sm">No jobs scheduled</div>
        ) : (
          jobs.map(job => (
            <JobChip key={job.jobId} job={job} onClick={onJobClick} />
          ))
        )}
      </div>
    </div>
  );
}
