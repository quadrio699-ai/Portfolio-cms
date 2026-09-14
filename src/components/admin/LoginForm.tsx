"use client";

import { useActionState } from "react";
import { signIn } from "@/actions/auth";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(signIn, { error: null });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="block text-sm text-paper/70 mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-paper/15 bg-ink-soft px-3 py-2.5 text-paper placeholder:text-paper/30 focus:border-circuit-soft"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm text-paper/70 mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-paper/15 bg-ink-soft px-3 py-2.5 text-paper placeholder:text-paper/30 focus:border-circuit-soft"
          placeholder="••••••••"
        />
      </div>

      {state.error && (
        <p className="text-sm text-signal-soft" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-signal py-2.5 font-medium text-ink transition-colors hover:bg-signal-soft disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
