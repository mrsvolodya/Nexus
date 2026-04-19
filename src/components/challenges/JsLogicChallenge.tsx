"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import type {
  ChallengeMeta,
  JsLogicChallenge as JsLogicChallengeType,
} from "@/types/challenge";
import { cn } from "@/utils/cn";

type Props = {
  challenge: JsLogicChallengeType;
  completed: boolean;
  onSolve: (meta: ChallengeMeta) => void;
  onAttempt: () => void;
};

export function JsLogicChallenge({
  challenge,
  completed,
  onSolve,
  onAttempt,
}: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrongPick, setWrongPick] = useState<number | null>(null);

  // Reset on challenge rotation.
  useEffect(() => {
    setPicked(null);
    setWrongPick(null);
  }, [challenge.id]);

  const resolved = picked !== null && picked === challenge.correctIndex;

  const handlePick = (index: number) => {
    if (completed || resolved) return;
    if (index === challenge.correctIndex) {
      setPicked(index);
      setWrongPick(null);
      onSolve({ pickedIndex: index });
    } else {
      setWrongPick(index);
      onAttempt();
      window.setTimeout(() => setWrongPick(null), 500);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="font-medium text-foreground/80">
          {challenge.prompt}
        </div>
        <div className="font-mono text-muted-foreground/70">JS Logic</div>
      </div>

      <pre
        aria-label="Code snippet"
        className="mt-4 overflow-x-auto rounded-xl border border-white/60 bg-slate-950/90 p-4 font-mono text-[13px] leading-relaxed text-slate-100 shadow-inner"
      >
        <code>{challenge.code}</code>
      </pre>

      <ul
        role="radiogroup"
        aria-label="Answer options"
        className="mt-4 grid gap-2 sm:grid-cols-2"
      >
        {challenge.choices.map((choice, i) => {
          const isCorrect =
            resolved || completed
              ? i === challenge.correctIndex
              : false;
          const isWrong = wrongPick === i;
          const isPicked = picked === i;

          return (
            <li key={i}>
              <motion.button
                type="button"
                role="radio"
                aria-checked={isPicked}
                onClick={() => handlePick(i)}
                disabled={completed || resolved}
                animate={isWrong ? { x: [-4, 4, -3, 3, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border bg-white/60 px-4 py-3 text-left text-sm font-mono backdrop-blur transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
                  !completed &&
                    !resolved &&
                    !isWrong &&
                    "border-white/60 hover:border-primary/40 hover:bg-white/75",
                  isCorrect &&
                    "border-emerald-500/50 bg-emerald-500/10 text-emerald-800",
                  isWrong &&
                    "border-destructive/60 bg-destructive/10 text-destructive",
                  !isCorrect && (completed || resolved) && "opacity-55",
                )}
              >
                <span>{choice}</span>
                {isCorrect && <Check className="h-4 w-4" aria-hidden />}
                {isWrong && <X className="h-4 w-4" aria-hidden />}
              </motion.button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {(resolved || completed) && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-xs leading-relaxed text-muted-foreground"
          >
            <span className="font-medium text-foreground/80">Why:</span>{" "}
            {challenge.explanation}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
