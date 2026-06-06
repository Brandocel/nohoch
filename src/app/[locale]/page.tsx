import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePageView } from "@/features/home/components/HomePageView";
import { getHomeContent } from "@/content/home";
import { getHeroSlides, getPackages } from "@/lib/queries";
import { isValidLocale } from "@/shared/lib/locale-utils";
import { locales } from "@/shared/config/locales";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return { title: "Cenote Nohoch" };
  const content = getHomeContent(locale);
  return { title: content.seo.title, description: content.seo.description };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const staticContent = getHomeContent(locale);

  // Fetch from DB with fallback to static content
  const [heroSlides, packages] = await Promise.allSettled([
    getHeroSlides(locale),
    getPackages(locale),
  ]);

  const heroData =
    heroSlides.status === "fulfilled" && heroSlides.value.length > 0
      ? heroSlides.value
      : null;

  const packagesData =
    packages.status === "fulfilled" && packages.value.length > 0
      ? packages.value
      : staticContent.packages.items;

  return (
    <HomePageView
      content={staticContent}
      locale={locale}
      heroSlides={heroData}
      packages={packagesData}
    />
  );
}
