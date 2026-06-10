"use client";

import { MapHero } from "./MapHero";
import { MapLocationFollow } from "./MapLocationFollow";

type Props = {
  locale: string;
};

export function MapPageView({ locale }: Props) {
  return (
    <main className="min-h-screen bg-[#008D84]">
      <MapHero locale={locale} />
      <MapLocationFollow locale={locale} />
    </main>
  );
}