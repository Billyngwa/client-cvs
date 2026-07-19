import type { ResumeContent, TemplateId } from "@/types/resume";

export function createEmptyResumeContent(): ResumeContent {
  return {
    personal: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      city: "",
      website: "",
      linkedin: "",
      github: "",
      portfolio: "",
      photoUrl: "",
    },
    summary: "",
    education: [],
    experience: [],
    skills: [
      {
        id: createId(),
        name: "Programming",
        skills: [],
      },
    ],
    projects: [],
    certifications: [],
    languages: [],
    references: [],
    additional: "",
  };
}

export function createId() {
  return crypto.randomUUID();
}

export const DEFAULT_TEMPLATE: TemplateId = "modern";
