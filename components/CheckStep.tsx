"use client";

import { useProgress } from "@/lib/progress";

// A numbered step the reader can tick off. Ticks are saved in this browser.
export default function CheckStep({ id, title, detail }: { id: string; title: string; detail?: string }) {
  const { done, set } = useProgress();
  const checked = done(id);
  return (
    <li className={checked ? "check done" : "check"}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => set(id, e.target.checked)} />
      <label htmlFor={id}>
        <h3>{title}</h3>
        {detail && <p>{detail}</p>}
      </label>
    </li>
  );
}
