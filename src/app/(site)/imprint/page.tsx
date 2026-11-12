import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { SITE_IMPRINT } from "@/lib/site-legal";

export const metadata: Metadata = {
  title: "Legal notice (Impressum)",
  description: "Legal notice (Impressum) for apps.yaronogen.com according to § 5 DDG.",
  alternates: { canonical: "/imprint/" },
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  return (
    <Container size="text" className="py-14 sm:py-20">
      <LegalArticle doc={SITE_IMPRINT} eyebrow="Apps by Yaron Ogen" />
    </Container>
  );
}
