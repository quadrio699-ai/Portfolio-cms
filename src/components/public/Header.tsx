"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "tools", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <a
          href="#about"
          className="font-mono text-xs font-medium tracking-wide text-signal"
        >
          Q.MARVELLOUS
        </a>
        <div className="hidden items-center gap-6 sm:flex">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`border-b-2 pb-0.5 text-sm transition-colors ${
                active === id
                  ? "border-signal font-medium text-ink"
                  : "border-transparent text-ink/50 hover:text-ink"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
