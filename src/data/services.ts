import { Users, Layers, Rocket, type LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    id: "staff-augmentation",
    title: "Staff Augmentation",
    tagline: "Extend your team, keep your tempo.",
    description:
      "Plug senior engineers into your squads in days, not quarters. Seamless integration with your stack, rituals, and codebase.",
    bullets: [
      "Curated senior talent",
      "Time-zone aligned collaboration",
      "Flexible ramp-up & ramp-down",
    ],
    icon: Users,
  },
  {
    id: "dedicated-teams",
    title: "Dedicated Development Teams",
    tagline: "A team that owns the outcome.",
    description:
      "Cross-functional pods built around your roadmap — engineering, design, QA and delivery leadership, working as one unit.",
    bullets: [
      "Pre-vetted engineering pods",
      "Embedded tech & delivery leads",
      "Shared OKRs with your org",
    ],
    icon: Layers,
  },
  {
    id: "product-development",
    title: "Custom Product Development",
    tagline: "From zero to launched product.",
    description:
      "End-to-end product delivery. We discover, design, build and scale — with clear milestones and honest engineering tradeoffs.",
    bullets: [
      "Discovery → MVP → scale",
      "Modern architectures & DevEx",
      "Security and compliance by default",
    ],
    icon: Rocket,
  },
];
