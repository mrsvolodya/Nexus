import { cn } from "@/lib/utils";

export function Logo({
  className,
  onlyMark = false,
}: {
  className?: string;
  onlyMark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-white",
        className,
      )}
    >
      <LogoMark />
      {!onlyMark && (
        <span className="font-display text-lg font-semibold tracking-tight">
          Nexus
        </span>
      )}
    </span>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70 shadow-[0_8px_24px_-8px_hsl(217_91%_60%/0.7)]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <path
          d="M2 13V3L14 13V3"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
