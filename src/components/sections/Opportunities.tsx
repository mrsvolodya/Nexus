"use client";

import { motion } from "motion/react";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Chip } from "@/components/ui/chip";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal, RevealStagger, revealItem } from "@/components/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { OPPORTUNITIES } from "@/constants/opportunities";
import { CTA_HREF } from "@/constants/nav";
import { cardHover } from "@/utils/motion";

export function Opportunities() {
  return (
    <Section id="careers" aria-labelledby="careers-title">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <Reveal>
            <Chip>
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Hiring now
            </Chip>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="careers-title"
              className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Open roles for <span className="gradient-text">ambitious engineers</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
              We hire for craft, curiosity, and long-term fit. Don&apos;t see
              your exact role — apply anyway. We&apos;re always scouting.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <a href={CTA_HREF} className={buttonVariants({ variant: "glass" })}>
            Submit an open application
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>

      <RevealStagger className="mt-14 grid gap-4 md:grid-cols-2" stagger={0.06}>
        {OPPORTUNITIES.map((op) => (
          <motion.a
            key={op.role}
            href={CTA_HREF}
            variants={revealItem}
            whileHover={{ y: -2 }}
            transition={cardHover}
          >
            <GlassCard
              as="article"
              intensity="default"
              interactive
              className="group h-full"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-primary/90">
                    {op.seniority} · {op.type}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-foreground">
                    {op.role}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/60 bg-white/70 text-foreground/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-primary/40 group-hover:text-foreground"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {op.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/60 bg-white/60 px-2.5 py-1 text-xs text-foreground/75 backdrop-blur"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {op.location}
              </div>
            </GlassCard>
          </motion.a>
        ))}
      </RevealStagger>
    </Section>
  );
}
