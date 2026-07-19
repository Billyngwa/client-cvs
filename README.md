# CVForge — AI-Powered Resume Builder

Production-ready Next.js resume builder with Supabase auth, multi-step editing, live template preview, autosave, and PDF export.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + Shadcn-style UI
- Supabase (Auth, Postgres, Storage, RLS)
- React Hook Form / Zod (validation ready)
- @react-pdf/renderer (PDF download)
- @dnd-kit (experience reordering)
- next-themes (light / dark / system)

## Features

- Email/password signup, login, logout, password reset
- Middleware-protected `/dashboard` and `/builder`
- Resume CRUD: create, edit, duplicate, delete
- Search, template filter, sort
- 10-step builder with live A4 preview
- 8 templates: Modern, Professional, Executive, Minimal, Creative, ATS, Elegant, Dark
- Autosave with status (Saving / Saved / Unsaved / Offline)
- Profile photo upload to Supabase Storage
- Print / PDF download

## Project structure

```
src/
  app/                 # routes (landing, auth, dashboard, builder, API)
  components/ui/       # reusable UI primitives
  features/
    builder/           # multi-step editor
    dashboard/         # resume list
    preview/           # live templates
  hooks/
  lib/supabase/        # browser + server + middleware clients
  services/            # data access
  types/
supabase/schema.sql    # DB + RLS
```

## Setup

### 1. Install

```bash
npm install
cp .env.example .env.local
```

### 2. Supabase project

1. Create a project at [supabase.com](https://supabase.com)
2. Copy **Project URL** (`https://<project-ref>.supabase.co`) and **anon key** into `.env.local`
3. Open **SQL Editor** and run, in order:
   - `supabase/schema.sql`
   - `supabase/storage.sql`
4. Confirm Storage shows a public bucket named `resume-assets`

**Where data is stored:** all builder fields live in `public.resumes.content` (JSONB). Open a resume row and expand `content` — do not expect filled `education` / `experience` tables yet (those are optional/normalized stubs).

### 3. Auth settings

In Supabase Auth:

- Enable Email provider
- Set Site URL to `http://localhost:3000` (and your Vercel URL in production)
- Add redirect URLs for password reset

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Development server       |
| `npm run build` | Production build         |
| `npm run start` | Serve production build   |
| `npm run lint`  | ESLint                   |

## Deploy (Vercel)

1. Push to GitHub
2. Import the repo in Vercel
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy
5. Update Supabase Auth Site URL + redirect URLs to your Vercel domain
6. Ensure Storage bucket `resume-assets` exists with public read if you use profile photos

## Legacy Labaran CV

The previous static CV routes under `/cv/[slug]` remain in the repo for reference. The primary product surface is **CVForge** (`/`, `/dashboard`, `/builder`).

## Next improvements

- Wire real AI summary / bullet generation APIs
- ATS score checker
- Public share links (`is_public` + `public_slug` already in schema)
- Cover letter generator
- Import from LinkedIn / PDF
