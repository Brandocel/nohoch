"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ContactTextureDivider } from "./ContactTextureDivider";

type ContactSectionProps = {
  locale: string;
};

const CONTACT_VIDEO_SRC = "/images/contact/form/golondrina.mp4";
const CONTACT_IMAGE_SRC = "/images/contact/form/golondrina.png";

const T = {
  es: {
    title: "Mantengamonos en contacto",
    description:
      "Agradecemos todos comentarios para poderte dar la mejor experiencia posible antes, durante y después de tu visita a nuestro ecoparque",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Email",
    phone: "Numero de teléfono",
    message: "Mensaje",
    submit: "Enviar",
    sending: "Enviando...",
    success: "Gracias, recibimos tu mensaje.",
    error: "No pudimos enviar tu mensaje. Intenta nuevamente.",
    follow: "Síguenos en:",
    imageAlt: "Golondrina en Cenote Nohoch",
  },
  en: {
    title: "Let’s stay in touch",
    description:
      "We appreciate all feedback so we can offer you the best experience before, during and after your visit to our eco park.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone number",
    message: "Message",
    submit: "Send",
    sending: "Sending...",
    success: "Thank you, we received your message.",
    error: "We could not send your message. Please try again.",
    follow: "Follow us:",
    imageAlt: "Swallow at Cenote Nohoch",
  },
} as const;

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

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

