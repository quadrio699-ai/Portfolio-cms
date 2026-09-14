import type { Experience as ExperienceEntry } from "@/lib/types";

function formatRange(start: string | null, end: string | null) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!start) return "";
  return `${fmt(start)} – ${end ? fmt(end) : "Present"}`;
}

export function Experience({ entries }: { entries: ExperienceEntry[] }) {
  if (!entries.length) return null;

  return (
    <section id="experience" className="border-t border-line px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-xl text-ink">Experience</h2>
        <ul className="mt-6 space-y-6">
          {entries.map((entry) => (
            <li key={entry.id}>
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-medium text-ink">
                  {entry.role} · {entry.organization}
                </p>
                <span className="shrink-0 font-mono text-xs text-ink/40">
                  {formatRange(entry.start_date, entry.end_date)}
                </span>
              </div>
              {entry.location && (
                <p className="text-sm text-ink/50">{entry.location}</p>
              )}
              {entry.description && (
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  {entry.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
