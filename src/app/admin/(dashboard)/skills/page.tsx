import { createClient } from "@/lib/supabase/server";
import { PageHeader, EmptyState, DeleteButton } from "@/components/admin/ui";
import { SkillAddForm } from "@/components/admin/SkillAddForm";
import { deleteSkill } from "@/actions/skills";
import type { Skill } from "@/lib/types";

export default async function SkillsPage() {
  const supabase = await createClient();
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true })
    .returns<Skill[]>();

  const groups = new Map<string, Skill[]>();
  for (const skill of skills ?? []) {
    const list = groups.get(skill.category) ?? [];
    list.push(skill);
    groups.set(skill.category, list);
  }

  return (
    <div>
      <PageHeader
        title="Skills"
        description="Your tools/stack section, grouped by category."
      />

      <SkillAddForm />

      {groups.size === 0 ? (
        <EmptyState label="No skills yet — add your first one above." />
      ) : (
        <div className="space-y-6">
          {Array.from(groups.entries()).map(([category, items]) => (
            <div key={category}>
              <h2 className="mb-2 font-mono text-xs text-ink/40">{category}</h2>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.id}
                    className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink"
                  >
                    {skill.name}
                    <DeleteButton
                      action={deleteSkill.bind(null, skill.id)}
                      confirmText={`Remove "${skill.name}"?`}
                    />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
