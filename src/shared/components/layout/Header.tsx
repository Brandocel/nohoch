"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/shared/config/locales";
import { getNavigationItems } from "@/shared/config/navigation";
import { Navbar } from "@/shared/components/layout/Navbar";
import { MobileMenu } from "@/shared/components/layout/MobileMenu";
import { LanguageSwitcher } from "@/shared/components/layout/LanguageSwitcher";
import { Container } from "@/shared/components/ui/Container";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const items = getNavigationItems(locale);

  const isMapPage =
    pathname.includes("/ubicacion") ||
    pathname.includes("/mapa") ||
    pathname.includes("/location") ||
    pathname.includes("/map");

  return (
    <>
      <header
        className={
          isMapPage
            ? "relative left-0 top-0 z-50 w-full bg-[linear-gradient(90deg,#00B3AD_0%,#00586F_100%)]"
            : "absolute left-0 top-0 z-50 w-full"
        }
      >
        {!isMapPage && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[170px] bg-gradient-to-b from-[#00B3AD]/90 via-[#007C8A]/55 to-transparent sm:h-[180px] lg:h-[200px]" />
        )}

        <Container
          className={
            isMapPage
              ? "relative flex h-[135px] items-center justify-between sm:h-[145px] lg:h-[160px] xl:h-[170px]"
              : "relative flex h-[95px] items-center justify-between sm:h-[110px] lg:h-[120px] xl:h-[130px]"
          }
        >
          <Link
            href={`/${locale}`}
            className="group inline-flex items-center"
            aria-label="Cenote Nohoch"
          >
            <img
              src="/logo.svg"
              alt="Cenote Nohoch"
              className={
                isMapPage
                  ? "h-auto w-[155px] transition duration-300 group-hover:scale-[1.03] sm:w-[185px] lg:w-[215px] xl:w-[235px]"
                  : "h-auto w-[125px] transition duration-300 group-hover:scale-[1.03] sm:w-[150px] lg:w-[175px] xl:w-[190px]"
              }
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex xl:gap-10">
            <Navbar items={items} />
            <LanguageSwitcher locale={locale} />
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-lg backdrop-blur-md transition duration-300 hover:bg-white/25 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </Container>
      </header>

      <MobileMenu
        open={open}
        items={items}
        locale={locale}
        onClose={() => setOpen(false)}
      />
    </>
  );
}