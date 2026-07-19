-- Storage setup for CVForge profile photos
-- Run this in Supabase SQL Editor AFTER schema.sql

-- 1) Create public bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resume-assets',
  'resume-assets',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2) Policies (drop first if re-running)
drop policy if exists "Users upload own resume assets" on storage.objects;
drop policy if exists "Users update own resume assets" on storage.objects;
drop policy if exists "Users delete own resume assets" on storage.objects;
drop policy if exists "Public read resume assets" on storage.objects;

create policy "Users upload own resume assets"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'resume-assets'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users update own resume assets"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'resume-assets'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users delete own resume assets"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'resume-assets'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Public read resume assets"
  on storage.objects for select
  to public
  using (bucket_id = 'resume-assets');
