import { z } from "zod";

import { type SignUpInput, type SignInInput } from "@/lib/validation/auth/auth";
import { type FieldErrors, type AuthState } from "@/lib/validation/auth/types";

// Helper: map Zod errors (Sign Up) -> AuthState.fieldErrors / formErrors
export function zodToAuthErrorsSignUp(
  err: z.ZodError
): Required<Pick<AuthState, "fieldErrors" | "formErrors">> {
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
export function zodToAuthErrorsSignin(
  err: z.ZodError
): Required<Pick<AuthState, "fieldErrors" | "formErrors">> {
  const { formErrors, fieldErrors } = z.flattenError(err) as z.ZodFlattenedError<
    SignInInput,
    string
  >;
  // Get the first message for every field (if present)
  const fe: FieldErrors = {
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
  };
  return { fieldErrors: fe, formErrors };
}
