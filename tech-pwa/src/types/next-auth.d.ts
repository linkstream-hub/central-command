import type { StaffPermissions } from '@/lib/permissions';

declare module 'next-auth' {
  interface Session {
    permissions: StaffPermissions | null;
    staffName: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissions?: StaffPermissions | null;
    staffName?: string;
  }
}
