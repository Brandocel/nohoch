import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePageView } from "@/features/home/components/HomePageView";
import { getHomeContent } from "@/content/home";
import { isValidLocale } from "@/shared/lib/locale-utils";
import { locales } from "@/shared/config/locales";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Cenote Nohoch",
    };
  }

  const content = getHomeContent(locale);

  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const content = getHomeContent(locale);

  return <HomePageView content={content} locale={locale} />;
}