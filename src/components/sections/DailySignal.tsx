"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ChallengeRouter } from "@/components/challenges/ChallengeRouter";
import { useChallenge } from "@/hooks/useChallenge";
import { formatDuration, CHALLENGE_TYPE_LABELS } from "@/utils/challenge";
import { cn } from "@/utils/cn";

export function DailySignal() {
  const {
    hydrated,
    challenges,
    currentChallenge,
    currentIndex,
    currentResult,
    allCompleted,
    streak,
    store,
    isLast,
    markResult,
    incrementAttempt,
    goToNext,
  } = useChallenge();

  return (
    <Section id="daily-signal" aria-labelledby="daily-signal-title">
      <SectionHeader
        index="06"
        eyebrow="Daily Challenge"
        title={
          <>
            Three short <span className="gradient-text">thinking exercises</span>.
          </>
        }
        description="Signal routing, JS logic, and systems ordering. 2–5 minutes. Changes daily. No impact on your application."
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <GlassCard
          intensity="strong"
          padded={false}
          className="relative overflow-hidden p-6 sm:p-8"
        >
          <Header
            challenges={challenges}
            currentIndex={currentIndex}
            results={store.currentSet?.results ?? {}}
            streak={streak}
            hydrated={hydrated}
          />

          <AnimatePresence mode="wait">
            {allCompleted ? (
              <SetComplete
                key="complete"
                totalTime={sumTime(store)}
                totalAttempts={sumAttempts(store)}
                streak={streak}
              />
            ) : currentChallenge ? (
              <motion.div
                key={`ch-${currentIndex}-${currentChallenge.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
              >
                <ChallengeRouter
                  challenge={currentChallenge}
                  completed={currentResult?.completed ?? false}
                  onSolve={markResult}
                  onAttempt={incrementAttempt}
                />

                {/* Progress to next */}
                {currentResult?.completed && !isLast && (
                  <div className="mt-6 flex items-center justify-end">
                    <Button type="button" size="sm" onClick={goToNext}>
                      Next challenge
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </GlassCard>
      </div>
    </Section>
  );
}

// ─── header: pips + streak ────────────────────────────────────────────

function Header({
  challenges,
  currentIndex,
  results,
  streak,
  hydrated,
}: {
  challenges: readonly { id: string; type: string }[];
  currentIndex: number;
  results: Record<string, { completed: boolean }>;
  streak: number;
  hydrated: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <ol className="flex items-center gap-2">
        {challenges.map((c, i) => {
          const done = results[c.id]?.completed;
          const current = i === currentIndex && !done;
          return (
            <li key={c.id} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <span
                  aria-label={`Challenge ${i + 1} ${done ? "completed" : current ? "current" : "upcoming"}`}
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full border text-[11px] font-semibold transition-colors",
                    done
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700"
                      : current
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-white/60 bg-white/60 text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
                  {CHALLENGE_TYPE_LABELS[c.type]?.split(" ")[0] ?? c.type}
                </span>
              </div>
              {i < challenges.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "-mt-4 h-px w-6 bg-border transition-colors",
                    done && "bg-emerald-500/40",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
      {hydrated && streak > 0 && (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-xs text-primary">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(183_74%_45%_/_0.9)]"
          />
          {streak}-day streak
        </div>
      )}
    </div>
  );
}

// ─── final state ──────────────────────────────────────────────────────

function SetComplete({
  totalTime,
  totalAttempts,
  streak,
}: {
  totalTime: number;
  totalAttempts: number;
  streak: number;
}) {
  return (
    <motion.div
      key="set-complete"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 flex flex-col items-center gap-4 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-400/40 to-primary/30 ring-1 ring-emerald-500/30">
        <CheckCircle2 className="h-7 w-7 text-emerald-600" aria-hidden />
      </span>
      <h3 className="font-display text-2xl font-semibold tracking-tight">
        Today&apos;s challenge complete
      </h3>
      <dl className="mt-2 grid w-full max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/60 bg-white/40">
        <Stat label="Challenges" value="3 / 3" />
        <Stat label="Attempts" value={String(totalAttempts)} />
        <Stat label="Time" value={formatDuration(totalTime)} />
      </dl>
      <p className="mt-2 text-sm text-muted-foreground">
        Come back tomorrow for a new set.
        {streak > 1 ? ` You're on a ${streak}-day streak.` : ""}
      </p>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/55 p-3 text-center backdrop-blur">
      <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-display text-lg font-semibold tracking-tight">
        {value}
      </dd>
    </div>
  );
}

// ─── helpers ──────────────────────────────────────────────────────────

type StoreShape = ReturnType<typeof useChallenge>["store"];

function sumTime(store: StoreShape): number {
  const set = store.currentSet;
  if (!set) return 0;
  return Object.values(set.results).reduce(
    (sum, r) => sum + (r.completed ? r.timeSpentMs : 0),
    0,
  );
}

function sumAttempts(store: StoreShape): number {
  const set = store.currentSet;
  if (!set) return 0;
  return Object.values(set.results).reduce((sum, r) => sum + r.attempts, 0);
}
