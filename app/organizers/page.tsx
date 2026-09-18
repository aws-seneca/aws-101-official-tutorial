import type { Metadata } from "next";
import { CHANGES, DECISIONS } from "@/lib/content";

export const metadata: Metadata = { title: "Organizers" };

const ROLES = [
  { role: "Presenter", count: "1", job: "Drives the screen, narrates every click, keeps pace" },
  { role: "Helpers", count: "3+", job: "One per section of the room. Go to anyone who has stopped clicking, without waiting for a hand" },
  { role: "Timekeeper", count: "1", job: "Signals at 50, 58, 73, 78 and 85 minutes. Can be a helper" },
];

const CUTS = [
  "The optional pipeline teaser at the close",
  "The five categories, trimmed to three services in five minutes",
  "Add-on 4",
  "The database as a presenter-only demo, with add-on 1 removed",
];

export default function Organizers() {
  return (
    <>
      <p className="eyebrow">For the team</p>
      <h1>How this runbook was put together</h1>
      <p className="lede">Version 2 of the plan. It keeps the first draft&apos;s shape (teaching phases, a team challenge, a
        prize) and fixes what wouldn&apos;t have worked with a room of beginners.</p>

      <h2>What changed from the first draft</h2>
      <div className="tbl">
        <table>
          <thead><tr><th>Area</th><th>First draft</th><th>Now</th><th>Why</th></tr></thead>
          <tbody>
            {CHANGES.map((c) => (
              <tr key={c.area}><td>{c.area}</td><td>{c.before}</td><td>{c.after}</td><td>{c.why}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Open decisions</h2>
      <div className="tbl">
        <table>
          <thead><tr><th>Decision</th><th>Recommendation</th><th>Needed by</th></tr></thead>
          <tbody>
            {DECISIONS.map((d) => (
              <tr key={d.what}><td>{d.what}</td><td>{d.rec}</td><td>{d.by}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Roles on the day</h2>
      <div className="tbl">
        <table>
          <thead><tr><th>Role</th><th>Count</th><th>Job</th></tr></thead>
          <tbody>
            {ROLES.map((r) => (
              <tr key={r.role}><td>{r.role}</td><td>{r.count}</td><td>{r.job}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>If time runs short</h2>
      <p>Cut in this order:</p>
      <ol>{CUTS.map((c) => <li key={c}>{c}</li>)}</ol>
      <div className="callout warn">
        <strong>Never cut the guided build or the teardown</strong>
        If both don&apos;t fit, the session is scoped wrong. Drop a concept, not a step.
      </div>

      <h2>Before the day</h2>
      <p>Do a full dry run on a <strong>brand-new</strong> AWS account by Oct 5. An account that already has key pairs and
        custom security groups hides exactly what first-timers hit.</p>
    </>
  );
}
