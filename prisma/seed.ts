import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import "dotenv/config";

const url = (process.env.DATABASE_URL ?? "").replace(/[?&]sslmode=[^&]*/g, "").replace(/\?$/, "");
const pool = new Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ─── Hero slide ───────────────────────────────────────────────────────────
  await prisma.heroSlide.upsert({
    where: { id: "hero-main" },
    update: {},
    create: {
      id: "hero-main",
      order: 0,
      isActive: true,
      mediaType: "IMAGE",
      mediaUrl: "/images/home/hero/hero.webp",
      translations: {
        create: [
          {
            locale: "es",
            title: "Aventura y relax\nen cenote",
            subtitle: "Disfruta tirolesa, snorkel y buffet en Nohoch",
          },
          {
            locale: "en",
            title: "Adventure and relaxation\nin a cenote",
            subtitle: "Enjoy zipline, snorkeling and buffet at Nohoch",
          },
        ],
      },
    },
  });

  // ─── Packages ─────────────────────────────────────────────────────────────
  const packages = [
    {
      id: "pkg-classic",
      slug: "clasico",
      price: 300,
      order: 0,
      coverImage: "/images/home/packages/classic.webp",
      translations: [
        {
          locale: "es" as const,
          name: "Paquete CLÁSICO",
          description: "Uso obligatorio de chaleco salvavidas. No incluye servicio de buffet ni bebidas. Adulto (+12 años)",
          includes: ["Acceso a Cenote Yun Chen.", "Chaleco salvavidas."],
        },
        {
          locale: "en" as const,
          name: "CLASSIC Package",
          description: "Life jacket mandatory. Does not include buffet or drinks. Adult (+12 years)",
          includes: ["Access to Cenote Yun Chen.", "Life jacket."],
        },
      ],
    },
    {
      id: "pkg-plus",
      slug: "plus",
      price: 550,
      order: 1,
      coverImage: "/images/home/packages/plus.webp",
      translations: [
        {
          locale: "es" as const,
          name: "Paquete PLUS",
          description: "Uso obligatorio de chaleco salvavidas. No incluye servicio de buffet ni bebidas. Adulto (+12 años)",
          includes: ["Acceso a Cenote Yun Chen.", "Chaleco salvavidas.", "Guía.", "Equipo de snorkel.", "Circuito en caverna."],
        },
        {
          locale: "en" as const,
          name: "PLUS Package",
          description: "Life jacket mandatory. Does not include buffet or drinks. Adult (+12 years)",
          includes: ["Access to Cenote Yun Chen.", "Life jacket.", "Guide.", "Snorkel equipment.", "Cave circuit."],
        },
      ],
    },
    {
      id: "pkg-delux",
      slug: "delux",
      price: 800,
      order: 2,
      coverImage: "/images/home/packages/delux.webp",
      translations: [
        {
          locale: "es" as const,
          name: "Paquete DELUX",
          description: "Uso obligatorio de chaleco salvavidas. No incluye servicio de buffet ni bebidas. Adulto (+12 años)",
          includes: ["Acceso a Cenote Yun Chen.", "Chaleco salvavidas.", "Guía.", "Equipo de snorkel.", "Circuito en caverna.", "Buffet regional."],
        },
        {
          locale: "en" as const,
          name: "DELUX Package",
          description: "Life jacket mandatory. Does not include buffet or drinks. Adult (+12 years)",
          includes: ["Access to Cenote Yun Chen.", "Life jacket.", "Guide.", "Snorkel equipment.", "Cave circuit.", "Regional buffet."],
        },
      ],
    },
  ];

  for (const pkg of packages) {
    const { translations, ...data } = pkg;
    await prisma.package.upsert({
      where: { id: data.id },
      update: {},
      create: {
        ...data,
        currency: "MXN",
        translations: { create: translations },
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
