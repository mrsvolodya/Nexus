import type { Puzzle } from "@/types/puzzle";

/**
 * Curated pool. `PUZZLES[daysSinceEpoch(utc) % PUZZLES.length]` is today's.
 * All puzzles are 5×5 for visual consistency. Each is hand-solved and
 * tested to have at least one valid path meeting all constraints.
 *
 * Coordinate system: [x, y] with (0,0) at top-left. x = column, y = row.
 */
export const PUZZLES: readonly Puzzle[] = [
  // 1 — easy warm-up
  {
    id: "p1",
    width: 5,
    height: 5,
    source: [0, 0],
    target: [4, 4],
    waypoints: [[2, 2]],
    blocked: [[1, 1], [3, 3]],
    par: 10,
  },
  // 2 — one waypoint, funnel
  {
    id: "p2",
    width: 5,
    height: 5,
    source: [0, 2],
    target: [4, 2],
    waypoints: [[2, 0]],
    blocked: [[2, 2], [2, 4]],
    par: 8,
  },
  // 3 — two waypoints
  {
    id: "p3",
    width: 5,
    height: 5,
    source: [0, 4],
    target: [4, 0],
    waypoints: [[2, 2], [4, 4]],
    blocked: [[1, 2], [3, 2]],
    par: 12,
  },
  // 4 — center cross
  {
    id: "p4",
    width: 5,
    height: 5,
    source: [2, 0],
    target: [2, 4],
    waypoints: [[0, 2], [4, 2]],
    blocked: [[2, 2]],
    par: 12,
  },
  // 5 — perimeter loop
  {
    id: "p5",
    width: 5,
    height: 5,
    source: [0, 0],
    target: [0, 4],
    waypoints: [[4, 0], [4, 4]],
    blocked: [[1, 1], [1, 3], [3, 1], [3, 3]],
    par: 16,
  },
  // 6 — tight middle
  {
    id: "p6",
    width: 5,
    height: 5,
    source: [1, 0],
    target: [3, 4],
    waypoints: [[1, 4], [3, 0]],
    blocked: [[2, 1], [2, 3]],
    par: 14,
  },
  // 7 — zig-zag
  {
    id: "p7",
    width: 5,
    height: 5,
    source: [0, 0],
    target: [4, 0],
    waypoints: [[2, 4]],
    blocked: [[2, 0], [2, 1], [2, 2]],
    par: 12,
  },
  // 8 — twin waypoints
  {
    id: "p8",
    width: 5,
    height: 5,
    source: [0, 2],
    target: [4, 2],
    waypoints: [[2, 0], [2, 4]],
    blocked: [[1, 2], [3, 2]],
    par: 12,
  },
  // 9 — narrow corridor
  {
    id: "p9",
    width: 5,
    height: 5,
    source: [0, 4],
    target: [4, 4],
    waypoints: [[2, 0]],
    blocked: [[1, 3], [3, 3]],
    par: 10,
  },
  // 10 — edges only
  {
    id: "p10",
    width: 5,
    height: 5,
    source: [0, 0],
    target: [4, 4],
    waypoints: [[4, 0], [0, 4]],
    blocked: [[1, 1], [2, 2], [3, 3]],
    par: 16,
  },
  // 11 — asymmetric
  {
    id: "p11",
    width: 5,
    height: 5,
    source: [1, 0],
    target: [3, 4],
    waypoints: [[0, 2], [4, 2]],
    blocked: [[2, 2]],
    par: 12,
  },
  // 12 — staircase
  {
    id: "p12",
    width: 5,
    height: 5,
    source: [0, 0],
    target: [4, 4],
    waypoints: [[1, 2], [3, 2]],
    blocked: [[2, 1], [2, 3]],
    par: 12,
  },
  // 13 — bookend
  {
    id: "p13",
    width: 5,
    height: 5,
    source: [0, 1],
    target: [4, 3],
    waypoints: [[2, 0], [2, 4]],
    blocked: [[1, 2], [3, 2]],
    par: 12,
  },
  // 14 — hard finale
  {
    id: "p14",
    width: 5,
    height: 5,
    source: [0, 0],
    target: [0, 4],
    waypoints: [[4, 2], [2, 0], [2, 4]],
    blocked: [[1, 2], [3, 2]],
    par: 18,
  },
] as const;
