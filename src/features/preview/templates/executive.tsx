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

export function ExecutiveTemplate({ content }: { content: ResumeContent }) {
  const p = content.personal;
  return (
    <div className="min-h-[297mm] p-8">
      <header className="mb-5 bg-neutral-900 px-5 py-4 text-white">
        <h1 className="text-2xl font-bold">{p.fullName || "Your Name"}</h1>
        <p className="text-sm text-neutral-300">{p.jobTitle}</p>
        <div className="mt-2 text-neutral-300 [&_p]:text-neutral-300">
          <ContactLine content={content} />
        </div>
      </header>
      <SummaryBlock content={content} />
      <ExperienceBlock content={content} />
      <div className="grid grid-cols-2 gap-4">
        <EducationBlock content={content} />
        <SkillsBlock content={content} />
      </div>
      <ProjectsBlock content={content} />
      <CertificationsBlock content={content} />
      <LanguagesBlock content={content} />
      <AdditionalBlock content={content} />
      <ReferencesBlock content={content} />
    </div>
  );
}
