// The AWS Student Builder Group chip mark on its 9 x 9 grid: [x, y, width, height].
const CHIP = [
  [2, 0, 1, 1], [4, 0, 1, 1], [6, 0, 1, 1], [2, 1, 5, 1],
  [2, 7, 5, 1], [2, 8, 1, 1], [4, 8, 1, 1], [6, 8, 1, 1],
  [1, 2, 1, 5], [0, 2, 1, 1], [0, 4, 1, 1], [0, 6, 1, 1],
  [7, 2, 1, 5], [8, 2, 1, 1], [8, 4, 1, 1], [8, 6, 1, 1],
];

export function BrandMark({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 9" className={`shrink-0 ${className}`} aria-hidden shapeRendering="crispEdges">
      {CHIP.map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill="#AD5DFE" />
      ))}
    </svg>
  );
}
