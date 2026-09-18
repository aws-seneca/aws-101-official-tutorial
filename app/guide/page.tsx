import type { Metadata } from "next";
import Link from "next/link";
import CheckStep from "@/components/CheckStep";
import CodeBlock from "@/components/CodeBlock";
import { DB_STEPS, EVENT, LAUNCH_STEPS, USER_DATA } from "@/lib/content";

export const metadata: Metadata = { title: "Guide" };

const SERVICES = [
  { name: "Compute: EC2", body: "A virtual server you rent. You choose the operating system, the software and the open ports." },
  { name: "Storage: S3", body: "Object storage on the internet, not tied to any one server." },
  { name: "Identity: IAM", body: "Who can call which AWS API. The default answer is no. A role is a set of permissions a service takes on, not a login." },
  { name: "Databases: RDS", body: "A managed relational database. AWS runs the server, patching and backups." },
  { name: "Serverless: Lambda", body: "Run a function with no server to manage, and pay per request." },
];

export default function Guide() {
  return (
    <>
      <p className="eyebrow">Guide</p>
      <h1>From zero to a live page</h1>
      <p className="lede">Follow along with the presenter. Tick each step as you go; if you fall behind, this page has every step. Want a dry run first? Try the <Link href="/practice/">practice labs</Link>.</p>

      <h2>0 · Set your region</h2>
      <p>Top right of the AWS Console: choose <strong>{EVENT.regionLabel}</strong> (<code>{EVENT.region}</code>). If anything
        “disappears” today, check this first.</p>

      <h2>1 · The five categories</h2>
      <div className="cards">
        {SERVICES.map((s) => (
          <div className="card" key={s.name}><h3>{s.name}</h3><p className="muted">{s.body}</p></div>
        ))}
      </div>
      <p>Why EC2 today and not Lambda? Plenty of real sites run on Lambda. We use EC2 because it makes the networking
        visible: you&apos;ll see every port you open.</p>

      <h2>2 · Launch your server</h2>
      <ol className="checks">
        {LAUNCH_STEPS.map((s, i) => <CheckStep key={s.title} id={`launch-${i}`} title={s.title} detail={s.detail} />)}
      </ol>
      <h3>The user data script</h3>
      <p className="muted">Your instance runs this once, the first time it boots. It installs a web server, downloads the
        workshop site and starts serving it. Nobody has to type anything on the server.</p>
      <CodeBlock code={USER_DATA} label="EC2 user data script" />

      <div className="callout info">
        <strong>Why SSH is open but not used yet</strong>
        The browser-based EC2 Instance Connect you&apos;ll use in the challenge needs port 22. Opening it to anywhere is
        fine for a 90-minute workshop. In production you&apos;d restrict it, or use Session Manager and open nothing.
      </div>

      <h2>3 · Create a database (one per team)</h2>
      <ol className="checks">
        {DB_STEPS.map((s, i) => <CheckStep key={s.title} id={`db-${i}`} title={s.title} detail={s.detail} />)}
      </ol>

      <h2>4 · Challenge, then teardown</h2>
      <p>Head to the <Link href="/challenge/">challenge</Link>. At minute 78 everyone tears down together: see <Link href="/cost/">cost
        and teardown</Link>.</p>
    </>
  );
}
