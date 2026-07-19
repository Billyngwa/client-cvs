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

export function CreativeTemplate({ content }: { content: ResumeContent }) {
  const p = content.personal;
  return (
    <div className="min-h-[297mm] overflow-hidden">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 py-6 text-white">
        <h1 className="text-2xl font-bold">{p.fullName || "Your Name"}</h1>
        <p className="text-sm text-violet-100">{p.jobTitle}</p>
        <div className="mt-2 text-violet-100 [&_p]:text-violet-100">
          <ContactLine content={content} />
        </div>
      </div>
      <div className="p-8">
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
    </div>
  );
}
