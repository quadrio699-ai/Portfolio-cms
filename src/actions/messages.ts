"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markMessageRead(id: string, is_read: boolean) {
  "use server";
  const supabase = await createClient();
  await supabase.from("messages").update({ is_read }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  "use server";
  const supabase = await createClient();
  await supabase.from("messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}
