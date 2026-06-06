"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/shared/config/locales";
import { replaceLocaleInPath } from "@/shared/lib/locale-utils";
import { cn } from "@/shared/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center rounded-full border border-white/25 bg-white/10 p-1 shadow-lg backdrop-blur-md">
      <Link
        href={replaceLocaleInPath(pathname || "/es", "es")}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-black transition duration-300",
          locale === "es"
            ? "bg-white text-[#063f46]"
            : "text-white hover:bg-white/10"
        )}
      >
        ES
      </Link>

      <Link
        href={replaceLocaleInPath(pathname || "/en", "en")}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-black transition duration-300",
          locale === "en"
            ? "bg-white text-[#063f46]"
            : "text-white hover:bg-white/10"
        )}
      >
        EN
      </Link>
    </div>
  );
}