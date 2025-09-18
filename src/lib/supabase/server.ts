import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  const cookieStore = await cookies(); // 👈 await needed in Next 15

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Nuova API: batch
        getAll() {
          // Next restituisce già [{ name, value, ... }]
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // In Server Components scrivere cookie può lanciare:
          // per sicurezza wrappa in try/catch, come suggerito in esempi recenti
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // In Next 15 puoi usare l’oggetto
              cookieStore.set({ name, value, ...(options ?? {}) });
            });
          } catch {
            // ok ignorare qui se gestisci refresh nel middleware
          }
        },
      },
    }
  );

  return supabase;
}
