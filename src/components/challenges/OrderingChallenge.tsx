"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import type {
  ChallengeMeta,
  OrderingChallenge as OrderingChallengeType,
  OrderingTask,
} from "@/types/challenge";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type Props = {
  challenge: OrderingChallengeType;
  completed: boolean;
  onSolve: (meta: ChallengeMeta) => void;
  onAttempt: () => void;
};

function isReady(task: OrderingTask, placed: readonly string[]): boolean {
  return task.deps.every((d) => placed.includes(d));
}

export function OrderingChallenge({
  challenge,
  completed,
  onSolve,
  onAttempt,
}: Props) {
  const [sequence, setSequence] = useState<readonly string[]>([]);
  const [shakeId, setShakeId] = useState<string | null>(null);

  useEffect(() => {
    setSequence([]);
    setShakeId(null);
  }, [challenge.id]);

  const placed = sequence;
  const remaining = challenge.tasks.filter((t) => !placed.includes(t.id));
  const solved = placed.length === challenge.tasks.length;

  const taskById = useMemo(() => {
    const m = new Map<string, OrderingTask>();
    challenge.tasks.forEach((t) => m.set(t.id, t));
    return m;
  }, [challenge.tasks]);

  useEffect(() => {
    if (!solved || completed) return;
    onSolve({ orderingSequence: placed });
  }, [solved, completed, placed, onSolve]);

  const handlePick = (task: OrderingTask) => {
    if (completed || solved) return;
    if (!isReady(task, placed)) {
      setShakeId(task.id);
      onAttempt();
      window.setTimeout(() => setShakeId(null), 450);
      return;
    }
    setSequence((s) => [...s, task.id]);
  };

  const reset = () => {
    setSequence([]);
    onAttempt();
  };

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="font-medium text-foreground/80">
          {challenge.prompt}
        </div>
        <div className="font-mono text-muted-foreground/70">Ordering</div>
      </div>

      {/* Placed sequence */}
      <div className="mt-5 rounded-xl border border-white/60 bg-white/50 p-4 backdrop-blur">
        <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Order
        </div>
        <ol className="mt-2 flex flex-wrap items-center gap-2">
          {placed.length === 0 && (
            <li className="text-sm text-muted-foreground">
              Tap a ready task below to begin.
            </li>
          )}
          {placed.map((id, i) => {
            const t = taskById.get(id);
            if (!t) return null;
            return (
              <li key={id} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="font-mono text-[10px] opacity-70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t.label}
                </span>
                {i < placed.length - 1 && (
                  <span className="text-muted-foreground/50">→</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Remaining tasks */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {challenge.tasks.map((t) => {
          const done = placed.includes(t.id);
          const ready = isReady(t, placed);
          const shake = shakeId === t.id;
          return (
            <motion.button
              key={t.id}
              type="button"
              disabled={completed || solved || done}
              onClick={() => handlePick(t)}
              animate={shake ? { x: [-4, 4, -3, 3, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "flex items-start justify-between rounded-xl border bg-white/60 px-4 py-3 text-left text-sm backdrop-blur transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
                done && "opacity-40 line-through",
                !done &&
                  ready &&
                  "border-primary/35 hover:border-primary/60 hover:bg-white/75",
                !done && !ready && "border-white/60 text-foreground/55",
              )}
            >
              <div>
                <div className="font-medium text-foreground/90">{t.label}</div>
                {t.deps.length > 0 && (
                  <div className="mt-1 text-[11px] font-mono text-muted-foreground">
                    after: {t.deps.map((d) => taskById.get(d)?.label).join(", ")}
                  </div>
                )}
              </div>
              {!done && !ready && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
                  locked
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {!completed && !solved && placed.length > 0 && (
        <div className="mt-5 flex items-center justify-end">
          <Button type="button" size="sm" variant="glass" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        {remaining.length === 0
          ? "Sequence complete."
          : `Tap a ready task — locked tasks unlock when their dependencies are in place.`}
      </p>
    </div>
  );
}
