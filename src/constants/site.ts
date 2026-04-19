/**
 * Single source of truth for site-wide metadata. Used by app/layout,
 * sitemap.ts, robots.ts and JSON-LD. Update once, propagates everywhere.
 */
export const SITE = {
  name: "Nexus",
  tagline: "Scale teams. Grow talent. Deliver products.",
  description:
    "Nexus connects strong engineers with ambitious products. Staff augmentation, dedicated teams, and custom product delivery — with a growth ecosystem built for engineers.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://nexus.dev",
  locale: "en_US",
  twitter: "@nexus",
  contactEmail: "hello@nexus.dev",
} as const;
