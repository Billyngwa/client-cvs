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

export function ModernTemplate({ content }: { content: ResumeContent }) {
  const p = content.personal;
  return (
    <div className="flex min-h-[297mm] text-[11px]">
      <aside className="w-[32%] bg-slate-800 p-5 text-white">
        {p.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.photoUrl}
            alt={p.fullName}
            className="mb-4 h-24 w-24 rounded-full object-cover object-top"
          />
        )}
        <h1 className="text-lg font-bold leading-tight">{p.fullName || "Your Name"}</h1>
        <p className="mt-1 text-[11px] text-slate-300">{p.jobTitle}</p>
        <div className="mt-5 space-y-1 text-[9px] text-slate-200">
          {p.email && <p>{p.email}</p>}
          {p.phone && <p>{p.phone}</p>}
          {(p.city || p.country) && (
            <p>{[p.city, p.country].filter(Boolean).join(", ")}</p>
          )}
          {p.linkedin && <p>{p.linkedin}</p>}
          {p.github && <p>{p.github}</p>}
        </div>
        <div className="mt-6 [&_h2]:border-slate-500 [&_h2]:text-slate-100 [&_p]:text-slate-200">
          <SkillsBlock content={content} />
          <LanguagesBlock content={content} />
        </div>
      </aside>
      <main className="w-[68%] p-6">
        <SummaryBlock content={content} />
        <ExperienceBlock content={content} />
        <EducationBlock content={content} />
        <ProjectsBlock content={content} />
        <CertificationsBlock content={content} />
        <AdditionalBlock content={content} />
        <ReferencesBlock content={content} />
      </main>
    </div>
  );
}
