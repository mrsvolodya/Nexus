"use client";

import { motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal, RevealStagger, revealItem } from "@/components/shared/Reveal";
import { ScrollCounter } from "@/components/motion";
import { REASONS } from "@/constants/reasons";

const METRICS = [
  { value: "3%", label: "Hiring acceptance rate" },
  { value: "14", label: "Time zones covered" },
  { value: "4.9", label: "Client satisfaction" },
  { value: "96%", label: "Partner retention" },
];

export function WhyNexus() {
  return (
    <Section id="why-nexus" aria-labelledby="why-title">
      <SectionHeader
        index="02"
        eyebrow="Why Nexus"
        title={
          <>
            A partner built for the{" "}
            <span className="gradient-text">long arc</span> of your product.
          </>
        }
        description="We aren't a marketplace. We're an engineering organization — with hiring bars, mentorship, and a culture that stays with our people for years."
      />

      {/* Metric strip — architectural, sits directly under the header */}
      <Reveal delay={0.1}>
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/60 bg-white/40 sm:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-white/55 p-5 text-left backdrop-blur sm:p-6"
            >
              <ScrollCounter
                value={m.value}
                className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              />
              <div className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Reasons grid — 3 columns at lg, no sticky column */}
      <RevealStagger
        className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        stagger={0.08}
      >
        {REASONS.map((reason) => {
          const Icon = reason.icon;
          return (
            <motion.div key={reason.title} variants={revealItem}>
              <TiltCard intensity="default" className="h-full" tiltMax={5}>
                <div
                  data-depth
                  style={{ ["--depth" as string]: "20" }}
                  className="inline-grid h-10 w-10 place-items-center rounded-lg border border-white/60 bg-white/70"
                >
                  <Icon
                    className="h-4.5 w-4.5 text-primary"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <h3
                  data-depth
                  style={{ ["--depth" as string]: "10" }}
                  className="mt-5 font-display text-lg font-semibold tracking-tight"
                >
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </TiltCard>
            </motion.div>
          );
        })}
      </RevealStagger>
    </Section>
  );
}