export function ContactSection({ locale }: ContactSectionProps) {
  const t = T[locale as keyof typeof T] ?? T.es;

  const videoRef = useRef<HTMLVideoElement>(null);
  const resetVideoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [birdActive, setBirdActive] = useState(false);

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function playBirdVideo() {
    const video = videoRef.current;
    if (!video) return;

    if (resetVideoTimeoutRef.current) {
      clearTimeout(resetVideoTimeoutRef.current);
      resetVideoTimeoutRef.current = null;
    }

    try {
      setBirdActive(true);
      video.muted = true;
      await video.play();
    } catch {
      setBirdActive(false);
    }
  }

  function pauseBirdVideo() {
    const video = videoRef.current;
    if (!video) return;

    setBirdActive(false);

    resetVideoTimeoutRef.current = setTimeout(() => {
      video.pause();
      video.currentTime = 0;
    }, 280);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setStatus("sending");

      /*
        Aquí después conectamos tu API real:

        await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locale,
            ...form,
          }),
        });
      */

      await new Promise((resolve) => window.setTimeout(resolve, 700));

      setStatus("success");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section
        id="contacto"
        className="relative overflow-hidden bg-[#00B3AD] pb-[46px] pt-[70px] sm:pb-[54px] sm:pt-[82px] lg:pb-[50px] lg:pt-[86px]"
      >
        {/* Fondo base limpio */}
        <div className="pointer-events-none absolute inset-0 bg-[#00B3AD]" />

        {/* Degradado superior suave */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[54%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(72,50,137,0.22) 0%, rgba(72,50,137,0.14) 38%, rgba(72,50,137,0.06) 68%, rgba(72,50,137,0) 100%)",
          }}
        />

        {/* Brillo suave lateral */}
        <div
          className="pointer-events-none absolute left-[-12%] top-[10%] z-0 h-[440px] w-[440px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 36%, rgba(255,255,255,0) 72%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 sm:px-8 lg:px-10">
          <div className="grid items-start gap-[42px] lg:grid-cols-[420px_1fr] lg:gap-[72px]">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="mx-auto w-full max-w-[420px] lg:mx-0"
            >
              <h2 className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[28px] font-bold leading-none tracking-[-0.02em] text-white sm:text-[30px]">
                {t.title}
              </h2>

              <p className="mt-[12px] max-w-[395px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-normal leading-[1.15] tracking-[-0.01em] text-white/90">
                {t.description}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-[38px] space-y-[12px]"
              >
                <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(event) =>
                      updateField("firstName", event.target.value)
                    }
                    placeholder={t.firstName}
                    className="h-[42px] rounded-[5px] border border-white/18 bg-white/[0.05] px-[14px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-normal text-white outline-none placeholder:text-white/55 transition focus:border-white/40 focus:bg-white/[0.08]"
                  />

                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(event) =>
                      updateField("lastName", event.target.value)
                    }
                    placeholder={t.lastName}
                    className="h-[42px] rounded-[5px] border border-white/18 bg-white/[0.05] px-[14px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-normal text-white outline-none placeholder:text-white/55 transition focus:border-white/40 focus:bg-white/[0.08]"
                  />
                </div>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder={t.email}
                  className="h-[42px] w-full rounded-[5px] border border-white/18 bg-white/[0.05] px-[14px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-normal text-white outline-none placeholder:text-white/55 transition focus:border-white/40 focus:bg-white/[0.08]"
                />

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder={t.phone}
                  className="h-[42px] w-full rounded-[5px] border border-white/18 bg-white/[0.05] px-[14px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-normal text-white outline-none placeholder:text-white/55 transition focus:border-white/40 focus:bg-white/[0.08]"
                />

                <textarea
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder={t.message}
                  rows={5}
                  className="min-h-[130px] w-full resize-none rounded-[5px] border border-white/18 bg-white/[0.05] px-[14px] py-[12px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-normal text-white outline-none placeholder:text-white/55 transition focus:border-white/40 focus:bg-white/[0.08]"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex h-[42px] w-full items-center justify-center rounded-[5px] bg-[linear-gradient(90deg,#00586F_0%,#00B3AD_100%)] px-[10px] font-['Be_Vietnam_Pro',Arial,sans-serif] text-[20px] font-medium leading-none text-white shadow-[0_10px_22px_rgba(0,88,111,0.18)] transition duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? t.sending : t.submit}
                </button>

                {status === "success" && (
                  <p className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[13px] font-semibold text-white">
                    {t.success}
                  </p>
                )}

                {status === "error" && (
                  <p className="font-['Be_Vietnam_Pro',Arial,sans-serif] text-[13px] font-semibold text-red-100">
                    {t.error}
                  </p>
                )}
              </form>
            </motion.div>

            {/* Video derecha */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mx-auto w-full max-w-[510px] lg:mx-0"
            >
              <div
                className="group relative aspect-[1/1] overflow-hidden rounded-[8px] shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition duration-500 ease-out hover:shadow-[0_18px_48px_rgba(0,0,0,0.24)]"
                onMouseEnter={playBirdVideo}
                onMouseLeave={pauseBirdVideo}
                onFocus={playBirdVideo}
                onBlur={pauseBirdVideo}
                onTouchStart={playBirdVideo}
                tabIndex={0}
                role="button"
                aria-label={t.imageAlt}
              >
                {/* Imagen base */}
                <Image
                  src={CONTACT_IMAGE_SRC}
                  alt={t.imageAlt}
                  fill
                  className={`object-cover object-center transition duration-500 ease-out ${
                    birdActive
                      ? "scale-[1.025] opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                  sizes="(max-width: 1024px) 90vw, 510px"
                />

                {/* Video encima */}
                <video
                  ref={videoRef}
                  src={CONTACT_VIDEO_SRC}
                  muted
                  playsInline
                  preload="metadata"
                  className={`absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out ${
                    birdActive
                      ? "scale-[1.025] opacity-100"
                      : "scale-100 opacity-0"
                  }`}
                />

                {/* Sombra inferior suave */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-black/0 to-transparent opacity-90 transition duration-500 group-hover:opacity-70" />

                {/* Brillo sutil en hover */}
                <div className="pointer-events-none absolute inset-0 bg-white/0 transition duration-500 group-hover:bg-white/[0.035]" />
              </div>
            </motion.div>
          </div>

          {/* Síguenos alineado con la imagen */}
          <div className="mt-[34px] grid w-full lg:grid-cols-[420px_1fr] lg:gap-[72px]">
            <div className="hidden lg:block" />

            <div className="mx-auto flex w-full max-w-[510px] items-center justify-center lg:mx-0">
              <div className="flex flex-wrap items-center justify-center gap-x-[22px] gap-y-4 sm:gap-x-[28px]">
                <span className="whitespace-nowrap font-['Be_Vietnam_Pro',Arial,sans-serif] text-[15px] font-black leading-none tracking-[0.32em] text-white sm:text-[16px]">
                  {t.follow}
                </span>

                <div className="flex items-center gap-[22px] sm:gap-[28px]">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex h-[24px] w-[24px] items-center justify-center text-white transition duration-300 hover:scale-110 hover:text-[#ADA51A]"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactTextureDivider />
    </>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[21px] w-[21px]">
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
      className="h-[21px] w-[21px]"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[21px] w-[21px]">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[21px] w-[21px]">
      <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.46 5.56 3.745 7.28V22l3.405-1.869c.91.252 1.874.387 2.85.387 5.523 0 10-4.145 10-9.275C22 6.145 17.523 2 12 2zm1.01 12.5l-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[23px] w-[23px]">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}