import { PageHeader } from "@/components/admin/ui";
import { CertificationForm } from "@/components/admin/CertificationForm";
import { createCertification } from "@/actions/certifications";

export default function NewCertificationPage() {
  return (
    <div>
      <PageHeader title="Add certification" />
      <div className="max-w-xl">
        <CertificationForm action={createCertification} />
      </div>
    </div>
  );
}
