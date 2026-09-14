"use client";

import { useActionState } from "react";
import { sendMessage } from "@/actions/contact";

export function Contact() {
  const [state, formAction, pending] = useActionState(sendMessage, {
    error: null,
    success: false,
  });

  return (
    <section id="contact" className="border-t border-line px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-xl text-ink">Get in touch</h2>
        <p className="mt-2 max-w-[55ch] text-sm text-ink/60">
          Have a project in mind, or just want to say hello? Send a message
          and it&apos;ll land straight in my inbox.
        </p>

        {state.success ? (
          <p className="mt-6 text-sm text-live">
            Sent — thanks for reaching out. I&apos;ll get back to you soon.
          </p>
        ) : (
          <form action={formAction} className="mt-6 max-w-md space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                required
                placeholder="Name"
                className="rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:border-circuit"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:border-circuit"
              />
            </div>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Your message"
              className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:border-circuit"
            />
            {state.error && (
              <p className="text-sm text-signal" role="alert">
                {state.error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
