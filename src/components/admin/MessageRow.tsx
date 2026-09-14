"use client";

import { useTransition } from "react";
import { markMessageRead, deleteMessage } from "@/actions/messages";
import type { Message } from "@/lib/types";

export function MessageRow({ message }: { message: Message }) {
  const [pending, startTransition] = useTransition();

  return (
    <li
      className={`px-5 py-4 ${message.is_read ? "" : "bg-signal/5"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-ink">{message.name}</p>
            {!message.is_read && (
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-label="Unread" />
            )}
          </div>
          <a
            href={`mailto:${message.email}`}
            className="text-xs text-circuit hover:underline"
          >
            {message.email}
          </a>
          <p className="mt-2 whitespace-pre-wrap text-sm text-ink/80">
            {message.message}
          </p>
          <p className="mt-2 font-mono text-xs text-ink/40">
            {new Date(message.created_at).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2 text-sm">
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(() => markMessageRead(message.id, !message.is_read))
            }
            className="text-ink/50 hover:text-ink disabled:opacity-50"
          >
            Mark as {message.is_read ? "unread" : "read"}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (window.confirm("Delete this message?")) {
                startTransition(() => deleteMessage(message.id));
              }
            }}
            className="text-ink/50 hover:text-signal disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
