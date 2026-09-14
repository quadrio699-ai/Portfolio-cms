"use client";

import { useActionState } from "react";
import type { Project } from "@/lib/types";
import type { ProjectFormState } from "@/actions/projects";
import { FieldLabel, inputClass, SaveButton } from "@/components/admin/ui";
import { publicStorageUrl } from "@/lib/supabase/storage";

export function ProjectForm({
  project,
  action,
}: {
  project?: Project;
  action: (
    state: ProjectFormState,
    formData: FormData
  ) => Promise<ProjectFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <FieldLabel>Name</FieldLabel>
        <input
          name="name"
          required
          defaultValue={project?.name}
          className={inputClass}
          placeholder="CampusLine"
        />
      </div>

      <div>
        <FieldLabel>Description</FieldLabel>
        <textarea
          name="description"
          rows={4}
          defaultValue={project?.description}
          className={inputClass}
          placeholder="What it does, who it's for, and what makes it interesting."
        />
      </div>

      <div>
        <FieldLabel>Technologies</FieldLabel>
        <input
          name="technologies"
          defaultValue={project?.technologies?.join(", ")}
          className={inputClass}
          placeholder="Next.js, Supabase, Tailwind — comma separated"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Status</FieldLabel>
          <select
            name="status"
            defaultValue={project?.status ?? "live"}
            className={inputClass}
          >
            <option value="live">Live</option>
            <option value="in_progress">In progress</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <FieldLabel>Sort order</FieldLabel>
          <input
            name="sort_order"
            type="number"
            defaultValue={project?.sort_order ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Live project URL</FieldLabel>
          <input
            name="project_url"
            type="url"
            defaultValue={project?.project_url ?? ""}
            className={inputClass}
            placeholder="https://…"
          />
        </div>
        <div>
          <FieldLabel>Source / GitHub URL</FieldLabel>
          <input
            name="source_url"
            type="url"
            defaultValue={project?.source_url ?? ""}
            className={inputClass}
            placeholder="https://github.com/…"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Image</FieldLabel>
        {project?.image_path && (
          <img
            src={publicStorageUrl("media", project.image_path)}
            alt=""
            className="mb-2 h-32 w-full rounded-md border border-line object-cover"
          />
        )}
        <input
          name="image"
          type="file"
          accept="image/*"
          className="w-full text-sm text-ink/70 file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:text-paper"
        />
        <p className="mt-1 text-xs text-ink/40">
          {project?.image_path
            ? "Upload a new file to replace the current image."
            : "Optional — shown as the project thumbnail."}
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="h-4 w-4 rounded border-line text-signal focus:ring-circuit"
        />
        Feature this project near the top
      </label>

      {state.error && (
        <p className="text-sm text-signal" role="alert">
          {state.error}
        </p>
      )}

      <SaveButton pending={pending} />
    </form>
  );
}
