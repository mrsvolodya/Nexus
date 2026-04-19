"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_STACK } from "@/constants/stack";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scroll-velocity-linked marquee. Base speed is constant; active scrolling
 * accelerates it briefly, slowing back to baseline — a subtle, premium
 * touch that makes the page feel alive under the cursor.
 */
export function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Base loop — a linear x translate that resets at -50% for seamless wrap.
      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      // Scroll velocity boosts the timescale; it relaxes back to 1.
      let target = 1;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = Math.abs(self.getVelocity());
          target = 1 + Math.min(v / 1200, 3);
        },
      });

      const tick = () => {
        const cur = loop.timeScale();
        const next = cur + (target - cur) * 0.08;
        loop.timeScale(next);
        target += (1 - target) * 0.04;
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        loop.kill();
      };
    }, track);

    return () => ctx.revert();
  }, [reduce]);

  // Duplicated list — the loop wraps at -50%, giving a seamless scroll.
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-white/50 bg-white/30 py-8 backdrop-blur-sm"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent",
        )}
      />
      <div
        ref={trackRef}
        className="flex w-max items-center gap-12 whitespace-nowrap will-change-transform sm:gap-16"
      >
        {items.map((t, i) => (
          <MarqueeItem key={`${t}-${i}`} label={t} />
        ))}
      </div>
    </section>
  );
}

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-12 sm:gap-16">
      <span className="font-display text-2xl font-medium tracking-tight text-foreground/35 sm:text-3xl">
        {label}
      </span>
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-primary/40"
      />
    </span>
  );
}
