# Where the Tally claims come from

Every factual statement on the Tally pages was checked against the Tally repository at commit `09d4efb` (11 Nov 2026). Paths are relative to the Tally repo.

| Claim on the website | Source in Tally |
|---|---|
| No free stories; sample stories readable without a subscription | `apps/api/src/stories/stories.ts` (`PREMIUM_REQUIRED`), commit `e05ebfb` "No free version", Terms §5 |
| Premium €14.99 / 30 stories, Premium Plus €29.99 / 60 stories, up to 10 children | `packages/shared/src/plans.ts` (synced) |
| Plan features list | `apps/mobile/src/app/premium.tsx` (`FEATURES`) |
| Auto-renewal, 24 h cancellation, no rollover, Choose what happens = 2 | Terms §5 (synced); `apps/mobile/src/app/(tabs)/create.tsx` |
| 7 story languages, Hebrew right to left, app interface in English | `packages/shared/src/language/config.ts` (synced); `docs/design/DESIGN_BRIEF.md` |
| Quick story / Craft it together (5 questions) / Choose what happens (pauses 5 times) | `apps/mobile/src/app/(tabs)/create.tsx` (`MODES`), `craft/[id].tsx` |
| 20 themes, 11 endings, 8 moods | `packages/shared/src/story/catalog.ts`, `mood.ts` (synced) |
| Picture for every story; coloring page to print | Terms §2, `features/stories/ColoringPageButton.tsx` |
| Moral and "question to talk about" | `features/stories/LessonCard.tsx`, `features/samples/samples.ts` |
| Each child's Book, PDFs to view, print and share | `premium.tsx`, commit `d937e82` |
| Child's name never sent to the AI; names encrypted; no ads, no tracking, data never sold | Privacy Policy summary and §4, §7 (synced) |
| Settings, purchases and deletion behind a grown-ups check | Privacy §9; `features/settings/ParentalGate.tsx` |
| AI by OpenAI, checked automatically, not by a person; report option under every story | Terms §2, §8 |
| 18+, for parents | Terms §1 |
| Story length about 5–6 minutes | `create.tsx` (`STORY_MINUTES = 5`), `story/reading-time.ts` (`readingMinutesLabel`) |
| iPhone, iPad, Android phones and tablets; in beta (TestFlight, Android tester build) | `apps/mobile/app.config.ts`, `eas.json`, commits `3f35682`, `7da7931` |
| Support answers within two working days | `packages/shared/src/legal/imprint.ts` (`SUPPORT_SECTIONS`) |
| Troubleshooting buttons ("Resend email", "Forgot password?", "Restore purchases", "Try again", "Report it") | Labels in `apps/mobile/src/app/(auth)/*`, `premium.tsx`, `story/[id].tsx`, `features/stories/ReportStory.tsx` |

| Subscription disclosure under the plans | `apps/mobile/src/app/premium.tsx` (synced word for word) |
| Screenshots | Taken by the operator on an iPhone from the current build, 12 Nov 2026 (`assets/screenshots/tally/`) |

**Not advertised, because removed or not built:**
- read-aloud (removed in `01784d8`)
- emailed PDFs (replaced by view and share)
- "Invite a friend" (removed in `e05ebfb`)
- voice cloning (only designed)
- any free monthly allowance

**Website-only copy** (not from the app): the studio homepage text, the Tally headline "Every bedtime deserves a magical story." (your suggestion), and the section headings.
