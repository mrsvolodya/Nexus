"use client";

import { motion } from "motion/react";
import { Reveal, RevealStagger, revealItem } from "@/components/effects/Reveal";
import { ECOSYSTEM } from "@/data/ecosystem";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  Live: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
  "Rolling out 2026":
    "text-primary bg-primary/10 border-primary/20",
  "On the roadmap": "text-white/60 bg-white/5 border-white/10",
};

export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="relative section-padding"
      aria-labelledby="ecosystem-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mesh-1 opacity-40 blur-3xl" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="chip">The Nexus Ecosystem</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="ecosystem-title"
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              More than a job. <span className="gradient-text">A career operating system.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-white/60 sm:text-lg">
              We&apos;re building an internal ecosystem that grows engineers for
              the next decade — with learning tracks, language coaching,
              mentorship, and a long-term career ladder.
            </p>
          </Reveal>
        </div>

        {/* Timeline-style list */}
        <RevealStagger className="relative mt-16" stagger={0.08}>
          <div
            aria-hidden
            className="absolute left-[23px] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-border to-transparent sm:block"
          />
          <ul className="flex flex-col gap-5">
            {ECOSYSTEM.map((p) => {
              const Icon = p.icon;
              return (
                <motion.li
                  key={p.id}
                  variants={revealItem}
                  className="group relative grid gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-[48px_1fr_auto] sm:items-center sm:gap-6"
                >
                  <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-background/80">
                    <Icon
                      className="h-5 w-5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>

                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/50">
                      {p.eyebrow}
                    </div>
                    <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {p.description}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center self-start rounded-full border px-3 py-1 text-xs font-medium sm:self-center",
                      STATUS_STYLES[p.status],
                    )}
                  >
                    {p.status}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </RevealStagger>
      </div>
    </section>
  );
}
