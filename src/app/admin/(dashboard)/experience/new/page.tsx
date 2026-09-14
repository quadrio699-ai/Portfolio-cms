import { PageHeader } from "@/components/admin/ui";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { createExperience } from "@/actions/experience";

export default function NewExperiencePage() {
  return (
    <div>
      <PageHeader title="Add experience" />
      <div className="max-w-xl">
        <ExperienceForm action={createExperience} />
      </div>
    </div>
  );
}
