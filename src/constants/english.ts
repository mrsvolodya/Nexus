import {
  Mic,
  MessageCircle,
  PenSquare,
  CalendarCheck,
} from "lucide-react";
import type { EnglishBenefit } from "@/types/content";

export const ENGLISH_BENEFITS: readonly EnglishBenefit[] = [
  {
    title: "1:1 speaking coaching",
    description:
      "Weekly sessions with a dedicated language coach — focused on fluency, pacing, and confidence on calls.",
    icon: Mic,
  },
  {
    title: "Speaking clubs",
    description:
      "Small group conversations on engineering topics, product discovery, and day-to-day collaboration.",
    icon: MessageCircle,
  },
  {
    title: "Writing labs",
    description:
      "Workshops on PR descriptions, design docs, async updates — the English that actually ships software.",
    icon: PenSquare,
  },
  {
    title: "Always-on cadence",
    description:
      "Drop-in office hours, async feedback on writing, and a rolling curriculum you shape with your mentor.",
    icon: CalendarCheck,
  },
] as const;

export const ENGLISH_LEVELS_LABELS = ["A2", "B1", "B2", "C1", "C2"] as const;
