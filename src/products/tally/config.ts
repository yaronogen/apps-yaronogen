import { BookHeart, Images, Languages, Sparkles } from "lucide-react";
import snapshot from "@content/tally/tally.json";
import type { LegalDocument, ProductConfig } from "../types";
import { sampleImage, screenshot } from "./images";

/**
 * Tally. Facts on this page are taken from the Tally repository (commit in
 * content/tally/tally.json): legal texts, plans, prices, languages and sample stories are
 * synced, never retyped. Marketing copy lives in ./content.ts.
 */
const c = snapshot.content;

const legal = (d: (typeof c.legal)[keyof typeof c.legal], index: boolean): LegalDocument => ({
  title: d.title,
  version: d.version,
  summary: d.summary,
  sections: d.sections,
  index,
});

export const tally: ProductConfig = {
  slug: "tally",
  name: c.brand.name,
  tagline: c.brand.tagline,
  category: "Personalized bedtime stories",
  summary:
    "Tally writes a new bedtime story for your child, in their language and for their age, with a picture for every story. Choose the themes and the ending, or let your child help decide what happens.",
  status: {
    kind: "beta",
    label: "In beta",
    detail: "Coming soon to the App Store and Google Play.",
  },
  tone: "night",
  nav: [
    { label: "Features", href: "/tally/#features" },
    { label: "Samples", href: "/tally/#samples" },
    { label: "Pricing", href: "/tally/#pricing" },
    { label: "FAQ", href: "/tally/#faq" },
    { label: "Legal", href: "/tally/#legal" },
  ],
  platforms: ["iPhone", "iPad", "Android phones and tablets"],
  // Fill in once Tally is public; the download buttons appear automatically.
  stores: { appStore: undefined, googlePlay: undefined },
  images: {
    icon: { src: "/products/tally/icon-192.webp", alt: "Tally app icon" },
    wordmark: { src: "/products/tally/wordmark.webp", alt: "Tally", width: 480, height: 288 },
    hero: sampleImage(
      "en",
      "Illustration from a Tally sample story: a child and a grown-up look out of an observatory window at a starry night sky with a moth.",
    ),
    og: "/og/tally.png",
    // Taken on an iPhone from the current build (12 Nov 2026).
    screenshots: [
      screenshot("01-tonight", "Tonight", "Tally's Tonight screen: a card offering a new story for the child, the monthly story counter, and the child's recent stories in English and Hebrew."),
      screenshot("02-create-modes", "Three ways to make it", "The Create screen: Quick story, Craft it together, and Choose what happens, then the choice of main character."),
      screenshot("03-language-themes", "Language and themes", "Choosing the story language from seven languages, and up to three themes such as Animals and Dinosaurs."),
      screenshot("04-reader", "Reading the story", "The story reader showing the title “The Lighthouse Map Mix-Up”, about 6 minutes, and the first paragraphs."),
      screenshot("05-picture-lesson", "Picture, coloring page and lesson", "The end of a story: its moral, the story's watercolor picture, a button for a coloring page to print, and a question to talk about together."),
    ],
    gallery: (["fr", "he"] as const).map((code) => {
      const story = c.samples.find((s) => s.language === code)!;
      const lang = c.languages.find((l) => l.code === code)!;
      return {
        ...sampleImage(code, `Illustration from the ${lang.name} Tally sample story “${story.title}”.`),
        caption: story.title,
        captionNote: `${lang.nativeName} · sample story`,
        lang: lang.bcp47,
        dir: lang.dir as "ltr" | "rtl",
      };
    }),
  },
  highlights: [
    { icon: Sparkles, title: "Written for your child", text: "With your child's name, for their age and tonight's mood." },
    { icon: Languages, title: "Seven story languages", text: "English, German, French, Spanish, Italian, Dutch and Hebrew." },
    { icon: Images, title: "A picture for every story", text: "And a coloring page made from it, ready to print." },
    { icon: BookHeart, title: "Each child's Book", text: "Keep favourite stories, then view, print and share them as a PDF." },
  ],
  seo: {
    title: "Tally – Personalized bedtime stories for your child",
    description:
      "Tally writes new bedtime stories for your child in seven languages, with a picture for every story. Craft a story together, or let your child choose what happens.",
  },
  support: { email: c.provider.email, responseTime: "We usually answer within two working days." },
  legal: {
    terms: legal(c.legal.terms, true),
    privacy: legal(c.legal.privacy, true),
    imprint: legal(c.legal.imprint, false),
    support: legal(c.legal.support, true),
    "delete-account": legal(c.legal.deleteAccount, true),
  },
  legalSource: `Same text as in the Tally app (synced from Tally ${snapshot.source.commit?.slice(0, 7) ?? ""}).`,
};
