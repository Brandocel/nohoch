import type { HomeContent } from "@/features/home/types/home.types";

export const homeEn: HomeContent = {
  seo: {
    title: "Cenote Nohoch | Adventure and relaxation in a cenote",
    description:
      "Enjoy ziplines, snorkeling, nature and unique experiences at Cenote Nohoch.",
  },

  hero: {
    badge: "Natural cenote · Adventure · Nature",
    title: "Adventure and\nrelax in a cenote",
    subtitle: "Enjoy zipline, snorkel and buffet at Nohoch",
    primaryButton: "View packages",
    secondaryButton: "Discover cenote",
    image: "/images/home/hero/hero.webp",
  },

  packages: {
    title: "Choose your package",
    subtitle:
      "Experience Nohoch your way with options designed for adventure, relaxation and connection with nature.",
      items: [
        {
          id: "classic",
          slug: "clasico",
          name: "CLASSIC Package",
          image: "/images/home/packages/classic.webp",
          price: "$300.00",
          currency: "MXN",
          features: [
            "Access to Yun Chen Cenote.",
            "Life jacket included.",
          ],
          note: "Life jacket use is mandatory. Buffet service and drinks are not included. Adult (+12 years)",
          buttonLabel: "Book now",
        },
        {
          id: "plus",
          slug: "plus",
          name: "PLUS Package",
          image: "/images/home/packages/plus.webp",
          price: "$550.00",
          currency: "MXN",
          features: [
            "Access to Yun Chen Cenote.",
            "Life jacket included.",
            "Guide.",
            "Snorkel equipment.",
            "Cave circuit.",
          ],
          note: "Life jacket use is mandatory. Buffet service and drinks are not included. Adult (+12 years)",
          buttonLabel: "Book now",
        },
        {
          id: "delux",
          slug: "delux",
          name: "DELUX Package",
          image: "/images/home/packages/delux.webp",
          price: "$800.00",
          currency: "MXN",
          features: [
            "Access to Yun Chen Cenote.",
            "Life jacket included.",
            "Guide.",
            "Snorkel equipment.",
            "Cave circuit.",
            "Regional buffet.",
          ],
          note: "Life jacket use is mandatory. Buffet service and drinks are not included. Adult (+12 years)",
          buttonLabel: "Book now",
        },
      ],
  },

  about: {
    title: "Cenote Nohoch",
    subtitle: "Live an unforgettable adventure!",
    description:
      "Explore this enchanted place that offers an exceptional\nexperience with activities for every taste. Dive into its\nclear waters, enter its fascinating caves and admire the\ndiversity of life it shelters. Enjoy exciting snorkeling\nor diving sessions to discover the unique fauna of the cenote.",
    buttonLabel: "Find us",
    image: "/images/home/about/about.webp",
  },

  experiences: {
    backgroundImage: "/images/home/experiences/experiences.webp",
    description:
      "Discover the hidden magic of Cenote Nohoch, where the beauty of its turquoise waters and rocky formations will transport you to a hidden paradise. Come live a unique experience surrounded by nature and immerse yourself in the peace and serenity of this underground treasure.",
    items: [
      {
        id: "water",
        title: "Crystal clear waters",
        image: "/images/home/experiences/experience-1.webp",
        videoSrc: "/images/home/experiences/primervideo.mp4",
      },
      {
        id: "cave",
        title: "Natural caves",
        image: "/images/home/experiences/experience-2.webp",
        videoSrc: "/images/home/experiences/segundovideo.mp4",
      },
      {
        id: "zipline",
        title: "Zipline adventure",
        image: "/images/home/experiences/experience-3.webp",
        videoSrc: "/images/home/experiences/tercervideo.mp4",
      },
    ],
  },

  magic: {
    eyebrow: "Discover",
    title: "Discover the hidden magic",
    description:
      "Explore natural corners full of history, admire the beauty of its caves and immerse yourself in an atmosphere made to connect with nature.",
    image: "/images/home/magic-cave.jpg",
  },

  footer: {
    description: "Adventure, nature and relaxation at Cenote Nohoch.",
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