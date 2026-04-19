import type { NavLink } from "@/types/content";

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Why Nexus", href: "#why-nexus" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "English", href: "#english" },
  { label: "Careers", href: "#careers" },
] as const;

export const CTA_HREF = "#apply";
