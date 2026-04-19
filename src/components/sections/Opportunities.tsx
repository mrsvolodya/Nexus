"use client";

import { motion } from "motion/react";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealStagger, revealItem } from "@/components/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { OPPORTUNITIES } from "@/constants/opportunities";
import { CTA_HREF } from "@/constants/nav";

export function Opportunities() {
  return (
    <Section id="careers" aria-labelledby="careers-title">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeader
          align="left"
          index="05"
          eyebrow={
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Hiring now
            </span>
          }
          title={
            <>
              Open roles for{" "}
              <span className="gradient-text">ambitious engineers</span>.
            </>
          }
          description="We hire for craft, curiosity, and long-term fit. Don't see your exact role — apply anyway. We're always scouting."
        />

        <motion.a
          href={CTA_HREF}
          className={buttonVariants({ variant: "glass" })}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Submit an open application
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>

      <RevealStagger className="mt-14 grid gap-4 md:grid-cols-2" stagger={0.06}>
        {OPPORTUNITIES.map((op) => (
          <motion.a
            key={op.role}
            href={CTA_HREF}
            variants={revealItem}
            className="block h-full"
          >
            <TiltCard
              as="article"
              intensity="default"
              tiltMax={5}
              className="group h-full"
            >
              <div className="flex items-start justify-between gap-4">
                <div data-depth style={{ ["--depth" as string]: "15" }}>
                  <div className="text-xs font-medium uppercase tracking-widest text-primary/90">
                    {op.seniority} · {op.type}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-foreground">
                    {op.role}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/60 bg-white/70 text-foreground/60 transition-all duration-300 group-hover:translate-x-1 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary"
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
            </TiltCard>
          </motion.a>
        ))}
      </RevealStagger>
    </Section>
  );
}
