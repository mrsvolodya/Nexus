"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RotateCcw, Undo2 } from "lucide-react";
import type { Cell } from "@/types/puzzle";
import type {
  ChallengeMeta,
  SignalPathChallenge as SignalPathChallengeType,
} from "@/types/challenge";
import { canExtend, cellsEq, isSolved } from "@/utils/puzzle";
import { Button } from "@/components/ui/button";
import { PuzzleGrid } from "./PuzzleGrid";

type Props = {
  challenge: SignalPathChallengeType;
  completed: boolean;
  onSolve: (meta: ChallengeMeta) => void;
  onAttempt: () => void;
};

export function SignalPathChallenge({
  challenge,
  completed,
  onSolve,
  onAttempt,
}: Props) {
  const puzzle = challenge.puzzle;
  const [path, setPath] = useState<readonly Cell[]>([puzzle.source]);

  // Reset when challenge changes (rotation between puzzles in the set).
  useEffect(() => {
    setPath([puzzle.source]);
  }, [puzzle.source, puzzle.id]);

  const solved = useMemo(() => isSolved(path, puzzle), [path, puzzle]);
  const moves = Math.max(0, path.length - 1);

  // Emit solve exactly once when reached.
  useEffect(() => {
    if (!solved || completed) return;
    onSolve({ moves, par: puzzle.par, optimal: moves <= puzzle.par });
  }, [solved, completed, moves, puzzle.par, onSolve]);

  const onCellTap = useCallback(
    (cell: Cell) => {
      if (solved || completed) return;
      if (cellsEq(cell, puzzle.source) && path.length > 1) {
        setPath([puzzle.source]);
        return;
      }
      const last = path[path.length - 1];
      if (cellsEq(cell, last) && path.length > 1) {
        setPath((p) => p.slice(0, -1));
        return;
      }
      if (canExtend(path, cell, puzzle)) {
        setPath((p) => [...p, cell]);
      }
    },
    [path, puzzle, solved, completed],
  );

  const undo = useCallback(() => {
    setPath((p) => (p.length > 1 ? p.slice(0, -1) : p));
  }, []);

  const reset = useCallback(() => {
    setPath([puzzle.source]);
    onAttempt();
  }, [puzzle.source, onAttempt]);

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="font-mono">
          {completed || solved ? (
            <>
              <span className="text-emerald-700">SOLVED</span> · {moves} moves
              {moves <= puzzle.par ? " · OPTIMAL" : ""}
            </>
          ) : (
            <>
              MOVES {moves}{" "}
              <span className="text-foreground/30">/ par {puzzle.par}</span>
            </>
          )}
        </div>
        <div className="font-mono text-muted-foreground/70">Signal Path</div>
      </div>

      <div className="mt-5">
        <PuzzleGrid
          puzzle={puzzle}
          path={path}
          solved={solved || completed}
          onCellTap={onCellTap}
        />
      </div>

      <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <li className="inline-flex items-center gap-1.5">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-[8px] font-bold text-white">
            A
          </span>
          Start
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-accent to-primary text-[8px] font-bold text-white">
            B
          </span>
          End
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-warm" />
          Must visit
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="block h-2.5 w-2.5 rotate-45 border border-foreground/40" />
          Blocked
        </li>
      </ul>

      {!completed && !solved && (
        <div className="mt-5 flex items-center justify-end gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={undo}
            disabled={moves === 0}
          >
            <Undo2 className="h-3.5 w-3.5" /> Undo
          </Button>
          <Button
            type="button"
            size="sm"
            variant="glass"
            onClick={reset}
            disabled={moves === 0}
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>
      )}
    </div>
  );
}
