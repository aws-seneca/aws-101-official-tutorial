"use client";

import { useRef, useState } from "react";
import { PARTS, type Part, type Step } from "@/lib/content";
import { Figures } from "./figure";
import { useProgress } from "./progress";

// Older browsers and pages served over plain http have no clipboard API, so
// fall back to selecting the block: Ctrl+C or Cmd+C then works.
function selectBlock(pre: HTMLElement | null) {
  if (!pre) return;
  const range = document.createRange();
  range.selectNodeContents(pre);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

export function Code({ children, label }: { children: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "select">("idle");
  const pre = useRef<HTMLPreElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(children);
      setState("copied");
      setTimeout(() => setState("idle"), 1600);
    } catch {
      selectBlock(pre.current);
      setState("select");
    }
  }

  const tall = children.split("\n").length > 24;

  return (
    <div className={tall ? "code tall" : "code"}>
      <pre ref={pre} tabIndex={0}>
        <code>{children}</code>
      </pre>
      <button type="button" onClick={copy} aria-label={label ? `Copy: ${label}` : "Copy to clipboard"}>
        {state === "copied" ? "Copied" : state === "select" ? "Ctrl+C" : "Copy"}
      </button>
    </div>
  );
}

function StepItem({ step }: { step: Step }) {
  return (
    <li>
      <div>
        <h3>{step.do}</h3>
        {step.detail && <p>{step.detail}</p>}
        {step.fields && (
          <ul className="fields">
            {step.fields.map((f) => (
              <li key={f.label}>
                <b>{f.label}</b>
                <code>{f.value}</code>
                {f.note && <em>{f.note}</em>}
              </li>
            ))}
          </ul>
        )}
        {step.code && <Code label={step.do}>{step.code}</Code>}
        {step.expect && (
          <p className="expect">
            <b>Expect</b>
            <span>{step.expect}</span>
          </p>
        )}
        {step.shots && <Figures shots={step.shots} />}
      </div>
    </li>
  );
}

function PartSection({ part }: { part: Part }) {
  const { done, toggle } = useProgress();
  const isDone = !!done[part.id];

  return (
    <section id={part.id}>
      <div className="parthead">
        <b>PART {String(part.n).padStart(2, "0")}</b>
        <hr />
      </div>
      <h2>{part.title}</h2>
      <p className="partmeta">
        {part.what} Takes about {part.minutes}. <a href={part.href}>This part in the AWS docs</a>.
      </p>
      <ol className="steps">
        {part.steps.map((s) => (
          <StepItem key={s.do} step={s} />
        ))}
      </ol>
      <div className={isDone ? "check done" : "check"}>
        <input id={`done-${part.id}`} type="checkbox" checked={isDone} onChange={() => toggle(part.id)} />
        <div>
          <label htmlFor={`done-${part.id}`}>Part {part.n} is done</label>
          <p>{part.checkpoint}</p>
        </div>
      </div>
    </section>
  );
}

export default function Walkthrough() {
  return (
    <>
      {PARTS.map((p) => (
        <PartSection key={p.id} part={p} />
      ))}
    </>
  );
}
