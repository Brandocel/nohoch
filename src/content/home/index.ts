import { homeEn } from "@/content/home/en";
import { homeEs } from "@/content/home/es";
import type { Locale } from "@/shared/config/locales";

export function getHomeContent(locale: Locale) {
  return locale === "en" ? homeEn : homeEs;
}