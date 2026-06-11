"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import type {
  HomeContent,
  HomeExperience,
} from "@/features/home/types/home.types";
import { Container } from "@/shared/components/ui/Container";

type HomeExperiencesProps = {
  content: HomeContent["experiences"];
};

const DIVIDER_SRC = "/images/home/experiences/experience-divider.png";

function ExperienceVideoCard({
  item,
  index,
}: {
  item: HomeExperience;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    // No reseteamos: el video se queda en el frame actual
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden bg-black shadow-[0_24px_45px_rgba(0,0,0,0.35)] cursor-pointer"
      style={{ aspectRatio: "9/16" }}
    >
      {item.videoSrc ? (
        <video
          ref={videoRef}
          src={item.videoSrc}
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      ) : (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
        />
      )}
      {/* Overlay gris que desaparece al hover */}
      <div className="absolute inset-0 z-10 bg-black/35 transition-opacity duration-400 group-hover:opacity-0" />
    </motion.article>
  );
}

export function HomeExperiences({ content }: HomeExperiencesProps) {
  return (
    <section
      id="experiencias"
      className="relative overflow-hidden bg-[#004E5A] py-[125px]"
    >
      {/* Fondo de caverna */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#004E5A]/20" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Divisor superior */}
      <div className="pointer-events-none absolute left-1/2 top-[-30px] z-30 h-[140px] w-[118%] -translate-x-1/2 sm:w-[122%] lg:w-[128%]">
        <img
          src={DIVIDER_SRC}
          alt=""
          aria-hidden="true"
          className="block h-full w-full object-fill object-top"
        />
      </div>

      <Container className="relative z-20">
        <div className="mx-auto max-w-[1324px]">
          <div className="grid gap-[48px] md:grid-cols-3">
            {content.items.map((item, index) => (
              <ExperienceVideoCard key={item.id} item={item} index={index} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mx-auto mt-[42px] max-w-[1324px] text-center font-['Be_Vietnam_Pro',Arial,sans-serif] text-[20px] font-black leading-[1.48] tracking-[-0.01em] text-white"
          >
            {content.description}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
