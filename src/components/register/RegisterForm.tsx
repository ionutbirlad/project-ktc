"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { signUpWithEmailPassword } from "@/app/(auth)/actions";

import { Button } from "@/components/ui/button";

import { type AuthState, type FieldErrors } from "@/lib/validation/auth/types";
import { signUpSchema } from "@/lib/validation/auth/auth";
import { zodToAuthErrorsSignUp } from "@/lib/validation/auth/helpers";

const initialState: AuthState = { ok: true };

function SubmitButton({ isFormValid }: { isFormValid: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" disabled={pending || !isFormValid}>
      {pending ? "Invio..." : "Entra"}
    </Button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState(signUpWithEmailPassword, initialState);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const isFormValid = signUpSchema.safeParse(formValues).success;

  // ✅ Show server errors only after a failed submit
  // ✅ Never show client errors if the field is not touched
  // ✅ Confirm password: no messages until both fields are filled
  const getFieldError = (name: "email" | "password" | "confirmPassword") => {
    const server = !state.ok ? state.fieldErrors?.[name] : undefined;
    const client = formErrors[name];

    // If the field is NOT touched, don’t show client errors
    // Show only the server error (if any) after a failed submit
    if (!touched[name]) {
      return server ?? undefined;
    }

    // From here on the field is touched → prefer the fresh client error
    if (name === "confirmPassword" && (!formValues.password || !formValues.confirmPassword)) {
      return undefined;
    }

    return client ?? server ?? undefined;
  };

  useEffect(() => {
    const t = setTimeout(() => {
      const parsed = signUpSchema.safeParse(formValues);
      if (!parsed.success) {
        const { fieldErrors } = zodToAuthErrorsSignUp(parsed.error);
        setFormErrors(fieldErrors);
      } else {
        setFormErrors({});
      }
    }, 300);
    return () => clearTimeout(t);
  }, [formValues]);

  return (
    <form action={formAction} className="space-y-4">
      {!state.ok && state.message && <p className="text-sm text-red-600 m-0">{state.message}</p>}{" "}
      <br />
      {!state.ok && state.formErrors && state.formErrors.length > 0 && (
        <div>
          {state.formErrors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}
      <div className="mb-5">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded border p-2 m-0"
          aria-invalid={!!(formErrors.email || state.fieldErrors?.email)}
          aria-describedby="email-error"
          onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        />
        {getFieldError("email") && (
          <p id="email-error" className="text-sm text-red-600">
            {getFieldError("email")}
          </p>
        )}
      </div>
      <div className="mb-5">
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          autoComplete="new-password"
          className="w-full rounded border p-2 m-0"
          aria-invalid={!!(formErrors.password || state.fieldErrors?.password)}
          aria-describedby="password-error"
          onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        />
        {getFieldError("password") && (
          <p id="password-error" className="text-sm text-red-600">
            {getFieldError("password")}
          </p>
        )}
      </div>
      <div className="mb-5">
        <input
          name="confirmPassword"
          type="password"
          required
          placeholder="Conferma password"
          autoComplete="new-password"
          className="w-full rounded border p-2 m-0"
          aria-invalid={!!(formErrors.confirmPassword || state.fieldErrors?.confirmPassword)}
          aria-describedby="confirmPasword-error"
          onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
        />
        {getFieldError("confirmPassword") && (
          <p id="confirmPassword-error" className="text-sm text-red-600">
            {getFieldError("confirmPassword")}
          </p>
        )}
      </div>
      <SubmitButton isFormValid={isFormValid} />
    </form>
  );
}
