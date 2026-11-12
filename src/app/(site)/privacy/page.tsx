import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { SITE_PRIVACY } from "@/lib/site-legal";

export const metadata: Metadata = {
  title: "Website Privacy Notice",
  description: "How apps.yaronogen.com handles visitors' data: no cookies, no analytics, no tracking.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <Container size="text" className="py-14 sm:py-20">
      <LegalArticle
        doc={SITE_PRIVACY}
        eyebrow="Apps by Yaron Ogen"
        note={
          <p>
            Looking for the app&apos;s privacy policy?{" "}
            <Link href="/tally/privacy/" className="font-medium text-ink underline underline-offset-4">
              Tally Privacy Policy
            </Link>
          </p>
        }
      />
    </Container>
  );
}
