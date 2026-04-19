import { Users, Layers, Rocket } from "lucide-react";
import type { Service } from "@/types/content";

export const SERVICES: readonly Service[] = [
  {
    id: "staff-augmentation",
    title: "Staff Augmentation",
    tagline: "Extend your team, keep your tempo.",
    description:
      "Plug senior engineers into your squads in days, not quarters. They ship in your stack, your rituals, your codebase.",
    bullets: [
      "Curated senior talent",
      "Time-zone aligned collaboration",
      "Flexible ramp-up and ramp-down",
    ],
    icon: Users,
  },
  {
    id: "dedicated-teams",
    title: "Dedicated Teams",
    tagline: "A team that owns the outcome.",
    description:
      "Cross-functional pods built around your roadmap — engineering, design, QA and delivery leadership working as one unit.",
    bullets: [
      "Pre-vetted engineering pods",
      "Embedded tech and delivery leads",
      "Shared OKRs with your org",
    ],
    icon: Layers,
  },
  {
    id: "product-development",
    title: "Product Development",
    tagline: "From zero to launched product.",
    description:
      "End-to-end product delivery — discovery, design, build and scale — with clear milestones and honest engineering trade-offs.",
    bullets: [
      "Discovery → MVP → scale",
      "Modern architectures & DevEx",
      "Security and compliance by default",
    ],
    icon: Rocket,
  },
] as const;
