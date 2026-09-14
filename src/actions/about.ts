"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type SimpleFormState = { error: string | null };

export async function updateAbout(
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const supabase = await createClient();

  let avatar_path: string | undefined;
  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile.size > 0) {
    const ext = avatarFile.name.split(".").pop() || "jpg";
    const path = `avatar/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, avatarFile, { cacheControl: "3600", upsert: false });
    if (uploadError) return { error: `Avatar upload failed: ${uploadError.message}` };
    avatar_path = path;
  }

  const social_links = {
    github: String(formData.get("github") ?? "") || undefined,
    linkedin: String(formData.get("linkedin") ?? "") || undefined,
    substack: String(formData.get("substack") ?? "") || undefined,
    twitter: String(formData.get("twitter") ?? "") || undefined,
  };

  const update: Record<string, unknown> = {
    headline: String(formData.get("headline") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    email: String(formData.get("email") ?? "") || null,
    location: String(formData.get("location") ?? "") || null,
    social_links,
    updated_at: new Date().toISOString(),
  };
  if (avatar_path) update.avatar_path = avatar_path;

  const { error } = await supabase.from("about").update(update).eq("id", 1);
  if (error) return { error: error.message };

  revalidatePath("/admin/about");
  revalidatePath("/");
  return { error: null };
}
