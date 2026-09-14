"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

export type ContactFormState = { error: string | null; success: boolean };

export async function sendMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Fill in every field.", success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({ name, email, message });

  if (error) {
    return { error: "Something went wrong — try again in a moment.", success: false };
  }

  // Best-effort email notification. The message is already saved above, so
  // if this fails for any reason (missing key, no address on file, Resend
  // hiccup) the person submitting the form is never blocked — you'll still
  // see it in Admin → Messages either way.
  if (process.env.RESEND_API_KEY) {
    try {
      const { data: about } = await supabase
        .from("about")
        .select("email")
        .eq("id", 1)
        .maybeSingle();

      if (about?.email) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: about.email,
          replyTo: email,
          subject: `New message from ${name}`,
          text: `${message}\n\n— ${name} (${email})`,
        });
      }
    } catch {
      // Swallow — the message is safely stored either way.
    }
  }

  return { error: null, success: true };
}