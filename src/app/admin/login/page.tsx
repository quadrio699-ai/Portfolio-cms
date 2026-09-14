import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs tracking-wide text-paper/50">
            portfolio / admin
          </p>
          <h1 className="mt-3 font-display text-3xl text-paper">
            Sign in
          </h1>
        </div>
        <LoginForm next={next ?? "/admin"} />
      </div>
    </div>
  );
}
