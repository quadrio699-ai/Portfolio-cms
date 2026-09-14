import { PageHeader } from "@/components/admin/ui";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProject } from "@/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader title="Add project" />
      <div className="max-w-xl">
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
