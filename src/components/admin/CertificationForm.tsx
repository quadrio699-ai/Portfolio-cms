"use client";

import { useActionState } from "react";
import type { Certification } from "@/lib/types";
import type { SimpleFormState } from "@/actions/experience";
import { FieldLabel, inputClass, SaveButton } from "@/components/admin/ui";

export function CertificationForm({
  entry,
  action,
}: {
  entry?: Certification;
  action: (
    state: SimpleFormState,
    formData: FormData
  ) => Promise<SimpleFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <FieldLabel>Certification name</FieldLabel>
        <input
          name="name"
          required
          defaultValue={entry?.name}
          className={inputClass}
          placeholder="AWS Certified Cloud Practitioner"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Issuer</FieldLabel>
          <input
            name="issuer"
            defaultValue={entry?.issuer ?? ""}
            className={inputClass}
            placeholder="Amazon Web Services"
          />
        </div>
        <div>
          <FieldLabel>Issue date</FieldLabel>
          <input
            name="issue_date"
            type="date"
            defaultValue={entry?.issue_date ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <FieldLabel>Credential URL</FieldLabel>
        <input
          name="credential_url"
          type="url"
          defaultValue={entry?.credential_url ?? ""}
          className={inputClass}
          placeholder="https://…"
        />
      </div>

      <div>
        <FieldLabel>Sort order</FieldLabel>
        <input
          name="sort_order"
          type="number"
          defaultValue={entry?.sort_order ?? 0}
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
