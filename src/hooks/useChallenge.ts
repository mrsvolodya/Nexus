"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  Challenge,
  ChallengeMeta,
  ChallengeResult,
  ChallengeSet,
  ChallengeStore,
} from "@/types/challenge";
import { emptyResult, EMPTY_STORE } from "@/types/challenge";
import { pickTodaysSet } from "@/constants/challenges";
import { computeStreak, todayIso } from "@/utils/puzzle";

const STORE_KEY = "nexus:daily-signal";
const HISTORY_CAP = 14;

/** Type guard — rejects any previous-schema set (e.g. old `puzzleIds`). */
function isValidSet(s: unknown): s is ChallengeSet {
  if (!s || typeof s !== "object") return false;
  const v = s as Partial<ChallengeSet>;
  return (
    typeof v.dateSeed === "string" &&
    Array.isArray(v.challengeIds) &&
    typeof v.currentIndex === "number" &&
    !!v.results &&
    typeof v.results === "object"
  );
}

function readStore(): ChallengeStore {
  if (typeof window === "undefined") return EMPTY_STORE;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return EMPTY_STORE;
    const parsed = JSON.parse(raw) as Partial<ChallengeStore>;

    // Defensive: any previous-schema currentSet or history entries are
    // silently discarded. We preserve the streak and lastCompletedDate
    // so users aren't punished for our migration.
    return {
      currentSet: isValidSet(parsed.currentSet) ? parsed.currentSet : null,
      history: Array.isArray(parsed.history)
        ? parsed.history.filter(isValidSet)
        : [],
      currentStreak:
        typeof parsed.currentStreak === "number" ? parsed.currentStreak : 0,
      lastCompletedDate:
        typeof parsed.lastCompletedDate === "string"
          ? parsed.lastCompletedDate
          : null,
    };
  } catch {
    return EMPTY_STORE;
  }
}

function writeStore(s: ChallengeStore) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch {
    /* storage disabled / quota full — silently ignore */
  }
}

function buildSet(
  date: string,
  challenges: readonly Challenge[],
): ChallengeSet {
  const results: Record<string, ChallengeResult> = {};
  for (const c of challenges) results[c.id] = emptyResult(c.id, c.type, date);
  return {
    dateSeed: date,
    challengeIds: challenges.map((c) => c.id),
    results,
    currentIndex: 0,
    allCompleted: false,
    completedAt: null,
  };
}

function setMatchesPool(
  set: ChallengeSet | null,
  challenges: readonly Challenge[],
  date: string,
): boolean {
  if (!set || set.dateSeed !== date) return false;
  if (!Array.isArray(set.challengeIds)) return false;
  if (set.challengeIds.length !== challenges.length) return false;
  return set.challengeIds.every((id, i) => challenges[i]?.id === id);
}

type UseChallengeReturn = {
  hydrated: boolean;
  challenges: readonly Challenge[];
  currentChallenge: Challenge | null;
  currentIndex: number;
  currentResult: ChallengeResult | null;
  allCompleted: boolean;
  streak: number;
  store: ChallengeStore;
  isLast: boolean;
  markResult: (meta: ChallengeMeta) => void;
  incrementAttempt: () => void;
  goToNext: () => void;
};

/**
 * Type-agnostic owner of the daily challenge state:
 *  - hydrates from localStorage
 *  - rolls over on UTC-day change
 *  - holds per-challenge metrics (attempts, timeSpentMs, completedAt)
 *  - advances through the 3-challenge set
 *  - maintains the streak when every challenge in a set is completed
 *
 * Challenge components own their internal UI state (path, picked option,
 * sequence) and call `markResult(meta)` exactly once when the user solves.
 */
