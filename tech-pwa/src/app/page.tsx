"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
import { useSession } from "next-auth/react";

import { useTranslation } from "@/lib/i18n";

/**
 * Smart Root Index
 * Redirects users to their respective mission dashboard based on role.
 */
export default function IndexPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: nextSession, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    const localSession = getSession();

    // 1. Prioritize local session (Tech PWA)
    if (localSession) {
      if (localSession.role === "tech") {
        router.replace("/jobs");
      } else {
        router.replace("/live");
      }
      return;
    }

    // 2. Fallback to NextAuth session (Dispatch/Admin)
    if (nextSession) {
      router.replace("/live");
      return;
    }

    // 3. No session found
    try {
      router.replace("/login");
    } catch {
      window.location.replace("/login");
    }
  }, [router, nextSession, status]);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <p className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase animate-pulse">
          {t('loading')}
        </p>
      </div>
    </div>
  );
}
