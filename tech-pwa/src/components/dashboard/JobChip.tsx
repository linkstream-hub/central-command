import type { Job } from '@/lib/types';

interface JobChipProps {
  job: Job;
  onClick?: (job: Job) => void;
}

export function JobChip({ job, onClick }: JobChipProps) {
  let colorClasses = 'bg-slate-700/50 text-slate-300';

  if (job.priority === '1-URGENT') {
    colorClasses = 'bg-red-500/20 text-red-400';
  } else if (job.priority === '2-TURNOVER') {
    colorClasses = 'bg-orange-500/20 text-orange-400';
  } else if (job.priority === '3-PTE-PENDING') {
    colorClasses = 'bg-yellow-500/20 text-yellow-400';
  } else if (job.priority === '4-STANDARD' || job.status === 'Scheduled') {
    colorClasses = 'bg-blue-500/20 text-blue-400';
  } else if (!job.assignedTech) {
    colorClasses = 'bg-slate-800/50 text-slate-500';
  }

  const truncatedAddress = job.address.length > 28
    ? job.address.slice(0, 28) + '...'
    : job.address;

  return (
    <div
      onClick={() => onClick?.(job)}
      className={`rounded-full px-3 py-1 text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-[1.02] ${colorClasses}`}
    >
      <span className="font-variant-numeric tabular-nums mr-1 opacity-75">{job.jobId}</span>
      {truncatedAddress}
    </div>
  );
}
