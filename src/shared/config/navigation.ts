import type { Locale } from "@/shared/config/locales";

export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems: Record<Locale, NavigationItem[]> = {
  es: [
    {
      label: "Grupos",
      href: "#grupos",
    },
    {
      label: "Bodas",
      href: "#bodas",
    },
    {
      label: "Promociones",
      href: "/promociones",
    },
    {
      label: "Contacto",
      href: "/contacto",
    },
    {
      label: "Blog",
      href: "#blog",
    },
  ],

  en: [
    {
      label: "Groups",
      href: "#grupos",
    },
    {
      label: "Weddings",
      href: "#bodas",
    },
    {
      label: "Promotions",
      href: "/promociones",
    },
    {
      label: "Contact",
      href: "/contacto",
    },
    {
      label: "Blog",
      href: "#blog",
    },
  ],
};

export function getNavigationItems(locale: Locale): NavigationItem[] {
  return navigationItems[locale].map((item) => {
    if (item.href.startsWith("#")) {
      return {
        ...item,
        href: `/${locale}${item.href}`,
      };
    }

    if (item.href.startsWith("/")) {
      return {
        ...item,
        href: `/${locale}${item.href}`,
      };
    }

    return item;
  });
}