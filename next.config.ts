import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const cspProd = [
  "default-src 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https: data:",
  "script-src 'self'", // niente inline/eval in prod
  "style-src 'self' 'unsafe-inline'", // valutare nonce più avanti
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const cspDev = [
  "default-src 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https: data:",
  // in dev servono inline + eval + blob per HMR e overlay React
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' http://localhost:* ws://localhost:* https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: isProd ? cspProd : cspDev },
        ],
      },
    ];
  },
};

export default nextConfig;
