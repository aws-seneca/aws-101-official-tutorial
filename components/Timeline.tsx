import { PHASES } from "@/lib/content";

export default function Timeline() {
  return (
    <div className="ruler" role="img" aria-label="90-minute workshop timeline">
      <div className="bar">
        {PHASES.map((p) => (
          <span key={p.name} style={{ flex: p.to - p.from, background: p.tone }}>{p.short}</span>
        ))}
      </div>
      <div className="ticks">
        {[0, 15, 30, 45, 60, 75, 90].map((t) => <span key={t}>{t === 90 ? "90 min" : t}</span>)}
      </div>
      <ul className="legend">
        {PHASES.map((p) => (
          <li key={p.name}>
            <i style={{ background: p.tone }} />
            <b>{p.from}–{p.to}</b>
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
