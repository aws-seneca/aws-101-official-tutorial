"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PARTS } from "@/lib/content";

const STORE = "aws101.progress";

type State = Record<string, boolean>;

const Ctx = createContext<{ done: State; toggle: (id: string) => void; ready: boolean }>({
  done: {},
  toggle: () => {},
  ready: false,
});

function read(): State {
  try {
    return JSON.parse(localStorage.getItem(STORE) || "{}");
  } catch {
    return {};
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<State>({});
  const [ready, setReady] = useState(false);

  // Server-rendered markup has to match the empty state, so the saved progress
  // is read after mount.
  useEffect(() => {
    setDone(read());
    setReady(true);
  }, []);

  function toggle(id: string) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORE, JSON.stringify(next));
      } catch {
        // Private window or blocked storage: the page still works, it forgets.
      }
      return next;
    });
  }

  return <Ctx.Provider value={{ done, toggle, ready }}>{children}</Ctx.Provider>;
}

export const useProgress = () => useContext(Ctx);

export function Tracker() {
  const { done, ready } = useProgress();
  const [here, setHere] = useState(PARTS[0].id);

  // Highlight whichever part the reader is standing in.
  useEffect(() => {
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target.id);
          else seen.delete(e.target.id);
        }
        const first = PARTS.find((p) => seen.has(p.id));
        if (first) setHere(first.id);
      },
      { rootMargin: "-110px 0px -55% 0px" }
    );
    for (const p of PARTS) {
      const el = document.getElementById(p.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const count = PARTS.filter((p) => done[p.id]).length;
  const filled = ready ? count / PARTS.length : 0;

  return (
    <div className="tracker">
      <div className="shell">
        <nav className="tracker-legs" aria-label="Workshop progress">
          {PARTS.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className={`leg${done[p.id] ? " won" : here === p.id ? " now" : ""}`}
              aria-current={here === p.id ? "step" : undefined}
            >
              <b>{done[p.id] ? "DONE" : `0${p.n}`}</b>
              <span>{p.short}</span>
            </a>
          ))}
        </nav>
        <p className="tracker-count" aria-live="polite">
          {count}/{PARTS.length} parts
        </p>
        <div className="tracker-track" aria-hidden="true">
          <b style={{ transform: `scaleX(${filled})` }} />
        </div>
      </div>
    </div>
  );
}
