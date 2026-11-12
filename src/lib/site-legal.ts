import snapshot from "@content/tally/tally.json";
import type { LegalDocument } from "@/products/types";
import { SITE } from "./site";

/**
 * Website-level legal pages (/imprint/, /privacy/).
 *
 * IMPRINT: the same provider, address and wording as the Tally app's legal notice (synced),
 * because the same person operates the website.
 *
 * PRIVACY: a separate notice for the website itself (not the app). DRAFT written for this site,
 * pending the operator's / a lawyer's review (see docs/LEGAL.md). Update it whenever the hosting,
 * fonts or anything else that touches visitors' data changes.
 */
export const SITE_IMPRINT: LegalDocument = {
  title: snapshot.content.legal.imprint.title,
  version: null,
  summary: null,
  sections: snapshot.content.legal.imprint.sections,
  index: false,
};

export const SITE_PRIVACY_VERSION = "2026-11-12";

const { name, address, email } = SITE.operator;

export const SITE_PRIVACY: LegalDocument = {
  title: "Website Privacy Notice",
  version: SITE_PRIVACY_VERSION,
  summary:
    "This website uses no cookies, no analytics and no tracking. It only processes the technical data needed to show you its pages. Each app has its own privacy policy.",
  sections: [
    {
      heading: "1. Who is responsible",
      paragraphs: [
        `The controller responsible for this website (${SITE.url}) under the EU General Data Protection Regulation (GDPR) is ${name}, ${address}. Contact: ${email}.`,
      ],
    },
    {
      heading: "2. Hosting",
      paragraphs: [
        "This website is hosted by GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",
        "When you open a page, your browser sends technical data to GitHub's servers so the page can be delivered: in particular your IP address, the date and time, the page requested, and your browser and operating system. GitHub processes this data to deliver the website and to keep it secure and stable. We don't receive or analyse it.",
        "The legal basis is our legitimate interest in a secure, reliably delivered website (Art. 6(1)(f) GDPR). GitHub is certified under the EU–US Data Privacy Framework. For details, see GitHub's privacy statement: https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement",
      ],
    },
    {
      heading: "3. No cookies, no tracking",
      paragraphs: [
        "This website sets no cookies and uses no analytics, advertising or tracking tools, and no social media plugins.",
        "Fonts and images are served from this website itself. Your browser does not contact Google Fonts or any other third-party service when you visit.",
      ],
    },
    {
      heading: "4. When you email us",
      paragraphs: [
        "If you write to us by email, we use your email address and your message to answer you (Art. 6(1)(b) GDPR where your request relates to a contract, otherwise our legitimate interest in answering, Art. 6(1)(f) GDPR). We delete the correspondence when it is no longer needed, unless we must keep it by law.",
      ],
    },
    {
      heading: "5. Our apps",
      paragraphs: [
        `Each app has its own privacy policy, which explains what the app collects and why. Tally: ${SITE.url}/tally/privacy/`,
      ],
    },
    {
      heading: "6. Your rights",
      paragraphs: [
        `You have the right to access your data, to correct it, to have it deleted, to restrict or object to its processing, and to receive it in a portable format. Write to ${email}.`,
        "You also have the right to complain to a data protection supervisory authority, for example the authority in the German federal state where you live, or the authority responsible for us: Landesbeauftragter für den Datenschutz Sachsen-Anhalt.",
      ],
    },
    {
      heading: "7. Changes",
      paragraphs: [`We update this notice when the website changes. The current version is always at ${SITE.url}/privacy/`],
    },
  ],
  index: true,
};
