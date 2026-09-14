"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type SimpleFormState = { error: string | null };

export async function uploadCv(
  _prevState: SimpleFormState,
  formData: FormData
): Promise<SimpleFormState> {
  const file = formData.get("cv") as File | null;
  if (!file || file.size === 0) {
    return { error: "Choose a PDF to upload." };
  }
  if (file.type !== "application/pdf") {
    return { error: "Your CV should be a PDF." };
  }

  const supabase = await createClient();
  const path = `cv/${crypto.randomUUID()}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (uploadError) return { error: uploadError.message };

  const { error } = await supabase
    .from("cv")
    .update({
      file_path: path,
      file_name: file.name,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (error) return { error: error.message };

  revalidatePath("/admin/cv");
  revalidatePath("/");
  return { error: null };
}
