import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { StaffPermissions } from './lib/permissions';

if (process.env.NODE_ENV === 'test') {
  process.env.NEXTAUTH_URL = 'http://localhost:3010';
  process.env.AUTH_URL = 'http://localhost:3010';
}

async function fetchStaffPermissions(email: string): Promise<StaffPermissions | null> {
  try {
    const apiUrl = process.env.DASHBOARD_API_URL;
    if (!apiUrl) return null;
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'getStaffPermissions', email, apiKey: process.env.DASHBOARD_API_KEY }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('[AUTH] GAS returned non-OK status:', res.status, text.slice(0, 200));
      return null;
    }
    const data = await res.json();
    if (!data.success) console.error('[AUTH] GAS permissions failed:', JSON.stringify(data));
    return data.success ? (data.permissions as StaffPermissions) : null;
  } catch (e) {
    console.error('[AUTH] fetchStaffPermissions threw:', e);
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Dev bypass — active in local dev and Vercel preview environments only
    ...((process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'preview') && process.env.DEV_BYPASS_AUTH === 'true'
      ? [
          Credentials({
            id: 'dev-bypass',
            name: 'Dev Bypass',
            credentials: {},
            async authorize() {
              return { id: 'sandbox-admin', email: 'sandbox@aptmaintenanceinc.com', name: 'Sandbox Admin' };
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (account?.provider === 'dev-bypass') return true;
      const email = profile?.email ?? user?.email;
      return email?.endsWith('@aptmaintenanceinc.com') ?? false;
    },
    async jwt({ token, user, account }) {
      // Sandbox bypass — inject full admin permissions without hitting the API
      if (account?.provider === 'dev-bypass' || user?.email === 'sandbox@aptmaintenanceinc.com') {
        token.permissions = {
          admin: true, dispatch: true, people: true, finance: true, intel: true,
          name: 'Sandbox Admin',
        } as StaffPermissions;
        token.staffName = 'Sandbox Admin';
        return token;
      }
      if (account && user?.email) {
        const perms = await fetchStaffPermissions(user.email);
        token.permissions = perms;
        token.staffName = perms?.name ?? (user as { name?: string }).name ?? user.email;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        permissions: (token.permissions as StaffPermissions | null) ?? null,
        staffName: (token.staffName as string) ?? session.user?.name ?? '',
      };
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
});
