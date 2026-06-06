import type { Locale } from "@/shared/config/locales";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export type FooterConfig = {
  columns: FooterColumn[];
};

export const footerConfig: Record<Locale, FooterConfig> = {
  es: {
    columns: [
      {
        title: "About",
        links: [
          { label: "About us", href: "#" },
          { label: "Features", href: "#" },
          { label: "News & Blogs", href: "#" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Instagram", href: "#" },
          { label: "Twitter", href: "#" },
          { label: "Facebook", href: "#" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "FAQs", href: "#" },
          { label: "Support Centre", href: "#" },
          { label: "Feedback", href: "#" },
        ],
      },
    ],
  },
  en: {
    columns: [
      {
        title: "About",
        links: [
          { label: "About us", href: "#" },
          { label: "Features", href: "#" },
          { label: "News & Blogs", href: "#" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Instagram", href: "#" },
          { label: "Twitter", href: "#" },
          { label: "Facebook", href: "#" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "FAQs", href: "#" },
          { label: "Support Centre", href: "#" },
          { label: "Feedback", href: "#" },
        ],
      },
    ],
  },
};
