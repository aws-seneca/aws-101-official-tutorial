"use client";

import { useState } from "react";
import { USER_DATA } from "@/lib/content";
import { useProgress } from "@/lib/progress";

const AMIS = ["Amazon Linux 2023", "Ubuntu Server 24.04", "Windows Server 2025"];
const TYPES = [
  { value: "t2.micro", free: false },
  { value: "t3.micro", free: true },
  { value: "t3.large", free: false },
  { value: "m5.xlarge", free: false },
];

type Check = { ok: boolean; warn?: boolean; text: string };

export default function LaunchLab() {
  const { set } = useProgress();
  const [name, setName] = useState("");
  const [ami, setAmi] = useState(AMIS[1]);
  const [type, setType] = useState("t2.micro");
  const [key, setKey] = useState("none");
  const [ssh, setSsh] = useState(false);
  const [http, setHttp] = useState(false);
  const [userData, setUserData] = useState("");
  const [result, setResult] = useState<{ checks: Check[]; loads: boolean; win: boolean } | null>(null);

  function launch() {
    const free = TYPES.find((t) => t.value === type)?.free ?? false;
    const scriptOk = /nginx/.test(userData) && /systemctl enable/.test(userData);
    const amiOk = ami === "Amazon Linux 2023";
    const loads = amiOk && scriptOk && http;
    const checks: Check[] = [
      { ok: name.trim().length > 0, warn: true, text: name.trim() ? `Named “${name.trim()}”, easy to spot in a list of thirty.` : "No name. In a room of thirty identical instances, you won't find yours." },
      { ok: amiOk, text: amiOk ? "Amazon Linux 2023: the script's dnf commands will work." : `${ami} doesn't have dnf, so the workshop script fails at boot.` },
      { ok: free, text: free ? "t3.micro is free-plan eligible." : `${type} isn't free-plan eligible on accounts created after July 15, 2025. Pick t3.micro.` },
      { ok: http, text: http ? "HTTP is open: browsers can reach port 80." : "HTTP isn't allowed. The security group blocks every browser." },
      { ok: scriptOk, text: scriptOk ? "User data installs and starts nginx at first boot." : "User data doesn't install and start a web server, so nothing answers on port 80." },
      { ok: ssh, warn: true, text: ssh ? "SSH is open, so you can use EC2 Instance Connect in the challenge." : "SSH is closed. The page still works, but you'll need it for the challenge." },
      { ok: true, text: key === "none" ? "No key pair: fine, Instance Connect doesn't need one." : "A key pair works too. Keep the .pem file private." },
    ];
    const win = loads && free;
    if (win) set("lab-console", true);
    setResult({ checks, loads, win });
  }

  return (
    <div className="grid2 lab">
      <form className="card console" onSubmit={(e) => { e.preventDefault(); launch(); }}>
        <h3>Launch an instance</h3>
        <label htmlFor="ll-name">Name
          <input id="ll-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. yourname-workshop" />
        </label>
        <label htmlFor="ll-ami">Application and OS image (AMI)
          <select id="ll-ami" value={ami} onChange={(e) => setAmi(e.target.value)}>
            {AMIS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
        <label htmlFor="ll-type">Instance type
          <select id="ll-type" value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map((t) => <option key={t.value} value={t.value}>{t.value}{t.free ? "  (free tier eligible)" : ""}</option>)}
          </select>
        </label>
        <label htmlFor="ll-key">Key pair
          <select id="ll-key" value={key} onChange={(e) => setKey(e.target.value)}>
            <option value="none">Proceed without a key pair</option>
            <option value="new">Create new key pair</option>
          </select>
        </label>
        <fieldset>
          <legend>Network settings: firewall (security group)</legend>
          <label className="inline" htmlFor="ll-ssh"><input id="ll-ssh" type="checkbox" checked={ssh} onChange={(e) => setSsh(e.target.checked)} /> Allow SSH traffic from anywhere</label>
          <label className="inline" htmlFor="ll-http"><input id="ll-http" type="checkbox" checked={http} onChange={(e) => setHttp(e.target.checked)} /> Allow HTTP traffic from the internet</label>
        </fieldset>
        <label htmlFor="ll-ud">Advanced details: user data
          <textarea id="ll-ud" rows={5} value={userData} onChange={(e) => setUserData(e.target.value)} placeholder="#!/bin/bash" />
        </label>
        <button type="button" className="link" onClick={() => setUserData(USER_DATA)}>Paste the workshop script</button>
        <button type="submit" className="btn primary">Launch instance</button>
      </form>

      <div className="card">
        <h3>What happened</h3>
        {!result && <p className="muted">Fill in the form the way you would in the real console, then launch. Nothing here touches AWS.</p>}
        {result && (
          <>
            <div className={result.loads ? "browser up" : "browser down"}>
              <div className="browser-bar">http://3.98.24.117</div>
              <div className="browser-body">
                {result.loads ? <><b>Hello from {name.trim() || "YOUR-NAME"}&apos;s server</b><span>Running on Amazon EC2</span></> : <><b>This site can&apos;t be reached</b><span>3.98.24.117 took too long to respond.</span></>}
              </div>
            </div>
            <ul className="results">
              {result.checks.map((c) => (
                <li key={c.text} className={c.ok ? "ok" : c.warn ? "warn" : "no"}>{c.text}</li>
              ))}
            </ul>
            {result.win && <p className="mission ok"><b>Done</b> A live page on a free-plan instance. Now do it for real.</p>}
          </>
        )}
      </div>
    </div>
  );
}
