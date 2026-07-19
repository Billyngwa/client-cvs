"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CloudOff,
  Download,
  Loader2,
  Printer,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { ResumePreview } from "@/features/preview/resume-preview";
import { BuilderSteps } from "@/features/builder/builder-steps";
import { StepPersonal } from "@/features/builder/steps/step-personal";
import { StepSummary } from "@/features/builder/steps/step-summary";
import { StepEducation } from "@/features/builder/steps/step-education";
import { StepExperience } from "@/features/builder/steps/step-experience";
import { StepSkills } from "@/features/builder/steps/step-skills";
import { StepCertifications } from "@/features/builder/steps/step-certifications";
import { StepLanguages } from "@/features/builder/steps/step-languages";
import { StepProjects } from "@/features/builder/steps/step-projects";
import { StepReferences } from "@/features/builder/steps/step-references";
import { StepAdditional } from "@/features/builder/steps/step-additional";
import { useAutosave } from "@/hooks/use-autosave";
import { cn } from "@/lib/utils";
import {
  BUILDER_STEPS,
  TEMPLATES,
  type BuilderStepId,
  type Resume,
  type ResumeContent,
  type SaveStatus,
  type TemplateId,
} from "@/types/resume";

function statusLabel(status: SaveStatus) {
  switch (status) {
    case "saving":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" /> Saving…
        </span>
      );
    case "saved":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
          <Check className="h-3 w-3" /> Saved
        </span>
      );
    case "unsaved":
      return <span className="text-xs text-amber-600">Unsaved changes</span>;
    case "offline":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-destructive">
          <CloudOff className="h-3 w-3" /> Offline
        </span>
      );
    case "error":
      return <span className="text-xs text-destructive">Save failed</span>;
    default:
      return null;
  }
}

export function BuilderWorkspace({ resume }: { resume: Resume }) {
  const [step, setStep] = useState<BuilderStepId>("personal");
  const [title, setTitle] = useState(resume.title);
  const [templateId, setTemplateId] = useState<TemplateId>(resume.template_id);
  const [content, setContent] = useState<ResumeContent>(resume.content);

  const { status, saveNow } = useAutosave(resume.id, content, title, templateId);

  const stepIndex = BUILDER_STEPS.findIndex((s) => s.id === step);

  function patchContent(patch: Partial<ResumeContent>) {
    setContent((prev) => ({ ...prev, ...patch }));
  }

  function go(delta: number) {
    const next = BUILDER_STEPS[stepIndex + delta];
    if (next) setStep(next.id);
  }

  async function exportPdf() {
    try {
      await saveNow();
      window.print();
    } catch {
      toast.error("Could not prepare PDF");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur print:hidden">
        <div className="flex h-14 items-center gap-3 px-4">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-9 max-w-xs"
            aria-label="Resume title"
          />
          <Select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value as TemplateId)}
            className="h-9 max-w-[160px]"
            aria-label="Template"
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
          <div className="ml-auto flex items-center gap-2">
            {statusLabel(status)}
            <Button type="button" size="sm" variant="outline" onClick={() => void saveNow()}>
              <Save className="h-3.5 w-3.5" />
              Save
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={exportPdf}>
              <Printer className="h-3.5 w-3.5" />
              Print / PDF
            </Button>
            <a
              href={`/api/resumes/${resume.id}/pdf`}
              className={cn(buttonVariants({ size: "sm" }))}
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="grid flex-1 lg:grid-cols-2">
        <div className="border-r bg-background print:hidden">
          <BuilderSteps current={step} onChange={setStep} />
          <div className="p-4 sm:p-6">
            {step === "personal" && (
              <StepPersonal
                value={content.personal}
                userId={resume.user_id}
                onChange={(personal) => patchContent({ personal })}
              />
            )}
            {step === "summary" && (
              <StepSummary
                value={content.summary}
                onChange={(summary) => patchContent({ summary })}
              />
            )}
            {step === "education" && (
              <StepEducation
                value={content.education}
                onChange={(education) => patchContent({ education })}
              />
            )}
            {step === "experience" && (
              <StepExperience
                value={content.experience}
                onChange={(experience) => patchContent({ experience })}
              />
            )}
            {step === "skills" && (
              <StepSkills
                value={content.skills}
                onChange={(skills) => patchContent({ skills })}
              />
            )}
            {step === "certifications" && (
              <StepCertifications
                value={content.certifications}
                onChange={(certifications) => patchContent({ certifications })}
              />
            )}
            {step === "languages" && (
              <StepLanguages
                value={content.languages}
                onChange={(languages) => patchContent({ languages })}
              />
            )}
            {step === "projects" && (
              <StepProjects
                value={content.projects}
                onChange={(projects) => patchContent({ projects })}
              />
            )}
            {step === "references" && (
              <StepReferences
                value={content.references}
                onChange={(references) => patchContent({ references })}
              />
            )}
            {step === "additional" && (
              <StepAdditional
                value={content.additional}
                onChange={(additional) => patchContent({ additional })}
              />
            )}

            <div className="mt-8 flex justify-between border-t pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={stepIndex === 0}
                onClick={() => go(-1)}
              >
                Back
              </Button>
              <Button
                type="button"
                disabled={stepIndex === BUILDER_STEPS.length - 1}
                onClick={() => go(1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-auto bg-neutral-200/60 p-4 dark:bg-neutral-900 print:bg-white print:p-0">
          <div className="print:hidden mb-3 text-center text-xs font-medium text-muted-foreground">
            Live preview · {TEMPLATES.find((t) => t.id === templateId)?.name}
          </div>
          <div id="resume-print-root">
            <ResumePreview content={content} templateId={templateId} />
          </div>
        </div>
      </div>
    </div>
  );
}
