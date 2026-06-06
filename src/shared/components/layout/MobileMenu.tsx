"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import type { NavigationItem } from "@/shared/config/navigation";
import type { Locale } from "@/shared/config/locales";
import { LanguageSwitcher } from "@/shared/components/layout/LanguageSwitcher";

type MobileMenuProps = {
  open: boolean;
  items: NavigationItem[];
  locale: Locale;
  onClose: () => void;
};

export function MobileMenu({ open, items, locale, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
          />

          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed left-4 right-4 top-28 z-50 rounded-[2rem] border border-white/15 bg-[#043c43]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
              <img
                src="/logo.svg"
                alt="Cenote Nohoch"
                className="h-auto w-[135px]"
              />

              <LanguageSwitcher locale={locale} />
            </div>

            <nav className="flex flex-col gap-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-2xl px-4 py-4 text-base font-semibold text-white transition duration-300 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}