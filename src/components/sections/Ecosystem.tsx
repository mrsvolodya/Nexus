"use client";

import { motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { Chip } from "@/components/ui/chip";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal, RevealStagger, revealItem } from "@/components/shared/Reveal";
import { ECOSYSTEM } from "@/constants/ecosystem";
import { cn } from "@/utils/cn";

const STATUS_STYLES: Record<string, string> = {
  Live: "text-emerald-700 bg-emerald-500/10 border-emerald-500/30",
  "Rolling out 2026": "text-primary bg-primary/10 border-primary/25",
  "On the roadmap": "text-muted-foreground bg-white/60 border-white/60",
};

export function Ecosystem() {
  return (
    <Section
      id="ecosystem"
      aria-labelledby="ecosystem-title"
      background={
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora opacity-70 blur-3xl" />
      }
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Chip>The Nexus Ecosystem</Chip>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="ecosystem-title"
            className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            More than a job. <span className="gradient-text">A career operating system.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
            We&apos;re building an internal ecosystem that grows engineers for the
            next decade — structured learning, mentorship, and a long-term career
            ladder.
          </p>
        </Reveal>
      </div>

      <RevealStagger className="relative mt-16" stagger={0.08}>
        <ul className="flex flex-col gap-4">
          {ECOSYSTEM.map((p) => {
            const Icon = p.icon;
            return (
              <motion.li key={p.id} variants={revealItem}>
                <GlassCard
                  intensity="default"
                  interactive
                  className="grid gap-5 sm:grid-cols-[48px_1fr_auto] sm:items-center sm:gap-6"
                >
                  <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-white/60 bg-white/70">
                    <Icon
                      className="h-5 w-5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>

                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {p.eyebrow}
                    </div>
                    <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center self-start rounded-full border px-3 py-1 text-xs font-medium backdrop-blur sm:self-center",
                      STATUS_STYLES[p.status],
                    )}
                  >
                    {p.status}
                  </span>
                </GlassCard>
              </motion.li>
            );
          })}
        </ul>
      </RevealStagger>
    </Section>
  );
}
