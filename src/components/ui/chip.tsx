import * as React from "react";
import { cn } from "@/utils/cn";

export function Chip({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("chip", className)} {...props}>
      {children}
    </span>
  );
}
