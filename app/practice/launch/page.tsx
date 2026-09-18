import type { Metadata } from "next";
import LaunchLab from "@/components/LaunchLab";

export const metadata: Metadata = { title: "Launch simulator" };

export default function Page() {
  return (
    <>
      <p className="eyebrow">Practice · Lab 1</p>
      <h1>Launch simulator</h1>
      <p className="lede">The same choices as the real EC2 launch form, with some tempting wrong answers left in. Goal: a
        page that loads, on a free-plan instance type.</p>
      <LaunchLab />
    </>
  );
}
