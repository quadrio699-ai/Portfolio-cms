import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, EmptyState, DeleteButton } from "@/components/admin/ui";
import { deleteEducation } from "@/actions/education";
import type { Education } from "@/lib/types";

function formatRange(start: string | null, end: string | null) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!start) return "";
  return `${fmt(start)} – ${end ? fmt(end) : "Present"}`;
}

export default async function EducationPage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<Education[]>();

  return (
    <div>
      <PageHeader
        title="Education"
        description="Schools and programs, most relevant first."
        action={{ href: "/admin/education/new", label: "Add education" }}
      />

      {!entries?.length ? (
        <EmptyState label="No education entries yet." />
      ) : (
        <ul className="divide-y divide-line rounded-lg border border-line bg-paper">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <Link
                  href={`/admin/education/${entry.id}`}
                  className="font-medium text-ink hover:text-circuit"
                >
                  {entry.school}
                </Link>
                <p className="mt-0.5 text-xs text-ink/40">
                  {[entry.degree, entry.field_of_study].filter(Boolean).join(", ")}
                  {entry.start_date && " · "}
                  <span className="font-mono">
                    {formatRange(entry.start_date, entry.end_date)}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link
                  href={`/admin/education/${entry.id}`}
                  className="text-sm text-ink/50 hover:text-ink"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={deleteEducation.bind(null, entry.id)}
                  confirmText={`Delete "${entry.school}"? This can't be undone.`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
