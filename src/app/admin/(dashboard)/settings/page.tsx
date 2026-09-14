import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import { PasswordForm } from "@/components/admin/PasswordForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <PageHeader title="Settings" />

      <div className="mb-8">
        <p className="text-sm text-ink/50">Signed in as</p>
        <p className="text-ink">{user?.email}</p>
      </div>

      <h2 className="mb-3 font-display text-lg text-ink">Change password</h2>
      <PasswordForm />
    </div>
  );
}
