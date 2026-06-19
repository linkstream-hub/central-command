"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { setSession } from "@/lib/auth";
import { TechLoginView } from '@/components/TechLoginView';

function detectMode(): 'dispatch' | 'tech' | 'both' {
  if (typeof window === 'undefined') return 'both';
  const host = window.location.hostname;
  if ((host.startsWith('dispatch.') || host.includes('.vercel.app')) && !window.location.search.includes('tech=1')) return 'dispatch';
  if (host.startsWith('clock.')) return 'tech';
  return 'both';
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'dispatch' | 'tech' | 'both'>('both');
  const [badgeId, setBadgeId] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMode(detectMode());
      setSearchParams(new URLSearchParams(window.location.search));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchParams?.get('tech') === '1') setMode('tech');
  }, [searchParams]);

  // Show error from next-auth callback (e.g., email not in Staff Roster)
  const authError = searchParams?.get('error');
  const accessDenied = searchParams?.get('error') === 'AccessDenied';

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/live' });
  };

  const handleTechLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/field/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badge: badgeId, pin }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setSession({
          token: data.token,
          techId: data.techId,
          employeeId: data.employeeId?.toString(),
          techName: data.techName,
          role: data.role ?? 'tech',
          expiresAt: data.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });
        router.push(data.requiresPinChange ? '/change-pin' : '/jobs');
      } else {
        setError('Invalid badge number or PIN.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'tech') {
    return (
      <TechLoginView
        badgeId={badgeId}
        pin={pin}
        loading={loading}
        error={error}
        onBadgeChange={setBadgeId}
        onPinChange={setPin}
        onSubmit={handleTechLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <Image src="https://aptmaintenanceinc.com/wp-content/uploads/2024/05/apt-logo.webp" alt="APT Maintenance" width={64} height={64} className="rounded-xl object-contain" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">APT Central Command</h1>
        </div>

        {/* Google OAuth — for dispatch/office staff */}
        {(mode === 'dispatch' || mode === 'both') && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Office Staff</h2>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">Sign in with your APT Google account</p>
            </div>

            {accessDenied && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                Your Google account is not authorized. Contact Brandon to be added to the Staff Roster.
              </div>
            )}
            {authError && !accessDenied && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                Sign-in failed. Please try again.
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-60"
            >
              {googleLoading ? (
                <span className="text-sm">Redirecting...</span>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            {(process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') && (mode === 'dispatch' || mode === 'both') && (
              <button
                onClick={() => signIn('dev-bypass', { callbackUrl: '/live' })}
                className="w-full mt-3 py-3 rounded-xl border border-dashed border-white/20 text-xs font-black text-[var(--text-muted)] uppercase tracking-widest hover:border-white/40 hover:text-white transition-all"
              >
                Dev Login (Mock Data — Local Only)
              </button>
            )}
          </div>
        )}

        {/* Divider when showing both */}
        {mode === 'both' && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[var(--text-muted)]">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        )}

        {/* Badge + PIN — for field techs (both mode fallback) */}
        {mode === 'both' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Field Staff</h2>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">Enter your badge number and PIN</p>
            </div>

            <form onSubmit={handleTechLogin} className="space-y-3">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Badge Number"
                value={badgeId}
                onChange={e => setBadgeId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                required
              />
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  inputMode="numeric"
                  placeholder="PIN"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] p-1"
                  tabIndex={-1}
                >
                  {showPin ? '🙈' : '👁'}
                </button>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading || !badgeId || !pin}
                className="w-full bg-[var(--accent)] text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
