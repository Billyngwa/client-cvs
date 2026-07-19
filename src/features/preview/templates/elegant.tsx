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

export function ElegantTemplate({ content }: { content: ResumeContent }) {
  const p = content.personal;
  return (
    <div className="min-h-[297mm] p-10 font-serif">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-normal tracking-wide">
          {p.fullName || "Your Name"}
        </h1>
        <p className="mt-1 italic text-neutral-600">{p.jobTitle}</p>
        <div className="mx-auto mt-3 h-px w-24 bg-neutral-400" />
        <div className="mt-3 flex justify-center">
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
