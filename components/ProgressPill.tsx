"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { ALL_ITEMS } from "@/lib/tracks";

export default function ProgressPill() {
  const { done } = useProgress();
  const n = ALL_ITEMS.filter((i) => done(i.id)).length;
  const pct = Math.round((n / ALL_ITEMS.length) * 100);
  return (
    <Link href="/progress/" className="pill" aria-label={`Your progress: ${pct} percent`}>
      <span className="pill-track"><span style={{ width: `${pct}%` }} /></span>
      {pct}%
    </Link>
  );
}
