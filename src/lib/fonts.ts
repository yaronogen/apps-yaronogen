import localFont from "next/font/local";

/**
 * All fonts are files in src/fonts/ (SIL Open Font License, licenses alongside), served from
 * this site. Visitors' browsers never contact Google Fonts, and the build needs no network.
 */
export const geist = localFont({
  src: "../fonts/geist-latin.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
});

export const instrument = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

/** Tally's own fonts, as in the app: Fredoka titles, Nunito story text, Rubik for Hebrew. */
export const fredoka = localFont({
  src: "../fonts/fredoka-latin.woff2",
  weight: "300 700",
  variable: "--font-fredoka",
  display: "swap",
  preload: false,
});

export const nunito = localFont({
  src: [
    { path: "../fonts/nunito-latin.woff2", weight: "200 1000", style: "normal" },
    { path: "../fonts/nunito-latin-italic.woff2", weight: "200 1000", style: "italic" },
  ],
  variable: "--font-nunito",
  display: "swap",
  preload: false,
});

export const rubik = localFont({
  src: "../fonts/rubik-hebrew.woff2",
  weight: "300 900",
  variable: "--font-rubik",
  display: "swap",
  preload: false,
});

export const fontVariables = [geist, instrument, fredoka, nunito, rubik].map((f) => f.variable).join(" ");
