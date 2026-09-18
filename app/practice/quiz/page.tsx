import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = { title: "Scenario quiz" };

export default function Page() {
  return (
    <>
      <p className="eyebrow">Practice · Lab 3</p>
      <h1>Scenario quiz</h1>
      <p className="lede">Every question here is something that actually happens in a first AWS session. 7 out of 8 marks it done.</p>
      <Quiz />
    </>
  );
}
