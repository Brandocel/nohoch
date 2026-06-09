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
const YOUTUBE_ID = "H6_vVvoTB3k";

function ytCommand(iframe: HTMLIFrameElement, func: "playVideo" | "pauseVideo") {
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args: [] }),
    "*"
  );
}

export function HomeMagic({ content }: HomeMagicProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

      {/* Divisor superior */}
      <div className="pointer-events-none absolute left-1/2 top-[-30px] z-30 h-[140px] w-[118%] -translate-x-1/2 sm:w-[122%] lg:w-[128%]">
        <img src={DIVIDER_SRC} alt="" aria-hidden="true" className="block h-full w-full object-fill object-top" />
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

        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          onMouseEnter={() => iframeRef.current && ytCommand(iframeRef.current, "playVideo")}
          onMouseLeave={() => iframeRef.current && ytCommand(iframeRef.current, "pauseVideo")}
          className="group relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] shadow-[0_24px_70px_rgba(0,0,0,0.35)] cursor-pointer"
          style={{ aspectRatio: "16/9" }}
        >
          {/* iframe sin controles, controles tapados con offset */}
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?enablejsapi=1&controls=0&mute=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
            title={content.title}
            allow="autoplay; encrypted-media"
            className="absolute left-0 border-0 pointer-events-none"
            style={{
              width: "100%",
              height: "calc(100% + 80px)",
              top: "-40px",
            }}
          />
          {/* Franja que tapa controles arriba y abajo */}
          <div className="absolute top-0 left-0 right-0 h-[42px] z-10 rounded-t-[2rem]" style={{ background: "inherit" }} />
          <div className="absolute bottom-0 left-0 right-0 h-[42px] z-10 bg-[#006f73] rounded-b-[2rem]" />
          {/* Overlay interacción */}
          <div className="absolute inset-0 z-20 bg-black/10 transition duration-300 group-hover:bg-black/0" />
        </motion.div>
      </Container>
    </section>
  );
}
