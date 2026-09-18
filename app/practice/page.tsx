import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Practice" };

const LABS = [
  { href: "/practice/launch/", title: "Launch simulator", time: "5 min", body: "A copy of the EC2 launch form. Make the choices, press launch, and see whether your page would load, and why not." },
  { href: "/practice/security-groups/", title: "Security group lab", time: "10 min", body: "Add inbound rules to a server and a database, then send test traffic. Get the site loading and the database locked down." },
  { href: "/practice/quiz/", title: "Scenario quiz", time: "5 min", body: "Eight things that go wrong in real life. Pick the fix, then read why." },
];

export default function Practice() {
  return (
    <>
      <p className="eyebrow">Practice</p>
      <h1>Try it here first</h1>
      <p className="lede">These labs run in your browser. No AWS account, no credits, nothing to break. Do them before the
        workshop to walk in ready, or after to lock in what you did.</p>
      <div className="cards">
        {LABS.map((l) => (
          <Link key={l.href} href={l.href} className="card linkcard">
            <p className="eyebrow" style={{ margin: 0 }}>{l.time}</p>
            <h3>{l.title} →</h3>
            <p className="muted">{l.body}</p>
          </Link>
        ))}
      </div>
      <p className="muted">Finished labs show up on your <Link href="/progress/">progress</Link> page, saved in this browser only.</p>
    </>
  );
}
