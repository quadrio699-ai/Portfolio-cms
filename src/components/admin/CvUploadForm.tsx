"use client";

import { useActionState } from "react";
import { uploadCv } from "@/actions/cv";

export function CvUploadForm() {
  const [state, formAction, pending] = useActionState(uploadCv, {
    error: null,
  });

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <input
        name="cv"
        type="file"
        accept="application/pdf"
        required
        className="w-full text-sm text-ink/70 file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:text-paper"
      />
      {state.error && (
        <p className="text-sm text-signal" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-signal/90 disabled:opacity-60"
      >
        {pending ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
