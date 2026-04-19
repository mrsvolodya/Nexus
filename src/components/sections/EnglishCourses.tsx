"use client";

import { motion } from "motion/react";
import { Globe2, Languages } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Chip } from "@/components/ui/chip";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal, RevealStagger, revealItem } from "@/components/shared/Reveal";
import {
  ENGLISH_BENEFITS,
  ENGLISH_LEVELS_LABELS,
} from "@/constants/english";

export function EnglishCourses() {
  return (
    <Section id="english" aria-labelledby="english-title">
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <Chip>
              <Languages className="h-3.5 w-3.5 text-primary" aria-hidden />
              English Academy
            </Chip>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="english-title"
              className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Fluency is an <span className="gradient-text">engineering skill</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-muted-foreground sm:text-lg">
              Strong async writing and confident speaking close the distance
              between a great engineer and a great partner. That&apos;s why Nexus
              invests in language growth for every person in the network.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <GlassCard
              intensity="strong"
              className="mt-8 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Typical growth
                  </div>
                  <div className="mt-1 font-display text-2xl font-semibold tracking-tight">
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
                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                  {ENGLISH_LEVELS_LABELS.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
                <div className="relative mt-2 h-2 rounded-full bg-white/60">
                  <motion.span
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary via-accent to-warm"
                    initial={{ width: "30%" }}
                    whileInView={{ width: "82%" }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                  />
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Coached by specialists with engineering context. Real PR
                reviews, real design-doc practice, real standups — taught in
                the language you&apos;ll actually use.
              </p>
            </GlassCard>
          </Reveal>
        </div>

        <RevealStagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
          {ENGLISH_BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div key={b.title} variants={revealItem}>
                <GlassCard intensity="default" interactive className="h-full">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-lg border border-white/60 bg-white/70">
                    <Icon
                      className="h-4.5 w-4.5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </RevealStagger>
      </div>
    </Section>
  );
}
