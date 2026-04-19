"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "motion/react";
import { ArrowRight, CalendarClock, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Chip } from "@/components/ui/chip";
import { Modal } from "@/components/ui/modal";
import { SplitReveal, MagneticHover } from "@/components/motion";
import { HeroCanvas } from "@/components/3d/HeroCanvas";
import { HERO_STATS } from "@/constants/stats";
import { CTA_HREF } from "@/constants/nav";
import { useClickOrigin } from "@/hooks/useClickOrigin";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const { origin, capture, clear } = useClickOrigin();
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    const card = cardRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero='eyebrow']", { y: 14, opacity: 0, duration: 0.5 })
        .from("[data-hero='sub']", { y: 14, opacity: 0, duration: 0.6 }, "-=0.1")
        .from("[data-hero='ctas']", { y: 10, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          "[data-hero='card']",
          { y: 30, opacity: 0, duration: 1, scale: 0.96 },
          "-=0.7",
        )
        .from(
          "[data-hero='stat']",
          { y: 12, opacity: 0, duration: 0.5, stagger: 0.07 },
          "-=0.4",
        );

      if (card) {
        const qx = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3.out" });
        const qy = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          qx(nx * 6);
          qy(-ny * 6);
        };
        const onLeave = () => {
          qx(0);
          qy(0);
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        return () => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        };
      }
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  const handleScheduleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    capture({ clientX: e.clientX, clientY: e.clientY });
    setScheduleOpen(true);
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-40 lg:pt-44 lg:pb-32"
      aria-labelledby="hero-title"
    >
      {/* 3D centerpiece — lives behind the content, pointer-through */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90vh]">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_40%,transparent_100%)]">
          <HeroCanvas />
        </div>
      </div>

      {/* Glow streaks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-12 -z-10 flex justify-center"
      >
        <div
          className="h-[520px] w-[900px] blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(94,234,212,0.55) 0%, rgba(56,189,248,0.25) 35%, transparent 70%)",
          }}
        />
      </div>

      <div className="container relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div data-hero="eyebrow">
            <Chip>
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Now onboarding engineering partners
            </Chip>
          </div>

          <h1
            id="hero-title"
            className="mt-6 text-5xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            <SplitReveal as="span" className="block" delay={0.15}>
              Scale teams.
            </SplitReveal>
            <SplitReveal as="span" className="block gradient-text" delay={0.45}>
              Grow talent. Deliver.
            </SplitReveal>
          </h1>

          <p
            data-hero="sub"
            className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
          >
            Nexus connects strong engineers with ambitious products. Staff
            augmentation, dedicated teams, and end-to-end delivery — with a
            growth ecosystem built for engineers.
          </p>

          <div
            data-hero="ctas"
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <MagneticHover strength={0.3}>
              <a
                href={CTA_HREF}
                className={buttonVariants({
                  size: "lg",
                  className: "group w-full sm:w-auto",
                })}
              >
                Apply as an engineer
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </MagneticHover>
            <MagneticHover strength={0.25}>
              <Button
                variant="glass"
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleScheduleClick}
              >
                <CalendarClock className="h-4 w-4" />
                Hire a team
              </Button>
            </MagneticHover>
          </div>
        </div>

        {/* Hero glass card */}
        <div
          data-hero="card"
          className="relative mx-auto mt-16 max-w-4xl"
          style={{ perspective: "1200px" }}
        >
          <GlassCard
            ref={cardRef}
            intensity="strong"
            padded={false}
            interactive
            className="rounded-3xl p-8 sm:p-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Chip>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  Open to new engagements
                </Chip>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Engineering, delivered with craft.
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  Match with a senior engineer in under a week, or spin up a
                  full dedicated pod. Transparent pricing, honest timelines.
                </p>
              </div>
              <MagneticHover>
                <a
                  href="#services"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "group",
                  })}
                >
                  Explore services
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </MagneticHover>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/60 bg-white/40 sm:grid-cols-4">
              {HERO_STATS.map((s) => (
                <li
                  key={s.label}
                  data-hero="stat"
                  className="bg-white/50 p-5 text-left backdrop-blur"
                >
                  <div className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-foreground/70">
                    {s.label}
                  </div>
                  {s.hint && (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {s.hint}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </GlassCard>

          <motion.span
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(251, 191, 36, 0.75), transparent 70%)",
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -right-8 -bottom-12 h-40 w-40 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(94, 234, 212, 0.7), transparent 70%)",
            }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <Modal
        open={scheduleOpen}
        onClose={() => {
          setScheduleOpen(false);
          clear();
        }}
        origin={origin}
        title="Book a discovery call"
        description="A 30-minute intro with our engineering lead to scope your needs and sketch the right team shape."
      >
        <ul className="mt-2 space-y-2.5 text-sm text-foreground/80">
          {[
            "No pitch — just scoping and honest advice",
            "Typical response within 1 business day",
            "NDA on request",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a
            href="mailto:hello@nexus.dev?subject=Discovery%20call"
            className={buttonVariants({ size: "md", className: "flex-1" })}
          >
            Email our team
          </a>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setScheduleOpen(false);
              clear();
            }}
            className="flex-1"
          >
            Maybe later
          </Button>
        </div>
      </Modal>
    </section>
  );
}
