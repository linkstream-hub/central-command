"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { hasAccess, defaultRoute } from "@/lib/permissions";

// Tech-only routes use localStorage session (handled by their own layouts)
const TECH_ROUTES = ['/jobs', '/job'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
const isTechRoute = TECH_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));

  useEffect(() => {
    if (isTechRoute) return; // Tech routes handle their own auth
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Authenticated but no permissions = not in Staff Roster
    if (!session?.permissions) {
      router.push('/login?error=AccessDenied');
      return;
    }

    if (!hasAccess(session.permissions, pathname)) {
      router.push(defaultRoute(session.permissions));
    }
  }, [pathname, status, session, router, isTechRoute]);

  if (isTechRoute) return <>{children}</>;
  if (status === 'loading') return (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] animate-pulse">Checking Permissions...</span>
      </div>
    </div>
  );
  if (status === 'unauthenticated') return null;
  if (!session?.permissions) return null;
  if (!hasAccess(session.permissions, pathname)) return null;

  return <>{children}</>;
}
