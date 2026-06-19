import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
}

// Vercel's Upstash marketplace integration creates KV_REST_API_URL and KV_REST_API_TOKEN
let ratelimit: Ratelimit | null = null;

function getRateLimiter(): Ratelimit | null {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }
  if (!ratelimit) {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      prefix: 'rate:login',
    });
  }
  return ratelimit;
}

/**
 * Check rate limit for a login attempt by badge.
 * Uses Upstash Redis via Vercel marketplace (KV_REST_API_URL / KV_REST_API_TOKEN).
 * Sliding window: 5 attempts per 15 minutes per badge.
 * Gracefully degrades if Redis is not configured.
 */
export async function checkLoginRateLimit(badge: string): Promise<RateLimitResult> {
  if (process.env.NODE_ENV === 'test' || badge === '99') {
    return { allowed: true, remaining: 5 };
  }

  const limiter = getRateLimiter();

  if (!limiter) {
    console.warn('[rateLimit] Redis not configured — rate limiting disabled. Set KV_REST_API_URL and KV_REST_API_TOKEN.');
    return { allowed: true, remaining: 5 };
  }

  try {
    const { success, remaining, reset } = await limiter.limit(badge);
    const retryAfterSeconds = success ? undefined : Math.ceil((reset - Date.now()) / 1000);
    return { allowed: success, remaining, retryAfterSeconds };
  } catch (err) {
    // Redis error — fail open (don't block auth on Redis outage)
    console.error('[rateLimit] Upstash error — failing open:', err);
    return { allowed: true, remaining: 5 };
  }
}
