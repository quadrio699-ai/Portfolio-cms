-- ============================================================================
-- Portfolio CMS — Supabase schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)
-- Safe to re-run: every statement guards against already existing.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- PROJECTS
-- ----------------------------------------------------------------------------
create table if not exists public.projects (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  description    text not null default '',
  technologies   text[] not null default '{}',
  status         text not null default 'live' check (status in ('live', 'in_progress', 'archived')),
  project_url    text,
  source_url     text,
  image_path     text,
  featured       boolean not null default false,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- EXPERIENCE
-- ----------------------------------------------------------------------------
create table if not exists public.experience (
  id             uuid primary key default gen_random_uuid(),
  role           text not null,
  organization   text not null,
  location       text,
  start_date     date,
  end_date       date, -- null means "current"
  description    text not null default '',
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- EDUCATION
-- ----------------------------------------------------------------------------
create table if not exists public.education (
  id             uuid primary key default gen_random_uuid(),
  school         text not null,
  degree         text,
  field_of_study text,
  start_date     date,
  end_date       date, -- null means "in progress"
  description    text not null default '',
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- CERTIFICATIONS
-- ----------------------------------------------------------------------------
create table if not exists public.certifications (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  issuer         text,
  issue_date     date,
  credential_url text,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- SKILLS
-- ----------------------------------------------------------------------------
create table if not exists public.skills (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  category       text not null default 'General',
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- ABOUT (singleton row, id is always 1)
-- ----------------------------------------------------------------------------
create table if not exists public.about (
  id             smallint primary key default 1 check (id = 1),
  headline       text not null default '',
  bio            text not null default '',
  avatar_path    text,
  email          text,
  location       text,
  social_links   jsonb not null default '{}'::jsonb,
  updated_at     timestamptz not null default now()
);
insert into public.about (id) values (1) on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- CV (singleton row, id is always 1)
-- ----------------------------------------------------------------------------
create table if not exists public.cv (
  id             smallint primary key default 1 check (id = 1),
  file_path      text,
  file_name      text,
  updated_at     timestamptz not null default now()
);
insert into public.cv (id) values (1) on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- MESSAGES (contact form submissions)
-- ----------------------------------------------------------------------------
create table if not exists public.messages (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  email          text not null,
  message        text not null,
  is_read        boolean not null default false,
  created_at     timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- Public (anon) visitors can READ the content tables and SEND a message.
-- Only an authenticated user (you, the single admin) can write content
-- or read/manage messages.
-- ============================================================================

alter table public.projects       enable row level security;
alter table public.experience     enable row level security;
alter table public.education      enable row level security;
alter table public.certifications enable row level security;
alter table public.skills         enable row level security;
alter table public.about          enable row level security;
alter table public.cv             enable row level security;
alter table public.messages       enable row level security;

-- Public read access on content tables
drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects for select using (true);

drop policy if exists "public read experience" on public.experience;
create policy "public read experience" on public.experience for select using (true);

drop policy if exists "public read education" on public.education;
create policy "public read education" on public.education for select using (true);

drop policy if exists "public read certifications" on public.certifications;
create policy "public read certifications" on public.certifications for select using (true);

drop policy if exists "public read skills" on public.skills;
create policy "public read skills" on public.skills for select using (true);

drop policy if exists "public read about" on public.about;
create policy "public read about" on public.about for select using (true);

drop policy if exists "public read cv" on public.cv;
create policy "public read cv" on public.cv for select using (true);

-- Authenticated (admin) full access on content tables
drop policy if exists "admin write projects" on public.projects;
create policy "admin write projects" on public.projects for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "admin write experience" on public.experience;
create policy "admin write experience" on public.experience for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "admin write education" on public.education;
create policy "admin write education" on public.education for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "admin write certifications" on public.certifications;
create policy "admin write certifications" on public.certifications for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "admin write skills" on public.skills;
create policy "admin write skills" on public.skills for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "admin write about" on public.about;
create policy "admin write about" on public.about for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "admin write cv" on public.cv;
create policy "admin write cv" on public.cv for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

-- Messages: anyone can send one, only the admin can read/manage them
drop policy if exists "public insert messages" on public.messages;
create policy "public insert messages" on public.messages for insert
  with check (true);

drop policy if exists "admin read messages" on public.messages;
create policy "admin read messages" on public.messages for select
  using (auth.uid() is not null);

drop policy if exists "admin update messages" on public.messages;
create policy "admin update messages" on public.messages for update
  using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "admin delete messages" on public.messages;
create policy "admin delete messages" on public.messages for delete
  using (auth.uid() is not null);

-- ============================================================================
-- STORAGE BUCKETS
-- "media"     — project images + your avatar (public read)
-- "documents" — your CV file (public read, so the download button works)
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "admin write media" on storage.objects;
create policy "admin write media" on storage.objects for all
  using (bucket_id = 'media' and auth.uid() is not null)
  with check (bucket_id = 'media' and auth.uid() is not null);

drop policy if exists "public read documents" on storage.objects;
create policy "public read documents" on storage.objects for select
  using (bucket_id = 'documents');

drop policy if exists "admin write documents" on storage.objects;
create policy "admin write documents" on storage.objects for all
  using (bucket_id = 'documents' and auth.uid() is not null)
  with check (bucket_id = 'documents' and auth.uid() is not null);

-- ============================================================================
-- Done. Next: Authentication → Users → Add user, to create your one admin
-- login (email + password). That's the only account this app expects.
-- ============================================================================
