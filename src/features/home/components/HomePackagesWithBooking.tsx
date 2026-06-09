"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { HomeContent, HomePackage, PackageItem } from "@/features/home/types/home.types";
import type { Locale } from "@/shared/config/locales";
import { Container } from "@/shared/components/ui/Container";

const BookingModal = dynamic(() => import("@/features/booking/components/BookingModal"), { ssr: false });

type Props = {
  content: HomeContent["packages"];
  locale: Locale;
};

const DIVIDER_SRC = "/images/home/packages/shapes/packages-divider.svg";

/** Convert HomePackage → PackageItem so the booking modal can use it */
function toPackageItem(pkg: HomePackage): PackageItem {
  // price is like "$300.00" → parse numeric value in pesos
  const numericPrice = parseFloat(pkg.price.replace(/[^0-9.]/g, ""));
  return {
    id: pkg.id,
    code: pkg.slug.toUpperCase(),   // use slug, not cuid
    image: pkg.image,
    adultPriceMXN: numericPrice,
    childPriceMXN: numericPrice,
    infantPriceMXN: 0,
    currency: pkg.currency ?? "MXN",
    translation: { name: pkg.name },
  };
}

function PackageCard({ item, index, onReserve }: { item: HomePackage; index: number; onReserve: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="group flex min-h-[675px] flex-col overflow-hidden rounded-b-[16px] rounded-t-[8px] bg-white text-black shadow-[0_22px_45px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-2"
    >
      <div className="relative h-[235px] w-full overflow-hidden">
        <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center transition duration-700 group-hover:scale-105" />
      </div>

      <div className="flex flex-1 flex-col px-[38px] pb-[32px] pt-[34px]">
        <h3 className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[28px] font-black leading-[0.95] tracking-[-0.02em] text-[#334E59] sm:text-[30px]">{item.name}</h3>

        <ul className="mt-[34px] min-h-[150px] list-disc space-y-[6px] pl-[18px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[13px] font-normal leading-[18px] tracking-[0.005em] text-black">
          {item.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>

        <div className="mt-auto">
          {item.note ? <p className="max-w-[360px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[10px] font-normal leading-[14px] tracking-[0.005em] text-black">{item.note}</p> : null}

          <p className="mt-[10px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[11px] font-normal leading-[24px] text-[#020615]">Adulto (+12 Años)</p>

          <div className="mt-[2px] flex items-end gap-[14px]">
            <p className="font-['Poppins',Arial,sans-serif] text-[58px] font-bold leading-[0.88] tracking-[0em] text-[#ADA51A] sm:text-[64px]">{item.price}</p>
            {item.currency ? <span className="mb-[8px] font-['Poppins',Arial,sans-serif] text-[24px] font-bold uppercase leading-none text-[#ADA51A]">{item.currency}</span> : null}
          </div>

          <button
            type="button"
            onClick={onReserve}
            className="mt-[28px] flex h-[38px] w-full items-center justify-center rounded-[8px] bg-[#334E59] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[14px] font-black uppercase leading-[24px] text-white transition duration-300 hover:bg-[#263d47]"
          >
            {item.buttonLabel}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function HomePackagesWithBooking({ content, locale }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackageCode, setSelectedPackageCode] = useState("");
  const packageItems = content.items.map(toPackageItem);

  function handleReserve(packageId: string) {
    setSelectedPackageCode(packageId.toUpperCase());
    setModalOpen(true);
  }

  return (
    <>
      <section
        id="paquetes"
        className="relative z-30 -mt-[150px] overflow-visible bg-transparent pb-20 pt-[220px] sm:-mt-[165px] sm:pt-[235px] lg:-mt-[185px] lg:pt-[255px]"
      >
        <div className="absolute inset-x-0 bottom-0 top-[130px] z-0 bg-[#004E5A] sm:top-[140px] lg:top-[155px]" />
        <div className="pointer-events-none absolute left-1/2 -top-[18px] z-10 h-[265px] w-[125vw] -translate-x-1/2 sm:-top-[24px] sm:h-[280px] lg:-top-[32px] lg:h-[296px]">
          <img src={DIVIDER_SRC} alt="" aria-hidden="true" className="h-full w-full object-fill" />
        </div>

        <Container className="relative z-20">
          <div className="-mt-[145px] sm:-mt-[165px] lg:-mt-[190px]">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="mb-[42px] text-center">
              <h2 className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[36px] font-black leading-none tracking-[-0.04em] text-white sm:text-[44px] lg:text-[52px]">
                {content.title}
              </h2>
            </motion.div>

            <div className="mx-auto grid max-w-[1360px] gap-[42px] md:grid-cols-3">
              {content.items.map((item, index) => (
                <PackageCard key={item.id} item={item} index={index} onReserve={() => handleReserve(item.slug)} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <BookingModal
        isOpen={modalOpen}
        locale={locale}
        packages={packageItems}
        initialPackageCode={selectedPackageCode}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
