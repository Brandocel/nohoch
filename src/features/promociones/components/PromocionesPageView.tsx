"use client";

import { motion } from "framer-motion";

const HERO_IMAGE_SRC = "/images/promotion/hero.png";
const TEXTURE_SRC = "/images/promotion/text.png";

const T = {
  es: { title: "Promociones", coming: "Próximamente" },
  en: { title: "Promotions", coming: "Coming Soon" },
} as const;

type Props = { locale: string };

export function PromocionesPageView({ locale }: Props) {
  const t = T[locale as keyof typeof T] ?? T.es;

  return (
    <main className="min-h-screen bg-[#00B3AD]">
      {/* Hero — mismo que contacto */}
      <section className="relative h-[360px] overflow-hidden sm:h-[420px] lg:h-[470px] xl:h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE_SRC})` }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 top-0 h-[190px] bg-gradient-to-b from-black/55 via-black/28 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[170px] bg-gradient-to-t from-black/45 via-black/18 to-transparent" />
      </section>

      {/* Cuerpo */}
      <section className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[13px] font-black uppercase tracking-[0.25em] text-white/70">
            {t.title}
          </p>
          <h1 className="mt-4 font-['Be_Vietnam_Pro',Arial,sans-serif] text-[54px] font-black leading-[1] tracking-[-0.04em] text-white sm:text-[72px] lg:text-[88px]">
            {t.coming}
          </h1>
          <div className="mx-auto mt-6 h-[3px] w-[60px] rounded-full bg-[#ADA51A]" />
        </motion.div>
      </section>

      {/* Textura — franja justo encima del footer */}
      <div
        className="h-[38px] w-full"
        style={{
          backgroundImage: `url(${TEXTURE_SRC})`,
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
        }}
      />
    </main>
  );
}
