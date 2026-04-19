import { BookOpenCheck, Compass, Network, Sparkles } from "lucide-react";
import type { EcosystemPillar } from "@/types/content";

export const ECOSYSTEM: readonly EcosystemPillar[] = [
  {
    id: "learning",
    eyebrow: "Learning",
    title: "Nexus Tracks",
    description:
      "Structured internal tracks for backend, frontend, mobile, DevOps and architecture. Pair programming, design reviews, real-world katas.",
    icon: BookOpenCheck,
    status: "Rolling out 2026",
  },
  {
    id: "mentorship",
    eyebrow: "Mentorship",
    title: "1:1 Mentorship Program",
    description:
      "Every engineer gets a senior mentor and a quarterly growth plan. Real feedback, real promotions, a real skill ladder.",
    icon: Compass,
    status: "Live",
  },
  {
    id: "culture",
    eyebrow: "Culture",
    title: "Engineering Culture",
    description:
      "A culture where craft is respected, questions are welcomed and good engineers get to do their best work.",
    icon: Sparkles,
    status: "Live",
  },
  {
    id: "network",
    eyebrow: "Network",
    title: "Talent Ecosystem",
    description:
      "A long-term network where strong engineers meet ambitious products — inside Nexus, across cohorts, and out into the industry.",
    icon: Network,
    status: "On the roadmap",
  },
] as const;
