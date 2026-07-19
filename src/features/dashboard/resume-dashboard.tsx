"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CreateResumeButton } from "@/features/dashboard/dashboard-header";
import { deleteResume, duplicateResume } from "@/services/resumes";
import { TEMPLATES, type Resume, type TemplateId } from "@/types/resume";

type SortKey = "newest" | "oldest" | "alpha" | "edited";

export function ResumeDashboard({ initialResumes }: { initialResumes: Resume[] }) {
  const router = useRouter();
  const [resumes, setResumes] = useState(initialResumes);
  const [query, setQuery] = useState("");
  const [templateFilter, setTemplateFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("edited");

  const filtered = useMemo(() => {
    let list = [...resumes];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((r) => {
        const skills = r.content.skills
          .flatMap((c) => c.skills.map((s) => s.name))
          .join(" ")
          .toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.content.personal.jobTitle.toLowerCase().includes(q) ||
          r.content.personal.fullName.toLowerCase().includes(q) ||
          skills.includes(q)
        );
      });
    }

    if (templateFilter !== "all") {
      list = list.filter((r) => r.template_id === templateFilter);
    }

    list.sort((a, b) => {
      if (sort === "alpha") return a.title.localeCompare(b.title);
      if (sort === "oldest")
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sort === "newest")
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return list;
  }, [resumes, query, templateFilter, sort]);

  async function onDuplicate(id: string) {
    try {
      const copy = await duplicateResume(id);
      setResumes((prev) => [copy, ...prev]);
      toast.success("Resume duplicated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Duplicate failed");
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this resume permanently?")) return;
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
      toast.success("Resume deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function templateName(id: TemplateId) {
    return TEMPLATES.find((t) => t.id === id)?.name || id;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Resumes</h1>
          <p className="text-sm text-muted-foreground">
            Create, edit, and export professional resumes
          </p>
        </div>
        <CreateResumeButton />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Input
          placeholder="Search by name, title, or skills…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search resumes"
        />
        <Select
          value={templateFilter}
          onChange={(e) => setTemplateFilter(e.target.value)}
          aria-label="Filter by template"
        >
          <option value="all">All templates</option>
          {TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label="Sort resumes"
        >
          <option value="edited">Recently edited</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alpha">Alphabetical</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <MoreHorizontal className="mb-3 h-8 w-8 text-muted-foreground" />
            <h2 className="text-lg font-semibold">No resumes yet</h2>
            <p className="mb-4 max-w-sm text-sm text-muted-foreground">
              Create your first resume to start building with live preview and templates.
            </p>
            <CreateResumeButton />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resume) => (
            <Card key={resume.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-1 text-base">{resume.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {resume.content.personal.jobTitle || "No job title yet"}
                </p>
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                <Badge className="bg-secondary text-secondary-foreground">
                  {templateName(resume.template_id)}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Updated{" "}
                  {formatDistanceToNow(new Date(resume.updated_at), { addSuffix: true })}
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/builder/${resume.id}`)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  aria-label="Duplicate resume"
                  onClick={() => onDuplicate(resume.id)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  aria-label="Delete resume"
                  onClick={() => onDelete(resume.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
