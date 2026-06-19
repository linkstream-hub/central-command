"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Zap, 
  Calendar, 
  Users, 
  Receipt, 
  Scale, 
  BarChart3, 
  LogOut,
  CalendarDays,
  HeartHandshake,
  Pin,
  PinOff,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSession, signOut } from "next-auth/react";
import type { StaffPermissions } from "@/lib/permissions";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { id: 'live',            label: 'Dashboard',                   icon: Zap,             href: '/live',            module: 'dispatch'  as keyof StaffPermissions },
  { id: 'jobs',            label: 'Weekly Schedule',             icon: Receipt,         href: '/weekly-schedule', module: 'dispatch'  as keyof StaffPermissions },
  { id: 'team',            label: 'Techs',                       icon: Users,           href: '/team',            module: 'people'    as keyof StaffPermissions },
];

export default function AppSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(true);
  const pathname = usePathname();
  const { data: session } = useSession();
  const perms = session?.permissions;

  const [weather, setWeather] = useState<{ temp: number; city: string } | null>(null);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        if (data?.current?.temperature_2m) {
          setWeather({ temp: Math.round(data.current.temperature_2m), city: data.city || 'Local' });
        }
      } catch (err) {}
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
        () => fetchWeather(37.8313, -122.2852) // Fallback to Emeryville
      );
    } else {
      fetchWeather(37.8313, -122.2852);
    }
  }, []);

  const activeExpanded = isExpanded || isPinned;
  
  const visibleItems = NAV_ITEMS.filter(item => {
    if (!perms) return false;
    if (perms.admin) return true;
    return perms[item.module] === true;
  });

  const displayName = session?.staffName ?? session?.user?.name ?? 'Staff';

  return (
    <motion.aside
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      animate={{ width: activeExpanded ? 220 : 64 }}
      className={cn(
        "fixed left-0 top-0 h-screen z-50 bg-[#09090b] border-r border-zinc-800 flex flex-col items-center py-6 px-3 lg:static shadow-[4px_0_24px_rgba(0,0,0,0.4)]",
        activeExpanded ? "items-start" : "items-center"
      )}
    >
      {/* Brand Logo */}
      <div className={cn("mb-10 flex items-center h-12 px-2", activeExpanded ? "w-full justify-between" : "justify-center")}>
        <div className="flex items-center">
          <AnimatePresence mode="wait">
            {activeExpanded ? (
              <motion.div 
                key="logo-expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <Image
                  src="https://aptmaintenanceinc.com/wp-content/uploads/2024/05/apt-logo.webp"
                  alt="APT Maintenance Inc."
                  width={160}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
                <span className="text-[var(--text-muted)] text-[8px] font-black uppercase tracking-[0.3em] mt-1 whitespace-nowrap">Central Command</span>
              </motion.div>
            ) : (
              <motion.div 
                key="logo-collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Image
                  src="https://aptmaintenanceinc.com/wp-content/uploads/2024/05/apt-logo.webp"
                  alt="APT"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {activeExpanded && (
          <button 
            onClick={() => setIsPinned(!isPinned)}
            title={isPinned ? 'Unpin sidebar' : 'Pin sidebar open'}
            className={`p-1.5 rounded-md transition-colors ${
              isPinned
                ? 'text-[var(--accent)] hover:bg-[var(--accent)]/10'
                : 'text-[var(--text-muted)] hover:bg-white/5'
            }`}
          >
            {isPinned ? <Pin size={15} /> : <PinOff size={15} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full space-y-2">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.id} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                  "group relative flex items-center h-11 px-3 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden",
                  isActive 
                    ? "bg-zinc-800/80 text-[var(--accent)] shadow-inner" 
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40"
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[var(--accent)] rounded-r-full"
                  />
                )}
                
                <item.icon 
                  size={activeExpanded ? 18 : 22} 
                  className={cn(
                    "flex-shrink-0 transition-all",
                    isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                  )} 
                />
                
                <AnimatePresence mode="wait">
                  {activeExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={cn(
                        "ml-3 text-[11px] font-bold tracking-wider uppercase whitespace-nowrap",
                        isActive ? "text-zinc-100" : "text-zinc-400 group-hover:text-zinc-100"
                      )}
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="w-full space-y-4">
        <div 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className={cn(
          "flex items-center px-3 py-2 rounded-lg text-urgent/70 hover:text-urgent hover:bg-urgent/10 transition-all cursor-pointer",
          activeExpanded ? "w-full" : "justify-center"
        )}>
          <LogOut size={activeExpanded ? 18 : 22} />
          {activeExpanded && <span className="ml-3 text-xs font-bold uppercase tracking-wider">Sign Out</span>}
        </div>

        {/* Weather Widget */}
        {activeExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 flex flex-col space-y-1 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-yellow-500/20 blur-xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{weather?.city ?? 'Local Weather'}</span>
              <span className="text-lg font-bold text-white">{weather?.temp ?? '--'}°</span>
            </div>
          </motion.div>
        )}

        {/* User Card */}
        {activeExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-white/5 rounded-xl border border-[var(--border-subtle)] flex items-center space-x-3 overflow-hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-xs shrink-0">
              {displayName[0] || 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[var(--text-primary)] font-black truncate tracking-tight uppercase leading-none">
                {displayName}
              </p>
              <p className="text-[8px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
                {perms?.admin ? 'Administrator' : 'Staff Member'}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
