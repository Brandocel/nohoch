import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/shared/lib/locale-utils";
import { locales } from "@/shared/config/locales";
import { MapPageView } from "@/features/map/components/MapPageView";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? { title: "Location – Cenote Nohoch", description: "How to get to Cenote Nohoch, Tulum Q.R." }
    : { title: "Ubicación – Cenote Nohoch", description: "Cómo llegar a Cenote Nohoch, Tulum Q.R." };
}

export default async function UbicacionPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <MapPageView locale={locale} />;
}
