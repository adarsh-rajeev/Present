export const PRESENTATION_STATUS = [
  "EXCELLENT",
  "GOOD",
  "AVERAGE",
  "NEEDS_IMPROVEMENT",
] as const;

export type PresentationStatus =
  (typeof PRESENTATION_STATUS)[number];

export const PRESENTATION_STATUS_LABELS: Record<
  PresentationStatus,
  string
> = {
  EXCELLENT: "Excellent",
  GOOD: "Good",
  AVERAGE: "Average",
  NEEDS_IMPROVEMENT: "Needs Improvement",
};