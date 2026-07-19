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

export function DarkTemplate({ content }: { content: ResumeContent }) {
  const p = content.personal;
  return (
    <div className="min-h-[297mm] bg-neutral-950 p-8 text-neutral-100">
      <header className="mb-5 border-b border-neutral-700 pb-4">
        <h1 className="text-2xl font-bold text-white">{p.fullName || "Your Name"}</h1>
        <p className="text-sm text-emerald-400">{p.jobTitle}</p>
        <div className="mt-2 [&_p]:text-neutral-400">
          <ContactLine content={content} />
        </div>
      </header>
      <div className="[&_h2]:border-neutral-700 [&_h2]:text-emerald-400 [&_li]:text-neutral-300 [&_p]:text-neutral-300">
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
