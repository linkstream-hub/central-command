const ALLOWED_ORIGINS = new Set([
  'https://dispatch.aptmaintenanceinc.com',
  'http://localhost:3000',
  'http://localhost:3010',
]);

const GAS_TIMEOUT_MS = 30000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const isAllowedOrigin = ALLOWED_ORIGINS.has(origin);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin, isAllowedOrigin),
      });
    }

    if (request.method !== 'GET' && request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Block unknown origins (allow empty origin for server-to-server calls)
    if (origin && !isAllowedOrigin) {
      return new Response(JSON.stringify({ success: false, error: 'FORBIDDEN' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const gasUrl = env.TECH_PWA_GAS_URL;
    if (!gasUrl) {
      return new Response(JSON.stringify({ success: false, error: 'WORKER_MISCONFIGURED' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let gasRequest;
    if (request.method === 'GET') {
      const incoming = new URL(request.url);
      const target = new URL(gasUrl);
      incoming.searchParams.forEach((val, key) => target.searchParams.set(key, val));
      gasRequest = new Request(target.toString(), {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
    } else {
      const body = await request.text();
      gasRequest = new Request(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body,
      });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), GAS_TIMEOUT_MS);

    let gasResponse;
    try {
      gasResponse = await fetch(gasRequest, { signal: controller.signal });
    } catch (err) {
      clearTimeout(timer);
      const isTimeout = err.name === 'AbortError';
      return new Response(
        JSON.stringify({ success: false, error: isTimeout ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_ERROR' }),
        {
          status: isTimeout ? 504 : 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, isAllowedOrigin) },
        }
      );
    }
    clearTimeout(timer);

    const responseText = await gasResponse.text();
    return new Response(responseText, {
      status: gasResponse.status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(origin, isAllowedOrigin),
      },
    });
  },
};

function corsHeaders(origin, isAllowed) {
  if (!isAllowed || !origin) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}
