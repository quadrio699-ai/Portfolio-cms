"use server";

import { createClient } from "@/lib/supabase/server";

export type SimpleFormState = { error: string | null };

export async function updatePassword(
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) {
    return { error: "Use at least 8 characters." };
  }
  if (password !== confirm) {
    return { error: "Passwords don't match." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  return { error: null };
}
