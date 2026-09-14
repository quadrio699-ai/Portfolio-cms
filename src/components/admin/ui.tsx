"use client";

import Link from "next/link";
import { useTransition } from "react";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl text-ink">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-ink/60">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 rounded-md bg-signal px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-signal/90"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-line px-6 py-12 text-center">
      <p className="text-sm text-ink/50">{label}</p>
    </div>
  );
}

export function DeleteButton({
  action,
  confirmText = "Delete this? This can't be undone.",
}: {
  action: () => Promise<void>;
  confirmText?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmText)) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="text-sm text-ink/50 transition-colors hover:text-signal disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-ink/70">
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:border-circuit";

export const SaveButton = ({ pending }: { pending: boolean }) => (
  <button
    type="submit"
    disabled={pending}
    className="rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-signal/90 disabled:opacity-60"
  >
    {pending ? "Saving…" : "Save"}
  </button>
);
