"use client";

const HERO_IMAGE_SRC = "/images/contact/hero/caves.png";

export function ContactHero() {
  return (
    <section className="relative h-[360px] overflow-hidden sm:h-[420px] lg:h-[470px] xl:h-[500px]">
      {/* Imagen principal */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_IMAGE_SRC})`,
        }}
      />

      {/* Máscara negra general */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Máscara negra superior para que el header se lea bien */}
      <div className="absolute inset-x-0 top-0 h-[190px] bg-gradient-to-b from-black/55 via-black/28 to-transparent" />

      {/* Máscara negra inferior suave */}
      <div className="absolute inset-x-0 bottom-0 h-[170px] bg-gradient-to-t from-black/45 via-black/18 to-transparent" />
    </section>
  );
}