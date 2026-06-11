"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { HomeContent } from "@/features/home/types/home.types";

type HomeHeroProps = {
  content: HomeContent["hero"];
  locale?: string;
};

export function HomeHero({ content, locale = "es" }: HomeHeroProps) {
  const formattedTitle = content.title.includes("\n")
    ? content.title
    : content.title
        .replace(" en cenote", "\nen cenote")
        .replace(" in a cenote", "\nin a cenote");

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src={content.image}
          alt={content.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Overlay general */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Overlay para mejorar lectura del centro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.22)_45%,rgba(0,0,0,0.42)_100%)]" />

      {/* Degradado superior para integrar con el header */}
      <div className="absolute inset-x-0 top-0 h-[260px] bg-gradient-to-b from-[#0083AD]/65 via-[#00798e]/25 to-transparent" />

      {/* Degradado inferior */}
      <div className="absolute inset-x-0 bottom-0 h-[230px] bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

      {/* Flecha izquierda */}
      <button
        type="button"
        aria-label="Slide anterior"
        className="absolute left-2 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/5 text-white/65 transition duration-300 hover:bg-black/20 hover:text-white sm:left-5 md:left-7 lg:left-8"
      >
        <ChevronLeft
          className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
          strokeWidth={1.4}
        />
      </button>

      {/* Flecha derecha */}
      <button
        type="button"
        aria-label="Siguiente slide"
        className="absolute right-2 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/5 text-white/65 transition duration-300 hover:bg-black/20 hover:text-white sm:right-5 md:right-7 lg:right-8"
      >
        <ChevronRight
          className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
          strokeWidth={1.4}
        />
      </button>

      {/* Contenido centrado */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-24 pt-[120px] text-center sm:px-8 sm:pt-[140px] lg:px-10 lg:pt-[165px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-[1180px] flex-col items-center"
        >
          <h1 className={`whitespace-pre-line text-center font-extrabold leading-[0.95] tracking-[-0.045em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${locale === "en" ? "text-[44px] sm:text-[58px] md:text-[70px] lg:text-[82px] xl:text-[90px]" : "text-[52px] sm:text-[68px] md:text-[82px] lg:text-[96px] xl:text-[104px]"}`}>
            {formattedTitle}
          </h1>

          <p className="mt-4 max-w-[900px] text-center text-[22px] font-normal leading-tight tracking-[-0.02em] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] sm:text-[26px] md:text-[30px]">
            {content.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Puntitos */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <span className="h-3 w-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
        <span className="h-3 w-3 rounded-full bg-white/70" />
        <span className="h-3 w-3 rounded-full bg-white/70" />
        <span className="h-3 w-3 rounded-full bg-white/70" />
        <span className="h-3 w-3 rounded-full bg-white/70" />
      </div>
    </section>
  );
}