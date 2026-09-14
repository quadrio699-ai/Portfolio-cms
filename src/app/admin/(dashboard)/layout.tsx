import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-panel">
        <div className="mx-auto max-w-4xl px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
