"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { HomeContent } from "@/features/home/types/home.types";
import { Container } from "@/shared/components/ui/Container";

type HomeMagicProps = {
  content: HomeContent["magic"];
};

const DIVIDER_SRC = "/images/home/experiences/experience-divider.png";
const TEXTURE_SRC = "/images/home/majic/textura.png";

export function HomeMagic({ content }: HomeMagicProps) {
  return (
    <section className="relative overflow-hidden bg-[#006f73] py-[125px]">
      {/* Textura de fondo */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${TEXTURE_SRC})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Divisor superior (estalactitas desde arriba) */}
      <div className="pointer-events-none absolute left-1/2 top-[-30px] z-30 h-[140px] w-[118%] -translate-x-1/2 sm:w-[122%] lg:w-[128%]">
        <img
          src={DIVIDER_SRC}
          alt=""
          aria-hidden="true"
          className="block h-full w-full object-fill object-top"
        />
      </div>


      <Container className="relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[40px] font-black leading-tight tracking-[-0.01em] text-white sm:text-[52px] lg:text-[64px]">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[860px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[16px] font-normal leading-[1.6] text-white sm:text-[18px]">
            {content.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="group relative mx-auto h-[330px] max-w-5xl overflow-hidden rounded-[2rem] shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:h-[430px] lg:h-[500px]"
          style={{
            backgroundImage: `url(${content.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/10" />
          <button
            type="button"
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-white/10 text-white backdrop-blur-[2px] transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[#004E5A]"
            aria-label={content.title}
          >
            <Play size={30} fill="currentColor" className="ml-1" />
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
