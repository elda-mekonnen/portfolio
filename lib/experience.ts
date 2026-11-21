import type { Era } from "@/lib/eras";

/**
 * Resume-style experience, grouped by era (shown on the About page).
 * Source: your 2022 resumes. Anything after mid-2022 is marked TODO.
 */
export type Experience = {
  title: string;
  org: string;
  dates: string;
  points?: string[];
  /** Optional external link, e.g. a video or paper (opens in a new tab). */
  link?: { label: string; href: string };
};

export const experience: Record<Era, Experience[]> = {
  "post-college": [
    {
      title: "Software Engineer",
      org: "Bloomberg LP",
      dates: "Aug 2024 – now",
      points: [
        "Full-stack engineering on identity and access management and on the company's web portal.",
        "Work mostly in TypeScript/JavaScript and Python.",
        // TODO: add 1–2 concrete wins (what you shipped, scale, impact).
      ],
    },
    {
      title: "Volunteer developer", // TODO: your actual role
      org: "Orthodox Tewahedo Youth NYC",
      dates: "2026", // TODO: confirm
      points: ["Built and maintain the group's website, admin dashboard, and events calendar."],
    },
  ],
  college: [
    {
      title: "B.S.E. in Computer and Information Science",
      org: "University of Pennsylvania",
      dates: "2020 – 2024",
    },
    {
      title: "Software Engineer Intern",
      org: "Bloomberg LP · New York",
      dates: "Jun – Aug 2022",
      points: [
        "Built a system that runs quality-control checks on datasets to enforce field-specific constraints.",
        "Added a feature to an internal site so experts could define constraints, wiring the frontend to the backend.",
        "Tested user-defined constraints end to end, and explored ML to suggest constraints automatically.",
      ],
    },
    {
      title: "Undergraduate Researcher, DeepSpec",
      org: "University of Pennsylvania · with Prof. Benjamin Pierce",
      dates: "May – Aug 2021",
      points: [
        "Evaluated machine-learning-powered test generators on a team of three undergrads.",
        "Implemented a binary search tree generator and an imperative-program generator, then ran experiments to improve them.",
      ],
      link: { label: "Watch our research video", href: "https://youtu.be/kGSyXEINmLg" },
    },
    {
      title: "Teaching Assistant, Programming Languages & Techniques I",
      org: "University of Pennsylvania",
      dates: "Aug 2021 – Dec 2023",
      points: [
        "Led weekly recitations of 20+ students and office hours of 20–30.",
        "Headed the Special Projects Committee, improving homework with better visualizers and tests.",
      ],
    },
    {
      title: "Teaching Assistant, Engineering Summer Academy at Penn",
      org: "University of Pennsylvania",
      dates: "Jun – Aug 2021",
      points: ["Planned a data science course for high school students and ran office hours."],
    },
    {
      title: "Tutor & Liaison",
      org: "West Philadelphia Tutoring Project (Moder Patshala)",
      dates: "Sep 2020 – Dec 2023",
      points: [
        "Taught groups of 6–20 kids in grades 1–8 in math, English, and science.",
        "Ran weekly tutor workshops and coordinated with our community partner.",
      ],
    },
    {
      title: "Campus involvement",
      org: "University of Pennsylvania",
      dates: "2021 – 2024", // TODO: confirm
      points: [
        "Fundraising Chair, National Society of Black Engineers",
        "Secretary, Penn Ethiopian-Eritrean Student Association",
        "Photographer, The Daily Pennsylvanian",
        "African Rhythms Drum & Dance Troupe · Penn Band Color Guard",
        "Social Committee, Assembly of International Students",
      ],
    },
  ],
  "high-school": [
    {
      title: "High school diploma",
      org: "Andinet International School · Addis Ababa",
      dates: "Graduated 2020",
    },
    {
      title: "Engineering Summer Academy at Penn (Robotics)",
      org: "University of Pennsylvania",
      dates: "Jul 2019",
      points: [
        // TODO: confirm the robot was built at the summer academy.
        "Built a piano-playing robot (“Robotic Orchestra”) with Arduino and computer-aided design.",
      ],
    },
  ],
};
