export function SkeletonCard() {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-4 animate-pulse space-y-3">
      <div className="h-4 bg-[var(--border-subtle)] rounded w-3/4" />
      <div className="h-3 bg-[var(--border-subtle)] rounded w-1/2" />
      <div className="h-3 bg-[var(--border-subtle)] rounded w-1/3" />
    </div>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`bg-[var(--border-subtle)] rounded animate-pulse ${className ?? ""}`} />;
}
