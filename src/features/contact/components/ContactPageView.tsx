"use client";

import { ContactHero } from "./ContactHero";
import { ContactSection } from "./ContactSection";

type ContactPageViewProps = {
  locale: string;
};

export function ContactPageView({ locale }: ContactPageViewProps) {
  return (
    <main className="min-h-screen bg-[#00B3AD]">
      <ContactHero />

      <ContactSection locale={locale} />
    </main>
  );
}