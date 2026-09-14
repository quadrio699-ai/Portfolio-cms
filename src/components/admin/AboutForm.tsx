"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { About } from "@/lib/types";
import { updateAbout } from "@/actions/about";
import { FieldLabel, inputClass, SaveButton } from "@/components/admin/ui";
import { publicStorageUrl } from "@/lib/supabase/storage";

export function AboutForm({ about }: { about: About }) {
  const [state, formAction, pending] = useActionState(updateAbout, {
    error: null,
  });
  const [justSaved, setJustSaved] = useState(false);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state.error) {
      setJustSaved(true);
    }
    wasPending.current = pending;
  }, [pending, state.error]);

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <div>
        <FieldLabel>Headline</FieldLabel>
        <input
          name="headline"
          defaultValue={about.headline}
          className={inputClass}
          placeholder="Full-stack developer & EdTech writer"
        />
      </div>

      <div>
        <FieldLabel>Bio</FieldLabel>
        <textarea
          name="bio"
          rows={6}
          defaultValue={about.bio}
          className={inputClass}
          placeholder="The paragraph that introduces you on the homepage."
        />
      </div>

      <div>
        <FieldLabel>Avatar</FieldLabel>
        {about.avatar_path && (
          <img
            src={publicStorageUrl("media", about.avatar_path)}
            alt=""
            className="mb-2 h-20 w-20 rounded-full border border-line object-cover"
          />
        )}
        <input
          name="avatar"
          type="file"
          accept="image/*"
          className="w-full text-sm text-ink/70 file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:text-paper"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Contact email</FieldLabel>
          <input
            name="email"
            type="email"
            defaultValue={about.email ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Location</FieldLabel>
          <input
            name="location"
            defaultValue={about.location ?? ""}
            className={inputClass}
            placeholder="Lagos, Nigeria"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-ink/70">Social links</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel>GitHub</FieldLabel>
            <input
              name="github"
              defaultValue={about.social_links?.github ?? ""}
              className={inputClass}
              placeholder="https://github.com/…"
            />
          </div>
          <div>
            <FieldLabel>LinkedIn</FieldLabel>
            <input
              name="linkedin"
              defaultValue={about.social_links?.linkedin ?? ""}
              className={inputClass}
              placeholder="https://linkedin.com/in/…"
            />
          </div>
          <div>
            <FieldLabel>Substack</FieldLabel>
            <input
              name="substack"
              defaultValue={about.social_links?.substack ?? ""}
              className={inputClass}
              placeholder="https://…substack.com"
            />
          </div>
          <div>
            <FieldLabel>Twitter / X</FieldLabel>
            <input
              name="twitter"
              defaultValue={about.social_links?.twitter ?? ""}
              className={inputClass}
              placeholder="https://x.com/…"
            />
          </div>
        </div>
      </div>

      {state.error && (
        <p className="text-sm text-signal" role="alert">
          {state.error}
        </p>
      )}
      {justSaved && (
        <p className="text-sm text-live" aria-live="polite">
          Saved.
        </p>
      )}

      <SaveButton pending={pending} />
    </form>
  );
}
