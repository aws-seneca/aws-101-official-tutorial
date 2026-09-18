import type { Metadata } from "next";
import { TROUBLE } from "@/lib/content";

export const metadata: Metadata = { title: "Troubleshooting" };

export default function Troubleshooting() {
  return (
    <>
      <p className="eyebrow">Stuck?</p>
      <h1>What breaks, and what to do</h1>
      <p className="lede">In roughly the order it happens. Check the region first, always. Still stuck? Wave at a helper.</p>
      <div className="tbl">
        <table>
          <thead><tr><th>Symptom</th><th>Likely cause</th><th>Fix</th></tr></thead>
          <tbody>
            {TROUBLE.map((t) => (
              <tr key={t.symptom}><td>{t.symptom}</td><td>{t.cause}</td><td>{t.fix}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
