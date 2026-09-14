import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/public/Header";
import { Hero } from "@/components/public/Hero";
import { Skills } from "@/components/public/Skills";
import { Projects } from "@/components/public/Projects";
import { EducationAndCertifications } from "@/components/public/EducationAndCertifications";
import { Contact } from "@/components/public/Contact";
import type {
  About,
  Certification,
  Cv,
  Education,
  Project,
  Skill,
} from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();

  const [aboutRes, cvRes, skillsRes, projectsRes, educationRes, certsRes] =
    await Promise.all([
      supabase.from("about").select("*").eq("id", 1).single<About>(),
      supabase.from("cv").select("*").eq("id", 1).single<Cv>(),
      supabase.from("skills").select("*").order("category").order("sort_order").returns<Skill[]>(),
      supabase.from("projects").select("*").order("featured", { ascending: false }).order("sort_order").returns<Project[]>(),
      supabase.from("education").select("*").order("sort_order").returns<Education[]>(),
      supabase.from("certifications").select("*").order("sort_order").returns<Certification[]>(),
    ]);

  const about = aboutRes.data ?? ({
    id: 1,
    headline: "",
    bio: "",
    avatar_path: null,
    email: null,
    location: null,
    social_links: {},
    updated_at: new Date().toISOString(),
  } as About);

  return (
    <>
      <Header />
      <Hero about={about} cv={cvRes.data} />
      <Skills skills={skillsRes.data ?? []} />
      <Projects projects={projectsRes.data ?? []} />
      <EducationAndCertifications
        education={educationRes.data ?? []}
        certifications={certsRes.data ?? []}
      />
      <Contact />
      <footer className="border-t border-line px-6 py-8">
        <p className="mx-auto max-w-2xl font-mono text-xs text-ink/35">
          © {new Date().getFullYear()} {about.headline ? about.headline.split(" — ")[0] : ""}
        </p>
      </footer>
    </>
  );
}
