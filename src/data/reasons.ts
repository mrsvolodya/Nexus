import {
  ShieldCheck,
  Sparkles,
  Gauge,
  GraduationCap,
  Languages,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export type Reason = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const REASONS: Reason[] = [
  {
    title: "Curated talent, not a marketplace",
    description:
      "Every engineer is interviewed by senior practitioners. We hire ~3% of who we meet and vouch for every placement.",
    icon: ShieldCheck,
  },
  {
    title: "Ship in days, not months",
    description:
      "Matching, onboarding and access in under a week. Most clients see first PRs merged within 10 business days.",
    icon: Gauge,
  },
  {
    title: "Growth-first culture",
    description:
      "We invest in our engineers — reviews, mentorship, conference budgets — so they invest in your product.",
    icon: Sparkles,
  },
  {
    title: "Structured learning tracks",
    description:
      "Internal curricula in system design, architecture and leadership keep teams sharp and aligned with industry standards.",
    icon: GraduationCap,
  },
  {
    title: "English-fluent communication",
    description:
      "Business-level English is table stakes. Dedicated language coaching keeps async collaboration effortless.",
    icon: Languages,
  },
  {
    title: "Built for long-term partnership",
    description:
      "Low churn, transparent pricing, honest engineering. We optimize for the 3-year relationship, not the first invoice.",
    icon: HeartHandshake,
  },
];
