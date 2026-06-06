import { defaultLocale, locales, type Locale } from "@/shared/config/locales";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getSafeLocale(locale?: string): Locale {
  if (!locale) return defaultLocale;

  return isValidLocale(locale) ? locale : defaultLocale;
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

export function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  if (isValidLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return `/${nextLocale}/${segments.join("/")}`;
}