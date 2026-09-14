"use client";

import { useActionState, useEffect, useRef } from "react";
import { updatePassword } from "@/actions/settings";
import { FieldLabel, inputClass, SaveButton } from "@/components/admin/ui";

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, {
    error: null,
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !state.error) formRef.current?.reset();
  }, [pending, state.error]);

  return (
    <form ref={formRef} action={formAction} className="max-w-sm space-y-4">
      <div>
        <FieldLabel>New password</FieldLabel>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>
      <div>
        <FieldLabel>Confirm new password</FieldLabel>
        <input
          name="confirm"
          type="password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>
      {state.error && (
        <p className="text-sm text-signal" role="alert">
          {state.error}
        </p>
      )}
      <SaveButton pending={pending} />
    </form>
  );
}
