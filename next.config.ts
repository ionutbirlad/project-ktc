import type { NextConfig } from "next";

const vercelEnv = process.env.VERCEL_ENV; // "development" | "preview" | "production"
// const nodeEnv = process.env.NODE_ENV; // "development" | "production" (preview ha comunque "production")

const isProd = vercelEnv === "production";
const isPreview = vercelEnv === "preview";
// const isDev = vercelEnv === "development" || nodeEnv === "development";

const cspProd = [
  "default-src 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https: data:",
  "script-src 'self'", // blocca inline/eval in prod
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const cspPreview = [
  "default-src 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https: data:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:", // consenti inline/eval per script iniettati in preview
  "style-src 'self' 'unsafe-inline'",
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
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:", // necessario per HMR/overlay
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' http://localhost:* ws://localhost:* https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

// SCEGLI LA CSP IN BASE ALL'AMBIENTE
const csp = isProd ? cspProd : isPreview ? cspPreview : cspDev;

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
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
