"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { HomeContent } from "@/features/home/types/home.types";
import { Container } from "@/shared/components/ui/Container";

type HomeAboutProps = {
  content: HomeContent["about"];
  locale?: string;
};

export function HomeAbout({ content, locale = "es" }: HomeAboutProps) {
  const descriptionLines = content.description.split("\n");

  return (
    <section
      id="cenote"
      className="relative overflow-hidden bg-[#004E5A] pb-[85px] pt-[60px] sm:pb-[110px] sm:pt-[85px] lg:pb-[120px] lg:pt-[95px]"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-[1330px]"
        >
          <div className="relative overflow-hidden rounded-[38px] bg-[#00B3AD] px-[28px] pb-[18px] pt-[28px] sm:rounded-[46px] sm:px-[42px] sm:pb-[34px] sm:pt-[38px] lg:min-h-[390px] lg:overflow-visible lg:rounded-[64px] lg:px-[62px] lg:py-[42px]">
            {/* Texto */}
            <div className="relative z-20 max-w-[700px]">
              <h2 className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[36px] font-black leading-[1.05] tracking-[-0.025em] text-white sm:text-[44px] lg:text-[48px]">
                {content.title}
              </h2>

              <h3 className="mt-[24px] max-w-[360px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[22px] font-black leading-[1.15] tracking-[-0.015em] text-white sm:max-w-none sm:text-[25px] lg:text-[27px]">
                {content.subtitle}
              </h3>

              {/* Desktop */}
              <div className="mt-[8px] hidden max-w-[700px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[19px] font-medium leading-[1.48] tracking-[-0.015em] text-white lg:block">
                {descriptionLines.map((line, index) => (
                  <span
                    key={`${line}-${index}`}
                    className={
                      index === descriptionLines.length - 1
                        ? "block whitespace-nowrap"
                        : "block whitespace-nowrap text-justify [text-align-last:justify]"
                    }
                  >
                    {line}
                  </span>
                ))}
              </div>

              {/* Mobile / tablet */}
              <p className="mt-[10px] max-w-[360px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[17px] font-medium leading-[1.55] tracking-[-0.01em] text-white sm:max-w-[620px] sm:text-[18px] lg:hidden">
                {content.description.replaceAll("\n", " ")}
              </p>
            </div>

            {/* Botón → página de ubicación */}
            <a
              href={`/${locale}/ubicacion`}
              className="relative z-30 mx-auto mt-[26px] flex h-[38px] w-full max-w-[230px] items-center justify-center rounded-[7px] bg-[#ADA51A] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-black leading-none text-white transition duration-300 hover:bg-[#c2ba1e] sm:mx-0 sm:w-[204px] lg:absolute lg:left-[520px] lg:top-[58px] lg:mt-0"
            >
              {content.buttonLabel}
            </a>

            {/* Imagen */}
            <div className="pointer-events-none relative z-20 mx-auto mt-[34px] h-[350px] w-[118%] max-w-none -translate-x-[4%] sm:mt-8 sm:h-[430px] sm:w-full sm:max-w-[650px] sm:translate-x-0 lg:absolute lg:right-[-120px] lg:top-1/2 lg:mt-0 lg:h-[620px] lg:w-[720px] lg:-translate-y-1/2 xl:right-[-135px] xl:h-[680px] xl:w-[790px]">
              <Image
                src={content.image}
                alt={content.title}
                fill
                sizes="(max-width: 640px) 118vw, (max-width: 1024px) 90vw, 790px"
                className="object-contain object-center scale-[1.28] sm:scale-[1.2] lg:scale-[1.18]"
                priority={false}
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}