"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Navigation } from "lucide-react";
import { Container } from "@/shared/components/ui/Container";

type Props = {
  locale: "es" | "en";
};

const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Cenote+Nohoch+Tulum";
const DESDE_CANCUN    = "https://maps.google.com/maps?saddr=Cancun&daddr=Cenote+Nohoch+Tulum";
const DESDE_MERIDA    = "https://maps.google.com/maps?saddr=Merida&daddr=Cenote+Nohoch+Tulum";
const DESDE_VALLADOLID = "https://maps.google.com/maps?saddr=Valladolid&daddr=Cenote+Nohoch+Tulum";
const EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.0!2d-87.4760!3d20.1850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCenote+Nohoch+Nah+Chich!5e0!3m2!1ses!2smx!4v1";

const CAVE_MAP_SRC = "/images/home/map/cave-map.webp";

const T = {
  es: {
    sectionTitle:  "Mapa // Ubicación",
    caveAlt:       "Mapa del sistema de cavernas Nohoch Nah Chich",
    howToGet:      "¿Cómo llegar a",
    cenote:        "Cenote Nohoch?",
    address:       "Carretera Tulum – Playa del Carmen\nKm 12 entre Lab Na Ha y Yaxmul.\n77760 Tulum, Q.R.",
    phone:         "+52 1 998 743 3220",
    openMaps:      "Abrir en Google Maps",
    fromCancun:    "Desde Cancún",
    fromMerida:    "Desde Mérida",
    fromValladolid:"Desde Valladolid",
    follow:        "Síguenos en:",
  },
  en: {
    sectionTitle:  "Map // Location",
    caveAlt:       "Nohoch Nah Chich cave system map",
    howToGet:      "How to get to",
    cenote:        "Cenote Nohoch?",
    address:       "Carretera Tulum – Playa del Carmen\nKm 12 between Lab Na Ha and Yaxmul.\n77760 Tulum, Q.R.",
    phone:         "+52 1 998 743 3220",
    openMaps:      "Open in Google Maps",
    fromCancun:    "From Cancún",
    fromMerida:    "From Mérida",
    fromValladolid:"From Valladolid",
    follow:        "Follow us:",
  },
} as const;

const socials = [
  { label: "Facebook",  href: "https://facebook.com",  icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )},
  { label: "Instagram", href: "https://instagram.com", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )},
  { label: "TikTok",    href: "https://tiktok.com",    icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/></svg>
  )},
  { label: "Messenger", href: "https://m.me/",         icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.46 5.56 3.745 7.28V22l3.405-1.869c.91.252 1.874.387 2.85.387 5.523 0 10-4.145 10-9.275C22 6.145 17.523 2 12 2zm1.01 12.5l-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82z"/></svg>
  )},
  { label: "YouTube",   href: "https://youtube.com",   icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
  )},
];

export function HomeMap({ locale }: Props) {
  const t = T[locale] ?? T.es;

  return (
    <section id="ubicacion" className="bg-[#004E5A]">

      {/* ── Cave map image ───────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden bg-[#C8A84B]">
        <motion.img
          src={CAVE_MAP_SRC}
          alt={t.caveAlt}
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto block w-full max-w-[1400px] object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* ── Directions + Google Map ──────────────────────────────────────── */}
      <div className="border-t-[6px] border-[#1a6675]">
        <Container>
          <div className="grid gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">

            {/* Left: address */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h2 className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[28px] font-black leading-[1.1] text-white sm:text-[34px] lg:text-[40px]">
                <span className="text-[#C8A84B]">¿</span>{t.howToGet}
                <br />
                <span className="text-[#C8A84B]">{t.cenote}</span>
              </h2>

              <div className="mt-6 flex items-start gap-3">
                <MapPin className="mt-1 shrink-0 text-[#C8A84B]" size={20} />
                <p className="whitespace-pre-line font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] leading-[1.65] text-white/90">
                  {t.address}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <Phone className="shrink-0 text-[#C8A84B]" size={18} />
                <a href={`tel:${t.phone.replace(/\s/g, "")}`}
                  className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-semibold text-white/90 transition hover:text-[#C8A84B]">
                  {t.phone}
                </a>
              </div>

              {/* Google Maps button */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-[8px] bg-white px-5 py-2.5 font-['Be_Vietnam_Pro',Arial,sans-serif] text-[14px] font-black text-[#004E5A] transition hover:bg-[#C8A84B] hover:text-white"
              >
                <Navigation size={16} />
                {t.openMaps}
              </a>

              {/* Route chips */}
              <div className="mt-5 flex flex-wrap gap-3">
                {[
                  { label: t.fromCancun,     href: DESDE_CANCUN },
                  { label: t.fromMerida,     href: DESDE_MERIDA },
                  { label: t.fromValladolid, href: DESDE_VALLADOLID },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[6px] border border-white/30 px-4 py-2 font-['Be_Vietnam_Pro',Arial,sans-serif] text-[13px] font-semibold text-white/80 transition hover:border-[#C8A84B] hover:text-[#C8A84B]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: embedded map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="overflow-hidden rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
            >
              <iframe
                src={EMBED_SRC}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cenote Nohoch en Google Maps"
                className="block h-[340px] w-full sm:h-[400px] lg:h-[440px]"
              />
            </motion.div>
          </div>
        </Container>
      </div>

      {/* ── Social bar ──────────────────────────────────────────────────── */}
      <div className="border-t border-white/10 py-6">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <span className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[14px] font-semibold tracking-wider text-white/70">
              {t.follow}
            </span>
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-white/70 transition hover:text-[#C8A84B]"
              >
                {icon}
              </a>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
