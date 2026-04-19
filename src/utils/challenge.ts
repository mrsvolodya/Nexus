import type {
  ChallengeStore,
  ChallengeSummary,
} from "@/types/challenge";

/**
 * Builds the shareable summary. Returns null until at least one challenge
 * in the current set is completed — we never prompt the user to attach
 * empty data.
 */
export function summarizeChallenge(
  store: ChallengeStore,
): ChallengeSummary | null {
  const set = store.currentSet;
  if (!set) return null;

  const results = set.challengeIds
    .map((id) => set.results[id])
    .filter((r) => r && r.completed);

  if (results.length === 0) return null;

  const totalTimeMs = results.reduce((sum, r) => sum + r.timeSpentMs, 0);
  const totalAttempts = results.reduce((sum, r) => sum + r.attempts, 0);

  return {
    dateSeed: set.dateSeed,
    challengeCount: set.challengeIds.length,
    completedCount: results.length,
    allCompleted: set.allCompleted,
    totalTimeMs,
    totalAttempts,
    currentStreak: store.currentStreak,
    perChallenge: results.map((r) => ({
      challengeId: r.challengeId,
      type: r.type,
      completed: r.completed,
      attempts: r.attempts,
      timeSpentMs: r.timeSpentMs,
      meta: r.meta,
    })),
  };
}

export function formatDuration(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem === 0 ? `${m}m` : `${m}m ${rem}s`;
}

export const CHALLENGE_TYPE_LABELS: Record<string, string> = {
  "signal-path": "Signal Path",
  "js-logic": "JS Logic",
  ordering: "Ordering",
};
