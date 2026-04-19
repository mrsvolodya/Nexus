export type Opportunity = {
  role: string;
  seniority: "Mid" | "Senior" | "Staff" | "Lead";
  stack: string[];
  location: string;
  type: "Full-time" | "Contract";
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    role: "Senior Frontend Engineer",
    seniority: "Senior",
    stack: ["React", "Next.js", "TypeScript"],
    location: "Remote · EU/LatAm",
    type: "Full-time",
  },
  {
    role: "Senior Backend Engineer",
    seniority: "Senior",
    stack: ["Go", "PostgreSQL", "Kubernetes"],
    location: "Remote · EMEA",
    type: "Full-time",
  },
  {
    role: "Staff Full-stack Engineer",
    seniority: "Staff",
    stack: ["TypeScript", "Node", "AWS"],
    location: "Remote",
    type: "Contract",
  },
  {
    role: "Mobile Engineer (iOS / Android)",
    seniority: "Senior",
    stack: ["Swift", "Kotlin", "React Native"],
    location: "Remote · CET±3",
    type: "Full-time",
  },
  {
    role: "DevOps / Platform Engineer",
    seniority: "Senior",
    stack: ["Terraform", "Kubernetes", "AWS/GCP"],
    location: "Remote",
    type: "Full-time",
  },
  {
    role: "Engineering Lead",
    seniority: "Lead",
    stack: ["Architecture", "Leadership", "Delivery"],
    location: "Remote · EU",
    type: "Full-time",
  },
];
