"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/shared/Reveal";
import { SERVICES } from "@/constants/services";
import type { Service } from "@/types/content";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  /**
   * Scroll-choreographed entrance: cards slide in from alternating horizontal
   * offsets while the section scrubs into view. A short stagger keeps it
   * feeling deliberate instead of mechanical.
   */
  useEffect(() => {
    if (reduce) return;
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", grid);
      cards.forEach((card, i) => {
        const xFrom = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(
          card,
          { x: xFrom, y: 40, opacity: 0, rotateZ: i % 2 === 0 ? -2 : 2 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, grid);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <Section id="services" aria-labelledby="services-title">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Chip>What we do</Chip>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="services-title"
            className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            One partner.{" "}
            <span className="gradient-text">Three ways to scale.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
            Whether you need a senior engineer next week or a full product
            team next quarter, we pair you with the right shape of collaboration.
          </p>
        </Reveal>
      </div>

      <div
        ref={gridRef}
        className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </Section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div
      data-service-card
      className="transition-transform duration-300 hover:-translate-y-0.5"
    >
      <GlassCard
        as="article"
        intensity="default"
        interactive
        className="group flex h-full flex-col"
      >
        <div className="flex items-center justify-between">
          <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-white/60 bg-white/70 shadow-glass-sm">
            <Icon
              className="h-5 w-5 text-primary"
              aria-hidden
              strokeWidth={1.75}
            />
          </span>
          <ArrowUpRight
            className="h-5 w-5 text-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden
          />
        </div>

        <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">
          {service.title}
        </h3>
        <p className="mt-1 text-sm text-primary/90">{service.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/60 pt-5">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-sm text-foreground/80"
            >
              <Check
                className="mt-0.5 h-4 w-4 flex-none text-primary"
                aria-hidden
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}
