"use client";

import { motion } from "motion/react";
import { Reveal, RevealStagger, revealItem } from "@/components/effects/Reveal";
import { REASONS } from "@/data/reasons";

export function WhyNexus() {
  return (
    <section
      id="why-nexus"
      className="relative section-padding"
      aria-labelledby="why-title"
    >
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="chip">Why Nexus</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="why-title"
                className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
              >
                A partner built for the <span className="gradient-text">long arc</span> of your product.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-pretty text-white/60 sm:text-lg">
                We aren&apos;t a marketplace. We&apos;re an engineering
                organization — with hiring bars, mentorship, and a culture that
                stays with our people for years.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
                <Metric value="~3%" label="Hiring acceptance rate" />
                <Metric value="14 TZ" label="Time zones covered" />
                <Metric value="4.9/5" label="Client satisfaction" />
                <Metric value="96%" label="Partner retention" />
              </dl>
            </Reveal>
          </div>

          <RevealStagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {REASONS.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  variants={revealItem}
                  className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span className="inline-grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <Icon
                      className="h-4.5 w-4.5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">
                    {reason.description}
                  </p>
                </motion.div>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-semibold tracking-tight text-white">
        {value}
      </dd>
      <div className="mt-1 text-xs uppercase tracking-wider text-white/50">
        {label}
      </div>
    </div>
  );
}
