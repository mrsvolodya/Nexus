export type Cell = readonly [number, number];

/**
 * Signal-Path puzzle definition (one of the daily challenge types).
 *
 * A valid solution: start at `source`, end at `target`, visit every
 * `waypoints` cell, never enter a `blocked` cell, never revisit a cell.
 */
export type Puzzle = {
  id: string;
  width: number;
  height: number;
  source: Cell;
  target: Cell;
  waypoints: readonly Cell[];
  blocked: readonly Cell[];
  par: number;
};
