"use client";

import type { Challenge, ChallengeMeta } from "@/types/challenge";
import { SignalPathChallenge } from "./SignalPathChallenge";
import { JsLogicChallenge } from "./JsLogicChallenge";
import { OrderingChallenge } from "./OrderingChallenge";

type ChallengeRouterProps = {
  challenge: Challenge;
  completed: boolean;
  onSolve: (meta: ChallengeMeta) => void;
  onAttempt: () => void;
};

/**
 * Discriminated-union router. Adds a new challenge type by adding a case
 * here and defining its component — everything else stays untouched.
 */
export function ChallengeRouter({
  challenge,
  completed,
  onSolve,
  onAttempt,
}: ChallengeRouterProps) {
  switch (challenge.type) {
    case "signal-path":
      return (
        <SignalPathChallenge
          challenge={challenge}
          completed={completed}
          onSolve={onSolve}
          onAttempt={onAttempt}
        />
      );
    case "js-logic":
      return (
        <JsLogicChallenge
          challenge={challenge}
          completed={completed}
          onSolve={onSolve}
          onAttempt={onAttempt}
        />
      );
    case "ordering":
      return (
        <OrderingChallenge
          challenge={challenge}
          completed={completed}
          onSolve={onSolve}
          onAttempt={onAttempt}
        />
      );
  }
}
