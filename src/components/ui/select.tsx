"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-11 w-full appearance-none rounded-xl border border-white/60 bg-white/60 pl-4 pr-10 py-2 text-sm text-foreground shadow-glass-sm backdrop-blur transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:border-primary/60 focus-visible:bg-white/80",
          "disabled:cursor-not-allowed disabled:opacity-60",
          invalid &&
            "border-destructive/60 focus-visible:ring-destructive/60 focus-visible:border-destructive/70",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  ),
);
Select.displayName = "Select";

export { Select };
