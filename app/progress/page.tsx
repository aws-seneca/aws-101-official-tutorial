import type { Metadata } from "next";
import ProgressBoard from "@/components/ProgressBoard";

export const metadata: Metadata = { title: "Progress" };

export default function Page() {
  return (
    <>
      <p className="eyebrow">Progress</p>
      <h1>Your progress</h1>
      <p className="lede">Tick steps in the guide and finish the labs. Saved in this browser only; nobody else sees it.</p>
      <ProgressBoard />
    </>
  );
}
