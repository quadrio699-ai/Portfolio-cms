import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import { CertificationForm } from "@/components/admin/CertificationForm";
import { updateCertification } from "@/actions/certifications";
import type { Certification } from "@/lib/types";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entry } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .maybeSingle<Certification>();

  if (!entry) notFound();

  return (
    <div>
      <PageHeader title="Edit certification" />
      <div className="max-w-xl">
        <CertificationForm
          entry={entry}
          action={updateCertification.bind(null, id)}
        />
      </div>
    </div>
  );
}
