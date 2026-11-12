import type { ResponsiveImage } from "../types";

/** A sample story's picture in the pre-generated sizes (public/products/tally/samples/). */
export const sampleImage = (language: string, alt: string): ResponsiveImage => ({
  sources: [1536, 960, 640].map((w) => ({ src: `/products/tally/samples/${language}-${w}.webp`, width: w })),
  width: 1536,
  height: 1024,
  alt,
});

/** A screenshot from the app (public/products/tally/screenshots/, status bar cropped). */
export const screenshot = (name: string, caption: string, alt: string) => ({
  sources: [720, 400].map((w) => ({ src: `/products/tally/screenshots/${name}-${w}.webp`, width: w })),
  width: 946,
  height: 1944,
  alt,
  caption,
});
