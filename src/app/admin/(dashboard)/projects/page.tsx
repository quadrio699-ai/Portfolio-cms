import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, EmptyState, DeleteButton } from "@/components/admin/ui";
import { deleteProject } from "@/actions/projects";
import type { Project } from "@/lib/types";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  in_progress: "In progress",
  archived: "Archived",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<Project[]>();

  return (
    <div>
      <PageHeader
        title="Projects"
        description="What shows up in your projects section, in this order."
        action={{ href: "/admin/projects/new", label: "Add project" }}
      />

      {!projects?.length ? (
        <EmptyState label="No projects yet — add your first one." />
      ) : (
        <ul className="divide-y divide-line rounded-lg border border-line bg-paper">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="font-medium text-ink hover:text-circuit"
                  >
                    {project.name}
                  </Link>
                  {project.featured && (
                    <span className="rounded-full bg-signal/10 px-2 py-0.5 text-xs text-signal">
                      Featured
                    </span>
                  )}
                  <span className="text-xs text-ink/40">
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>
                {project.technologies?.length > 0 && (
                  <p className="mt-1 truncate font-mono text-xs text-ink/40">
                    {project.technologies.join(" · ")}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-sm text-ink/50 hover:text-ink"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={deleteProject.bind(null, project.id)}
                  confirmText={`Delete "${project.name}"? This can't be undone.`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
