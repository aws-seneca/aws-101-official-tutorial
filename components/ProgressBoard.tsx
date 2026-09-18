"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { TRACKS } from "@/lib/tracks";

export default function ProgressBoard() {
  const { done, set, reset } = useProgress();
  return (
    <>
      <div className="cards">
        {TRACKS.map((t) => {
          const n = t.items.filter((i) => done(i.id)).length;
          return (
            <div className="card" key={t.id}>
              <h3><Link href={t.href}>{t.title}</Link></h3>
              <p className="muted">{n} of {t.items.length} done</p>
              <span className="pill-track wide"><span style={{ width: `${(n / t.items.length) * 100}%` }} /></span>
              <ul className="ticklist">
                {t.items.map((i) => (
                  <li key={i.id}>
                    <label htmlFor={`pb-${i.id}`}>
                      <input id={`pb-${i.id}`} type="checkbox" checked={done(i.id)} onChange={(e) => set(i.id, e.target.checked)} />
                      {i.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <button type="button" className="btn" onClick={reset}>Start over</button>
    </>
  );
}
