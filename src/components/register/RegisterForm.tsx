"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { signUpWithEmailPassword } from "@/app/(auth)/actions";

import { Button } from "@/components/ui/button";

import { type AuthState } from "@/lib/validation/auth/types";
import { signUpSchema } from "@/lib/validation/auth/auth";
import { zodToAuthErrorsSignUp } from "@/lib/validation/auth/helpers";

import { useZodValidation } from "@/hooks/useZodValidation";

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

  const {
    isValid: isFormValid,
    getFieldError,
    setTouched,
  } = useZodValidation(signUpSchema, formValues, zodToAuthErrorsSignUp, {
    delay: 300,
    serverErrors: state.ok ? {} : (state.fieldErrors ?? {}),
    confirmPairs: [["password", "confirmPassword"]],
  });

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
          aria-invalid={Boolean(getFieldError("email"))}
          aria-describedby="email-error"
          onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
          onBlur={() => setTouched("email")}
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
          aria-invalid={Boolean(getFieldError("password"))}
          aria-describedby="password-error"
          onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
          onBlur={() => setTouched("password")}
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
          aria-invalid={Boolean(getFieldError("confirmPassword"))}
          aria-describedby="confirmPassword-error"
          onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
          onBlur={() => setTouched("confirmPassword")}
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
