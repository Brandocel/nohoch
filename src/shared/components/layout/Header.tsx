"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import type { Locale } from "@/shared/config/locales";
import { navigationItems } from "@/shared/config/navigation";
import { Navbar } from "@/shared/components/layout/Navbar";
import { MobileMenu } from "@/shared/components/layout/MobileMenu";
import { LanguageSwitcher } from "@/shared/components/layout/LanguageSwitcher";
import { Container } from "@/shared/components/ui/Container";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const items = navigationItems[locale];

  return (
    <>
      <header className="absolute left-0 top-0 z-50 w-full">
        {/* Fondo del header sin línea */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[170px] bg-gradient-to-b from-[#00B3AD]/90 via-[#007C8A]/55 to-transparent sm:h-[180px] lg:h-[200px]" />

        <Container className="relative flex h-[95px] items-center justify-between sm:h-[110px] lg:h-[120px] xl:h-[130px]">
          <Link
            href={`/${locale}`}
            className="group inline-flex items-center"
            aria-label="Cenote Nohoch"
          >
            <img
              src="/logo.svg"
              alt="Cenote Nohoch"
              className="h-auto w-[125px] transition duration-300 group-hover:scale-[1.03] sm:w-[150px] lg:w-[175px] xl:w-[190px]"
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