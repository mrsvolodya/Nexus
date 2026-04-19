export const ROLES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full-stack Engineer",
  "Mobile Engineer",
  "DevOps / Platform Engineer",
  "Data / ML Engineer",
  "QA / Test Engineer",
  "Engineering Manager",
  "Designer",
  "Product Manager",
] as const;

export const EXPERIENCE_RANGES = [
  "0–1 years",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8+ years",
] as const;

export const ENGLISH_LEVELS = [
  "A1 — Beginner",
  "A2 — Elementary",
  "B1 — Intermediate",
  "B2 — Upper-Intermediate",
  "C1 — Advanced",
  "C2 — Proficient",
] as const;

export const AVAILABILITY_OPTIONS = [
  "Immediately",
  "Within 2 weeks",
  "Within a month",
  "2+ months",
  "Open to offers",
] as const;

export type Role = (typeof ROLES)[number];
export type ExperienceRange = (typeof EXPERIENCE_RANGES)[number];
export type EnglishLevel = (typeof ENGLISH_LEVELS)[number];
export type Availability = (typeof AVAILABILITY_OPTIONS)[number];
