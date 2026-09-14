"use client";

import { useActionState } from "react";
import type { Experience } from "@/lib/types";
import type { SimpleFormState } from "@/actions/experience";
import { FieldLabel, inputClass, SaveButton } from "@/components/admin/ui";

export function ExperienceForm({
  entry,
  action,
}: {
  entry?: Experience;
  action: (
    state: SimpleFormState,
    formData: FormData
  ) => Promise<SimpleFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Role</FieldLabel>
          <input
            name="role"
            required
            defaultValue={entry?.role}
            className={inputClass}
            placeholder="Backend Developer"
          />
        </div>
        <div>
          <FieldLabel>Organization</FieldLabel>
          <input
            name="organization"
            required
            defaultValue={entry?.organization}
            className={inputClass}
            placeholder="Company or project name"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Location</FieldLabel>
        <input
          name="location"
          defaultValue={entry?.location ?? ""}
          className={inputClass}
          placeholder="Lagos, Nigeria (or Remote)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Start date</FieldLabel>
          <input
            name="start_date"
            type="date"
            defaultValue={entry?.start_date ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>End date</FieldLabel>
          <input
            name="end_date"
            type="date"
            defaultValue={entry?.end_date ?? ""}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-ink/40">Leave blank if current.</p>
        </div>
      </div>

      <div>
        <FieldLabel>Description</FieldLabel>
        <textarea
          name="description"
          rows={4}
          defaultValue={entry?.description}
          className={inputClass}
          placeholder="What you did, and what came of it."
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
