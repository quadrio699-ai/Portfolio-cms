import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { updateProject } from "@/actions/projects";
import type { Project } from "@/lib/types";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle<Project>();

  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Edit project" />
      <div className="max-w-xl">
        <ProjectForm project={project} action={updateProject.bind(null, id)} />
      </div>
    </div>
  );
}
