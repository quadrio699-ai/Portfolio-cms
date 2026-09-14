import type { About, Cv } from "@/lib/types";
import { publicStorageUrl } from "@/lib/supabase/storage";

const SOCIAL_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  substack: "Substack",
  twitter: "X",
};

export function Hero({ about, cv }: { about: About; cv: Cv | null }) {
  const links = Object.entries(about.social_links ?? {}).filter(([, v]) => v);

  return (
    <section className="mx-auto max-w-2xl px-6 pt-20 pb-16 sm:pt-28">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-7 sm:text-left">
        {about.avatar_path && (
          <img
            src={publicStorageUrl("media", about.avatar_path)}
            alt=""
            className="aspect-[896/1018] w-48 shrink-0 rounded-2xl border-4 border-signal object-cover sm:w-56"
          />
        )}
        <div>
          <h1 className="font-display text-[2.25rem] leading-[1.1] text-ink">
            {about.headline || "Quadri Marvellous Al-ameen"}
          </h1>
          {about.location && (
            <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-signal/10 px-3 py-1 font-mono text-xs text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              {about.location}
            </p>
          )}
        </div>
      </div>

      {about.bio && (
        <p className="mt-8 max-w-[60ch] text-[1.05rem] leading-relaxed text-ink/80">
          {about.bio}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {cv?.file_path && (
          <a
            href={publicStorageUrl("documents", cv.file_path)}
            download
            className="rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-signal/90"
          >
            Download CV
          </a>
        )}
        {about.email && (
          <a
            href={`mailto:${about.email}`}
            className="text-sm text-circuit hover:underline"
          >
            {about.email}
          </a>
        )}
        {links.map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-ink/60 hover:text-circuit"
          >
            {SOCIAL_LABELS[key] ?? key}
          </a>
        ))}
      </div>
    </section>
  );
}