import { NextResponse } from "next/server";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";
type CorsOpts = { origins: string[]; methods: readonly HttpMethod[]; maxAge?: number };

function isAllowedOrigin(origin: string | null, list: string[]) {
  if (!origin) return false;
  return list.includes(origin);
}
function setCorsHeaders(res: Response, origin: string, opts: CorsOpts) {
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Methods", opts.methods.join(", "));
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  if (opts.maxAge) res.headers.set("Access-Control-Max-Age", String(opts.maxAge));
  return res;
}

// ——— rate limit naive in-memory (sviluppo). In prod usa Redis/Upstash.
const BUCKET = new Map<string, { resetAt: number; count: number }>();
async function applyRateLimit(req: Request, windowSec = 60, max = 60) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `ip:${ip}`;
  const now = Date.now();
  const row = BUCKET.get(key);
  if (!row || row.resetAt <= now) {
    BUCKET.set(key, { resetAt: now + windowSec * 1000, count: 1 });
    return { ok: true as const };
  }
  if (row.count >= max) {
    return { ok: false as const, retryAfter: Math.ceil((row.resetAt - now) / 1000) };
  }
  row.count++;
  return { ok: true as const };
}

export async function guard(
  req: Request,
  opts: {
    methods: HttpMethod[];
    cors: CorsOpts;
    rateLimit?: { windowSec: number; max: number };
  }
) {
  const method = req.method.toUpperCase() as HttpMethod;
  const origin = req.headers.get("origin");

  // Metodo non permesso
  if (!opts.methods.includes(method)) {
    const res = NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    res.headers.set("Allow", opts.methods.join(", "));
    return { stop: true as const, res };
  }

  // Preflight
  if (method === "OPTIONS") {
    if (!isAllowedOrigin(origin, opts.cors.origins)) {
      return {
        stop: true as const,
        res: NextResponse.json({ error: "CORS forbidden" }, { status: 403 }),
      };
    }
    const res = new Response(null, { status: 204 });
    return { stop: true as const, res: setCorsHeaders(res, origin!, opts.cors) };
  }

  // CORS per richiesta normale dal browser
  // (Se Origin manca → è una richiesta non-CORS: la lasciamo passare)
  if (origin && !isAllowedOrigin(origin, opts.cors.origins)) {
    return {
      stop: true as const,
      res: NextResponse.json({ error: "CORS forbidden" }, { status: 403 }),
    };
  }

  // Rate limit (se attivo)
  if (opts.rateLimit) {
    const rl = await applyRateLimit(req, opts.rateLimit.windowSec, opts.rateLimit.max);
    if (!rl.ok) {
      const res = NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
      if (rl.retryAfter) res.headers.set("Retry-After", String(rl.retryAfter));
      return { stop: true as const, res };
    }
  }

  // helper per aggiungere CORS alla risposta finale (solo se l'Origin c'è)
  const withCors = <T extends Response>(res: T) =>
    origin ? setCorsHeaders(res, origin, opts.cors) : res;

  return { stop: false as const, withCors };
}
