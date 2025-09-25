"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import { z } from "zod";
import { signUpSchema, type SignUpInput } from "@/lib/validation/auth";

export type FieldErrors = Partial<Record<"email" | "password" | "confirmPassword", string>>;

export type AuthState = {
  ok: boolean;
  message?: string;
  formErrors?: string[]; // "global" form errors
  fieldErrors?: FieldErrors; // field specific errors
};

export async function signInWithEmailPassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    // 1) Read data from the form
    const data = {
      email: String(formData.get("email") || "").trim(),
      password: String(formData.get("password") || ""),
      next: String(formData.get("next") || "/dashboard"),
    };

    // 2) Validate with Zod (source of truth)
    const parsed = signUpSchema.safeParse(data);
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

// HELPERS

// Helper: map Zod errors (Sign Up) -> AuthState.fieldErrors / formErrors
function zodToAuthErrorsSignUp(err: z.ZodError): Pick<AuthState, "fieldErrors" | "formErrors"> {
  const { formErrors, fieldErrors } = z.flattenError(err) as z.ZodFlattenedError<
    SignUpInput,
    string
  >;
  // Get the first message for every field (if present)
  const fe: FieldErrors = {
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
    confirmPassword: fieldErrors.confirmPassword?.[0],
  };
  return { fieldErrors: fe, formErrors };
}

// Helper: map Zod errors (Sign In) -> AuthState.fieldErrors / formErrors
function zodToAuthErrorsSignin(err: z.ZodError): Pick<AuthState, "fieldErrors" | "formErrors"> {
  const { formErrors, fieldErrors } = z.flattenError(err) as z.ZodFlattenedError<
    SignUpInput,
    string
  >;
  // Get the first message for every field (if present)
  const fe: FieldErrors = {
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
  };
  return { fieldErrors: fe, formErrors };
}
