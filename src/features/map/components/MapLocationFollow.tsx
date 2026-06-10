"use client";

import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

type MapLocationFollowProps = {
  locale: string;
};

const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=Cenote+Nohoch+Tulum";

const DESDE_CANCUN =
  "https://maps.google.com/maps?saddr=Cancun&daddr=Cenote+Nohoch+Tulum";

const DESDE_MERIDA =
  "https://maps.google.com/maps?saddr=Merida&daddr=Cenote+Nohoch+Tulum";

const DESDE_VALLADOLID =
  "https://maps.google.com/maps?saddr=Valladolid&daddr=Cenote+Nohoch+Tulum";

const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.0!2d-87.4760!3d20.1850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCenote+Nohoch+Nah+Chich!5e0!3m2!1ses!2smx!4v1";

const BACKGROUND_TEXTURE_SRC = "/images/home/majic/textura.png";

const T = {
  es: {
    howToGet: "¿Como llegar a",
    cenote: "Cenote Nohoch?",
    address:
      "Carretera tulum – playa del Carmen\nkm 12 entre lab na ha y yaxmul,\n77760 Tulum, Q.R.",
    phone: "+52 1 998 743 3220",
    openMaps: "Abrir en Google Maps",
    fromCancun: "Desde Cancún",
    fromMerida: "Desde Merida",
    fromValladolid: "Desde Valladolid",
    follow: "Síguenos en:",
    mapTitle: "Cenote Nohoch en Google Maps",
  },
  en: {
    howToGet: "How to get to",
    cenote: "Cenote Nohoch?",
    address:
      "Carretera Tulum – Playa del Carmen\nKm 12 between Lab Na Ha and Yaxmul,\n77760 Tulum, Q.R.",
    phone: "+52 1 998 743 3220",
    openMaps: "Open in Google Maps",
    fromCancun: "From Cancún",
    fromMerida: "From Merida",
    fromValladolid: "From Valladolid",
    follow: "Follow us:",
    mapTitle: "Cenote Nohoch on Google Maps",
  },
} as const;

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    Icon: TikTokIcon,
  },
  {
    label: "Messenger",
    href: "https://m.me/",
    Icon: MessengerIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    Icon: YouTubeIcon,
  },
];

export function MapLocationFollow({ locale }: MapLocationFollowProps) {
  const t = T[locale as keyof typeof T] ?? T.es;

  return (
    <section className="relative overflow-hidden bg-[#008D84]">
      {/* Textura de fondo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-28"
        style={{
          backgroundImage: `url(${BACKGROUND_TEXTURE_SRC})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[455px_minmax(0,1fr)] xl:grid-cols-[485px_minmax(0,1fr)]">
          {/* Columna izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:min-h-[442px] lg:py-0 lg:pl-[56px] lg:pr-[34px] xl:pl-[72px] xl:pr-[42px]"
          >
            <h1 className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[38px] font-light leading-[1.02] tracking-[-0.04em] text-white sm:text-[44px] lg:text-[46px] xl:text-[50px]">
              {t.howToGet}
              <br />
              <span className="font-black">{t.cenote}</span>
            </h1>

            <div className="mt-8 font-['Be_Vietnam_Pro',Arial,sans-serif] text-[17px] font-bold leading-[1.22] text-white sm:text-[18px]">
              <p className="whitespace-pre-line underline decoration-white underline-offset-[3px]">
                {t.address}
              </p>

              <a
                href={`tel:${t.phone.replace(/\s/g, "")}`}
                className="mt-1 inline-block transition hover:text-[#ADA51A]"
              >
                {t.phone}
              </a>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex h-[37px] w-fit items-center gap-2 rounded-[6px] bg-[#00586F] px-5 font-['Be_Vietnam_Pro',Arial,sans-serif] text-[13px] font-black text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)] transition hover:scale-[1.02] hover:bg-[#004E5A]"
            >
              <Navigation size={15} />
              {t.openMaps}
            </a>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                { label: t.fromCancun, href: DESDE_CANCUN },
                { label: t.fromMerida, href: DESDE_MERIDA },
                { label: t.fromValladolid, href: DESDE_VALLADOLID },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[34px] items-center justify-center rounded-[6px] bg-[#00586F] px-4 font-['Be_Vietnam_Pro',Arial,sans-serif] text-[12px] font-black text-white transition hover:scale-[1.02] hover:bg-[#004E5A]"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Columna derecha: mapa pegado al borde derecho */}
          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="flex min-w-0 flex-col"
          >
            <div className="w-full overflow-hidden border-2 border-[#00A6E8] border-r-0 bg-[#004E5A]">
              <iframe
                src={EMBED_SRC}
                width="100%"
                height="442"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.mapTitle}
                className="block h-[340px] w-full sm:h-[400px] lg:h-[442px]"
              />
            </div>

            {/* Síguenos pegado al mapa */}
            <div className="flex min-h-[88px] items-center justify-center px-4 py-5">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                <span className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-black tracking-[0.5em] text-white sm:text-[16px]">
                  {t.follow}
                </span>

                <div className="flex items-center gap-6 sm:gap-8">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="text-white transition hover:scale-110 hover:text-[#ADA51A]"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]">
      <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.46 5.56 3.745 7.28V22l3.405-1.869c.91.252 1.874.387 2.85.387 5.523 0 10-4.145 10-9.275C22 6.145 17.523 2 12 2zm1.01 12.5l-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[24px] w-[24px]">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}