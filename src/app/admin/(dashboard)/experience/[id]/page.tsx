import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { updateExperience } from "@/actions/experience";
import type { Experience } from "@/lib/types";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entry } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .maybeSingle<Experience>();

  if (!entry) notFound();

  return (
    <div>
      <PageHeader title="Edit experience" />
      <div className="max-w-xl">
        <ExperienceForm entry={entry} action={updateExperience.bind(null, id)} />
      </div>
    </div>
  );
}
