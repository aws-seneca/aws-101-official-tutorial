
// Ported from the original single-page site (app/diagram.tsx).
// AWS's architecture-diagram convention — region, VPC, subnet and security
// groups as nested frames — drawn with our own shapes, not AWS's icon files.
// The nesting carries the idea, so containers are tinted rather than outlined.

const WEB = "M 152 164 H 268";
const DB = "M 372 208 V 292";

export function Architecture() {
  return (
    <figure className="arch not-prose my-6 rounded-xl border bg-fd-card p-5">
      <svg viewBox="0 0 900 430" role="img" aria-labelledby="arch-t arch-d">
        <title id="arch-t">Where your two resources sit, and what lets them talk</title>
        <desc id="arch-d">
          Your browser, out on the internet, reaches the EC2 instance in a public subnet on port 80, because the
          instance&apos;s security group allows port 80 from anywhere. The instance reaches the RDS PostgreSQL database
          on port 5432, because the database&apos;s security group allows port 5432 from the instance&apos;s security
          group and from nothing else. The database is not publicly accessible.
        </desc>

        {/* Your laptop, outside everything AWS owns */}
        <rect x="8" y="134" width="144" height="60" className="box-out" />
        <text x="80" y="159" className="t-node-o">
          Your browser
        </text>
        <text x="80" y="177" className="t-sub-o">
          anywhere on the internet
        </text>

        {/* Region */}
        <rect x="188" y="30" width="704" height="382" className="box-region" />
        <text x="202" y="22" className="t-region">
          AWS Region · ca-central-1
        </text>

        {/* VPC */}
        <rect x="210" y="56" width="668" height="342" className="box-vpc" />
        <text x="226" y="78" className="t-vpc">
          VPC
        </text>
        <text x="258" y="78" className="t-vpc-d">
          the default private network in that region
        </text>

        {/* Public subnet */}
        <rect x="232" y="92" width="630" height="132" className="box-public" />
        <text x="248" y="114" className="t-sub">
          Public subnet
        </text>
        <text x="352" y="114" className="t-sub-d">
          has a route to the internet
        </text>

        <rect x="268" y="130" width="208" height="78" className="fill-ec2" />
        <text x="372" y="162" className="t-node">
          EC2
        </text>
        <text x="372" y="184" className="t-sub-n">
          t3.micro · Apache · PHP
        </text>

        <rect x="508" y="132" width="330" height="74" className="box-sg" />
        <text x="524" y="156" className="t-sg">
          sg-ec2
        </text>
        <text x="524" y="176" className="t-rule">
          allow :80 from 0.0.0.0/0
        </text>
        <text x="524" y="194" className="t-rule">
          allow :22 from 0.0.0.0/0
        </text>

        {/* Database subnets */}
        <rect x="232" y="254" width="630" height="126" className="box-private" />
        <text x="248" y="276" className="t-priv">
          DB subnet group
        </text>
        <text x="388" y="276" className="t-sub-d">
          publicly accessible: No
        </text>

        <rect x="268" y="292" width="208" height="70" className="fill-rds" />
        <text x="372" y="322" className="t-node">
          RDS
        </text>
        <text x="372" y="344" className="t-sub-n">
          db.t3.micro · PostgreSQL
        </text>

        <rect x="508" y="292" width="330" height="70" className="box-sg" />
        <text x="524" y="316" className="t-sg">
          sg-rds
        </text>
        <text x="524" y="336" className="t-rule">
          allow :5432 from sg-ec2
        </text>
        <text x="524" y="354" className="t-rule-x">
          nothing else, from anywhere
        </text>

        {/* The two hops */}
        <path d={WEB} className="wire" markerEnd="url(#tip)" />
        <path d={DB} className="wire" markerEnd="url(#tip)" />
        <rect x="176" y="140" width="66" height="20" className="port-bg" />
        <text x="209" y="154" className="t-port">
          HTTP :80
        </text>
        <rect x="384" y="222" width="52" height="20" className="port-bg" />
        <text x="410" y="236" className="t-port">
          :5432
        </text>

        <defs>
          <marker id="tip" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="tip" />
          </marker>
        </defs>

        <circle r="5" className="pkt" fill="#ec7211" style={{ offsetPath: `path("${WEB}")` }} />
        <circle r="5" className="pkt pkt-2" fill="#0972d3" style={{ offsetPath: `path("${DB}")` }} />

        <style>{`
          .arch .box-out { fill: var(--color-fd-card); stroke: #8b96a5; stroke-width: 1.5; }
          .arch .box-region { fill: none; stroke: #8b96a5; stroke-width: 1.25; stroke-dasharray: 6 5; }
          .arch .box-vpc { fill: #faf7fe; stroke: #7d3ec6; stroke-width: 1.5; }
          .arch .box-public { fill: #eef6ff; stroke: #0972d3; stroke-width: 1.25; stroke-dasharray: 5 4; }
          .arch .box-private { fill: #f4f6f7; stroke: #5f6b7a; stroke-width: 1.25; stroke-dasharray: 5 4; }
          .arch .box-sg { fill: #f2f8f0; stroke: #037f0c; stroke-width: 1.5; stroke-dasharray: 4 3; }
          .arch .fill-ec2 { fill: #ec7211; }
          .arch .fill-rds { fill: #0972d3; }
          .arch .wire { fill: none; stroke: #445263; stroke-width: 2; }
          .arch .tip { fill: #445263; }
          .arch .port-bg { fill: var(--color-fd-card); stroke: #d5dbdb; stroke-width: 1; }

          .arch .t-region { font-weight: 600; font-size: 12px; fill: #5f6b7a; letter-spacing: .02em; }
          .arch .t-vpc { font-weight: 700; font-size: 13px; fill: #7d3ec6; }
          .arch .t-vpc-d { font-weight: 400; font-size: 12px; fill: #8f7aa8; }
          .arch .t-sub { font-weight: 700; font-size: 13px; fill: #0972d3; }
          .arch .t-priv { font-weight: 700; font-size: 13px; fill: #445263; }
          .arch .t-sub-d { font-weight: 400; font-size: 12px; fill: #6b7787; }
          .arch .t-node { font-weight: 700; font-size: 21px; fill: #fff; text-anchor: middle; letter-spacing: -.01em; }
          .arch .t-sub-n { font: 400 12px ui-monospace, SFMono-Regular, Menlo, monospace; fill: #fff; text-anchor: middle; opacity: .95; }
          .arch .t-node-o { font-weight: 700; font-size: 15px; fill: #16191f; text-anchor: middle; }
          .arch .t-sub-o { font-weight: 400; font-size: 11.5px; fill: #6b7787; text-anchor: middle; }
          .arch .t-sg { font: 700 13px ui-monospace, SFMono-Regular, Menlo, monospace; fill: #037f0c; letter-spacing: .02em; }
          .arch .t-rule { font: 400 12.5px ui-monospace, SFMono-Regular, Menlo, monospace; fill: #3f5c45; }
          .arch .t-rule-x { font: 400 12.5px ui-monospace, SFMono-Regular, Menlo, monospace; fill: #9aa5b1; }
          .arch .t-port { font: 600 11.5px ui-monospace, SFMono-Regular, Menlo, monospace; fill: #16191f; text-anchor: middle; }

          

          .dark .arch .box-out { stroke: #64748b; }
          .dark .arch .box-region { stroke: #64748b; }
          .dark .arch .box-vpc { fill: #1b1629; stroke: #a875e8; }
          .dark .arch .box-public { fill: #0f2236; stroke: #539fe5; }
          .dark .arch .box-private { fill: #141c27; stroke: #7c8b9c; }
          .dark .arch .box-sg { fill: #10220f; stroke: #29ad32; }
          .dark .arch .wire { stroke: #93a2b4; }
          .dark .arch .tip { fill: #93a2b4; }
          .dark .arch .port-bg { stroke: #2c3a4d; }
          .dark .arch .t-region, .dark .arch .t-sub-d, .dark .arch .t-sub-o { fill: #96a3b3; }
          .dark .arch .t-vpc { fill: #c39cf0; } .dark .arch .t-vpc-d { fill: #9b86b5; }
          .dark .arch .t-sub { fill: #6bb0ef; }
          .dark .arch .t-priv { fill: #b6c0cc; }
          .dark .arch .t-node-o, .dark .arch .t-port { fill: #e9ebed; }
          .dark .arch .t-sg { fill: #35c440; } .dark .arch .t-rule { fill: #a8c9ac; } .dark .arch .t-rule-x { fill: #6b7787; }
          
          .arch .pkt { animation: arch-flow 4.6s linear infinite; }
          .arch .pkt-2 { animation-delay: 2.3s; }
          @keyframes arch-flow {
            0% { offset-distance: 0%; opacity: 0; }
            7% { opacity: 1; }
            93% { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) { .arch .pkt { animation: none; offset-distance: 52%; opacity: 1; } }
        `}</style>
      </svg>

      <figcaption className="mt-4 border-t pt-4 text-sm text-fd-muted-foreground">
        Read it inside out. The database is not on the internet at all: the only inbound rule on <code>sg-rds</code> names{" "}
        <code>sg-ec2</code>, so your instance can reach it and your laptop cannot. The RDS console writes that rule for
        you in Part 2, at the <strong className="text-fd-foreground">Connect to an EC2 compute resource</strong> step.
      </figcaption>
    </figure>
  );
}
