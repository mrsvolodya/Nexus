"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { useRipple } from "@/hooks/useRipple";

const buttonVariants = cva(
  "btn-shine relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 select-none",
  {
    variants: {
      variant: {
        // Premium CTA: halo intensifies + gradient sweeps (no vertical lift).
        primary:
          "btn-halo btn-gradient-shift text-white bg-gradient-to-br from-primary via-accent to-primary/90 bg-[length:200%_200%] shadow-glow-teal hover:shadow-[0_18px_46px_-10px_rgba(14,165,165,0.6)]",
        warm:
          "btn-halo text-white bg-gradient-to-br from-warm to-brand-honey shadow-glow-amber",
        // Glass: inner border illumination + slight saturation lift.
        glass:
          "glass text-foreground hover:bg-white/75 hover:border-primary/35 hover:shadow-[inset_0_0_0_1px_hsl(183_74%_45%_/_0.18),0_8px_24px_-14px_rgba(14,165,165,0.35)]",
        ghost:
          "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06]",
        outline:
          "border border-border bg-white/30 text-foreground hover:bg-white/55 hover:border-primary/35 hover:shadow-[inset_0_0_0_1px_hsl(183_74%_45%_/_0.18)] backdrop-blur",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Disable the click ripple (default: on). */
  ripple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, ripple = true, onClick, ...props },
    ref,
  ) => {
    const spawn = useRipple<HTMLButtonElement>();
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={(e) => {
          if (ripple) spawn(e);
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
