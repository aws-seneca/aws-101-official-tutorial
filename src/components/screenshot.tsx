import { basePath } from '@/lib/shared';

// A console screenshot with a caption. Without `src` it renders a labelled
// placeholder, so pages can mark where a screenshot from the dry run belongs.
export function Screenshot({ src, alt, caption }: { src?: string; alt: string; caption?: string }) {
  return (
    <figure className="not-prose my-6">
      {src ? (
        <a href={`${basePath}${src}`} target="_blank" rel="noreferrer" title="Open full size">
          <img src={`${basePath}${src}`} alt={alt} loading="lazy" className="w-full rounded-lg border" />
        </a>
      ) : (
        <div className="flex aspect-[16/7] items-center justify-center rounded-lg border border-dashed bg-fd-muted/40 px-6 text-center text-sm text-fd-muted-foreground">
          Screenshot to come: {alt}
        </div>
      )}
      {caption && <figcaption className="mt-2 text-sm text-fd-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
