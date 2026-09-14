import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, EmptyState, DeleteButton } from "@/components/admin/ui";
import { deleteExperience } from "@/actions/experience";
import type { Experience } from "@/lib/types";

function formatRange(start: string | null, end: string | null) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!start) return "";
  return `${fmt(start)} – ${end ? fmt(end) : "Present"}`;
}

export default async function ExperiencePage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<Experience[]>();

  return (
    <div>
      <PageHeader
        title="Experience"
        description="Roles and positions, most relevant first."
        action={{ href: "/admin/experience/new", label: "Add experience" }}
      />

      {!entries?.length ? (
        <EmptyState label="No experience entries yet." />
      ) : (
        <ul className="divide-y divide-line rounded-lg border border-line bg-paper">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <Link
                  href={`/admin/experience/${entry.id}`}
                  className="font-medium text-ink hover:text-circuit"
                >
                  {entry.role} · {entry.organization}
                </Link>
                <p className="mt-0.5 font-mono text-xs text-ink/40">
                  {formatRange(entry.start_date, entry.end_date)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link
                  href={`/admin/experience/${entry.id}`}
                  className="text-sm text-ink/50 hover:text-ink"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={deleteExperience.bind(null, entry.id)}
                  confirmText={`Delete "${entry.role}"? This can't be undone.`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
