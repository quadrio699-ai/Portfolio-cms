import type { Skill } from "@/lib/types";

export function Skills({ skills }: { skills: Skill[] }) {
  if (!skills.length) return null;

  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const list = groups.get(skill.category) ?? [];
    list.push(skill);
    groups.set(skill.category, list);
  }

  return (
    <section id="tools" className="border-t border-line px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-xl text-ink">Tools & stack</h2>
        <div className="mt-6 space-y-5">
          {Array.from(groups.entries()).map(([category, items]) => (
            <div key={category} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="w-28 shrink-0 text-sm text-ink/45">
                {category}
              </span>
              <span className="font-mono text-sm text-ink/80">
                {items.map((s) => s.name).join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
