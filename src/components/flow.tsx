import { useId } from 'react';

// Architecture diagrams drawn as labelled boxes and arrows, in the site's
// brand style. We do not use AWS's icon files: colours follow AWS's service
// categories (compute orange, database blue, and so on), and every box says
// what it is in words. Colours live in global.css so light and dark mode work.
//
// Usage in MDX:
//   <Flow title="..." desc="..." width={720} height={260}
//     groups={[{ x, y, w, h, label: 'VPC', tone: 'vpc' }]}
//     nodes={[{ id: 'web', x, y, label: 'EC2', sub: 'the app', tone: 'compute' }]}
//     edges={[{ from: 'web', to: 'db', label: 'SQL' }]} />

export type NodeTone =
  | 'client'
  | 'compute'
  | 'db'
  | 'net'
  | 'storage'
  | 'msg'
  | 'ops'
  | 'edge'
  | 'sec';
export type GroupTone = 'cloud' | 'region' | 'az' | 'vpc' | 'public' | 'private';

export type FlowNode = {
  id: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  tone?: NodeTone;
};
export type FlowGroup = { x: number; y: number; w: number; h: number; label?: string; tone?: GroupTone };
export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  /** Force the arrow to leave sideways ('h') or up/down ('v'). */
  via?: 'h' | 'v';
};

const W = 150;
const H = 56;

type Box = { x: number; y: number; w: number; h: number };

function route(a: Box, b: Box, via?: 'h' | 'v') {
  const ac = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
  const bc = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
  const dx = bc.x - ac.x;
  const dy = bc.y - ac.y;
  const horizontal = via ? via === 'h' : Math.abs(dx) >= Math.abs(dy);
  if (horizontal) {
    const s = { x: dx >= 0 ? a.x + a.w : a.x, y: ac.y };
    const e = { x: dx >= 0 ? b.x : b.x + b.w, y: bc.y };
    const mx = (s.x + e.x) / 2;
    const d = s.y === e.y ? `M ${s.x} ${s.y} H ${e.x}` : `M ${s.x} ${s.y} H ${mx} V ${e.y} H ${e.x}`;
    return { d, lx: mx, ly: (s.y + e.y) / 2 };
  }
  const s = { x: ac.x, y: dy >= 0 ? a.y + a.h : a.y };
  const e = { x: bc.x, y: dy >= 0 ? b.y : b.y + b.h };
  const my = (s.y + e.y) / 2;
  const d = s.x === e.x ? `M ${s.x} ${s.y} V ${e.y}` : `M ${s.x} ${s.y} V ${my} H ${e.x} V ${e.y}`;
  return { d, lx: (s.x + e.x) / 2, ly: my };
}

export function Flow({
  title,
  desc,
  width,
  height,
  nodes,
  groups = [],
  edges = [],
  caption,
}: {
  title: string;
  desc: string;
  width: number;
  height: number;
  nodes: FlowNode[];
  groups?: FlowGroup[];
  edges?: FlowEdge[];
  caption?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const byId = new Map(nodes.map((n) => [n.id, { ...n, w: n.w ?? W, h: n.h ?? H }]));

  return (
    <figure className="flow not-prose my-6 rounded-xl border bg-fd-card">
      <div className="overflow-x-auto p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={`${uid}-t ${uid}-d`}
          style={{ minWidth: Math.min(width, 560), width: '100%', maxWidth: width }}
          className="mx-auto block"
        >
          <title id={`${uid}-t`}>{title}</title>
          <desc id={`${uid}-d`}>{desc}</desc>
          <defs>
            <marker id={`${uid}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="f-tip" />
            </marker>
          </defs>

          {groups.map((g, i) => (
            <g key={`g${i}`} className={`f-g f-g-${g.tone ?? 'cloud'}`}>
              <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="10" />
              {g.label && (
                <text x={g.x + 12} y={g.y + 20} className="f-gl">
                  {g.label}
                </text>
              )}
            </g>
          ))}

          {edges.map((e, i) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b) return null;
            const r = route(a, b, e.via);
            const lw = e.label ? e.label.length * 6.6 + 12 : 0;
            return (
              <g key={`e${i}`} className="f-e">
                <path d={r.d} className={e.dashed ? 'f-line f-dash' : 'f-line'} markerEnd={`url(#${uid}-a)`} />
                {e.label && (
                  <>
                    <rect x={r.lx - lw / 2} y={r.ly - 10} width={lw} height={20} rx="4" className="f-lbg" />
                    <text x={r.lx} y={r.ly + 4} className="f-el">
                      {e.label}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {[...byId.values()].map((n) => (
            <g key={n.id} className={`f-n f-n-${n.tone ?? 'compute'}`}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="8" />
              <text x={n.x + n.w / 2} y={n.sub ? n.y + n.h / 2 - 3 : n.y + n.h / 2 + 5} className="f-nl">
                {n.label}
              </text>
              {n.sub && (
                <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 15} className="f-ns">
                  {n.sub}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      {caption && <figcaption className="border-t px-4 py-3 text-sm text-fd-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
