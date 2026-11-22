/**
 * All personal copy lives here so it's easy to edit in one place.
 * Lines marked TODO are placeholders or drafts. Replace them with your own words.
 */
export const site = {
  name: "Elda Mekonnen",
  shortName: "Elda",
  // TODO: one line about what you do (shown in the hero, in full-strength text).
  tagline: "Full-stack software engineer at Bloomberg, working on identity and access management.",
  // TODO: one line about what you're passionate about (shown after the tagline, muted).
  passion: "On my own time I build tools for my community.",
  // TODO: short status pill above your name. Set to "" to hide it.
  status: "Currently at Bloomberg",
  email: "eldaalemu@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/elda-alemu-mekonnen-8731a11b1/" },
  ],
  // Headshot on the About page (4:5 crop, from documents/headshot.JPG).
  photo: { src: "/about/headshot.jpg", alt: "Elda Mekonnen smiling, in a white sleeveless blouse" },
  // TODO: draft from your resumes. Rewrite in your own voice.
  about: [
    "I'm a software engineer at Bloomberg, where I do full-stack work on identity and access management and the company's web portal, mostly in TypeScript and Python.",
    "Before that I studied Computer and Information Science at the University of Pennsylvania, after finishing high school at Andinet International School in Addis Ababa.",
    "At Penn I interned at Bloomberg, did research with Professor Benjamin Pierce, and spent a lot of time teaching: as a TA for intro programming, and as a tutor for kids in West Philadelphia.",
    "These days I build tools for the Ethiopian Orthodox community I'm part of. Outside of code you'll find me reading, out on a hike or a long walk, traveling, or taking photos.",
  ],
  // TODO: things you care about (shown as tags on the About page).
  passions: ["Teaching & mentoring", "Community tech", "Photography", "Hiking & travel", "Guitar", "Amharic & English"],
  // TODO: drop your resume at public/resume.pdf, then set this to "/resume.pdf".
  resume: "",
  // "Beyond code" on the About page. Add more entries (with or without a link) as you like.
  beyondCode: [
    {
      title: "Photography",
      text: "At Penn I was a photographer for The Daily Pennsylvanian, shooting campus at night, student performances, and news around the university. I still shoot for fun and share it on Instagram.",
      links: [
        { label: "My photography on Instagram", href: "https://www.instagram.com/aesthetical.lypleasingg/" },
        { label: "Photos for The Daily Pennsylvanian", href: "https://www.thedp.com/staff/elda-alemu-mekonnen" },
      ],
    },
    {
      title: "Outdoors & travel",
      text: "I love being outside: long walks, hikes, and seeing somewhere new. I film some of my trips for Sights & Sounds, a travel series on my YouTube channel.",
      links: [
        { label: "Watch Sights & Sounds", href: "https://www.youtube.com/playlist?list=PLCbH_ky0cXRM" },
        { label: "My YouTube channel", href: "https://www.youtube.com/@eldaalemu5625" },
      ],
    },
    {
      title: "Reading",
      text: "I'm usually in the middle of a book, most often a spiritual one.",
    },
  ] as { title: string; text: string; links?: { label: string; href: string }[] }[],
  // "Through my lens" photo strip on the About page (web copies of photos in documents/).
  photos: [
    { src: "/about/photos/mountain.jpg", width: 1108, height: 1488, tile: "tall", alt: "A snow-capped mountain framed by tall evergreens above an alpine meadow" },
    { src: "/about/photos/autumn-forest.jpg", width: 1496, height: 988, alt: "An autumn forest with golden leaves and a floor covered in fallen red leaves" },
    { src: "/about/photos/autumn-night.jpg", width: 1490, height: 1098, alt: "Red autumn trees arching over a lamp-lit park path at night" },
    { src: "/about/photos/fireworks.jpg", width: 1424, height: 798, tile: "wide", alt: "Fireworks bursting over a city skyline at night" },
  ] as { src: string; width: number; height: number; alt: string; tile?: "tall" | "wide" }[],
};
