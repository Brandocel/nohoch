import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/shared/lib/locale-utils";
import { locales } from "@/shared/config/locales";
import { PromocionesPageView } from "@/features/promociones/components/PromocionesPageView";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return locale === "en"
    ? { title: "Promotions – Cenote Nohoch", description: "Special promotions at Cenote Nohoch." }
    : { title: "Promociones – Cenote Nohoch", description: "Promociones especiales en Cenote Nohoch." };
}

export default async function PromocionesPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <PromocionesPageView locale={locale} />;
}
