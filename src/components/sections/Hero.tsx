"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { FloatingShapes } from "@/components/effects/FloatingShapes";
import { GridBackground } from "@/components/effects/GridBackground";
import { HERO_STATS } from "@/data/stats";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  // GSAP handles the entrance timeline + parallax — reserved for the hero only.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        tl.from("[data-hero='eyebrow']", { y: 16, opacity: 0, duration: 0.55 })
          .from(
            "[data-hero='title'] > span",
            {
              y: 28,
              opacity: 0,
              duration: 0.9,
              stagger: 0.08,
            },
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
            "[data-hero='stat']",
            { y: 12, opacity: 0, duration: 0.5, stagger: 0.07 },
            "-=0.3",
          )
          .from(
            "[data-hero='orb']",
            { scale: 0.9, opacity: 0, duration: 1.2 },
            "-=0.9",
          );
      }

      // Subtle parallax on scroll — uses rAF internally via GSAP ticker.
      const layers = gsap.utils.toArray<HTMLElement>(
        "[data-parallax]",
        root,
      );
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

      return () => window.removeEventListener("scroll", onScroll);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-40 lg:pt-48 lg:pb-32"
      aria-labelledby="hero-title"
    >
      <GridBackground withMesh />
      <div data-parallax="-0.08">
        <FloatingShapes />
      </div>

      {/* Decorative orb */}
      <div
        data-hero="orb"
        data-parallax="0.12"
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/5"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, hsl(217 91% 60% / 0.25), hsl(262 83% 68% / 0.18), hsl(189 94% 60% / 0.18), hsl(217 91% 60% / 0.25))",
          filter: "blur(40px)",
          opacity: 0.6,
        }}
      />

      <div className="container relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div data-hero="eyebrow">
            <span className="chip">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Now onboarding Series A–C engineering partners
            </span>
          </div>

          <h1
            id="hero-title"
            data-hero="title"
            className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            <span className="block">We build engineering</span>
            <span className="block gradient-text">teams that scale.</span>
          </h1>

          <p
            data-hero="sub"
            className="mt-6 max-w-2xl text-pretty text-base text-white/70 sm:text-lg"
          >
            Nexus connects top developers with ambitious products. Staff
            augmentation, dedicated pods, and end-to-end delivery — with the
            craft and transparency of an in-house team.
          </p>

          <div
            data-hero="ctas"
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href="#apply"
              className={buttonVariants({
                size: "lg",
                className: "group w-full sm:w-auto",
              })}
            >
              Apply as an engineer
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              Hire a team
            </a>
          </div>

          <motion.ul
            className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm sm:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            {HERO_STATS.map((s) => (
              <li
                key={s.label}
                data-hero="stat"
                className="relative bg-background/40 p-5 text-left"
              >
                <div className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-white/70">{s.label}</div>
                {s.hint && (
                  <div className="mt-0.5 text-xs text-white/40">{s.hint}</div>
                )}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
