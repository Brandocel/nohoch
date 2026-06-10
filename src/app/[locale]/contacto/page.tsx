import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/shared/lib/locale-utils";
import { locales } from "@/shared/config/locales";
import { ContactPageView } from "@/features/contact/components/ContactPageView";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  return locale === "en"
    ? {
        title: "Contact – Cenote Nohoch",
        description: "Contact Cenote Nohoch and plan your visit.",
      }
    : {
        title: "Contacto – Cenote Nohoch",
        description: "Contacta a Cenote Nohoch y planea tu visita.",
      };
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  return <ContactPageView locale={locale} />;
}