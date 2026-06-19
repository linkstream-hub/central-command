'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <h2 className="text-xl font-black text-white tracking-tight">Something went wrong</h2>
          <p className="text-sm text-gray-400">The error has been reported automatically.</p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
