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

/** Single-column, plain typography — best for ATS parsers */
export function AtsTemplate({ content }: { content: ResumeContent }) {
  const p = content.personal;
  return (
    <div className="min-h-[297mm] p-8 font-sans">
      <h1 className="text-xl font-bold">{p.fullName || "Your Name"}</h1>
      <p className="text-sm">{p.jobTitle}</p>
      <ContactLine content={content} />
      <hr className="my-3 border-neutral-400" />
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
