import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const CreatePackageSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  price: z.number().positive(),
  currency: z.string().default("MXN"),
  durationMin: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
  coverImage: z.string().url().optional(),
  translations: z.array(
    z.object({
      locale: z.enum(["es", "en"]),
      name: z.string().min(1),
      description: z.string().optional(),
      includes: z.array(z.string()).default([]),
    })
  ).min(1),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale");
    const activeOnly = searchParams.get("active") !== "false";

    const packages = await prisma.package.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { order: "asc" },
      include: {
        translations: locale
          ? { where: { locale: locale as "es" | "en" } }
          : true,
      },
    });

    return NextResponse.json({ data: packages });
  } catch {
    return NextResponse.json({ error: "Error fetching packages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreatePackageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { translations, ...packageData } = parsed.data;

    const pkg = await prisma.package.create({
      data: {
        ...packageData,
        price: packageData.price,
        translations: { create: translations },
      },
      include: { translations: true },
    });

    return NextResponse.json({ data: pkg }, { status: 201 });
  } catch (err: unknown) {
    const isPrismaUniqueError =
      typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "P2002";
    if (isPrismaUniqueError) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Error creating package" }, { status: 500 });
  }
}
