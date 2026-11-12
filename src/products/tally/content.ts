import {
  BookOpenCheck,
  EyeOff,
  GitBranch,
  HeartHandshake,
  KeyRound,
  Lock,
  MessagesSquare,
  Palette,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Trash2,
  UserRound,
  Wand2,
} from "lucide-react";
import snapshot from "@content/tally/tally.json";
import type { FaqItem, Highlight, Plan } from "../types";

/**
 * Copy for the Tally landing and support pages. Every claim here is checked against the Tally
 * app (see docs/CONTENT_SOURCES.md for where each one comes from). Lists, prices and
 * languages are read from the synced snapshot, so they can't drift from the app.
 */
const c = snapshot.content;

export const languages = c.languages.map((l) => ({
  ...l,
  // The app labels Dutch "Dutch" (its nativeName); the website shows the endonym.
  nativeName: l.code === "nl" ? "Nederlands" : l.nativeName,
}));
export const themes = c.catalog.themes;
export const endings = c.catalog.endings;
export const moods = c.catalog.moods;
export const samples = c.samples;

const plan = (id: string) => {
  const p = c.plans.find((x) => x.id === id);
  if (!p) throw new Error(`Tally plan "${id}" missing from the snapshot`);
  return p;
};
const premium = plan("premium");
const premiumPlus = plan("premium_plus");

export const modes: Highlight[] = [
  {
    icon: Wand2,
    title: "Quick story",
    text: "Choose one to three themes, an ending and the main character. Tally writes the rest.",
  },
  {
    icon: MessagesSquare,
    title: "Craft it together",
    text: "Your child answers five questions, read aloud by you, and Tally writes the story from their answers.",
  },
  {
    icon: GitBranch,
    title: "Choose what happens",
    text: "The story pauses five times and your child decides what happens next. Counts as two stories.",
  },
];

export const features: Highlight[] = [
  {
    icon: UserRound,
    title: "Your child is the hero",
    text: "Add your child's first name and age. Stories use their name, suit their age, and get the grammar right in every language.",
  },
  {
    icon: SmilePlus,
    title: "Tonight's mood",
    text: "Tired, worried, excited or missing someone? Tell Tally how your child feels, and the story meets them there and winds down gently.",
  },
  {
    icon: Palette,
    title: "A picture for every story",
    text: "Each story gets its own illustration in Tally's storybook style, and Tally can turn it into a coloring page to print.",
  },
  {
    icon: HeartHandshake,
    title: "A lesson to talk about",
    text: "Stories end with a gentle moral and a question to talk about together.",
  },
  {
    icon: BookOpenCheck,
    title: "Each child's Book",
    text: "Keep favourite stories in your child's Book, and view, print or share them as a PDF.",
  },
  {
    icon: Sparkles,
    title: `${themes.length} themes, ${endings.length} endings`,
    text: "From space and dinosaurs to friendship and music, with endings about courage, kindness or a happy surprise.",
  },
];

export const steps = [
  { title: "Add your child", text: "First name, age, story language, and whether stories call your child a girl or a boy." },
  { title: "Choose tonight's story", text: "Pick a Quick story, craft it together, or let your child choose what happens. Add tonight's mood if you like." },
  { title: "Tally writes it", text: "A brand-new story, checked automatically for language and safety, with its own picture." },
  { title: "Read it together", text: "Read it aloud at bedtime, talk about the lesson, and keep the favourites in your child's Book." },
];

export const privacyPoints: Highlight[] = [
  { icon: EyeOff, title: "Your child's name never goes to the AI", text: "Stories are written with a placeholder. The name is filled in on Tally's server afterwards." },
  { icon: Lock, title: "Names are stored encrypted", text: "And all connections are encrypted." },
  { icon: ShieldCheck, title: "No ads, no tracking", text: "No analytics or tracking tools, and data is never sold." },
  { icon: KeyRound, title: "Grown-ups only", text: "Settings, purchases and account deletion sit behind a grown-ups check." },
  { icon: Trash2, title: "Delete everything, any time", text: "Delete a story, a child or your whole account directly in the app." },
];

const premiumFeatures = [
  `${premium.storiesPerMonth} stories a month`,
  "A picture for every story",
  "Choose language, themes, ending and main character",
  "Craft it together, and Choose what happens (counts as 2 stories)",
  `Up to ${premium.maxChildren} children`,
  "Each child's Book, and PDF books to view, print and share",
];

