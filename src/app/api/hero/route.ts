export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const CreateHeroSlideSchema = z.object({
  mediaType: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  mediaUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  translations: z.array(
    z.object({
      locale: z.enum(["es", "en"]),
      title: z.string().min(1),
      subtitle: z.string().optional(),
      ctaLabel: z.string().optional(),
      ctaUrl: z.string().optional(),
    })
  ).min(1),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale");
    const activeOnly = searchParams.get("active") !== "false";

    const slides = await prisma.heroSlide.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { order: "asc" },
      include: {
        translations: locale
          ? { where: { locale: locale as "es" | "en" } }
          : true,
      },
    });

    return NextResponse.json({ data: slides });
  } catch {
    return NextResponse.json({ error: "Error fetching hero slides" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateHeroSlideSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { translations, ...slideData } = parsed.data;

    const slide = await prisma.heroSlide.create({
      data: {
        ...slideData,
        translations: { create: translations },
      },
      include: { translations: true },
    });

    return NextResponse.json({ data: slide }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error creating hero slide" }, { status: 500 });
  }
}
