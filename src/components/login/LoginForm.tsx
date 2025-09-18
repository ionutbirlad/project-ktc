// 🆕 NEW: app/(auth)/login/LoginForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signInWithEmailPassword, type AuthState } from "@/app/(auth)/actions";

const initialState: AuthState = { ok: true };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="w-full rounded bg-black text-white py-2" disabled={pending}>
      {pending ? "Invio..." : "Entra"}
    </button>
  );
}

export function LoginForm({ next }: { next: string }) {
  // ✨ CHANGED (rispetto a prima): ottieni formAction da useFormState
  const [state, formAction] = useFormState(signInWithEmailPassword, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* 🆕 NEW: messaggio d'errore inline */}
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
