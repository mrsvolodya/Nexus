import type { LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

export type Reason = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type EcosystemPillar = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: "Live" | "Rolling out 2026" | "On the roadmap";
};

export type Opportunity = {
  role: string;
  seniority: "Mid" | "Senior" | "Staff" | "Lead";
  stack: string[];
  location: string;
  type: "Full-time" | "Contract";
};

export type Stat = {
  value: string;
  label: string;
  hint?: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type EnglishBenefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};
