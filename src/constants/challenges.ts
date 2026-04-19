import type {
  Challenge,
  JsLogicChallenge,
  OrderingChallenge,
  SignalPathChallenge,
} from "@/types/challenge";
import { PUZZLES } from "./daily-puzzles";
import { daysSinceEpoch } from "@/utils/puzzle";

export const CHALLENGE_SIZE = 3;

// ─── Signal Path: wraps existing puzzle pool ──────────────────────────
const SIGNAL_PATH_POOL: readonly SignalPathChallenge[] = PUZZLES.map(
  (p) => ({ type: "signal-path" as const, id: `sp-${p.id}`, puzzle: p }),
);

// ─── JS Logic: short reasoning questions (not trivia traps) ───────────
const JS_LOGIC_POOL: readonly JsLogicChallenge[] = [
  {
    type: "js-logic",
    id: "js-01",
    prompt: "What does this print?",
    code: `const a = [1, 2, 3];
const b = a.map(x => x * 2).filter(x => x > 2);
console.log(b);`,
    choices: ["[4, 6]", "[2, 4, 6]", "[4]", "undefined"],
    correctIndex: 0,
    explanation:
      "map doubles to [2, 4, 6]; filter keeps values > 2, leaving [4, 6].",
  },
  {
    type: "js-logic",
    id: "js-02",
    prompt: "What is logged?",
    code: `const { a = 1 } = { a: undefined };
console.log(a);`,
    choices: ["undefined", "1", "null", "Error"],
    correctIndex: 1,
    explanation:
      "Destructuring defaults apply when the value is undefined (not null).",
  },
  {
    type: "js-logic",
    id: "js-03",
    prompt: "What is printed?",
    code: `const x = { a: 1, b: 2, ...{ b: 3 } };
console.log(x.b);`,
    choices: ["2", "3", "undefined", "[2, 3]"],
    correctIndex: 1,
    explanation:
      "Later spread overrides earlier keys, so b becomes 3.",
  },
  {
    type: "js-logic",
    id: "js-04",
    prompt: "In what order do these log?",
    code: `console.log("1");
Promise.resolve().then(() => console.log("2"));
console.log("3");`,
    choices: ["1, 2, 3", "1, 3, 2", "3, 1, 2", "2, 1, 3"],
    correctIndex: 1,
    explanation:
      "Microtasks (then) run after synchronous code completes, so the order is 1, 3, 2.",
  },
  {
    type: "js-logic",
    id: "js-05",
    prompt: "What does this print?",
    code: `const xs = [1, 2, 3];
const total = xs.reduce((acc, x) => acc + x);
console.log(total);`,
    choices: ["NaN", "6", "5", "Error"],
    correctIndex: 1,
    explanation:
      "Without an initial value, reduce uses xs[0] as the accumulator: 1 + 2 + 3 = 6.",
  },
  {
    type: "js-logic",
    id: "js-06",
    prompt: "What prints?",
    code: `const fns = [];
for (let i = 0; i < 3; i++) {
  fns.push(() => i);
}
console.log(fns.map(fn => fn()));`,
    choices: ["[3, 3, 3]", "[0, 1, 2]", "[1, 2, 3]", "[0, 0, 0]"],
    correctIndex: 1,
    explanation:
      "let creates a new binding per iteration, so each closure captures its own i.",
  },
  {
    type: "js-logic",
    id: "js-07",
    prompt: "What is the result?",
    code: `const a = [1, [2, [3, [4]]]];
console.log(a.flat(2));`,
    choices: [
      "[1, 2, 3, 4]",
      "[1, 2, [3, [4]]]",
      "[1, 2, 3, [4]]",
      "[1, [2, [3, [4]]]]",
    ],
    correctIndex: 2,
    explanation:
      "flat(2) flattens two levels deep, leaving [4] as a nested array.",
  },
  {
    type: "js-logic",
    id: "js-08",
    prompt: "What does this print?",
    code: `const obj = { a: 1 };
const arr = [obj];
const copy = [...arr];
copy[0].a = 2;
console.log(obj.a);`,
    choices: ["1", "2", "undefined", "Error"],
    correctIndex: 1,
    explanation:
      "Spread creates a shallow copy; the object reference is shared, so mutating it updates the original.",
  },
  {
    type: "js-logic",
    id: "js-09",
    prompt: "What is the output?",
    code: `const set = new Set([1, 1, 2, 2, 3]);
console.log(set.size);`,
    choices: ["5", "3", "2", "1"],
    correctIndex: 1,
    explanation: "Set deduplicates values, leaving {1, 2, 3}.",
  },
  {
    type: "js-logic",
    id: "js-10",
    prompt: "What runs?",
    code: `async function run() {
  return 42;
}
const r = run();
console.log(r);`,
    choices: ["42", "Promise { 42 }", "undefined", "Error"],
    correctIndex: 1,
    explanation:
      "An async function always returns a Promise that resolves to its return value.",
  },
  {
    type: "js-logic",
    id: "js-11",
    prompt: "What is printed?",
    code: `const sum = (...args) => args.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3, 4));`,
    choices: ["10", "4", "[1,2,3,4]", "Error"],
    correctIndex: 0,
    explanation: "Rest collects all args into an array; reduce sums them to 10.",
  },
  {
    type: "js-logic",
    id: "js-12",
    prompt: "What is logged?",
    code: `const xs = [10, 20, 30];
xs.length = 1;
console.log(xs);`,
    choices: ["[10, 20, 30]", "[30]", "[10]", "[]"],
    correctIndex: 2,
    explanation:
      "Assigning length truncates the array from the right.",
  },
  {
    type: "js-logic",
    id: "js-13",
    prompt: "What does this print?",
    code: `function greet(name = "you") {
  return "Hi " + name;
}
console.log(greet(undefined));`,
    choices: ["Hi you", "Hi undefined", "Hi ", "Error"],
    correctIndex: 0,
    explanation:
      "Default parameters apply when the argument is undefined.",
  },
  {
    type: "js-logic",
    id: "js-14",
    prompt: "What is the result?",
    code: `const arr = [3, 1, 2];
const sorted = [...arr].sort();
console.log(arr[0], sorted[0]);`,
    choices: ["3 1", "1 1", "3 3", "1 3"],
    correctIndex: 0,
    explanation:
      "Spreading copies the array first, so the original is unchanged: arr[0] is 3, sorted[0] is 1.",
  },
] as const;

