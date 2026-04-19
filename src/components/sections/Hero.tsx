"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "motion/react";
import { ArrowRight, CalendarClock, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Chip } from "@/components/ui/chip";
import { Modal } from "@/components/ui/modal";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";
import { HERO_STATS } from "@/constants/stats";
import { CTA_HREF } from "@/constants/nav";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const reduce = usePrefersReducedMotion();

  // GSAP: entrance timeline + parallax + cursor-reactive tilt on the hero card.
  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    const card = cardRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='eyebrow']", { y: 14, opacity: 0, duration: 0.5 })
        .from(
          "[data-hero='title'] > span",
          { y: 28, opacity: 0, duration: 0.9, stagger: 0.08 },
          "-=0.2",
        )
        .from(
          "[data-hero='sub']",
          { y: 14, opacity: 0, duration: 0.6 },
          "-=0.5",
        )
        .from(
          "[data-hero='ctas']",
          { y: 10, opacity: 0, duration: 0.5 },
          "-=0.4",
        )
        .from(
          "[data-hero='card']",
          { y: 30, opacity: 0, duration: 1, scale: 0.96 },
          "-=0.8",
        )
        .from(
          "[data-hero='stat']",
          { y: 12, opacity: 0, duration: 0.5, stagger: 0.07 },
          "-=0.4",
        );

      // Parallax on scroll (orbs + decorative layers)
      const layers = gsap.utils.toArray<HTMLElement>("[data-parallax]", root);
      const onScroll = () => {
        const y = window.scrollY;
        layers.forEach((el) => {
          const depth = Number(el.dataset.parallax) || 0.1;
          gsap.to(el, {
            y: y * depth,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // Tilt the hero card with cursor position
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
          window.removeEventListener("scroll", onScroll);
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        };
      }

      return () => window.removeEventListener("scroll", onScroll);
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-40 lg:pt-48 lg:pb-32"
      aria-labelledby="hero-title"
    >
      <div data-parallax="-0.06">
        <FloatingOrbs />
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
            data-hero="title"
            className="mt-6 text-5xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            <span className="block">Scale teams.</span>
            <span className="block gradient-text">Grow talent. Deliver.</span>
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
            <Button
              variant="glass"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => setScheduleOpen(true)}
            >
              <CalendarClock className="h-4 w-4" />
              Hire a team
            </Button>
          </div>
        </div>

        {/* Hero glass card — floating, tilted by cursor */}
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

          {/* Orb accents behind the card */}
          <motion.span
            aria-hidden
            data-parallax="0.08"
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
            data-parallax="0.12"
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
        onClose={() => setScheduleOpen(false)}
        title="Book a discovery call"
        description="A 30-minute intro with our engineering lead to understand your needs and map out a team shape that fits."
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
            onClick={() => setScheduleOpen(false)}
            className="flex-1"
          >
            Maybe later
          </Button>
        </div>
      </Modal>
    </section>
  );
}
