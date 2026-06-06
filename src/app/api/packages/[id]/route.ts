import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UpdatePackageSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  price: z.number().positive().optional(),
  currency: z.string().optional(),
  durationMin: z.number().int().positive().nullable().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
  coverImage: z.string().url().nullable().optional(),
});

const UpsertTranslationSchema = z.object({
  locale: z.enum(["es", "en"]),
  name: z.string().min(1),
  description: z.string().optional(),
  includes: z.array(z.string()).default([]),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const pkg = await prisma.package.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!pkg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: pkg });
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdatePackageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const pkg = await prisma.package.update({
      where: { id },
      data: parsed.data,
      include: { translations: true },
    });
    return NextResponse.json({ data: pkg });
  } catch {
    return NextResponse.json({ error: "Error updating package" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error deleting package" }, { status: 500 });
  }
}

// PUT /api/packages/:id — upsert a single translation
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpsertTranslationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const translation = await prisma.packageTranslation.upsert({
      where: { packageId_locale: { packageId: id, locale: parsed.data.locale } },
      create: { packageId: id, ...parsed.data },
      update: parsed.data,
    });
    return NextResponse.json({ data: translation });
  } catch {
    return NextResponse.json({ error: "Error upserting translation" }, { status: 500 });
  }
}
