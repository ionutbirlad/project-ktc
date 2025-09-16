import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_ROUTES = ["/", "/blog", "/site", "/auth/callback"]; // aggiungi le tue
const AUTH_PAGES = ["/login", "/signup"];
const PROTECTED_PREFIXES = ["/dashboard", "/account", "/settings"]; // adatta ai tuoi percorsi
const ADMIN_PREFIX = "/admin"; // opzionale

export const config = {
  matcher: [
    // escludi asset/statici
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|woff|woff2|ttf|otf)).*)",
  ],
};

export async function middleware(req: NextRequest) {
  console.log("asdasdas");
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const isAuthPage = AUTH_PAGES.includes(pathname);
  const isPublic = PUBLIC_ROUTES.some((p) => pathname === p || pathname.startsWith(p + "/"));

  // Pagine pubbliche (tranne /login e /signup): nessun check, esci subito
  if (isPublic && !isAuthPage) return res;

  // Da qui in poi ci serve sapere se c'è un utente
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Legge TUTTI i cookie della request
        getAll() {
          return req.cookies.getAll().map((c) => ({ name: c.name, value: c.value }));
        },
        // Imposta una lista di cookie sulla response
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // options può essere undefined
            res.cookies.set({ name, value, ...(options ?? {}) });
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  const isAdminPath = pathname === ADMIN_PREFIX || pathname.startsWith(ADMIN_PREFIX + "/");

  // Gate per aree protette / admin
  if (!user && (isProtected || isAdminPath)) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // (Opzionale) RBAC admin: app_metadata.roles = ['admin']
  if (isAdminPath) {
    const roles = (user?.app_metadata?.roles as string[]) ?? [];
    if (!roles.includes("admin")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Utente loggato che visita /login o /signup → portalo alla dashboard
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}
