"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProjectStatus } from "@/lib/types";

function parseTechnologies(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

async function uploadImageIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File | null
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop() || "jpg";
  const path = `projects/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return path;
}

export type ProjectFormState = { error: string | null };

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Give the project a name." };

  const imageFile = formData.get("image") as File | null;
  let image_path: string | null = null;
  try {
    image_path = await uploadImageIfPresent(supabase, imageFile);
  } catch (e) {
    return { error: (e as Error).message };
  }

  const { error } = await supabase.from("projects").insert({
    name,
    description: String(formData.get("description") ?? ""),
    technologies: parseTechnologies(String(formData.get("technologies") ?? "")),
    status: String(formData.get("status") ?? "live") as ProjectStatus,
    project_url: String(formData.get("project_url") ?? "") || null,
    source_url: String(formData.get("source_url") ?? "") || null,
    image_path,
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Give the project a name." };

  const imageFile = formData.get("image") as File | null;
  let image_path: string | null = null;
  try {
    image_path = await uploadImageIfPresent(supabase, imageFile);
  } catch (e) {
    return { error: (e as Error).message };
  }

  const update: Record<string, unknown> = {
    name,
    description: String(formData.get("description") ?? ""),
    technologies: parseTechnologies(String(formData.get("technologies") ?? "")),
    status: String(formData.get("status") ?? "live"),
    project_url: String(formData.get("project_url") ?? "") || null,
    source_url: String(formData.get("source_url") ?? "") || null,
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
    updated_at: new Date().toISOString(),
  };
  if (image_path) update.image_path = image_path;

  const { error } = await supabase.from("projects").update(update).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  "use server";
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
