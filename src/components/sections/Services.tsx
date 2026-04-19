"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, RevealStagger, revealItem } from "@/components/effects/Reveal";
import { SERVICES, type Service } from "@/data/services";

export function Services() {
  return (
    <section
      id="services"
      className="relative section-padding"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="chip">What we do</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="services-title"
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              One partner. <span className="gradient-text">Three ways to scale.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-white/60 sm:text-lg">
              Whether you need a senior engineer next week or a full product
              team next quarter, we pair you with the right shape of
              collaboration.
            </p>
          </Reveal>
        </div>

        <RevealStagger
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <motion.article
      variants={revealItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 shadow-inner-ring"
    >
      {/* Decorative gradient ring on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--sx, 50%) var(--sy, 0%), hsl(217 91% 60% / 0.18), transparent 55%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
          <Icon
            className="h-5 w-5 text-primary"
            aria-hidden
            strokeWidth={1.75}
          />
        </span>
        <ArrowUpRight
          className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          aria-hidden
        />
      </div>

      <h3 className="relative mt-6 font-display text-xl font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="relative mt-1 text-sm text-primary/80">
        {service.tagline}
      </p>
      <p className="relative mt-4 text-sm leading-relaxed text-white/65">
        {service.description}
      </p>

      <ul className="relative mt-6 flex flex-col gap-2.5 border-t border-white/5 pt-5">
        {service.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-sm text-white/75"
          >
            <Check
              className="mt-0.5 h-4 w-4 flex-none text-primary"
              aria-hidden
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
