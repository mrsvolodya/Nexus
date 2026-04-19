import { Github, Linkedin, Mail, Send } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/data/nav";

const SOCIALS = [
  {
    label: "Email",
    href: "mailto:hello@nexus.dev",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    label: "Telegram",
    href: "https://t.me/nexus",
    icon: Send,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-background/60">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
              Nexus is an engineering partner for ambitious product teams. We
              curate, grow, and place world-class developers — and build the
              ecosystem where they thrive long-term.
            </p>
            <ul className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-primary/40 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-xs uppercase tracking-wider text-white/50">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
              <li>
                <a href="mailto:hello@nexus.dev" className="hover:text-white">
                  hello@nexus.dev
                </a>
              </li>
              <li>
                <a href="mailto:talent@nexus.dev" className="hover:text-white">
                  talent@nexus.dev
                </a>
              </li>
              <li className="text-white/50">Remote-first · Global</li>
            </ul>
          </div>
        </div>

        <div className="divider-line mt-12" />

        <div className="mt-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            © {year} Nexus Labs. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Built with care. Engineered for scale.
          </p>
        </div>
      </div>
    </footer>
  );
}
