"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium text-white/80 leading-none",
      className,
    )}
    {...props}
  >
    {children}
    {required && <span className="ml-0.5 text-primary/80">*</span>}
  </label>
));
Label.displayName = "Label";

export { Label };
