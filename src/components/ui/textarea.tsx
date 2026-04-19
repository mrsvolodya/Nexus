"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex min-h-[128px] w-full resize-none rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-foreground shadow-glass-sm backdrop-blur transition-all",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:border-primary/60 focus-visible:bg-white/80",
        "disabled:cursor-not-allowed disabled:opacity-60",
        invalid &&
          "border-destructive/60 focus-visible:ring-destructive/60 focus-visible:border-destructive/70",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
