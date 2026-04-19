"use client";

import { motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealStagger, revealItem } from "@/components/shared/Reveal";
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
      <SectionHeader
        index="03"
        eyebrow="The Nexus Ecosystem"
        title={
          <>
            More than a job.{" "}
            <span className="gradient-text">A career operating system.</span>
          </>
        }
        description="We're building an internal ecosystem that grows engineers for the next decade — structured learning, mentorship, and a long-term career ladder."
      />

      {/* 2-column pillar grid — tighter rhythm than the old full-width list */}
      <RevealStagger
        className="mt-16 grid gap-5 md:grid-cols-2"
        stagger={0.08}
      >
        {ECOSYSTEM.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div key={p.id} variants={revealItem}>
              <TiltCard
                intensity="default"
                padded={false}
                className="flex h-full flex-col gap-5 p-7 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    data-depth
                    style={{ ["--depth" as string]: "25" }}
                    className="flex items-center gap-3"
                  >
                    <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-white/60 bg-white/70 shadow-glass-sm">
                      <Icon
                        className="h-5 w-5 text-primary"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                    <div>
                      <div className="font-mono text-[11px] tracking-widest text-muted-foreground">
                        {String(i + 1).padStart(2, "0")} ·{" "}
                        {p.eyebrow.toUpperCase()}
                      </div>
                      <h3 className="mt-0.5 font-display text-xl font-semibold tracking-tight">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur",
                      STATUS_STYLES[p.status],
                    )}
                  >
                    {p.status}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                {/* Decorative signal line */}
                <div
                  aria-hidden
                  className="mt-auto h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                />
              </TiltCard>
            </motion.div>
          );
        })}
      </RevealStagger>
    </Section>
  );
}
