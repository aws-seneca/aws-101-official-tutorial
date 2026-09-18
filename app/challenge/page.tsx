import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import { ADD_ONS } from "@/lib/content";

export const metadata: Metadata = { title: "Challenge" };

export default function Challenge() {
  return (
    <>
      <p className="eyebrow">Minutes 58 to 78</p>
      <h1>Team challenge</h1>
      <p className="lede">Teams of 2 or 3. Score as many points as you can in 20 minutes. It&apos;s points, not a race to
        finish everything, so every team can score. Tiebreaker: the exec team judges quality.</p>

      <div className="cards">
        {ADD_ONS.map((a) => (
          <div className="card" key={a.n}>
            <div className="pts">{a.points} <small>{a.points === 1 ? "point" : "points"}</small></div>
            <h3>{a.n}. {a.title}</h3>
            <p>{a.body}</p>
            <p className="muted">Done when: {a.done}</p>
          </div>
        ))}
      </div>

      <h2>Getting a shell on your instance</h2>
      <p>EC2 → your instance → <strong>Connect</strong> → <strong>EC2 Instance Connect</strong> → <strong>Connect</strong>. A
        terminal opens in your browser.</p>

      <h2>Hints for add-on 1: talk to the database</h2>
      <CodeBlock code={`sudo dnf install -y postgresql16\npsql -h <your-RDS-endpoint> -U <your-username> -d postgres`} label="Connect with psql" />
      <CodeBlock code={`CREATE TABLE signups (id serial PRIMARY KEY, name text, created_at timestamptz DEFAULT now());\nINSERT INTO signups (name) VALUES ('your team name');\nSELECT * FROM signups;`} label="SQL" />
      <div className="callout warn">
        <strong>If psql hangs</strong>
        The database&apos;s security group isn&apos;t allowing port 5432 from your instance&apos;s security group. That&apos;s
        the lesson. Fix the rule, not the command.
      </div>

      <h2>Hints for add-ons 2 and 3</h2>
      <CodeBlock code={`sudo nano /usr/share/nginx/html/index.html\n# save: Ctrl+O, Enter   exit: Ctrl+X\nsudo nano /usr/share/nginx/html/about.html`} label="Edit the site" />

      <h2>Hints for add-on 4: give the instance a role</h2>
      <ol>
        <li>S3 → Create bucket (any unique name), upload a small text file.</li>
        <li>IAM → Roles → Create role → trusted entity <strong>EC2</strong> → attach <code>AmazonS3ReadOnlyAccess</code>.</li>
        <li>EC2 → your instance → Actions → Security → <strong>Modify IAM role</strong> → pick your role.</li>
      </ol>
      <CodeBlock code={`aws s3 cp s3://<your-bucket>/<your-file> -`} label="Read from S3" />
      <p className="muted">No access keys anywhere. The instance gets temporary credentials from its role. The AWS CLI is
        already installed on Amazon Linux 2023.</p>
    </>
  );
}
