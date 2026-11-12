"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { HeartHandshake, MessageCircleQuestion } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { sampleImage } from "./images";

export interface SampleView {
  language: string;
  bcp47: string;
  dir: "ltr" | "rtl";
  languageName: string;
  nativeName: string;
  title: string;
  paragraphs: string[];
  moral: string;
  lesson: { question: string; explanation: string };
}

/** How many paragraphs to show before "Read the whole story". */
const PREVIEW = 4;

/**
 * Tally's real sample stories (the same ones anyone can read in the app), one tab per language.
 * WAI-ARIA tabs: arrow keys, Home and End move between languages.
 */
export function SampleStories({ samples }: { samples: SampleView[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const story = samples[active]!;
  const rtl = story.dir === "rtl";
  const storyFont = rtl ? "font-hebrew" : "font-story";

  const onKeyDown = (e: KeyboardEvent) => {
    const last = samples.length - 1;
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const index = next < 0 ? last : next > last ? 0 : next;
    setActive(index);
    tabs.current[index]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Sample story language" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" onKeyDown={onKeyDown}>
        {samples.map((s, i) => (
          <button
            key={s.language}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${id}-tab-${s.language}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            lang={s.bcp47}
            className={`h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
              i === active ? "bg-gold text-gold-ink" : "bg-night-surface text-cream/85 ring-1 ring-night-border hover:text-cream hover:ring-gold/40"
            }`}
          >
            {s.nativeName}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${story.language}`}
        tabIndex={0}
        className="mt-6 grid gap-8 overflow-hidden rounded-[2rem] bg-night-surface/70 p-4 ring-1 ring-night-border sm:p-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-8"
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <ResponsiveImage
            key={story.language}
            image={sampleImage(story.language, `Picture for the ${story.languageName} sample story “${story.title}”.`)}
            sizes="(min-width: 1024px) 520px, 100vw"
            className="aspect-[3/2] w-full rounded-2xl object-cover ring-1 ring-white/10"
          />
          <p className="mt-3 text-sm text-lilac">
            Sample story in {story.languageName} · about 5–6 minutes to read aloud · the picture is part of the story.
          </p>
        </div>

        <article lang={story.bcp47} dir={story.dir} className={`${storyFont} ${rtl ? "text-right" : ""}`}>
          <h3 className={`text-2xl leading-snug text-cream sm:text-3xl ${rtl ? "font-hebrew font-medium" : "font-tally font-semibold"}`}>{story.title}</h3>
          <div className="mt-5 space-y-4 text-[1.075rem] leading-8 text-cream/90">
            {story.paragraphs.slice(0, PREVIEW).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {story.paragraphs.length > PREVIEW && (
            <details key={story.language} className="group mt-4">
              <summary className="inline-flex cursor-pointer list-none items-center rounded-full bg-gold/12 px-4 py-2 text-sm font-semibold text-gold ring-1 ring-gold/40 [&::-webkit-details-marker]:hidden" lang="en" dir="ltr">
                <span className="group-open:hidden">Read the whole story</span>
                <span className="hidden group-open:inline">The whole story</span>
              </summary>
              <div className="mt-4 space-y-4 text-[1.075rem] leading-8 text-cream/90">
                {story.paragraphs.slice(PREVIEW).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-gold/10 p-5 ring-1 ring-gold/35">
                  <HeartHandshake aria-hidden className="size-5 text-gold" />
                  <p className="mt-2 font-semibold text-cream">{story.moral}</p>
                </div>
                <div className="rounded-2xl bg-night-raised/60 p-5 ring-1 ring-night-border">
                  <MessageCircleQuestion aria-hidden className="size-5 text-gold" />
                  <p className="mt-2 font-semibold text-cream">{story.lesson.question}</p>
                  <p className="mt-2 leading-7 text-cream/80">{story.lesson.explanation}</p>
                </div>
              </div>
            </details>
          )}
        </article>
      </div>
    </div>
  );
}
