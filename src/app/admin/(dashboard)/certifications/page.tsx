import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, EmptyState, DeleteButton } from "@/components/admin/ui";
import { deleteCertification } from "@/actions/certifications";
import type { Certification } from "@/lib/types";

export default async function CertificationsPage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<Certification[]>();

  return (
    <div>
      <PageHeader
        title="Certifications"
        description="Credentials and courses you've completed."
        action={{ href: "/admin/certifications/new", label: "Add certification" }}
      />

      {!entries?.length ? (
        <EmptyState label="No certifications yet." />
      ) : (
        <ul className="divide-y divide-line rounded-lg border border-line bg-paper">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <Link
                  href={`/admin/certifications/${entry.id}`}
                  className="font-medium text-ink hover:text-circuit"
                >
                  {entry.name}
                </Link>
                <p className="mt-0.5 text-xs text-ink/40">
                  {entry.issuer}
                  {entry.issue_date && (
                    <span className="font-mono">
                      {" · "}
                      {new Date(entry.issue_date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link
                  href={`/admin/certifications/${entry.id}`}
                  className="text-sm text-ink/50 hover:text-ink"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={deleteCertification.bind(null, entry.id)}
                  confirmText={`Delete "${entry.name}"? This can't be undone.`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
