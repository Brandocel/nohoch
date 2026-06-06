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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0083AD]/85 via-[#00798e]/45 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />

        <Container className="relative flex h-[115px] items-center justify-between sm:h-[135px] lg:h-[170px] xl:h-[190px]">
          <Link
            href={`/${locale}`}
            className="group inline-flex items-center"
            aria-label="Cenote Nohoch"
          >
            <img
              src="/logo.svg"
              alt="Cenote Nohoch"
              className="h-auto w-[135px] transition duration-300 group-hover:scale-[1.03] sm:w-[170px] lg:w-[220px] xl:w-[248px]"
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex xl:gap-12">
            <Navbar items={items} />

            <LanguageSwitcher locale={locale} />
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-md transition duration-300 hover:bg-white/20 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
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