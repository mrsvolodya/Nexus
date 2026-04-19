import type { Puzzle } from "./puzzle";

export type ChallengeType = "signal-path" | "js-logic" | "ordering";

export type SignalPathChallenge = {
  type: "signal-path";
  id: string;
  puzzle: Puzzle;
};

export type JsLogicChallenge = {
  type: "js-logic";
  id: string;
  prompt: string;
  code: string;
  choices: readonly string[];
  correctIndex: number;
  explanation: string;
};

export type OrderingTask = {
  id: string;
  label: string;
  deps: readonly string[];
};

export type OrderingChallenge = {
  type: "ordering";
  id: string;
  prompt: string;
  tasks: readonly OrderingTask[];
};

export type Challenge =
  | SignalPathChallenge
  | JsLogicChallenge
  | OrderingChallenge;

/**
 * Type-erased, serialisation-friendly outcome for a single challenge.
 * The `meta` field carries per-type context that the evaluator recorded;
 * consumers should narrow on `type` before reading specific fields.
 */
export type ChallengeMeta = {
  moves?: number;
  par?: number;
  optimal?: boolean;
  pickedIndex?: number;
  orderingSequence?: readonly string[];
};

export type ChallengeResult = {
  challengeId: string;
  type: ChallengeType;
  dateSeed: string;
  completed: boolean;
  attempts: number;
  timeSpentMs: number;
  completedAt: string | null;
  meta: ChallengeMeta;
};

export type ChallengeSet = {
  dateSeed: string;
  challengeIds: readonly string[];
  results: Record<string, ChallengeResult>;
  currentIndex: number;
  allCompleted: boolean;
  completedAt: string | null;
};

export type ChallengeStore = {
  currentSet: ChallengeSet | null;
  history: ChallengeSet[];
  currentStreak: number;
  lastCompletedDate: string | null;
};

export type ChallengeSummary = {
  dateSeed: string;
  challengeCount: number;
  completedCount: number;
  allCompleted: boolean;
  totalTimeMs: number;
  totalAttempts: number;
  currentStreak: number;
  perChallenge: readonly {
    challengeId: string;
    type: ChallengeType;
    completed: boolean;
    attempts: number;
    timeSpentMs: number;
    meta: ChallengeMeta;
  }[];
};

export const EMPTY_STORE: ChallengeStore = {
  currentSet: null,
  history: [],
  currentStreak: 0,
  lastCompletedDate: null,
};

export function emptyResult(
  challengeId: string,
  type: ChallengeType,
  dateSeed: string,
): ChallengeResult {
  return {
    challengeId,
    type,
    dateSeed,
    completed: false,
    attempts: 0,
    timeSpentMs: 0,
    completedAt: null,
    meta: {},
  };
}
