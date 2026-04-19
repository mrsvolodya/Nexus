"use client";

import { motion } from "motion/react";
import type { Cell, Puzzle } from "@/types/puzzle";
import { cellsEq, isBlocked, isWaypoint } from "@/utils/puzzle";
import { cn } from "@/utils/cn";

type Role = "source" | "target" | "waypoint" | "blocked" | "empty";

function roleOf(cell: Cell, puzzle: Puzzle): Role {
  if (cellsEq(cell, puzzle.source)) return "source";
  if (cellsEq(cell, puzzle.target)) return "target";
  if (isWaypoint(cell, puzzle)) return "waypoint";
  if (isBlocked(cell, puzzle)) return "blocked";
  return "empty";
}

type PuzzleCellProps = {
  cell: Cell;
  puzzle: Puzzle;
  onPath: boolean;
  pathIndex: number | null;
  isLast: boolean;
  solved: boolean;
  onTap: (c: Cell) => void;
};

export function PuzzleCell({
  cell,
  puzzle,
  onPath,
  pathIndex,
  isLast,
  solved,
  onTap,
}: PuzzleCellProps) {
  const role = roleOf(cell, puzzle);
  const blocked = role === "blocked";

  return (
    <motion.button
      type="button"
      disabled={blocked || (solved && !onPath)}
      aria-label={`Cell ${cell[0] + 1},${cell[1] + 1} ${role}`}
      onClick={() => onTap(cell)}
      whileTap={blocked ? undefined : { scale: 0.97 }}
      className={cn(
        "group relative aspect-square rounded-xl border transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
        "border-white/60 bg-white/55 backdrop-blur shadow-glass-sm",
        !blocked && !onPath && "hover:border-primary/40 hover:bg-white/70",
        onPath &&
          "border-primary/50 bg-gradient-to-br from-primary/20 to-accent/15 shadow-[inset_0_0_20px_rgba(14,165,165,0.18)]",
        blocked &&
          "border-dashed border-foreground/20 bg-white/30 !cursor-not-allowed",
      )}
    >
      <span className="pointer-events-none absolute inset-0 grid place-items-center">
        {role === "source" && (
          <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[9px] font-bold uppercase tracking-widest text-white shadow-glow-teal">
            A
          </span>
        )}
        {role === "target" && (
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-accent to-primary text-[9px] font-bold uppercase tracking-widest text-white shadow-[0_0_18px_rgba(6,182,212,0.55)]">
            B
          </span>
        )}
        {role === "waypoint" && (
          <span className="h-2 w-2 rounded-full bg-warm shadow-[0_0_12px_hsl(38_92%_55%_/_0.8)]" />
        )}
        {role === "blocked" && (
          <span className="block h-3 w-3 rotate-45 border border-foreground/25" />
        )}
      </span>

      {onPath && pathIndex !== null && pathIndex > 0 && !isLast && (
        <span className="absolute right-1.5 top-1 font-mono text-[10px] text-primary/70">
          {pathIndex}
        </span>
      )}

      {isLast && !solved && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1 rounded-lg ring-2 ring-primary/70"
        />
      )}
    </motion.button>
  );
}
