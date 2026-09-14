"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/actions/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/about", label: "About me" },
  { href: "/admin/cv", label: "CV" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-paper/10 bg-ink text-paper">
      <div className="px-5 py-6">
        <p className="font-mono text-xs tracking-wide text-paper/50">
          portfolio / admin
        </p>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-paper/10 text-paper"
                  : "text-paper/60 hover:bg-paper/5 hover:text-paper"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-paper/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="block rounded-md px-3 py-2 text-sm text-paper/60 hover:bg-paper/5 hover:text-paper"
        >
          View public site
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-paper/60 hover:bg-paper/5 hover:text-paper"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
