"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { HomeContent } from "@/features/home/types/home.types";
import { Container } from "@/shared/components/ui/Container";

type HomeAboutProps = {
  content: HomeContent["about"];
};

export function HomeAbout({ content }: HomeAboutProps) {
  const descriptionLines = content.description.split("\n");

  return (
    <section
      id="cenote"
      className="relative overflow-hidden bg-[#004E5A] pb-[95px] pt-[75px] sm:pb-[110px] sm:pt-[85px] lg:pb-[120px] lg:pt-[95px]"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-[1330px]"
        >
          <div className="relative min-h-[330px] overflow-visible rounded-[52px] bg-[#00B3AD] px-[38px] py-[34px] sm:px-[48px] sm:py-[38px] lg:min-h-[390px] lg:rounded-[64px] lg:px-[62px] lg:py-[42px]">
            {/* Texto */}
            <div className="relative z-20 max-w-[700px]">
              <h2 className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[40px] font-black leading-[1.05] tracking-[-0.025em] text-white sm:text-[44px] lg:text-[48px]">
                {content.title}
              </h2>

              <h3 className="mt-[24px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[22px] font-black leading-[1.2] tracking-[-0.015em] text-white sm:text-[25px] lg:text-[27px]">
                {content.subtitle}
              </h3>

              {/* Desktop */}
              <div className="mt-[6px] hidden max-w-[700px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[19px] font-medium leading-[1.48] tracking-[-0.015em] text-white lg:block">
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
              <p className="mt-[6px] text-justify font-['Be_Vietnam_Pro',Arial,sans-serif] text-[18px] font-medium leading-[1.48] tracking-[-0.015em] text-white lg:hidden">
                {content.description.replaceAll("\n", " ")}
              </p>
            </div>

            {/* Botón */}
            <a
              href="#contacto"
              className="relative z-30 mt-[24px] inline-flex h-[38px] w-[204px] items-center justify-center rounded-[7px] bg-[#ADA51A] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-black leading-none text-white transition duration-300 hover:bg-[#c2ba1e] lg:absolute lg:left-[520px] lg:top-[58px] lg:mt-0"
            >
              {content.buttonLabel}
            </a>

            {/* Imagen */}
            <div className="pointer-events-none relative z-20 mx-auto mt-10 h-[360px] w-full max-w-[620px] lg:absolute lg:right-[-120px] lg:top-1/2 lg:mt-0 lg:h-[620px] lg:w-[720px] lg:-translate-y-1/2 xl:right-[-135px] xl:h-[680px] xl:w-[790px]">
              <Image
                src={content.image}
                alt={content.title}
                fill
                sizes="(max-width: 1024px) 90vw, 790px"
                className="object-contain object-center scale-[1.18]"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}