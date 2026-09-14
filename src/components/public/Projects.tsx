import type { Project } from "@/lib/types";
import { publicStorageUrl } from "@/lib/supabase/storage";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  in_progress: "In progress",
  archived: "Archived",
};

const STATUS_BADGE: Record<Project["status"], string> = {
  live: "bg-signal text-paper",
  in_progress: "bg-panel text-ink/60 border border-line",
  archived: "bg-panel text-ink/40 border border-line",
};

export function Projects({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section id="projects" className="border-t border-line px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-xl text-ink">Projects</h2>

        <div className="mt-6 space-y-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-lg border border-line bg-paper"
            >
              {project.image_path ? (
                <img
                  src={publicStorageUrl("media", project.image_path)}
                  alt=""
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : project.featured ? (
                <div className="bg-ink px-5 py-4">
                  <p className="font-mono text-xs text-paper/40">
                    &gt; status --project {project.name.toLowerCase().replace(/\s+/g, "-")}
                  </p>
                  <p className="mt-1 font-mono text-sm text-signal-soft">
                    {project.name.toUpperCase()} — ACTIVE
                  </p>
                </div>
              ) : null}

              <div className="p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg text-ink">{project.name}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[project.status]}`}
                  >
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>
                {project.description && (
                  <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-ink/70">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-signal/10 px-2 py-0.5 font-mono text-xs text-signal"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex gap-4">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-circuit hover:underline"
                    >
                      Visit
                    </a>
                  )}
                  {project.source_url && (
                    <a
                      href={project.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-circuit hover:underline"
                    >
                      Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}