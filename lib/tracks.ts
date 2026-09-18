import { DB_STEPS, LAUNCH_STEPS, TEARDOWN } from "@/lib/content";

// Every checkable item in the app, grouped the way the progress page shows them.
export type Track = { id: string; title: string; href: string; items: { id: string; label: string }[] };

export const TRACKS: Track[] = [
  {
    id: "launch",
    title: "Launch your server",
    href: "/guide/",
    items: LAUNCH_STEPS.map((s, i) => ({ id: `launch-${i}`, label: s.title })),
  },
  {
    id: "db",
    title: "Create a database",
    href: "/guide/",
    items: DB_STEPS.map((s, i) => ({ id: `db-${i}`, label: s.title })),
  },
  {
    id: "labs",
    title: "Practice labs",
    href: "/practice/",
    items: [
      { id: "lab-console", label: "Launch simulator: a working instance on the first try" },
      { id: "lab-sg-web", label: "Security groups: make the site load" },
      { id: "lab-sg-db", label: "Security groups: let only the server reach the database" },
      { id: "lab-quiz", label: "Quiz: 7 out of 8 or better" },
    ],
  },
  {
    id: "teardown",
    title: "Tear it all down",
    href: "/cost/",
    items: TEARDOWN.map((t, i) => ({ id: `teardown-${i}`, label: t.split(".")[0] })),
  },
];

export const ALL_ITEMS = TRACKS.flatMap((t) => t.items);