// ─── Ordering (constraint / topological sort) ──────────────────────────
const ORDERING_POOL: readonly OrderingChallenge[] = [
  {
    type: "ordering",
    id: "ord-01",
    prompt: "Order these build steps so every dependency runs first.",
    tasks: [
      { id: "install", label: "install deps", deps: [] },
      { id: "typecheck", label: "typecheck", deps: ["install"] },
      { id: "build", label: "build", deps: ["install", "typecheck"] },
      { id: "test", label: "test", deps: ["build"] },
      { id: "deploy", label: "deploy", deps: ["test"] },
    ],
  },
  {
    type: "ordering",
    id: "ord-02",
    prompt: "Release sequence — which step unlocks next?",
    tasks: [
      { id: "freeze", label: "code freeze", deps: [] },
      { id: "qa", label: "qa sign-off", deps: ["freeze"] },
      { id: "staging", label: "staging deploy", deps: ["qa"] },
      { id: "smoke", label: "smoke tests", deps: ["staging"] },
      { id: "prod", label: "prod deploy", deps: ["smoke"] },
    ],
  },
  {
    type: "ordering",
    id: "ord-03",
    prompt: "A valid PR workflow.",
    tasks: [
      { id: "branch", label: "create branch", deps: [] },
      { id: "commit", label: "commit changes", deps: ["branch"] },
      { id: "push", label: "push branch", deps: ["commit"] },
      { id: "pr", label: "open PR", deps: ["push"] },
      { id: "merge", label: "merge", deps: ["pr"] },
    ],
  },
  {
    type: "ordering",
    id: "ord-04",
    prompt: "Onboard a new engineer.",
    tasks: [
      { id: "account", label: "create account", deps: [] },
      { id: "access", label: "grant access", deps: ["account"] },
      { id: "laptop", label: "provision laptop", deps: [] },
      { id: "mentor", label: "assign mentor", deps: ["account"] },
      { id: "first", label: "first task", deps: ["access", "laptop", "mentor"] },
    ],
  },
  {
    type: "ordering",
    id: "ord-05",
    prompt: "Safe schema migration.",
    tasks: [
      { id: "plan", label: "write plan", deps: [] },
      { id: "backup", label: "backup db", deps: ["plan"] },
      { id: "dryrun", label: "dry run", deps: ["plan"] },
      { id: "migrate", label: "run migration", deps: ["backup", "dryrun"] },
      { id: "verify", label: "verify data", deps: ["migrate"] },
    ],
  },
  {
    type: "ordering",
    id: "ord-06",
    prompt: "Ship a new feature.",
    tasks: [
      { id: "spec", label: "write spec", deps: [] },
      { id: "design", label: "design review", deps: ["spec"] },
      { id: "build", label: "implement", deps: ["design"] },
      { id: "review", label: "code review", deps: ["build"] },
      { id: "ship", label: "ship", deps: ["review"] },
    ],
  },
  {
    type: "ordering",
    id: "ord-07",
    prompt: "Incident response.",
    tasks: [
      { id: "detect", label: "detect", deps: [] },
      { id: "mitigate", label: "mitigate", deps: ["detect"] },
      { id: "investigate", label: "investigate", deps: ["mitigate"] },
      { id: "resolve", label: "resolve", deps: ["investigate"] },
      { id: "postmortem", label: "postmortem", deps: ["resolve"] },
    ],
  },
  {
    type: "ordering",
    id: "ord-08",
    prompt: "Bug workflow.",
    tasks: [
      { id: "repro", label: "reproduce", deps: [] },
      { id: "diagnose", label: "diagnose", deps: ["repro"] },
      { id: "fix", label: "write fix", deps: ["diagnose"] },
      { id: "test", label: "test", deps: ["fix"] },
      { id: "deploy", label: "deploy", deps: ["test"] },
    ],
  },
  {
    type: "ordering",
    id: "ord-09",
    prompt: "Sprint rhythm.",
    tasks: [
      { id: "plan", label: "plan", deps: [] },
      { id: "kickoff", label: "kickoff", deps: ["plan"] },
      { id: "work", label: "execute", deps: ["kickoff"] },
      { id: "review", label: "review", deps: ["work"] },
      { id: "retro", label: "retro", deps: ["review"] },
    ],
  },
  {
    type: "ordering",
    id: "ord-10",
    prompt: "Gradual rollout.",
    tasks: [
      { id: "tests", label: "unit tests pass", deps: [] },
      { id: "staging", label: "staging green", deps: ["tests"] },
      { id: "canary", label: "canary 1%", deps: ["staging"] },
      { id: "ramp", label: "ramp 50%", deps: ["canary"] },
      { id: "ga", label: "full rollout", deps: ["ramp"] },
    ],
  },
] as const;

/**
 * Today's set = one of each type, rotated deterministically by UTC day.
 * Order is fixed: signal-path, js-logic, ordering.
 */
export function pickTodaysSet(now: Date = new Date()): readonly Challenge[] {
  const day = daysSinceEpoch(now);
  return [
    SIGNAL_PATH_POOL[day % SIGNAL_PATH_POOL.length],
    JS_LOGIC_POOL[day % JS_LOGIC_POOL.length],
    ORDERING_POOL[day % ORDERING_POOL.length],
  ];
}
