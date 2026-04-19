import * as React from "react";
import { cn } from "@/utils/cn";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
  /** Optional background layer rendered absolutely behind the content. */
  background?: React.ReactNode;
  containerClassName?: string;
};

export function Section({
  id,
  background,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative section-padding", className)}
      {...props}
    >
      {background && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          {background}
        </div>
      )}
      <div className={cn("container relative", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
