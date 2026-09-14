"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SimpleFormState } from "@/actions/experience";

function fields(formData: FormData) {
  return {
    school: String(formData.get("school") ?? "").trim(),
    degree: String(formData.get("degree") ?? "") || null,
    field_of_study: String(formData.get("field_of_study") ?? "") || null,
    start_date: String(formData.get("start_date") ?? "") || null,
    end_date: String(formData.get("end_date") ?? "") || null,
    description: String(formData.get("description") ?? ""),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createEducation(
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const data = fields(formData);
  if (!data.school) return { error: "School name is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("education").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/admin/education");
  revalidatePath("/");
  redirect("/admin/education");
}

export async function updateEducation(
  id: string,
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const data = fields(formData);
  if (!data.school) return { error: "School name is required." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("education")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/education");
  revalidatePath("/");
  redirect("/admin/education");
}

export async function deleteEducation(id: string) {
  "use server";
  const supabase = await createClient();
  await supabase.from("education").delete().eq("id", id);
  revalidatePath("/admin/education");
  revalidatePath("/");
}
