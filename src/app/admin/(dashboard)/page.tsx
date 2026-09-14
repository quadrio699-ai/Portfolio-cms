import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function count(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string,
  filter?: Record<string, unknown>
) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (filter) query = query.match(filter);
  const { count } = await query;
  return count ?? 0;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const [projects, experience, education, certifications, skills, unread] =
    await Promise.all([
      count(supabase, "projects"),
      count(supabase, "experience"),
      count(supabase, "education"),
      count(supabase, "certifications"),
      count(supabase, "skills"),
      count(supabase, "messages", { is_read: false }),
    ]);

  const tiles = [
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Experience", href: "/admin/experience", value: experience },
    { label: "Education", href: "/admin/education", value: education },
    { label: "Certifications", href: "/admin/certifications", value: certifications },
    { label: "Skills", href: "/admin/skills", value: skills },
    { label: "Unread messages", href: "/admin/messages", value: unread },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink/60">
          Everything here feeds your public site directly — no code required.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="rounded-lg border border-line bg-paper p-5 transition-colors hover:border-circuit"
          >
            <p className="font-mono text-3xl text-ink">{tile.value}</p>
            <p className="mt-1 text-sm text-ink/60">{tile.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