export function useChallenge(): UseChallengeReturn {
  const challenges = useMemo(() => pickTodaysSet(), []);

  const [store, setStore] = useState<ChallengeStore>(EMPTY_STORE);
  const [hydrated, setHydrated] = useState(false);
  const [startedAt, setStartedAt] = useState<number>(0);

  useEffect(() => {
    const date = todayIso();
    const stored = readStore();

    let next: ChallengeStore = stored;
    if (!setMatchesPool(stored.currentSet, challenges, date)) {
      const archived =
        stored.currentSet && stored.currentSet.allCompleted
          ? [stored.currentSet, ...stored.history].slice(0, HISTORY_CAP)
          : stored.history;
      next = {
        ...stored,
        currentSet: buildSet(date, challenges),
        history: archived,
      };
      writeStore(next);
    }
    setStore(next);
    setHydrated(true);
    setStartedAt(performance.now());
  }, [challenges]);

  const currentSet = store.currentSet;
  const currentIndex = currentSet?.currentIndex ?? 0;
  const currentChallenge = challenges[currentIndex] ?? null;
  const currentResult = currentChallenge
    ? currentSet?.results[currentChallenge.id] ?? null
    : null;
  const allCompleted = currentSet?.allCompleted ?? false;
  const isLast = currentIndex >= challenges.length - 1;

  const markResult = useCallback(
    (meta: ChallengeMeta) => {
      if (!currentChallenge) return;
      const elapsed = Math.round(performance.now() - startedAt);

      setStore((prev) => {
        if (!prev.currentSet) return prev;
        const existing = prev.currentSet.results[currentChallenge.id];
        if (!existing || existing.completed) return prev;

        const updated: ChallengeResult = {
          ...existing,
          completed: true,
          attempts: existing.attempts + 1,
          timeSpentMs: elapsed,
          completedAt: new Date().toISOString(),
          meta,
        };

        const newResults = {
          ...prev.currentSet.results,
          [currentChallenge.id]: updated,
        };
        const allDone = prev.currentSet.challengeIds.every(
          (id) => newResults[id].completed,
        );

        const newSet: ChallengeSet = {
          ...prev.currentSet,
          results: newResults,
          allCompleted: allDone,
          completedAt: allDone ? new Date().toISOString() : null,
        };

        const date = todayIso();
        const nextStreak = allDone
          ? computeStreak(date, prev.lastCompletedDate, prev.currentStreak)
          : prev.currentStreak;

        const next: ChallengeStore = {
          ...prev,
          currentSet: newSet,
          currentStreak: nextStreak,
          lastCompletedDate: allDone ? date : prev.lastCompletedDate,
        };
        writeStore(next);
        return next;
      });
    },
    [currentChallenge, startedAt],
  );

  const incrementAttempt = useCallback(() => {
    if (!currentChallenge) return;
    setStore((prev) => {
      if (!prev.currentSet) return prev;
      const existing = prev.currentSet.results[currentChallenge.id];
      if (!existing || existing.completed) return prev;
      const updated = { ...existing, attempts: existing.attempts + 1 };
      const next: ChallengeStore = {
        ...prev,
        currentSet: {
          ...prev.currentSet,
          results: {
            ...prev.currentSet.results,
            [currentChallenge.id]: updated,
          },
        },
      };
      writeStore(next);
      return next;
    });
  }, [currentChallenge]);

  const goToNext = useCallback(() => {
    if (!currentSet || isLast) return;
    const nextIdx = currentSet.currentIndex + 1;
    setStore((prev) => {
      if (!prev.currentSet) return prev;
      const next: ChallengeStore = {
        ...prev,
        currentSet: { ...prev.currentSet, currentIndex: nextIdx },
      };
      writeStore(next);
      return next;
    });
    setStartedAt(performance.now());
  }, [currentSet, isLast]);

  return {
    hydrated,
    challenges,
    currentChallenge,
    currentIndex,
    currentResult,
    allCompleted,
    streak: store.currentStreak,
    store,
    isLast,
    markResult,
    incrementAttempt,
    goToNext,
  };
}
