import { TECH_STACK } from "@/constants/stack";

/**
 * Horizontal stack ribbon. Pure CSS marquee — no GSAP ticker, no scroll
 * listeners, no React re-renders. One CSS transform animation, paused
 * automatically under `prefers-reduced-motion`.
 */
export function TechMarquee() {
  // Two copies end-to-end + translateX(-50%) gives a seamless loop.
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-white/40 bg-white/25 py-10 backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap sm:gap-20 motion-reduce:animate-none">
        {items.map((label, i) => (
          <MarqueeItem key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </section>
  );
}

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-16 sm:gap-20">
      <span className="font-display text-2xl font-medium tracking-tight text-foreground/25 sm:text-3xl">
        {label}
      </span>
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-primary/35"
      />
    </span>
  );
}
