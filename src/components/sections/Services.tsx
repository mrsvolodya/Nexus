"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SERVICES } from "@/constants/services";
import type { Service } from "@/types/content";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", grid);
      cards.forEach((card, i) => {
        const xFrom = i === 0 ? -40 : i === cards.length - 1 ? 40 : 0;
        const yFrom = i === 1 ? 50 : 30;
        gsap.fromTo(
          card,
          { x: xFrom, y: yFrom, opacity: 0, rotateZ: i === 0 ? -2 : i === cards.length - 1 ? 2 : 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 0.95,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          },
        );
      });
    }, grid);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <Section id="services" aria-labelledby="services-title">
      <SectionHeader
        index="01"
        eyebrow="What we do"
        title={
          <>
            One partner.{" "}
            <span className="gradient-text">Three ways to scale.</span>
          </>
        }
        description="Whether you need a senior engineer next week or a full product team next quarter, we pair you with the right shape of collaboration."
      />

      <div
        ref={gridRef}
        className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i + 1} />
        ))}
      </div>
    </Section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <div data-service-card className="h-full">
      <TiltCard
        as="article"
        intensity="default"
        padded={false}
        className="flex h-full flex-col p-7 sm:p-8"
      >
        <div className="flex items-center justify-between">
          <span
            data-depth
            style={{ ["--depth" as string]: "30" }}
            className="inline-grid h-12 w-12 place-items-center rounded-xl border border-white/60 bg-white/70 shadow-glass-sm"
          >
            <Icon
              className="h-5 w-5 text-primary"
              aria-hidden
              strokeWidth={1.75}
            />
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
              {String(index).padStart(2, "0")}
            </span>
            <ArrowUpRight
              className="h-5 w-5 text-foreground/30 transition-colors duration-300 group-hover:text-foreground"
              aria-hidden
            />
          </div>
        </div>

        <h3
          data-depth
          style={{ ["--depth" as string]: "20" }}
          className="mt-7 font-display text-2xl font-semibold tracking-tight text-foreground"
        >
          {service.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-primary/90">
          {service.tagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <ul className="mt-7 flex flex-col gap-2.5 border-t border-white/60 pt-5">
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
      </TiltCard>
    </div>
  );
}
