const DASHBOARD_API_URL = 'https://script.google.com/macros/s/AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ/exec';
const RATE_LIMIT = 60;

const ALLOWED_ORIGINS = [
  'https://dispatch.aptmaintenanceinc.com',
  'https://clock.aptmaintenanceinc.com',
  'https://central-command-pi.vercel.app'
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    try {
      // Rate limiting — only if KV namespace is bound
      if (env.RATE_LIMIT_KV) {
        const ip  = request.headers.get('CF-Connecting-IP') || 'unknown';
        const key = `rl:${ip}:${Math.floor(Date.now() / 60000)}`;
        const count = parseInt(await env.RATE_LIMIT_KV.get(key) || '0');
        if (count >= RATE_LIMIT) {
          return new Response(JSON.stringify({ error: 'RATE_LIMITED' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
          });
        }
        await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: 120 });
      }

      // Proxy to Apps Script
      const url       = new URL(request.url);
      const targetUrl = DASHBOARD_API_URL + url.search;
      const bodyText  = request.method !== 'GET' ? await request.text() : undefined;
      const response  = await fetch(targetUrl, {
        method:   request.method,
        headers:  { 'Content-Type': 'text/plain' },
        body:     bodyText,
        redirect: 'follow'
      });

      const body    = await response.text();
      return new Response(body, {
        status:  response.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: 'WORKER_ERROR', message: err.message }), {
        status:  500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
      });
    }
  }
};
