"use client";

import { useActionState, useEffect, useRef } from "react";
import { createSkill } from "@/actions/skills";
import { inputClass } from "@/components/admin/ui";

export function SkillAddForm() {
  const [state, formAction, pending] = useActionState(createSkill, {
    error: null,
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !state.error) {
      formRef.current?.reset();
    }
  }, [pending, state.error]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mb-8 flex flex-wrap items-end gap-3 rounded-lg border border-line bg-paper p-4"
    >
      <div className="flex-1 min-w-[160px]">
        <label className="mb-1.5 block text-sm font-medium text-ink/70">
          Skill
        </label>
        <input
          name="name"
          required
          placeholder="TypeScript"
          className={inputClass}
        />
      </div>
      <div className="flex-1 min-w-[160px]">
        <label className="mb-1.5 block text-sm font-medium text-ink/70">
          Category
        </label>
        <input
          name="category"
          placeholder="Languages, Frameworks, Tools…"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-paper hover:bg-signal/90 disabled:opacity-60"
      >
        {pending ? "Adding…" : "Add skill"}
      </button>
      {state.error && (
        <p className="w-full text-sm text-signal" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
