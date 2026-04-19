import {
  ShieldCheck,
  Gauge,
  Sparkles,
  GraduationCap,
  Languages,
  HeartHandshake,
} from "lucide-react";
import type { Reason } from "@/types/content";

export const REASONS: readonly Reason[] = [
  {
    title: "A trusted engineering network",
    description:
      "Every engineer is interviewed by senior practitioners. We hire ~3% of who we meet and vouch for every placement.",
    icon: ShieldCheck,
  },
  {
    title: "Fast, frictionless collaboration",
    description:
      "Matching, onboarding and access in under a week. Most clients see first PRs merged within 10 business days.",
    icon: Gauge,
  },
  {
    title: "Scalable hiring, on demand",
    description:
      "Grow or shrink your team in weeks. Roles, seniority, timezones — we shape the team to fit the moment.",
    icon: Sparkles,
  },
  {
    title: "Growth-focused environment",
    description:
      "Structured learning tracks, architecture reviews, mentorship. Engineers sharpen the craft, your product gets the upside.",
    icon: GraduationCap,
  },
  {
    title: "English-fluent communication",
    description:
      "Business-level English is table stakes. Dedicated coaching keeps async collaboration effortless.",
    icon: Languages,
  },
  {
    title: "Built for long-term partnership",
    description:
      "Low churn, transparent pricing, honest engineering. We optimize for the 3-year relationship, not the first invoice.",
    icon: HeartHandshake,
  },
] as const;
