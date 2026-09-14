"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SimpleFormState = { error: string | null };

function fields(formData: FormData) {
  return {
    role: String(formData.get("role") ?? "").trim(),
    organization: String(formData.get("organization") ?? "").trim(),
    location: String(formData.get("location") ?? "") || null,
    start_date: String(formData.get("start_date") ?? "") || null,
    end_date: String(formData.get("end_date") ?? "") || null,
    description: String(formData.get("description") ?? ""),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createExperience(
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const data = fields(formData);
  if (!data.role || !data.organization) {
    return { error: "Role and organization are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("experience").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function updateExperience(
  id: string,
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const data = fields(formData);
  if (!data.role || !data.organization) {
    return { error: "Role and organization are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("experience")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  "use server";
  const supabase = await createClient();
  await supabase.from("experience").delete().eq("id", id);
  revalidatePath("/admin/experience");
  revalidatePath("/");
}
