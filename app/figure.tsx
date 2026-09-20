import Image from "next/image";
import type { Shot } from "@/lib/content";

// With `unoptimized` images, next/image emits src verbatim, so the base path
// for GitHub Pages has to be added here for both the link and the image.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Figure({ shot }: { shot: Shot }) {
  return (
    <figure className={shot.w < 1000 ? "shot narrow" : "shot"}>
      <a href={BASE + shot.src} target="_blank" rel="noreferrer" title="Open the full-size screenshot">
        <Image src={BASE + shot.src} alt={shot.caption} width={shot.w} height={shot.h} loading="lazy" />
      </a>
      <figcaption>{shot.caption}</figcaption>
    </figure>
  );
}

export function Figures({ shots }: { shots: Shot[] }) {
  return (
    <>
      {shots.map((s) => (
        <Figure key={s.src} shot={s} />
      ))}
    </>
  );
}
