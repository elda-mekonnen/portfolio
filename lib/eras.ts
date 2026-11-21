export const eraIds = ["post-college", "college", "high-school"] as const;
export type Era = (typeof eraIds)[number];

/** Display info for each chapter. Listed newest first. */
// TODO: tweak the blurbs in your own voice.
export const eras: Record<Era, { label: string; years: string; blurb: string }> = {
  "post-college": {
    label: "Post-college",
    years: "2024 – now",
    blurb: "Full-stack engineering at Bloomberg, plus tools for my community.",
  },
  college: {
    label: "College",
    years: "2020 – 2024",
    blurb: "Computer and Information Science at the University of Pennsylvania.",
  },
  "high-school": {
    label: "High school",
    years: "Before 2020",
    blurb: "Andinet International School in Addis Ababa.",
  },
};
