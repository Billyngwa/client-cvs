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

export function ProfessionalTemplate({ content }: { content: ResumeContent }) {
  const p = content.personal;
  return (
    <div className="min-h-[297mm] p-8">
      <header className="mb-4 border-b-2 border-neutral-800 pb-3 text-center">
        <h1 className="text-2xl font-bold tracking-wide uppercase">
          {p.fullName || "Your Name"}
        </h1>
        <p className="mt-1 text-sm text-neutral-600">{p.jobTitle}</p>
        <div className="mt-2 flex justify-center">
          <ContactLine content={content} />
        </div>
      </header>
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
