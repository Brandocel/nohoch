import { prisma } from "@/lib/prisma";
import type { Locale } from "@/shared/config/locales";
import type { HomePackage } from "@/features/home/types/home.types";

export type HeroSlideData = {
  id: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  thumbnailUrl: string | null;
  title: string;
  subtitle: string | null;
};

export async function getHeroSlides(locale: Locale): Promise<HeroSlideData[]> {
  const slides = await prisma.heroSlide.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: {
      translations: { where: { locale } },
    },
  });

  return slides
    .filter((s) => s.translations.length > 0)
    .map((s) => ({
      id: s.id,
      mediaType: s.mediaType,
      mediaUrl: s.mediaUrl,
      thumbnailUrl: s.thumbnailUrl,
      title: s.translations[0].title,
      subtitle: s.translations[0].subtitle ?? null,
    }));
}

export async function getPackages(locale: Locale): Promise<HomePackage[]> {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: {
      translations: { where: { locale } },
    },
  });

  return packages
    .filter((p) => p.translations.length > 0)
    .map((p) => ({
      id: p.id,
      name: p.translations[0].name,
      image: p.coverImage ?? "",
      price: `$${Number(p.price).toFixed(2)}`,
      currency: p.currency,
      features: p.translations[0].includes,
      note: p.translations[0].description ?? undefined,
      buttonLabel: locale === "es" ? "Reserva ahora" : "Book now",
    }));
}
