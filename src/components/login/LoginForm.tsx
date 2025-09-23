"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signInWithEmailPassword, type AuthState } from "@/app/(auth)/actions";

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

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useFormState(signInWithEmailPassword, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {!state.ok && state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <input type="hidden" name="next" value={next} />
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
