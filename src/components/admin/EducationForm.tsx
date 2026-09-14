"use client";

import { useActionState } from "react";
import type { Education } from "@/lib/types";
import type { SimpleFormState } from "@/actions/experience";
import { FieldLabel, inputClass, SaveButton } from "@/components/admin/ui";

export function EducationForm({
  entry,
  action,
}: {
  entry?: Education;
  action: (
    state: SimpleFormState,
    formData: FormData
  ) => Promise<SimpleFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <FieldLabel>School</FieldLabel>
        <input
          name="school"
          required
          defaultValue={entry?.school}
          className={inputClass}
          placeholder="Lagos State University"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Degree</FieldLabel>
          <input
            name="degree"
            defaultValue={entry?.degree ?? ""}
            className={inputClass}
            placeholder="B.Sc."
          />
        </div>
        <div>
          <FieldLabel>Field of study</FieldLabel>
          <input
            name="field_of_study"
            defaultValue={entry?.field_of_study ?? ""}
            className={inputClass}
            placeholder="Physics Education"
          />
        </div>
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
          <p className="mt-1 text-xs text-ink/40">Leave blank if ongoing.</p>
        </div>
      </div>

      <div>
        <FieldLabel>Description</FieldLabel>
        <textarea
          name="description"
          rows={3}
          defaultValue={entry?.description}
          className={inputClass}
          placeholder="Notable coursework, activities, honors."
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
