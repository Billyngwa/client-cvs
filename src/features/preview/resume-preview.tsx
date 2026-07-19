"use client";

import type { ResumeContent, TemplateId } from "@/types/resume";
import { ModernTemplate } from "./templates/modern";
import { ProfessionalTemplate } from "./templates/professional";
import { ExecutiveTemplate } from "./templates/executive";
import { MinimalTemplate } from "./templates/minimal";
import { CreativeTemplate } from "./templates/creative";
import { AtsTemplate } from "./templates/ats";
import { ElegantTemplate } from "./templates/elegant";
import { DarkTemplate } from "./templates/dark";

const TEMPLATE_MAP = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  executive: ExecutiveTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  ats: AtsTemplate,
  elegant: ElegantTemplate,
  dark: DarkTemplate,
} as const;

export function ResumePreview({
  content,
  templateId,
}: {
  content: ResumeContent;
  templateId: TemplateId;
}) {
  const Template = TEMPLATE_MAP[templateId] || ModernTemplate;
  return (
    <div className="resume-preview-root mx-auto w-full max-w-[210mm] origin-top scale-[0.55] sm:scale-[0.7] lg:scale-[0.85] xl:scale-100">
      <div className="resume-a4 bg-white text-black shadow-xl">
        <Template content={content} />
      </div>
    </div>
  );
}
