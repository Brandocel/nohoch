import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UpdateHeroSlideSchema = z.object({
  mediaType: z.enum(["IMAGE", "VIDEO"]).optional(),
  mediaUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().nullable().optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

const UpsertTranslationSchema = z.object({
  locale: z.enum(["es", "en"]),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!slide) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: slide });
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateHeroSlideSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: parsed.data,
      include: { translations: true },
    });
    return NextResponse.json({ data: slide });
  } catch {
    return NextResponse.json({ error: "Error updating hero slide" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.heroSlide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error deleting hero slide" }, { status: 500 });
  }
}

// PUT /api/hero/:id/translations — upsert a single translation
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpsertTranslationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const translation = await prisma.heroSlideTranslation.upsert({
      where: { slideId_locale: { slideId: id, locale: parsed.data.locale } },
      create: { slideId: id, ...parsed.data },
      update: parsed.data,
    });
    return NextResponse.json({ data: translation });
  } catch {
    return NextResponse.json({ error: "Error upserting translation" }, { status: 500 });
  }
}
