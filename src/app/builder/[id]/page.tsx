import { notFound, redirect } from "next/navigation";
import { BuilderWorkspace } from "@/features/builder/builder-workspace";
import { createEmptyResumeContent, DEFAULT_TEMPLATE } from "@/lib/resume-defaults";
import { createClient } from "@/lib/supabase/server";
import type { Resume, ResumeContent, TemplateId } from "@/types/resume";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BuilderPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) notFound();

  const resume: Resume = {
    id: data.id,
    user_id: data.user_id,
    title: data.title,
    template_id: (data.template_id as TemplateId) || DEFAULT_TEMPLATE,
    content: (data.content as ResumeContent) || createEmptyResumeContent(),
    is_public: Boolean(data.is_public),
    public_slug: data.public_slug,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return <BuilderWorkspace resume={resume} />;
}
