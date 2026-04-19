import {
  BookOpenCheck,
  Languages,
  Compass,
  Network,
  type LucideIcon,
} from "lucide-react";

export type EcosystemPillar = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: "Live" | "Rolling out 2026" | "On the roadmap";
};

export const ECOSYSTEM: EcosystemPillar[] = [
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
    id: "english",
    eyebrow: "Communication",
    title: "English Academy",
    description:
      "In-house language coaches, speaking clubs, and writing labs. Engineers communicate with clarity across async channels and calls.",
    icon: Languages,
    status: "Rolling out 2026",
  },
  {
    id: "mentorship",
    eyebrow: "Mentorship",
    title: "1:1 Mentorship Program",
    description:
      "Every engineer gets a senior mentor and a quarterly growth plan. Real feedback, real promotions, real skill ladder.",
    icon: Compass,
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
];
