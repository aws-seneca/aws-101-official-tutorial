import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import CheckStep from "@/components/CheckStep";
import { ADD_ONS, API_SETUP_URL } from "@/lib/content";

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

      <h2>Add-on 1: wire the database, step by step</h2>
      <p>Your page already has a sign-up form. Right now it&apos;s just HTML. You&apos;ll deploy a small API next to Apache
        that saves each sign-up to your RDS database. It&apos;s what a real
        deploy looks like: a web server, an app process, a database, and settings kept out of the code.</p>
      <ol className="checks">
        <CheckStep id="addon1-0" title="Open a shell on your instance" detail="EC2 Instance Connect, as above." />
        <CheckStep id="addon1-1" title="Run the setup script" detail="Installs Node.js, the API, an encrypted connection to RDS, a system service, and tells Apache to send /api/ to it." />
      </ol>
      <CodeBlock code={`curl -fsSL ${API_SETUP_URL} -o setup.sh\nsudo bash setup.sh`} label="Install the API" />
      <ol className="checks" start={3}>
        <CheckStep id="addon1-2" title="Put your database details in the settings file" detail="RDS console → your database → Connectivity & security → Endpoint. Use your master username and password." />
      </ol>
      <CodeBlock code={`sudo nano /etc/workshop-api.env\n# DATABASE_URL=postgres://USERNAME:PASSWORD@your-endpoint.ca-central-1.rds.amazonaws.com:5432/postgres\nsudo systemctl restart workshop-api\ncurl localhost/api/health`} label="Configure and restart" />
      <ol className="checks" start={4}>
        <CheckStep id="addon1-3" title="Health check says db: ok" detail="If it gives a hint instead, follow it. It usually points at the database's security group." />
        <CheckStep id="addon1-4" title="Submit the form on your public IP" detail="Your name appears under “Latest sign-ups”, read back from RDS." />
      </ol>
      <div className="callout warn">
        <strong>If it says it can&apos;t reach the database</strong>
        The database&apos;s security group isn&apos;t allowing port 5432 from your instance&apos;s security group. That&apos;s
        the lesson. Fix the rule, not the code. Practise it first in the <Link href="/practice/security-groups/">security group lab</Link>.
      </div>
      <details>
        <summary>Want to see the rows yourself?</summary>
        <CodeBlock code={`sudo dnf install -y postgresql16\npsql -h <your-RDS-endpoint> -U <your-username> -d postgres -c "SELECT * FROM signups;"`} label="Query with psql" />
      </details>

      <h2>Hints for add-ons 2 and 3</h2>
      <CodeBlock code={`sudo nano /var/www/html/index.html\n# save: Ctrl+O, Enter   exit: Ctrl+X\nsudo nano /var/www/html/about.html`} label="Edit the site" />

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
