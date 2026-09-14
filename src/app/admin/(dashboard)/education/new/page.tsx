import { PageHeader } from "@/components/admin/ui";
import { EducationForm } from "@/components/admin/EducationForm";
import { createEducation } from "@/actions/education";

export default function NewEducationPage() {
  return (
    <div>
      <PageHeader title="Add education" />
      <div className="max-w-xl">
        <EducationForm action={createEducation} />
      </div>
    </div>
  );
}
