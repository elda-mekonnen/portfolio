import type { Era } from "@/lib/eras";

/**
 * Smaller projects without a case-study page (no screenshots or code left to show).
 * Shown as a compact text list under each era's project cards on /projects.
 */
export type OtherProject = { title: string; year: number; description: string };

export const otherProjects: Partial<Record<Era, OtherProject[]>> = {
  college: [
    {
      title: "Food Waste App", // TODO: the app's real name, if it had one
      year: 2022,
      description: "A mobile and web app to help college students cut household food waste.",
    },
    {
      title: "Chess",
      year: 2021,
      description: "A full chess game built from scratch, including en passant and castling.",
    },
  ],
  "high-school": [
    {
      title: "Robotic Orchestra",
      year: 2019,
      description: "A piano-playing robot, built with an Arduino and parts I designed in CAD.",
    },
  ],
};
