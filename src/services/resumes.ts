import {
  createEmptyResumeContent,
  DEFAULT_TEMPLATE,
} from "@/lib/resume-defaults";
import type { Resume, ResumeContent, TemplateId } from "@/types/resume";

function mapResume(row: Record<string, unknown>): Resume {
  return {
    id: row.id as string,
    user_id: row.user_id as string,
    title: row.title as string,
    template_id: (row.template_id as TemplateId) || DEFAULT_TEMPLATE,
    content: (row.content as ResumeContent) || createEmptyResumeContent(),
    is_public: Boolean(row.is_public),
    public_slug: (row.public_slug as string) || null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

async function parseJson(res: Response) {
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(payload.error || `Request failed (${res.status})`);
  }
  return payload;
}

export async function listResumes(): Promise<Resume[]> {
  const res = await fetch("/api/resumes", { cache: "no-store" });
  const payload = await parseJson(res);
  return (payload.resumes || []).map(mapResume);
}

export async function getResume(id: string): Promise<Resume | null> {
  const res = await fetch(`/api/resumes/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  const payload = await parseJson(res);
  return payload.resume ? mapResume(payload.resume) : null;
}

export async function createResume(title = "Untitled Resume"): Promise<Resume> {
  const res = await fetch("/api/resumes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  const payload = await parseJson(res);
  return mapResume(payload.resume);
}

export async function duplicateResume(id: string): Promise<Resume> {
  const res = await fetch(`/api/resumes/${id}/duplicate`, { method: "POST" });
  const payload = await parseJson(res);
  return mapResume(payload.resume);
}

export async function deleteResume(id: string): Promise<void> {
  const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
  await parseJson(res);
}

export async function updateResume(
  id: string,
  patch: Partial<
    Pick<Resume, "title" | "template_id" | "content" | "is_public" | "public_slug">
  >
): Promise<Resume> {
  const res = await fetch(`/api/resumes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const payload = await parseJson(res);
  return mapResume(payload.resume);
}

export async function uploadProfilePhoto(
  _userId: string,
  file: File
): Promise<string> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/storage/upload", {
    method: "POST",
    body: form,
  });
  const payload = await parseJson(res);
  return payload.url as string;
}
