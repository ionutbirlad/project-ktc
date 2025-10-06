"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import { signUpSchema, signInSchema } from "@/lib/validation/auth/auth";
import { zodToAuthErrorsSignUp, zodToAuthErrorsSignin } from "@/lib/validation/auth/helpers";
import { type AuthState } from "@/lib/validation/auth/types";

export async function signInWithEmailPassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  let data: { email: string; password: string; next: string };

  try {
    // 1) Read data from the form
    data = {
      email: String(formData.get("email") || "").trim(),
      password: String(formData.get("password") || ""),
      next: String(formData.get("next") || "/dashboard"),
    };

    // 2) Validate with Zod (source of truth)
    const parsed = signInSchema.safeParse(data);
    if (!parsed.success) {
      return {
        ok: false,
        message: "Correggi gli errori e riprova.",
        ...zodToAuthErrorsSignin(parsed.error),
      };
    }

    // 3) Sign in with Supabase
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) return { ok: false, message: error.message };
  } catch (e) {
    // 4) Unexpected errors fallback
    console.error("[signUpWithEmailPassword] Unexpected error:", e);
    return {
      ok: false,
      message: "Si è verificato un errore inatteso. Riprova più tardi.",
    };
  }

  // 5) Go further
  redirect(data.next);
}

export async function signUpWithEmailPassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    // 1) Read data from the form
    const data = {
      email: String(formData.get("email") || "").trim(),
      password: String(formData.get("password") || ""),
      confirmPassword: String(formData.get("confirmPassword") || ""),
      next: "/dashboard",
    };

    // 2) Validate with Zod (source of truth)
    const parsed = signUpSchema.safeParse(data);
    if (!parsed.success) {
      return {
        ok: false,
        message: "Correggi gli errori e riprova.",
        ...zodToAuthErrorsSignUp(parsed.error),
      };
    }

    // 3) Sign up with Supabase
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({ email: data.email, password: data.password });
    if (error) return { ok: false, message: error.message };

    // 4) Go further
    redirect(data.next);
  } catch (e) {
    // 5) Unexpected errors fallback
    console.error("[signUpWithEmailPassword] Unexpected error:", e);
    return {
      ok: false,
      message: "Si è verificato un errore inatteso. Riprova più tardi.",
    };
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
