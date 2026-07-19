import { z } from "zod";

export const personalSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  jobTitle: z.string().optional().default(""),
  email: z.string().email("Valid email required").or(z.literal("")),
  phone: z.string().optional().default(""),
  address: z.string().optional().default(""),
  country: z.string().optional().default(""),
  city: z.string().optional().default(""),
  website: z.string().url("Invalid URL").or(z.literal("")).optional().default(""),
  linkedin: z.string().optional().default(""),
  github: z.string().optional().default(""),
  portfolio: z.string().url("Invalid URL").or(z.literal("")).optional().default(""),
  photoUrl: z.string().optional().default(""),
});

export const summarySchema = z.object({
  summary: z.string().max(2000, "Keep under 2000 characters").optional().default(""),
});
