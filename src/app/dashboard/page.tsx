import { redirect } from "next/navigation";
import { DashboardHeader } from "@/features/dashboard/dashboard-header";
import { ResumeDashboard } from "@/features/dashboard/resume-dashboard";
import { createClient } from "@/lib/supabase/server";
import { createEmptyResumeContent, DEFAULT_TEMPLATE } from "@/lib/resume-defaults";
import type { Resume, ResumeContent, TemplateId } from "@/types/resume";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const resumes: Resume[] = (data || []).map((row) => ({
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    template_id: (row.template_id as TemplateId) || DEFAULT_TEMPLATE,
    content: (row.content as ResumeContent) || createEmptyResumeContent(),
    is_public: Boolean(row.is_public),
    public_slug: row.public_slug,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));

  return (
    <div className="min-h-screen bg-muted/20">
      <DashboardHeader email={user.email} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <ResumeDashboard initialResumes={resumes} />
      </main>
    </div>
  );
}
