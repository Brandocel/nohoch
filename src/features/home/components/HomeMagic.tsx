"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { HomeContent } from "@/features/home/types/home.types";
import { Container } from "@/shared/components/ui/Container";

type HomeMagicProps = {
  content: HomeContent["magic"];
};

const DIVIDER_SRC = "/images/home/experiences/experience-divider.png";
const TEXTURE_SRC = "/images/home/majic/textura.png";
const VIDEO_SRC = "/images/home/experiences/videonohoch.mp4";

export function HomeMagic({ content }: HomeMagicProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative overflow-hidden bg-[#008d84] pb-[95px] pt-[72px] sm:pt-[82px] lg:pb-[115px] lg:pt-[90px]">
      {/* Textura de fondo */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${TEXTURE_SRC})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Divisor superior */}
      <div className="pointer-events-none absolute left-1/2 top-[-38px] z-30 h-[120px] w-[118%] -translate-x-1/2 sm:w-[122%] lg:w-[128%]">
        <img
          src={DIVIDER_SRC}
          alt=""
          aria-hidden="true"
          className="block h-full w-full object-fill object-top"
        />
      </div>

      <Container className="relative z-20">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-[50px] max-w-[1060px] text-center"
        >
          <h2 className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[38px] font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-[48px] lg:text-[58px] xl:text-[64px]">
            {content.title}
          </h2>

          <p className="mx-auto mt-5 max-w-[980px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-semibold leading-[1.55] text-white sm:text-[16px] lg:text-[17px]">
            {content.description}
          </p>
        </motion.div>

        {/* Video rectangular sin redondeado */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          onMouseEnter={() => videoRef.current?.play()}
          onMouseLeave={() => videoRef.current?.pause()}
          className="group relative mx-auto w-full max-w-[1140px] cursor-pointer overflow-hidden bg-black"
          style={{ aspectRatio: "1140 / 455" }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            loop
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Overlay gris que desaparece al hover */}
          <div className="absolute inset-0 z-10 bg-black/35 transition-opacity duration-400 group-hover:opacity-0" />
        </motion.div>
      </Container>
    </section>
  );
}