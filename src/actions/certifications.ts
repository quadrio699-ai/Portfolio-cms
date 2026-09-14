"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SimpleFormState } from "@/actions/experience";

function fields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    issuer: String(formData.get("issuer") ?? "") || null,
    issue_date: String(formData.get("issue_date") ?? "") || null,
    credential_url: String(formData.get("credential_url") ?? "") || null,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createCertification(
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const data = fields(formData);
  if (!data.name) return { error: "Certification name is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("certifications").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/admin/certifications");
  revalidatePath("/");
  redirect("/admin/certifications");
}

export async function updateCertification(
  id: string,
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const data = fields(formData);
  if (!data.name) return { error: "Certification name is required." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("certifications")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/certifications");
  revalidatePath("/");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  "use server";
  const supabase = await createClient();
  await supabase.from("certifications").delete().eq("id", id);
  revalidatePath("/admin/certifications");
  revalidatePath("/");
}
