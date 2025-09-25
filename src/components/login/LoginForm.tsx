"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signInWithEmailPassword } from "@/app/(auth)/actions";

import { Button } from "@/components/ui/button";

import { type AuthState } from "@/lib/validation/auth/types";

const initialState: AuthState = { ok: true };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" disabled={pending}>
      {pending ? "Invio..." : "Entra"}
    </Button>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useFormState(signInWithEmailPassword, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {!state.ok && state.message && <p className="text-sm text-red-600">{state.message}</p>}
      {!state.ok && state.formErrors && state.formErrors.length > 0 && (
        <div>
          {state.formErrors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      <input type="hidden" name="next" value={next} />
      <div className="mb-5">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded border p-2 m-0"
        />
        {!state.ok && state.fieldErrors?.email && (
          <p className="text-sm text-red-600">{state.fieldErrors?.email}</p>
        )}
      </div>
      <div className="mb-5">
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          autoComplete="current-password"
          className="w-full rounded border p-2 m-0"
        />
        {!state.ok && state.fieldErrors?.password && (
          <p className="text-sm text-red-600">{state.fieldErrors?.password}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
