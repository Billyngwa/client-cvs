import type { ResumeContent } from "@/types/resume";
import { formatDate } from "@/lib/utils";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 border-b border-neutral-300 pb-1 text-[11px] font-bold uppercase tracking-wider text-neutral-800">
      {children}
    </h2>
  );
}

export function BulletList({ text }: { text?: string }) {
  if (!text?.trim()) return null;
  const items = text
    .split(/\n|•/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (!items.length) return null;
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10px] leading-relaxed text-neutral-700">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ContactLine({ content }: { content: ResumeContent }) {
  const p = content.personal;
  const parts = [
    p.email,
    p.phone,
    [p.city, p.country].filter(Boolean).join(", "),
    p.linkedin,
    p.website || p.portfolio,
  ].filter(Boolean);
  return (
    <p className="text-[10px] text-neutral-600">{parts.join(" · ")}</p>
  );
}

export function ExperienceBlock({ content }: { content: ResumeContent }) {
  if (!content.experience.length) return null;
  return (
    <section className="mb-3">
      <SectionTitle>Experience</SectionTitle>
      {content.experience.map((job) => (
        <div key={job.id} className="mb-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[11px] font-semibold">
              {job.position}
              {job.company ? ` — ${job.company}` : ""}
            </p>
            <p className="shrink-0 text-[9px] text-neutral-500">
              {formatDate(job.startDate)} –{" "}
              {job.currentlyWorking ? "Present" : formatDate(job.endDate)}
            </p>
          </div>
          <BulletList text={job.responsibilities} />
          <BulletList text={job.achievements} />
        </div>
      ))}
    </section>
  );
}

export function EducationBlock({ content }: { content: ResumeContent }) {
  if (!content.education.length) return null;
  return (
    <section className="mb-3">
      <SectionTitle>Education</SectionTitle>
      {content.education.map((ed) => (
        <div key={ed.id} className="mb-2">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[11px] font-semibold">
              {ed.degree}
              {ed.field ? ` in ${ed.field}` : ""}
            </p>
            <p className="shrink-0 text-[9px] text-neutral-500">
              {formatDate(ed.startDate)} – {formatDate(ed.endDate)}
            </p>
          </div>
          <p className="text-[10px] text-neutral-600">{ed.school}</p>
          {ed.gpa && <p className="text-[9px] text-neutral-500">GPA: {ed.gpa}</p>}
          <BulletList text={ed.description} />
        </div>
      ))}
    </section>
  );
}

export function SkillsBlock({ content }: { content: ResumeContent }) {
  const cats = content.skills.filter((c) => c.skills.length);
  if (!cats.length) return null;
  return (
    <section className="mb-3">
      <SectionTitle>Skills</SectionTitle>
      {cats.map((cat) => (
        <p key={cat.id} className="mb-1 text-[10px]">
          <span className="font-semibold">{cat.name}: </span>
          {cat.skills.map((s) => s.name).join(", ")}
        </p>
      ))}
    </section>
  );
}

export function ProjectsBlock({ content }: { content: ResumeContent }) {
  if (!content.projects.length) return null;
  return (
    <section className="mb-3">
      <SectionTitle>Projects</SectionTitle>
      {content.projects.map((p) => (
        <div key={p.id} className="mb-2">
          <p className="text-[11px] font-semibold">{p.name}</p>
          <p className="text-[10px] text-neutral-700">{p.description}</p>
          {p.technologies && (
            <p className="text-[9px] text-neutral-500">{p.technologies}</p>
          )}
        </div>
      ))}
    </section>
  );
}

export function CertificationsBlock({ content }: { content: ResumeContent }) {
  if (!content.certifications.length) return null;
  return (
    <section className="mb-3">
      <SectionTitle>Certifications</SectionTitle>
      {content.certifications.map((c) => (
        <p key={c.id} className="mb-1 text-[10px]">
          <span className="font-semibold">{c.name}</span>
          {c.issuer ? ` — ${c.issuer}` : ""}
          {c.date ? ` (${formatDate(c.date)})` : ""}
        </p>
      ))}
    </section>
  );
}

export function LanguagesBlock({ content }: { content: ResumeContent }) {
  if (!content.languages.length) return null;
  return (
    <section className="mb-3">
      <SectionTitle>Languages</SectionTitle>
      <p className="text-[10px]">
        {content.languages
          .map((l) => `${l.language} (${l.proficiency})`)
          .join(" · ")}
      </p>
    </section>
  );
}

export function AdditionalBlock({ content }: { content: ResumeContent }) {
  if (!content.additional?.trim()) return null;
  return (
    <section className="mb-3">
      <SectionTitle>Additional Information</SectionTitle>
      <p className="whitespace-pre-wrap text-[10px] text-neutral-700">
        {content.additional}
      </p>
    </section>
  );
}

export function ReferencesBlock({ content }: { content: ResumeContent }) {
  if (!content.references.length) return null;
  return (
    <section className="mb-3">
      <SectionTitle>References</SectionTitle>
      {content.references.map((r) => (
        <p key={r.id} className="mb-1 text-[10px]">
          <span className="font-semibold">{r.name}</span>
          {r.title ? `, ${r.title}` : ""}
          {r.company ? ` at ${r.company}` : ""}
          {r.email ? ` · ${r.email}` : ""}
        </p>
      ))}
    </section>
  );
}

export function SummaryBlock({ content }: { content: ResumeContent }) {
  if (!content.summary?.trim()) return null;
  return (
    <section className="mb-3">
      <SectionTitle>Summary</SectionTitle>
      <p className="text-[10px] leading-relaxed text-neutral-700">{content.summary}</p>
    </section>
  );
}
