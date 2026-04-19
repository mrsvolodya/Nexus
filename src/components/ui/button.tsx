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
        primary:
          "btn-halo text-white bg-gradient-to-br from-primary via-accent to-primary/90 shadow-glow-teal hover:shadow-[0_18px_46px_-10px_rgba(14,165,165,0.6)] hover:-translate-y-0.5",
        warm:
          "btn-halo text-white bg-gradient-to-br from-warm to-brand-honey shadow-glow-amber hover:-translate-y-0.5",
        glass:
          "glass text-foreground hover:bg-white/75 hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-glass-sm",
        ghost:
          "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]",
        outline:
          "border border-border bg-white/30 text-foreground hover:bg-white/55 hover:border-primary/30 backdrop-blur hover:-translate-y-0.5",
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
