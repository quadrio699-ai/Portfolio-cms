import type { Education, Certification } from "@/lib/types";

function formatRange(start: string | null, end: string | null) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!start) return "";
  return `${fmt(start)} – ${end ? fmt(end) : "Present"}`;
}

export function EducationAndCertifications({
  education,
  certifications,
}: {
  education: Education[];
  certifications: Certification[];
}) {
  if (!education.length && !certifications.length) return null;

  return (
    <section id="education" className="border-t border-line px-6 py-14">
      <div className="mx-auto max-w-2xl">
        {education.length > 0 && (
          <div>
            <h2 className="font-display text-xl text-ink">Education</h2>
            <ul className="mt-6 space-y-6">
              {education.map((entry) => (
                <li key={entry.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-medium text-ink">{entry.school}</p>
                    <span className="shrink-0 font-mono text-xs text-ink/40">
                      {formatRange(entry.start_date, entry.end_date)}
                    </span>
                  </div>
                  {(entry.degree || entry.field_of_study) && (
                    <p className="text-sm text-ink/60">
                      {[entry.degree, entry.field_of_study].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {entry.description && (
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">
                      {entry.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {certifications.length > 0 && (
          <div className={education.length > 0 ? "mt-12" : ""}>
            <h2 className="font-display text-xl text-ink">Certifications</h2>
            <ul className="mt-6 space-y-4">
              {certifications.map((entry) => (
                <li key={entry.id} className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-ink">
                      {entry.credential_url ? (
                        <a
                          href={entry.credential_url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-circuit hover:underline"
                        >
                          {entry.name}
                        </a>
                      ) : (
                        entry.name
                      )}
                    </p>
                    {entry.issuer && (
                      <p className="text-sm text-ink/50">{entry.issuer}</p>
                    )}
                  </div>
                  {entry.issue_date && (
                    <span className="shrink-0 font-mono text-xs text-ink/40">
                      {new Date(entry.issue_date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
