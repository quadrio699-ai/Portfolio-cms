import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import { AboutForm } from "@/components/admin/AboutForm";
import type { About } from "@/lib/types";

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: about } = await supabase
    .from("about")
    .select("*")
    .eq("id", 1)
    .single<About>();

  return (
    <div>
      <PageHeader
        title="About me"
        description="The bio, avatar, and contact details on your homepage."
      />
      <AboutForm about={about!} />
    </div>
  );
}
