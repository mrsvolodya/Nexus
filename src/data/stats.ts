export type Stat = {
  value: string;
  label: string;
  hint?: string;
};

export const HERO_STATS: Stat[] = [
  { value: "120+", label: "Vetted engineers", hint: "Across 14 time zones" },
  { value: "40+", label: "Active partnerships", hint: "Seed → Series D" },
  { value: "96%", label: "Client retention", hint: "YoY renewals" },
  { value: "<10d", label: "Avg. time to first PR", hint: "From kickoff" },
];
