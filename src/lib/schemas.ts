import { z } from "zod";
import {
  ENGLISH_LEVELS,
  AVAILABILITY_OPTIONS,
  EXPERIENCE_RANGES,
  ROLES,
} from "@/constants/options";

const MAX_CV_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const urlOrEmpty = z
  .string()
  .trim()
  .optional()
  .refine(
    (v) => !v || /^https?:\/\/.+\..+/i.test(v),
    "Must be a valid URL starting with http(s)://",
  );

const optionalFile = z
  .custom<FileList | undefined>()
  .optional()
  .refine((files) => {
    if (!files || files.length === 0) return true;
    return files[0].size <= MAX_CV_SIZE;
  }, "CV must be smaller than 8MB")
  .refine((files) => {
    if (!files || files.length === 0) return true;
    return ALLOWED_CV_TYPES.includes(files[0].type);
  }, "CV must be a PDF or Word document");

export const applicationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  contact: z
    .string()
    .trim()
    .min(3, "Add a Telegram handle or phone number so we can reach you"),
  location: z.string().trim().min(2, "Where are you based?"),
  role: z.enum(ROLES, { errorMap: () => ({ message: "Select a role" }) }),
  experience: z.enum(EXPERIENCE_RANGES, {
    errorMap: () => ({ message: "Select your experience" }),
  }),
  primaryStack: z
    .string()
    .trim()
    .min(2, "Tell us your primary tech stack"),
  secondaryStack: z.string().trim().optional(),
  englishLevel: z.enum(ENGLISH_LEVELS, {
    errorMap: () => ({ message: "Select your English level" }),
  }),
  availability: z.enum(AVAILABILITY_OPTIONS, {
    errorMap: () => ({ message: "Select availability" }),
  }),
  rate: z
    .string()
    .trim()
    .min(1, "Share your expected rate or salary")
    .max(64, "Keep it short — a range works"),
  linkedin: urlOrEmpty,
  github: urlOrEmpty,
  cv: optionalFile,
  motivation: z
    .string()
    .trim()
    .min(60, "Give us at least a few sentences (60+ characters)")
    .max(1200, "Keep it under 1200 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please consent to proceed" }),
  }),
  /** Optional, explicit opt-in to attach Daily Signal results. */
  attachChallenge: z.boolean().optional().default(false),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
