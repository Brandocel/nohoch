import type { HomeContent } from "@/features/home/types/home.types";

export const homeEs: HomeContent = {
  seo: {
    title: "Cenote Nohoch | Aventura y relax en cenote",
    description:
      "Disfruta tirolesas, snorkel, naturaleza y experiencias únicas en Cenote Nohoch.",
  },

  hero: {
    badge: "Cenote natural · Aventura · Naturaleza",
    title: "Aventura y relax\nen cenote",
    subtitle: "Disfruta tirolesa, snorkel y buffet en Nohoch",
    primaryButton: "Ver paquetes",
    secondaryButton: "Descubrir cenote",
    image: "/images/home/hero/hero.webp",
  },

  packages: {
    title: "Elige tu paquete",
    subtitle:
      "Vive Nohoch a tu ritmo con experiencias pensadas para aventura, descanso y conexión con la naturaleza.",
      items: [
        {
          id: "classic",
          slug: "clasico",
          name: "Paquete CLÁSICO",
          image: "/images/home/packages/classic.webp",
          price: "$300.00",
          currency: "MXN",
          features: [
            "Acceso a Cenote Yun Chen.",
            "Chaleco salvavidas.",
          ],
          note: "Uso obligatorio de chaleco salvavidas. No incluye servicio de buffet ni bebidas. Adulto (+12 años)",
          buttonLabel: "Reserva ahora",
        },
        {
          id: "plus",
          slug: "plus",
          name: "Paquete PLUS",
          image: "/images/home/packages/plus.webp",
          price: "$550.00",
          currency: "MXN",
          features: [
            "Acceso a Cenote Yun Chen.",
            "Chaleco salvavidas.",
            "Guía.",
            "Equipo de snorkel.",
            "Circuito en caverna.",
          ],
          note: "Uso obligatorio de chaleco salvavidas. No incluye servicio de buffet ni bebidas. Adulto (+12 años)",
          buttonLabel: "Reserva ahora",
        },
        {
          id: "delux",
          slug: "delux",
          name: "Paquete DELUX",
          image: "/images/home/packages/delux.webp",
          price: "$800.00",
          currency: "MXN",
          features: [
            "Acceso a Cenote Yun Chen.",
            "Chaleco salvavidas.",
            "Guía.",
            "Equipo de snorkel.",
            "Circuito en caverna.",
            "Buffet regional.",
          ],
          note: "Uso obligatorio de chaleco salvavidas. No incluye servicio de buffet ni bebidas. Adulto (+12 años)",
          buttonLabel: "Reserva ahora",
        },
      ],
  },

  about: {
    title: "Cenote Nohoch",
    subtitle: "¡Vive una aventura inolvidable!",
    description:
      "Explora este lugar encantado que brinda una experiencia excepcional\ncon actividades para todos los gustos. Sumérgete en sus aguas\ntransparentes, adéntrate en sus fascinantes cavernas y maravíllate con\nla diversidad de vida que alberga. Disfruta de emocionantes sesiones\nde snorkel o buceo para descubrir la fauna única del cenote.",
    buttonLabel: "Ubícanos",
    image: "/images/home/about/about.webp",
  },

  experiences: {
    backgroundImage: "/images/home/experiences/experiences.webp",
    description:
      "Descubre la magia oculta del Cenote Nohoch, donde la belleza de sus aguas turquesa y sus formaciones rocosas te transportarán a un paraíso escondido. Ven a vivir una experiencia única en medio de la naturaleza y sumérgete en la tranquilidad y serenidad de este tesoro subterráneo",
    items: [
      {
        id: "agua",
        title: "Aguas cristalinas",
        image: "/images/home/experiences/experience-1.webp",
        videoSrc: "/images/home/experiences/primervideo.mp4",
      },
      {
        id: "caverna",
        title: "Cavernas naturales",
        image: "/images/home/experiences/experience-2.webp",
        videoSrc: "/images/home/experiences/segundovideo.mp4",
      },
      {
        id: "tirolesa",
        title: "Aventura en tirolesa",
        image: "/images/home/experiences/experience-3.webp",
        videoSrc: "/images/home/experiences/tercervideo.mp4",
      },
    ],
  },

  magic: {
    eyebrow: "Descubre",
    title: "Descubre la magia oculta",
    description:
      "Descubre la magia oculta del Cenote Nohoch, donde la belleza de sus aguas turquesa y sus formaciones rocosas te transportarán a un paraíso escondido. Ven a vivir una experiencia única en medio de la naturaleza y sumérgete en la tranquilidad y serenidad de este tesoro subterráneo",
    image: "/images/home/magic-cave.jpg",
  },

  footer: {
    description: "Aventura, naturaleza y descanso en Cenote Nohoch.",
    columns: [
      {
        title: "About",
        links: ["About us", "Features", "News & Blog"],
      },
      {
        title: "Contact",
        links: ["Instagram", "Twitter", "Facebook"],
      },
      {
        title: "Support",
        links: ["FAQs", "Support Center", "Feedback"],
      },
    ],
  },
};