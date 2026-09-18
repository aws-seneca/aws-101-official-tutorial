import Link from "next/link";
import Timeline from "@/components/Timeline";
import { EVENT } from "@/lib/content";

export default function Home() {
  return (
    <>
      <p className="eyebrow">{EVENT.group}</p>
      <h1>AWS 101 Workshop</h1>
      <ul className="chips">
        <li>{EVENT.date}</li>
        <li>{EVENT.length}</li>
        <li>{EVENT.format}</li>
        <li>Bring a laptop</li>
      </ul>
      <p className="lede">
        You launch a real server on AWS, load a page from it in your own browser, extend it with your team, and tear it
        all down before you leave. No experience needed.
      </p>

      <h2>How the 90 minutes run</h2>
      <Timeline />

      <h2>What you build</h2>
      <div className="flow" aria-label="Architecture: browser to EC2 to RDS">
        <div className="node"><h3>Your browser</h3><p className="muted">Your laptop, anywhere on the internet</p></div>
        <span className="arrow">HTTP :80 →</span>
        <div className="node hi"><h3>EC2 t3.micro</h3><p className="muted">Apache serving the sign-up page, behind a security group</p></div>
        <span className="arrow">Postgres :5432 →</span>
        <div className="node"><h3>RDS PostgreSQL</h3><p className="muted">Never public. Reachable only from your instance&apos;s security group</p></div>
      </div>
      <p>Everyone gets the page live in the guided section. Making the sign-up form actually save to the database is the big add-on in the team challenge.</p>

      <div className="callout info">
        <strong>The one sentence to remember</strong>
        A security group blocks everything inbound until you allow it. Most problems today come back to this.
      </div>

      <h2>Before you come</h2>
      <ul>
        <li>Create an AWS account and choose the <strong>free plan</strong>. A card is needed at signup; a debit card works. The free plan never charges it unless you choose to upgrade.</li>
        <li>Sign in once and make sure you can see the AWS Console.</li>
        <li>Bring a laptop. Tablets and phones won&apos;t work.</li>
        <li>Optional, 20 minutes: do the <Link href="/practice/">practice labs</Link> so the real console feels familiar.</li>
        <li>Can&apos;t make an account? Come anyway. You&apos;ll pair with someone who has one.</li>
      </ul>

      <div className="grid2" style={{ marginTop: 24 }}>
        <Link href="/guide/" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <h3>Step-by-step guide →</h3>
          <p className="muted">Every click, plus the script that sets up your server.</p>
        </Link>
        <Link href="/practice/" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <h3>Practice labs →</h3>
          <p className="muted">Try the launch form, security groups and a quiz in your browser. No AWS account needed.</p>
        </Link>
        <Link href="/challenge/" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <h3>Team challenge →</h3>
          <p className="muted">Four add-ons, with hints, worth 7 points total.</p>
        </Link>
      </div>
    </>
  );
}
