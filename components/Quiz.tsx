"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress";

const QUESTIONS: { q: string; options: string[]; answer: number; why: string }[] = [
  { q: "Your instance is running, but the page won't load. What's the most likely cause?", options: ["The IAM policy is wrong", "The security group has no HTTP rule", "The AMI is out of date", "The database is down"], answer: 1, why: "A security group blocks everything inbound until you allow it. No HTTP rule, no page." },
  { q: "psql on your server hangs when connecting to RDS. What fixes it?", options: ["Attach an IAM role to the server", "Make the database publicly accessible", "Allow port 5432 on the database's security group, with the server's security group as source", "Reboot the database"], answer: 2, why: "Reaching a port is network access. The database's security group has to let the server in." },
  { q: "What decides whether your server can reach the database on port 5432?", options: ["Security groups", "IAM", "An S3 bucket policy", "Route 53"], answer: 0, why: "Security groups control packets. IAM controls calls to AWS APIs." },
  { q: "Your instance has disappeared from the console. First thing to check?", options: ["Whether AWS deleted it", "The region in the top-right corner", "Your billing page", "The key pair"], answer: 1, why: "Resources live in one region. Switch regions and the list looks empty." },
  { q: "On the free plan, you forget to terminate an instance. What happens?", options: ["Your card is charged", "It quietly uses up your credits", "Nothing, it's free forever", "AWS terminates it after an hour"], answer: 1, why: "The free plan never charges your card unless you upgrade. Running resources draw down your credits instead." },
  { q: "Which instance type is free-plan eligible for an account created today?", options: ["t2.micro", "t3.micro", "t3.large", "m5.xlarge"], answer: 1, why: "Accounts created on or after July 15, 2025 get t3.micro, t3.small, t4g.micro, t4g.small and a few flex types. Not t2.micro." },
  { q: "Your server needs to read a file from S3. What's the right way?", options: ["Paste access keys into user data", "Make the bucket public", "Attach an IAM role to the instance", "Use the root account's keys"], answer: 2, why: "A role gives the instance temporary credentials. No keys stored anywhere." },
  { q: "When does EC2 user data run?", options: ["Once, at first boot", "Every time you SSH in", "When you click Connect", "Every hour"], answer: 0, why: "By default the script runs once, the first time the instance boots." },
];

export default function Quiz() {
  const { set } = useProgress();
  const [picks, setPicks] = useState<(number | null)[]>(QUESTIONS.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const score = picks.filter((p, i) => p === QUESTIONS[i].answer).length;

  function submit() {
    setSubmitted(true);
    if (score >= 7) set("lab-quiz", true);
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <ol className="quiz">
        {QUESTIONS.map((item, qi) => (
          <li key={item.q} className="card">
            <fieldset>
              <legend><h3>{item.q}</h3></legend>
              {item.options.map((o, oi) => {
                const id = `q${qi}-${oi}`;
                const state = submitted ? (oi === item.answer ? "right" : picks[qi] === oi ? "wrong" : "") : "";
                return (
                  <label key={o} htmlFor={id} className={`option ${state}`}>
                    <input id={id} type="radio" name={`q${qi}`} checked={picks[qi] === oi} disabled={submitted}
                      onChange={() => setPicks(picks.map((p, i) => (i === qi ? oi : p)))} />
                    {o}
                  </label>
                );
              })}
              {submitted && <p className="muted">{picks[qi] === item.answer ? "Correct. " : "Not quite. "}{item.why}</p>}
            </fieldset>
          </li>
        ))}
      </ol>
      {!submitted ? (
        <button type="submit" className="btn primary" disabled={picks.includes(null)}>
          {picks.includes(null) ? `Answer all ${QUESTIONS.length} to check` : "Check my answers"}
        </button>
      ) : (
        <div className="row">
          <p className={score >= 7 ? "mission ok" : "mission"}><b>{score} / {QUESTIONS.length}</b> {score >= 7 ? "Nice. You've got the ideas that matter today." : "Read the explanations, then try again."}</p>
          <button type="button" className="btn" onClick={() => { setPicks(QUESTIONS.map(() => null)); setSubmitted(false); }}>Try again</button>
        </div>
      )}
    </form>
  );
}
