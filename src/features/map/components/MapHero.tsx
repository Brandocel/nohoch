"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type MapHeroProps = {
  locale: string;
};

const CAVE_MAP_SRC = "/images/home/map/cave-map.webp";
const MAP_PATTERN_SRC = "/images/home/map/map-pattern.png";

const T = {
  es: {
    caveAlt: "Mapa del sistema de cavernas Nohoch Nah Chich",
  },
  en: {
    caveAlt: "Nohoch Nah Chich cave system map",
  },
} as const;

export function MapHero({ locale }: MapHeroProps) {
  const t = T[locale as keyof typeof T] ?? T.es;

  return (
    <section className="relative overflow-hidden">
      {/* Mapa principal con fondo verde */}
      <div className="relative overflow-hidden bg-[#ADA51A]">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 1.015 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto w-full max-w-[1512px]"
        >
          <Image
            src={CAVE_MAP_SRC}
            alt={t.caveAlt}
            width={1512}
            height={623}
            priority
            className="mx-auto block h-auto w-full select-none object-contain"
            sizes="100vw"
          />
        </motion.div>
      </div>

      {/* Textura debajo, sin fondo verde */}
      <div className="relative w-full overflow-hidden bg-transparent">
        <img
          src={MAP_PATTERN_SRC}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full select-none"
        />
      </div>
    </section>
  );
}