"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/lib/progress";

type Source = "anywhere" | "web-sg";
type Rule = { port: number; source: Source };
type Who = "internet" | "ec2";
type Target = "ec2" | "rds";

const PORTS = [
  { port: 80, label: "HTTP (80)" },
  { port: 22, label: "SSH (22)" },
  { port: 5432, label: "PostgreSQL (5432)" },
];
const SOURCES: { value: Source; label: string }[] = [
  { value: "anywhere", label: "Anywhere (0.0.0.0/0)" },
  { value: "web-sg", label: "web-sg (the server's security group)" },
];

const TESTS: { from: Who; to: Target; port: number; label: string; want: boolean }[] = [
  { from: "internet", to: "ec2", port: 80, label: "Your browser → server, port 80", want: true },
  { from: "internet", to: "ec2", port: 22, label: "Instance Connect → server, port 22", want: true },
  { from: "ec2", to: "rds", port: 5432, label: "Server → database, port 5432", want: true },
  { from: "internet", to: "rds", port: 5432, label: "The whole internet → database, port 5432", want: false },
];

// The server carries web-sg, so a rule whose source is web-sg matches traffic from it.
function allowed(rules: Rule[], from: Who, port: number) {
  return rules.some((r) => r.port === port && (r.source === "anywhere" || (r.source === "web-sg" && from === "ec2")));
}

function RuleEditor({ title, sg, rules, onChange }: { title: string; sg: string; rules: Rule[]; onChange: (r: Rule[]) => void }) {
  const [port, setPort] = useState(80);
  const [source, setSource] = useState<Source>("anywhere");
  return (
    <div className="card">
      <h3>{title} <code>{sg}</code></h3>
      <p className="muted">Inbound rules</p>
      {rules.length === 0 && <p className="muted"><em>None. Everything inbound is blocked.</em></p>}
      <ul className="rules">
        {rules.map((r, i) => (
          <li key={i}>
            <span>{PORTS.find((p) => p.port === r.port)?.label} from {r.source === "anywhere" ? "0.0.0.0/0" : "web-sg"}</span>
            <button type="button" className="link" onClick={() => onChange(rules.filter((_, j) => j !== i))}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="row">
        <select id={`${sg}-port`} aria-label="Port" value={port} onChange={(e) => setPort(Number(e.target.value))}>
          {PORTS.map((p) => <option key={p.port} value={p.port}>{p.label}</option>)}
        </select>
        <select id={`${sg}-source`} aria-label="Source" value={source} onChange={(e) => setSource(e.target.value as Source)}>
          {SOURCES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <button
          type="button"
          className="btn"
          onClick={() => !rules.some((r) => r.port === port && r.source === source) && onChange([...rules, { port, source }])}
        >Add rule</button>
      </div>
    </div>
  );
}

export default function SecurityGroupLab() {
  const { set } = useProgress();
  const [web, setWeb] = useState<Rule[]>([]);
  const [db, setDb] = useState<Rule[]>([]);

  const results = TESTS.map((t) => {
    const ok = allowed(t.to === "ec2" ? web : db, t.from, t.port);
    return { ...t, ok, right: ok === t.want };
  });
  const siteLoads = results[0].ok;
  const dbSafe = results[2].ok && !results[3].ok;
  const dbOpenRule = db.some((r) => r.source === "anywhere");

  useEffect(() => { if (siteLoads) set("lab-sg-web", true); }, [siteLoads, set]);
  useEffect(() => { if (dbSafe) set("lab-sg-db", true); }, [dbSafe, set]);

  return (
    <>
      <div className="missions">
        <p className={siteLoads ? "mission ok" : "mission"}><b>{siteLoads ? "Done" : "Mission 1"}</b> Make the website load in your browser.</p>
        <p className={dbSafe ? "mission ok" : "mission"}><b>{dbSafe ? "Done" : "Mission 2"}</b> Let the server reach the database, and nobody else.</p>
      </div>

      <div className="grid2">
        <RuleEditor title="Server (EC2)" sg="web-sg" rules={web} onChange={setWeb} />
        <RuleEditor title="Database (RDS)" sg="db-sg" rules={db} onChange={setDb} />
      </div>

      <h3 style={{ marginTop: 24 }}>Traffic test</h3>
      <div className="tbl">
        <table>
          <thead><tr><th>Request</th><th>Result</th><th>Should it?</th></tr></thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.label}>
                <td>{r.label}</td>
                <td><span className={r.ok ? "tag ok" : "tag no"}>{r.ok ? "Allowed" : "Blocked"}</span></td>
                <td>{r.right ? "Yes, correct" : r.want ? "Needs to be allowed" : "Should be blocked"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dbOpenRule && (
        <div className="callout warn">
          <strong>Your database is open to the whole internet</strong>
          A rule from 0.0.0.0/0 on a database lets anyone try passwords against it. Use web-sg as the source instead, so only
          your server gets in.
        </div>
      )}
      {!siteLoads && web.length > 0 && (
        <div className="callout info">
          <strong>Hint</strong>
          Browsers speak HTTP on port 80, and they come from anywhere on the internet.
        </div>
      )}
      {siteLoads && !results[2].ok && (
        <div className="callout info">
          <strong>Hint</strong>
          The database has its own security group. Which port does PostgreSQL listen on, and who should be the source?
        </div>
      )}
      <p className="muted">
        Notice there&apos;s no IAM anywhere on this page. Whether a packet reaches a port is decided by security groups. IAM
        decides who can call AWS APIs, like reading from S3.
      </p>
    </>
  );
}
