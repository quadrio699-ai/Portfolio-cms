import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import { CvUploadForm } from "@/components/admin/CvUploadForm";
import { publicStorageUrl } from "@/lib/supabase/storage";
import type { Cv } from "@/lib/types";

export default async function CvPage() {
  const supabase = await createClient();
  const { data: cv } = await supabase
    .from("cv")
    .select("*")
    .eq("id", 1)
    .single<Cv>();

  return (
    <div>
      <PageHeader
        title="CV"
        description="Upload a PDF — the Download CV button on your site always serves this file."
      />

      {cv?.file_path && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-line bg-paper px-5 py-4">
          <div>
            <p className="text-sm text-ink">{cv.file_name}</p>
            <p className="mt-0.5 text-xs text-ink/40">
              Uploaded{" "}
              {new Date(cv.updated_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <a
            href={publicStorageUrl("documents", cv.file_path)}
            target="_blank"
            className="text-sm text-circuit hover:underline"
          >
            View current CV
          </a>
        </div>
      )}

      <CvUploadForm />
    </div>
  );
}
