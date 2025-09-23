"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpWithEmailPassword, type AuthState } from "@/app/(auth)/actions";

import { Button } from "@/components/ui/button";

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

  return (
    <form action={formAction} className="space-y-4">
      {!state.ok && state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full rounded border p-2"
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        className="w-full rounded border p-2"
      />

      <SubmitButton />
    </form>
  );
}
