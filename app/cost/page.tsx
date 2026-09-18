import type { Metadata } from "next";
import { TEARDOWN } from "@/lib/content";

export const metadata: Metadata = { title: "Cost & teardown" };

export default function Cost() {
  return (
    <>
      <p className="eyebrow">Money</p>
      <h1>Cost and teardown</h1>

      <h2>How the free plan works now</h2>
      <p>AWS changed its free tier in July 2025. If someone tells you it&apos;s “free for a year”, that was the old model.</p>
      <ul>
        <li>New accounts choose a <strong>free plan</strong> or a <strong>paid plan</strong>.</li>
        <li>Free plan: $100 in credits at signup, and up to $100 more for trying core services. Your card is never charged
          unless you upgrade.</li>
        <li>The free-plan account closes six months after you open it, or when the credits run out, whichever comes first.</li>
        <li>Today we use <code>t3.micro</code> for EC2 and <code>db.t3.micro</code> (Single-AZ) for RDS, both free-plan eligible.</li>
      </ul>
      <p>A server and a small database for about two hours cost a small fraction of a dollar, paid from your credits.</p>

      <div className="callout warn">
        <strong>Where real money is possible</strong>
        On the paid plan once credits are used up, or on an older account created before July 2025. If that&apos;s you, set a
        billing alarm tonight.
      </div>

      <h2>Teardown: minute 78, everyone together</h2>
      <p>On the free plan nothing here can charge your card. But a forgotten server quietly burns the credits you&apos;d rather
        spend on your own projects.</p>
      <ol className="steps">
        {TEARDOWN.map((t) => (
          <li key={t}><div><p style={{ color: "var(--ink)" }}>{t}</p></div></li>
        ))}
      </ol>
      <p className="muted">Check aws.amazon.com/free for the current rules; AWS can change them.</p>
    </>
  );
}