export const plans: Plan[] = [
  {
    id: "samples",
    name: "Sample stories",
    priceEur: 0,
    period: null,
    storiesPerMonth: null,
    features: [
      `${samples.length} sample stories, one in each language`,
      "Each with its picture, moral and lesson",
      "No subscription needed",
    ],
  },
  {
    id: premium.id,
    name: premium.name,
    priceEur: premium.priceEur,
    period: "month",
    storiesPerMonth: premium.storiesPerMonth,
    features: premiumFeatures,
    featured: true,
  },
  {
    id: premiumPlus.id,
    name: premiumPlus.name,
    priceEur: premiumPlus.priceEur,
    period: "month",
    storiesPerMonth: premiumPlus.storiesPerMonth,
    features: [`${premiumPlus.storiesPerMonth} stories a month`, "Everything in Premium"],
  },
];

/** The disclosure shown under the plans in the app's Plans screen, word for word (synced). */
export const subscriptionDisclosure = c.subscriptionDisclosure;

/** Shown under the plans. Each line restates the Terms of Use, section 5. */
export const billingNotes = [
  "Creating stories needs a subscription. Without one you can read the sample stories.",
  "Subscriptions are monthly and renew automatically until you cancel. Cancel in your App Store or Google Play account settings at least 24 hours before the renewal date.",
  "Monthly story allowances don't carry over to the next month. A Choose what happens story counts as 2.",
  "Prices include VAT. Subscriptions are sold and billed by Apple or Google; the store shows the price in your local currency.",
  "If your subscription ends, you can still read the stories you already made.",
];

export const faq: FaqItem[] = [
  {
    q: "What is Tally?",
    a: "Tally is an app for parents that writes new bedtime stories for their children with AI. Stories are written for your child's age, in the language you choose, and every story comes with its own picture.",
  },
  {
    q: "Who is Tally for?",
    a: "Tally is meant for parents and other adults who read stories to children. You need to be 18 or older to use it. Children listen and join in, but a grown-up sets up and manages the app.",
  },
  {
    q: "Which languages does Tally write in?",
    a: `Stories can be written in ${languages.map((l) => l.name).join(", ").replace(/, ([^,]*)$/, " and $1")}. Hebrew stories read right to left. The app itself is in English.`,
  },
  {
    q: "Who writes the stories?",
    a: "Every story is written by AI models (currently from OpenAI) and checked automatically for language, length and safety. Stories are not checked by a person before you see them, so please read them yourself and use your own judgement. You can report any story right under it in the app.",
  },
  {
    q: "Is my child's name shared with the AI?",
    a: "No. Stories are written with a placeholder, and your child's name is added on Tally's server afterwards. Names are stored encrypted. The picture AI only receives a description of the scene.",
  },
  {
    q: "Can I try Tally before subscribing?",
    a: `Yes. Without a subscription you can read ${samples.length} sample stories, one in each language, with their pictures. Creating your own stories needs a subscription.`,
  },
  {
    q: "How do the monthly stories work?",
    a: `Premium includes ${premium.storiesPerMonth} stories a month and Premium Plus ${premiumPlus.storiesPerMonth}. A Choose what happens story counts as 2. Unused stories don't carry over to the next month.`,
  },
  {
    q: "How do I cancel?",
    a: "In your App Store or Google Play account settings, at least 24 hours before the renewal date. Payments, refunds and cancellations are handled by the store. Deleting your Tally account doesn't cancel a store subscription.",
  },
  {
    q: "How do I delete my data?",
    a: "Open Tally, go to Settings, then Delete my account. This deletes your account, your children's profiles, all stories, pictures and Books. You can also write to us from your account's email address.",
  },
  {
    q: "When can I download Tally?",
    a: "Tally is in beta testing now and coming soon to the App Store and Google Play, for iPhone, iPad and Android phones and tablets.",
  },
];

export const troubleshooting: FaqItem[] = [
  {
    q: "I didn't get the confirmation email",
    a: "Check your spam folder, then use \"Resend email\" on the Check your email screen. You can also go back and use a different email address.",
  },
  {
    q: "I forgot my password",
    a: "On the Sign in screen, tap \"Forgot password?\" and follow the link in the email.",
  },
  {
    q: "My subscription is missing after reinstalling or changing phones",
    a: "Sign in with the same account and tap \"Restore purchases\" on the Plans page.",
  },
  {
    q: "A Choose what happens chapter didn't arrive",
    a: "Tap \"Try again\". Retrying a failed chapter doesn't use another story.",
  },
  {
    q: "A story seemed wrong for my child",
    a: "Please use \"Report it\" under the story in the app, so we can see which story you mean.",
  },
];
