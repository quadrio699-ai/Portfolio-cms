# Portfolio CMS

A personal portfolio site with a private admin dashboard behind it — add
projects, experience, education, certifications, skills, your bio, and your
CV from a set of forms instead of editing code. Built with Next.js (App
Router), Tailwind, and Supabase (Postgres + Auth + Storage).

## How it's organized

- **Public site** (`/`) — reads everything from Supabase and renders it:
  hero/about, tools & skills, projects, education & certifications, a
  "Download CV" button, and a contact form.
- **Admin dashboard** (`/admin`) — signed in only, one account (yours). Every
  section on the public site has a matching page here: add, edit, delete,
  reorder.
- **Database & storage** — one Supabase project holds all your content
  (Postgres tables) plus your project images and CV file (Storage).

## 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a free project, and open
**SQL Editor → New query**. Paste in the entire contents of
`supabase/schema.sql` from this repo and run it. That one script creates
every table, security policy, and storage bucket you need — safe to re-run
if you ever need to.

## 2. Create your admin login

In the Supabase dashboard: **Authentication → Users → Add user**. Use your
own email and a password — this is the only account the app expects, and
it's what you'll use to sign in at `/admin/login`. There's no public
sign-up page by design.

## 3. Set your environment variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then fill in the two values from **Supabase → Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Both are safe to expose in the browser — the actual write protection comes
from the row-level security policies in `schema.sql`, which only let
signed-in requests insert, update, or delete.

## 4. Run it

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` to sign in.

## Using the dashboard

Once signed in, the sidebar covers everything:

| Section         | What it manages                                          |
|-----------------|-----------------------------------------------------------|
| Projects        | Name, description, tech tags, links, image, featured flag |
| Experience      | Role, organization, dates, description                    |
| Education       | School, degree, field, dates                               |
| Certifications  | Name, issuer, date, credential link                        |
| Skills          | Tags grouped by category (e.g. "Languages", "Tools")       |
| About me        | Headline, bio, avatar, contact email, social links         |
| CV              | Upload a PDF — the public "Download CV" button always serves whichever one you uploaded last |
| Messages        | Everything submitted through your public contact form      |
| Settings        | Change your admin password                                 |

Every change shows up on the public site immediately — nothing to
redeploy, no code to touch.

## Deploying

This deploys cleanly to Vercel:

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the same two environment variables from step 3 above in the
   Vercel project settings.
4. Deploy.

## Notes

- Images and your CV are stored in two public Supabase Storage buckets
  (`media` and `documents`) created by `schema.sql`. "Public" means
  visitors can view/download files by URL — they still can't upload,
  edit, or delete anything; only a signed-in request can.
- Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono) are self-hosted via
  `@fontsource` — no request to Google Fonts at runtime.
- Want a different look? Colors and fonts are defined as CSS variables
  in `src/app/globals.css` (`@theme` block) — change them once, and
  every page picks it up.
