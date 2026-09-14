export type ProjectStatus = "live" | "in_progress" | "archived";

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  project_url: string | null;
  source_url: string | null;
  image_path: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Experience = {
  id: string;
  role: string;
  organization: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string | null;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string | null;
  issue_date: string | null;
  credential_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  sort_order: number;
  created_at: string;
};

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  substack?: string;
  twitter?: string;
  [key: string]: string | undefined;
};

export type About = {
  id: number;
  headline: string;
  bio: string;
  avatar_path: string | null;
  email: string | null;
  location: string | null;
  social_links: SocialLinks;
  updated_at: string;
};

export type Cv = {
  id: number;
  file_path: string | null;
  file_name: string | null;
  updated_at: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};
