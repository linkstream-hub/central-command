import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateNavigationProps {
  selectedDate: string;
  viewMode: 'day' | 'week';
  onDateChange: (date: string) => void;
  onViewModeChange: (mode: 'day' | 'week') => void;
}

export function DateNavigation({ selectedDate, viewMode, onDateChange, onViewModeChange }: DateNavigationProps) {
  const handlePrev = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - (viewMode === 'week' ? 7 : 1));
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onDateChange(`${yyyy}-${mm}-${dd}`);
  };

  const handleNext = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + (viewMode === 'week' ? 7 : 1));
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onDateChange(`${yyyy}-${mm}-${dd}`);
  };

  const handleToday = () => {
    // Pacific time "today"
    const now = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const d = new Date(now);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onDateChange(`${yyyy}-${mm}-${dd}`);
  };

  const d = new Date(selectedDate);
  const formattedDate = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-1 border border-[var(--border-subtle)]">
      <div className="flex items-center">
        <button 
          onClick={handlePrev}
          className="p-1.5 rounded-md hover:bg-slate-700/50 transition-all duration-200 text-[var(--text-muted)] hover:text-white"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="w-32 text-center text-sm font-medium text-[var(--text-primary)]">
          {formattedDate}
        </div>
        <button 
          onClick={handleNext}
          className="p-1.5 rounded-md hover:bg-slate-700/50 transition-all duration-200 text-[var(--text-muted)] hover:text-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <button 
        onClick={handleToday}
        className="px-3 py-1 text-sm rounded-md hover:bg-slate-700/50 transition-all duration-200 text-[var(--text-muted)] hover:text-white border-l border-[var(--border-subtle)]"
      >
        Today
      </button>

      <div className="flex items-center bg-slate-900/50 rounded-md p-0.5 border-l border-[var(--border-subtle)]">
        <button 
          onClick={() => onViewModeChange('day')}
          className={`px-3 py-1 text-xs font-medium rounded-sm transition-all duration-200 ${viewMode === 'day' ? 'bg-amber-500/20 text-amber-400' : 'text-[var(--text-muted)] hover:text-white'}`}
        >
          Day
        </button>
        <button 
          onClick={() => onViewModeChange('week')}
          className={`px-3 py-1 text-xs font-medium rounded-sm transition-all duration-200 ${viewMode === 'week' ? 'bg-amber-500/20 text-amber-400' : 'text-[var(--text-muted)] hover:text-white'}`}
        >
          Week
        </button>
      </div>
    </div>
  );
}
