"use client";

import { motion } from "motion/react";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Reveal, RevealStagger, revealItem } from "@/components/effects/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { OPPORTUNITIES } from "@/data/opportunities";

export function Opportunities() {
  return (
    <section
      id="careers"
      className="relative section-padding"
      aria-labelledby="careers-title"
    >
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="chip">
                <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
                Hiring now
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="careers-title"
                className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
              >
                Open roles for <span className="gradient-text">ambitious engineers</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-pretty text-white/60 sm:text-lg">
                We hire for craft, curiosity, and long-term fit. If you don&apos;t
                see your exact role — apply anyway. We&apos;re always scouting.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="#apply"
              className={buttonVariants({ variant: "secondary" })}
            >
              Submit an open application
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <RevealStagger
          className="mt-14 grid gap-4 md:grid-cols-2"
          stagger={0.06}
        >
          {OPPORTUNITIES.map((op) => (
            <motion.a
              key={op.role}
              href="#apply"
              variants={revealItem}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-primary/80">
                    {op.seniority} · {op.type}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-white">
                    {op.role}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-primary/40 group-hover:text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {op.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-white/50">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {op.location}
              </div>
            </motion.a>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
