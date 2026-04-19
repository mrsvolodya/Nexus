import { Github, Linkedin, Mail, Send } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/constants/nav";

const SOCIALS = [
  { label: "Email", href: "mailto:hello@nexus.dev", icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Telegram", href: "https://t.me/nexus", icon: Send },
  { label: "GitHub", href: "https://github.com", icon: Github },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative">
      <div className="container">
        <div className="glass relative overflow-hidden rounded-t-3xl px-6 py-12 sm:px-10 lg:px-14">
          <span aria-hidden className="footer-sweep" />
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Nexus is an engineering partner for ambitious product teams.
                We curate, grow, and place world-class developers — and build
                the ecosystem where they thrive long-term.
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
                        className="inline-grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/60 text-foreground/70 transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <nav aria-label="Footer navigation">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
                Explore
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-foreground/75 transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
                Contact
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-foreground/75">
                <li>
                  <a href="mailto:hello@nexus.dev" className="hover:text-foreground">
                    hello@nexus.dev
                  </a>
                </li>
                <li>
                  <a href="mailto:talent@nexus.dev" className="hover:text-foreground">
                    talent@nexus.dev
                  </a>
                </li>
                <li className="text-muted-foreground">Remote-first · Global</li>
              </ul>
            </div>
          </div>

          <div className="divider-line mt-10" />

          <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              © {year} Nexus Labs. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/80">
              Built with care. Engineered for scale.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
