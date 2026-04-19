"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { useSpotlight } from "@/hooks/useSpotlight";

const glassVariants = cva(
  "relative overflow-hidden rounded-2xl",
  {
    variants: {
      intensity: {
        subtle: "glass-subtle",
        default: "glass",
        strong: "glass-strong",
      },
      padded: {
        true: "p-6 sm:p-7",
        false: "",
      },
      interactive: {
        true: "spotlight transition-transform duration-500",
        false: "",
      },
    },
    defaultVariants: {
      intensity: "default",
      padded: true,
      interactive: false,
    },
  },
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassVariants> {
  as?: "div" | "article" | "section" | "a";
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      intensity,
      padded,
      interactive,
      as: As = "div",
      onPointerMove,
      ...props
    },
    ref,
  ) => {
    const handleSpotlight = useSpotlight();
    const Component = As as "div";

    return (
      <Component
        ref={ref}
        onPointerMove={(e) => {
          if (interactive) handleSpotlight(e);
          onPointerMove?.(e);
        }}
        className={cn(
          glassVariants({ intensity, padded, interactive }),
          className,
        )}
        {...props}
      />
    );
  },
);
GlassCard.displayName = "GlassCard";
