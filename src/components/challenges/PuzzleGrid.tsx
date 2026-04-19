"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import type { Cell, Puzzle } from "@/types/puzzle";
import { cellsEq } from "@/utils/puzzle";
import { PuzzleCell } from "./PuzzleCell";

type PuzzleGridProps = {
  puzzle: Puzzle;
  path: readonly Cell[];
  solved: boolean;
  onCellTap: (c: Cell) => void;
};

export function PuzzleGrid({
  puzzle,
  path,
  solved,
  onCellTap,
}: PuzzleGridProps) {
  const pathIndex = useMemo(() => {
    const m = new Map<string, number>();
    path.forEach((c, i) => m.set(`${c[0]},${c[1]}`, i));
    return m;
  }, [path]);

  const cells: Cell[] = useMemo(() => {
    const arr: Cell[] = [];
    for (let y = 0; y < puzzle.height; y++) {
      for (let x = 0; x < puzzle.width; x++) {
        arr.push([x, y] as const);
      }
    }
    return arr;
  }, [puzzle.width, puzzle.height]);

  const vbW = puzzle.width * 2;
  const vbH = puzzle.height * 2;
  const pointsAttr = path
    .map((c) => `${c[0] * 2 + 1},${c[1] * 2 + 1}`)
    .join(" ");

  return (
    <div
      className="relative mx-auto w-full max-w-[min(100%,480px)]"
      style={
        {
          ["--grid" as string]: `repeat(${puzzle.width}, minmax(0, 1fr))`,
        } as React.CSSProperties
      }
    >
      <div
        className="relative grid gap-2 sm:gap-2.5"
        style={{ gridTemplateColumns: `var(--grid)` }}
      >
        {cells.map((c) => {
          const key = `${c[0]},${c[1]}`;
          const idx = pathIndex.get(key);
          const onPath = idx !== undefined;
          const isLast =
            onPath && path.length > 0 && cellsEq(c, path[path.length - 1]);
          return (
            <PuzzleCell
              key={key}
              cell={c}
              puzzle={puzzle}
              onPath={onPath}
              pathIndex={idx ?? null}
              isLast={!!isLast}
              solved={solved}
              onTap={onCellTap}
            />
          );
        })}

        {path.length > 1 && (
          <svg
            aria-hidden
            viewBox={`0 0 ${vbW} ${vbH}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="ds-path" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(183 74% 45%)" />
                <stop offset="100%" stopColor="hsl(189 94% 50%)" />
              </linearGradient>
            </defs>
            <motion.polyline
              points={pointsAttr}
              fill="none"
              stroke="url(#ds-path)"
              strokeWidth={0.35}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={false}
              animate={
                solved
                  ? {
                      opacity: [0.7, 1, 0.7],
                      strokeWidth: [0.35, 0.5, 0.35],
                    }
                  : { opacity: 0.85, strokeWidth: 0.35 }
              }
              transition={
                solved
                  ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
              style={{
                filter: solved
                  ? "drop-shadow(0 0 1px hsl(189 94% 55%))"
                  : "none",
              }}
            />
          </svg>
        )}
      </div>
    </div>
  );
}
