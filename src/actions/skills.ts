"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type SimpleFormState = { error: string | null };

export async function createSkill(
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "General").trim() || "General";
  if (!name) return { error: "Give the skill a name." };

  const supabase = await createClient();
  const { error } = await supabase.from("skills").insert({ name, category });
  if (error) return { error: error.message };

  revalidatePath("/admin/skills");
  revalidatePath("/");
  return { error: null };
}

export async function deleteSkill(id: string) {
  "use server";
  const supabase = await createClient();
  await supabase.from("skills").delete().eq("id", id);
  revalidatePath("/admin/skills");
  revalidatePath("/");
}
