"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { signUpWithEmailPassword } from "@/app/(auth)/actions";

import { Button } from "@/components/ui/button";

import { type AuthState, type FieldErrors } from "@/lib/validation/auth/types";
import { signUpSchema } from "@/lib/validation/auth/auth";
import { zodToAuthErrorsSignUp } from "@/lib/validation/auth/helpers";

const initialState: AuthState = { ok: true };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending}>
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
  const [hasInteracted, setHasInteracted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((v) => ({ ...v, [name]: value }));
    if (!hasInteracted) setHasInteracted(true);
  }

  useEffect(() => {
    if (!hasInteracted) return; // 👈 avoid validation on first page load
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
  }, [formValues, hasInteracted]);

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
          // onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
          onChange={handleChange}
        />
        {!state.ok && state.fieldErrors?.email && (
          <p className="text-sm text-red-600">{state.fieldErrors?.email}</p>
        )}

        {formErrors.email && <p className="text-sm text-red-600">{formErrors.email}</p>}
      </div>
      <div className="mb-5">
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          autoComplete="new-password"
          className="w-full rounded border p-2 m-0"
          onChange={handleChange}
        />
        {!state.ok && state.fieldErrors?.password && (
          <p className="text-sm text-red-600">{state.fieldErrors?.password}</p>
        )}

        {formErrors.password && <p className="text-sm text-red-600">{formErrors.password}</p>}
      </div>
      <div className="mb-5">
        <input
          name="confirmPassword"
          type="password"
          required
          placeholder="Conferma password"
          autoComplete="new-password"
          className="w-full rounded border p-2 m-0"
          onChange={handleChange}
        />
        {!state.ok && state.fieldErrors?.confirmPassword && (
          <p className="text-sm text-red-600">{state.fieldErrors?.confirmPassword}</p>
        )}

        {formErrors.confirmPassword && (
          <p className="text-sm text-red-600">{formErrors.confirmPassword}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
