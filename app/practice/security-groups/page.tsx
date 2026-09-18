import type { Metadata } from "next";
import SecurityGroupLab from "@/components/SecurityGroupLab";

export const metadata: Metadata = { title: "Security group lab" };

export default function Page() {
  return (
    <>
      <p className="eyebrow">Practice · Lab 2</p>
      <h1>Security group lab</h1>
      <p className="lede">A security group is a firewall around a resource. It blocks everything inbound until you add a rule.
        Both groups start empty. Add rules until the traffic test matches the “Should it?” column.</p>
      <SecurityGroupLab />
    </>
  );
}
