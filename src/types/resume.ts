export type TemplateId =
  | "modern"
  | "professional"
  | "executive"
  | "minimal"
  | "creative"
  | "ats"
  | "elegant"
  | "dark";

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type LanguageProficiency =
  | "native"
  | "fluent"
  | "professional"
  | "intermediate"
  | "beginner";
export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "freelance";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  website: string;
  linkedin: string;
  github: string;
  portfolio: string;
  photoUrl: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string;
  achievements: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { id: string; name: string; level: SkillLevel }[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: LanguageProficiency;
}

export interface ReferenceEntry {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

export interface ResumeContent {
  personal: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillCategory[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
  references: ReferenceEntry[];
  additional: string;
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  template_id: TemplateId;
  content: ResumeContent;
  is_public: boolean;
  public_slug: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type SaveStatus = "idle" | "saving" | "saved" | "unsaved" | "offline" | "error";

export const BUILDER_STEPS = [
  { id: "personal", label: "Personal", description: "Contact & identity" },
  { id: "summary", label: "Summary", description: "Professional overview" },
  { id: "education", label: "Education", description: "Schools & degrees" },
  { id: "experience", label: "Experience", description: "Work history" },
  { id: "skills", label: "Skills", description: "Skills & levels" },
  { id: "certifications", label: "Certifications", description: "Credentials" },
  { id: "languages", label: "Languages", description: "Language proficiency" },
  { id: "projects", label: "Projects", description: "Portfolio work" },
  { id: "references", label: "References", description: "Professional refs" },
  { id: "additional", label: "Additional", description: "Extra details" },
] as const;

export type BuilderStepId = (typeof BUILDER_STEPS)[number]["id"];

export const TEMPLATES: {
  id: TemplateId;
  name: string;
  description: string;
}[] = [
  { id: "modern", name: "Modern", description: "Clean accent sidebar layout" },
  { id: "professional", name: "Professional", description: "Classic corporate style" },
  { id: "executive", name: "Executive", description: "Bold leadership presence" },
  { id: "minimal", name: "Minimal", description: "Whitespace-focused simplicity" },
  { id: "creative", name: "Creative", description: "Distinctive visual hierarchy" },
  { id: "ats", name: "ATS Friendly", description: "Optimized for parsers" },
  { id: "elegant", name: "Elegant", description: "Refined serif typography" },
  { id: "dark", name: "Dark Theme", description: "High-contrast dark design" },
];
