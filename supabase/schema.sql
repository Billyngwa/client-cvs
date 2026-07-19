-- Resume Builder schema for Supabase
-- Run in SQL Editor: https://supabase.com/dashboard/project/_/sql

create extension if not exists "pgcrypto";

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Template catalog
create table if not exists public.templates (
  id text primary key,
  name text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.templates (id, name, description) values
  ('modern', 'Modern', 'Clean accent sidebar layout'),
  ('professional', 'Professional', 'Classic corporate style'),
  ('executive', 'Executive', 'Bold leadership presence'),
  ('minimal', 'Minimal', 'Whitespace-focused simplicity'),
  ('creative', 'Creative', 'Distinctive visual hierarchy'),
  ('ats', 'ATS Friendly', 'Optimized for parsers'),
  ('elegant', 'Elegant', 'Refined serif typography'),
  ('dark', 'Dark Theme', 'High-contrast dark design')
on conflict (id) do nothing;

-- Resumes (content stored as JSONB for efficient autosave)
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default 'Untitled Resume',
  template_id text not null default 'modern' references public.templates (id),
  content jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  public_slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resumes_user_id_idx on public.resumes (user_id);
create index if not exists resumes_updated_at_idx on public.resumes (updated_at desc);
create index if not exists resumes_title_idx on public.resumes using gin (to_tsvector('english', title));

-- Optional normalized section tables (synced optionally; app uses resumes.content)
create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  school text,
  degree text,
  field text,
  start_date text,
  end_date text,
  gpa text,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  company text,
  position text,
  employment_type text,
  start_date text,
  end_date text,
  currently_working boolean default false,
  responsibilities text,
  achievements text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  category text,
  name text not null,
  level text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  name text,
  description text,
  technologies text,
  github_url text,
  live_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  name text,
  issuer text,
  date text,
  credential_id text,
  verification_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.languages (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  language text,
  proficiency text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.references_entries (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null references public.resumes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  name text,
  title text,
  company text,
  email text,
  phone text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists resumes_set_updated_at on public.resumes;
create trigger resumes_set_updated_at
  before update on public.resumes
  for each row execute function public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.templates enable row level security;
alter table public.education enable row level security;
alter table public.experience enable row level security;
alter table public.skills enable row level security;
alter table public.projects enable row level security;
alter table public.certifications enable row level security;
alter table public.languages enable row level security;
alter table public.references_entries enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Templates are public read
create policy "Anyone can read templates"
  on public.templates for select using (true);

-- Resumes: owner CRUD + public read when published
create policy "Users can view own resumes"
  on public.resumes for select using (auth.uid() = user_id or is_public = true);
create policy "Users can insert own resumes"
  on public.resumes for insert with check (auth.uid() = user_id);
create policy "Users can update own resumes"
  on public.resumes for update using (auth.uid() = user_id);
create policy "Users can delete own resumes"
  on public.resumes for delete using (auth.uid() = user_id);

-- Section table policies (owner only)
create policy "Users manage own education"
  on public.education for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own experience"
  on public.experience for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own skills"
  on public.skills for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own projects"
  on public.projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own certifications"
  on public.certifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own languages"
  on public.languages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own references"
  on public.references_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Storage: see supabase/storage.sql (run after this file)
-- Resume section data is stored in resumes.content (JSONB).
-- The normalized tables (education, experience, …) are optional for future use.
