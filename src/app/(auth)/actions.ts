"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// 🆕 NEW: stato tipizzato per useFormState
export type AuthState = { ok: boolean; message?: string };

// ✨ CHANGED: firma (prevState, formData) e ritorno AuthState
export async function signInWithEmailPassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/dashboard");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  // ✨ CHANGED: in caso di errore, ritorna uno state (niente redirect)
  if (error) return { ok: false, message: error.message };

  // ✨ CHANGED: in caso di successo, fai redirect (non torna mai)
  redirect(next);
}

export async function signUpWithEmailPassword(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = "/dashboard";

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return { ok: false, message: error.message };
  redirect(next);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
