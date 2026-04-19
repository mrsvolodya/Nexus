import type { Cell, Puzzle } from "@/types/puzzle";

const MS_PER_DAY = 86_400_000;

export function todayIso(now: Date = new Date()): string {
  const utc = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  return utc.toISOString().slice(0, 10);
}

export function daysSinceEpoch(now: Date = new Date()): number {
  return Math.floor(now.getTime() / MS_PER_DAY);
}

export const cellsEq = (a: Cell, b: Cell): boolean =>
  a[0] === b[0] && a[1] === b[1];

export const isAdjacent = (a: Cell, b: Cell): boolean =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;

export function isBlocked(cell: Cell, puzzle: Puzzle): boolean {
  return puzzle.blocked.some((b) => cellsEq(b, cell));
}

export function isWaypoint(cell: Cell, puzzle: Puzzle): boolean {
  return puzzle.waypoints.some((w) => cellsEq(w, cell));
}

export function canExtend(
  path: readonly Cell[],
  next: Cell,
  puzzle: Puzzle,
): boolean {
  if (isBlocked(next, puzzle)) return false;
  if (path.some((c) => cellsEq(c, next))) return false;
  const tail = path[path.length - 1];
  return isAdjacent(tail, next);
}

export function isSolved(path: readonly Cell[], puzzle: Puzzle): boolean {
  if (path.length === 0) return false;
  const last = path[path.length - 1];
  if (!cellsEq(last, puzzle.target)) return false;
  return puzzle.waypoints.every((w) => path.some((c) => cellsEq(c, w)));
}

export function computeStreak(
  todayDate: string,
  lastDate: string | null,
  current: number,
): number {
  if (!lastDate) return 1;
  if (lastDate === todayDate) return current || 1;
  const prev = new Date(`${lastDate}T00:00:00Z`);
  const today = new Date(`${todayDate}T00:00:00Z`);
  const diff = Math.round(
    (today.getTime() - prev.getTime()) / MS_PER_DAY,
  );
  return diff === 1 ? current + 1 : 1;
}
