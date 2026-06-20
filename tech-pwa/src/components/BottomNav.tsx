import { Briefcase, Clock } from '@phosphor-icons/react';
import Link from 'next/link';

interface BottomNavProps {
  activeTab?: 'jobs' | 'hours';
}

export default function BottomNav({ activeTab = 'jobs' }: BottomNavProps) {
  const navItems = [
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/jobs' },
    { id: 'hours', label: 'Hours', icon: Clock, href: '/hours' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center z-40">
      {navItems.map((item) => {
        const isActive = item.id === activeTab;
        const Icon = item.icon;
        const colorClass = isActive ? 'text-amber-500' : 'text-slate-500';

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors duration-200 ${colorClass}`}
          >
            <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
