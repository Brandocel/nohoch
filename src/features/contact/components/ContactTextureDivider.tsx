"use client";

import Image from "next/image";

const CONTACT_PATTERN_SRC = "/images/contact/form/text.png";

export function ContactTextureDivider() {
  return (
    <div className="relative w-full overflow-hidden bg-[#ADA51A] py-[7px] sm:py-[8px] lg:py-[9px]">
      <div className="relative h-[38px] overflow-hidden sm:h-[42px] lg:h-[46px]">
        <Image
          src={CONTACT_PATTERN_SRC}
          alt=""
          fill
          aria-hidden="true"
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </div>
  );
}