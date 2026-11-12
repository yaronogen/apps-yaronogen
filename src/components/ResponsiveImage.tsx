import type { ResponsiveImage as Img } from "@/products/types";

/** A plain <img> with srcset (the site is static; images are pre-sized by the sync script). */
export function ResponsiveImage({
  image,
  sizes,
  className = "",
  priority = false,
}: {
  image: Img;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const smallest = image.sources[image.sources.length - 1] ?? image.sources[0];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; sizes are pre-generated
    <img
      src={smallest?.src}
      srcSet={image.sources.map((s) => `${s.src} ${s.width}w`).join(", ")}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}
