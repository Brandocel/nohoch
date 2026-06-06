import type { HomeContent } from "@/features/home/types/home.types";
import type { Locale } from "@/shared/config/locales";
import { HomeHero } from "@/features/home/components/HomeHero";
import { HomePackages } from "@/features/home/components/HomePackages";
import { HomeAbout } from "@/features/home/components/HomeAbout";
import { HomeExperiences } from "@/features/home/components/HomeExperiences";
import { HomeMagic } from "@/features/home/components/HomeMagic";

type HomePageViewProps = {
  content: HomeContent;
  locale: Locale;
};

export function HomePageView({ content, locale }: HomePageViewProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#042f35]">
      <HomeHero content={content.hero} />
      <HomePackages content={content.packages} />
      <HomeAbout content={content.about} />
      <HomeExperiences content={content.experiences} />
      <HomeMagic content={content.magic} />
    </main>
  );
}