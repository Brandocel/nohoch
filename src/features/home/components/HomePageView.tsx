import type { HomeContent, HomePackage } from "@/features/home/types/home.types";
import type { Locale } from "@/shared/config/locales";
import type { HeroSlideData } from "@/lib/queries";
import { HomeHero } from "@/features/home/components/HomeHero";
import { HomePackagesWithBooking } from "@/features/home/components/HomePackagesWithBooking";
import { HomeAbout } from "@/features/home/components/HomeAbout";
import { HomeExperiences } from "@/features/home/components/HomeExperiences";
import { HomeMagic } from "@/features/home/components/HomeMagic";

type HomePageViewProps = {
  content: HomeContent;
  locale: Locale;
  heroSlides: HeroSlideData[] | null;
  packages: HomePackage[];
};

export function HomePageView({ content, locale, heroSlides, packages }: HomePageViewProps) {
  // Merge dynamic hero into static content shape
  const heroContent = heroSlides
    ? {
        ...content.hero,
        title: heroSlides[0]?.title ?? content.hero.title,
        subtitle: heroSlides[0]?.subtitle ?? content.hero.subtitle,
        image: heroSlides[0]?.mediaUrl ?? content.hero.image,
      }
    : content.hero;

  return (
    <main className="min-h-screen overflow-hidden bg-[#042f35]">
      <HomeHero content={heroContent} locale={locale} />
      <HomePackagesWithBooking content={{ ...content.packages, items: packages }} locale={locale} />
      <HomeAbout content={content.about} locale={locale} />
      <HomeExperiences content={content.experiences} />
      <HomeMagic content={content.magic} />
    </main>
  );
}
