"use client";

import { motion } from "motion/react";
import { Globe2, Languages } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Chip } from "@/components/ui/chip";
import { GlassCard } from "@/components/ui/glass-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal, RevealStagger, revealItem } from "@/components/shared/Reveal";
import {
  ENGLISH_BENEFITS,
  ENGLISH_LEVELS_LABELS,
} from "@/constants/english";

export function EnglishCourses() {
  return (
    <Section id="english" aria-labelledby="english-title">
      <SectionHeader
        align="left"
        index="04"
        eyebrow={
          <span className="inline-flex items-center gap-1.5">
            <Languages className="h-3.5 w-3.5 text-primary" aria-hidden />
            English Academy
          </span>
        }
        title={
          <>
            Fluency is an{" "}
            <span className="gradient-text">engineering skill</span>.
          </>
        }
        description="Strong async writing and confident speaking close the distance between a great engineer and a great partner. That's why Nexus invests in language growth for every person in the network."
      />

      <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <Reveal>
          <GlassCard intensity="strong" className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Typical growth
                </div>
                <div className="mt-1.5 font-display text-3xl font-semibold tracking-tight">
                  B1 → C1 in ~9 months
                </div>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/60 bg-white/70 shadow-glass-sm">
                <Globe2
                  className="h-5 w-5 text-primary"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-medium tracking-widest text-muted-foreground">
                {ENGLISH_LEVELS_LABELS.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
              <div className="relative mt-2.5 h-2 rounded-full bg-white/60">
                <motion.span
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary via-accent to-warm shadow-[0_0_20px_hsl(183_74%_45%_/_0.5)]"
                  initial={{ width: "30%" }}
                  whileInView={{ width: "82%" }}
                  transition={{
                    duration: 1.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                />
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Coached by specialists with engineering context. Real PR reviews,
              design-doc practice, standups — taught in the language you&apos;ll
              actually use.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Chip>
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Weekly 1:1 sessions
              </Chip>
              <Chip>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Speaking clubs
              </Chip>
              <Chip>
                <span className="h-1.5 w-1.5 rounded-full bg-warm" />
                Written feedback
              </Chip>
            </div>
          </GlassCard>
        </Reveal>

        <RevealStagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
          {ENGLISH_BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div key={b.title} variants={revealItem}>
                <TiltCard intensity="default" tiltMax={5} className="h-full">
                  <span
                    data-depth
                    style={{ ["--depth" as string]: "18" }}
                    className="inline-grid h-10 w-10 place-items-center rounded-lg border border-white/60 bg-white/70"
                  >
                    <Icon
                      className="h-4.5 w-4.5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                  <h3
                    data-depth
                    style={{ ["--depth" as string]: "10" }}
                    className="mt-4 font-display text-lg font-semibold tracking-tight"
                  >
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </RevealStagger>
      </div>
    </Section>
  );
}
