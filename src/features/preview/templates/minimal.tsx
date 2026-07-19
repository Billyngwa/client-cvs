import type { ResumeContent } from "@/types/resume";
import {
  AdditionalBlock,
  CertificationsBlock,
  ContactLine,
  EducationBlock,
  ExperienceBlock,
  LanguagesBlock,
  ProjectsBlock,
  ReferencesBlock,
  SkillsBlock,
  SummaryBlock,
} from "../blocks";

export function MinimalTemplate({ content }: { content: ResumeContent }) {
  const p = content.personal;
  return (
    <div className="min-h-[297mm] p-10">
      <h1 className="text-3xl font-light tracking-tight">{p.fullName || "Your Name"}</h1>
      <p className="mt-1 text-sm text-neutral-500">{p.jobTitle}</p>
      <div className="mt-3 mb-8">
        <ContactLine content={content} />
      </div>
      <SummaryBlock content={content} />
      <ExperienceBlock content={content} />
      <EducationBlock content={content} />
      <SkillsBlock content={content} />
      <ProjectsBlock content={content} />
      <CertificationsBlock content={content} />
      <LanguagesBlock content={content} />
      <AdditionalBlock content={content} />
      <ReferencesBlock content={content} />
    </div>
  );
}
