import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  // Only act on root path — all other routes pass through unchanged
  if (pathname !== '/') return NextResponse.next();

  if (hostname.startsWith('dispatch.')) {
    return NextResponse.redirect(new URL('/live', request.url));
  }

  if (hostname.startsWith('clock.')) {
    return NextResponse.redirect(new URL('/jobs', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
