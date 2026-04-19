"use client";

import * as React from "react";
import { useCardTilt } from "@/hooks/useCardTilt";
import { cn } from "@/utils/cn";
import { GlassCard, type GlassCardProps } from "./glass-card";

type TiltCardProps = Omit<GlassCardProps, "interactive"> & {
  /** Max tilt in degrees. Keep small (4–8) for a premium, controlled feel. */
  tiltMax?: number;
  /** Z-lift on hover. */
  tiltLift?: number;
};

/**
 * A GlassCard wrapped with premium tilt + directional glow + border sweep.
 * The tilt layer (`.tilt-card`) owns the transform; decorative overlays
 * (`.tilt-glow`, `.tilt-border`) are clipped to the card's rounded shape.
 */
export function TiltCard({
  className,
  children,
  tiltMax,
  tiltLift,
  ...props
}: TiltCardProps) {
  const tiltRef = useCardTilt<HTMLDivElement>({
    max: tiltMax,
    lift: tiltLift,
  });

  return (
    <div className="tilt-root">
      <div ref={tiltRef} className="tilt-card rounded-2xl">
        <GlassCard {...props} className={cn("h-full", className)}>
          {children}
        </GlassCard>
        <span className="tilt-glow" aria-hidden />
        <span className="tilt-border" aria-hidden />
      </div>
    </div>
  );
}
