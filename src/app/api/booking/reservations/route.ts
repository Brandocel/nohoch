import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const INAPAM_DISCOUNT_PERCENT = 0.5;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      packageCode, visitDate, adults = 1, children = 0, infants = 0,
      inapamVisitors = 0, lang = "es", couponCode,
    } = body;

    if (!packageCode || !visitDate) {
      return NextResponse.json({ success: false, message: "packageCode y visitDate son requeridos" }, { status: 400 });
    }

    const pkg = await prisma.package.findFirst({
      where: { slug: packageCode.toLowerCase(), isActive: true },
      include: { translations: true },
    });

    if (!pkg) {
      return NextResponse.json({ success: false, message: "Paquete no encontrado" }, { status: 404 });
    }

    // ── Calcular precios en PESOS ───────────────────────────────────────────
    const adultPrice  = Number(pkg.price);
    const childPrice  = pkg.childPrice ? Number(pkg.childPrice) : adultPrice;
    const inapamPrice = Math.round(adultPrice * INAPAM_DISCOUNT_PERCENT * 100) / 100;

    const regularAdults     = Math.max(adults - inapamVisitors, 0);
    const subtotalMXN       = regularAdults * adultPrice + inapamVisitors * inapamPrice + children * childPrice;
    const inapamDiscountMXN = inapamVisitors * (adultPrice - inapamPrice);

    let couponDiscountMXN = 0;
    if (couponCode && String(couponCode).toUpperCase().endsWith("10")) {
      couponDiscountMXN = Math.round(subtotalMXN * 0.1 * 100) / 100;
    }
    const totalMXN = Math.max(subtotalMXN - couponDiscountMXN, 0);

    const trans = pkg.translations.find((t) => t.locale === lang) ?? pkg.translations[0];

    // ── Crear reservación (folio = null por ahora) ──────────────────────────
    const reservation = await prisma.reservation.create({
      data: {
        packageId:        pkg.id,
        visitDate:        new Date(visitDate),
        adults, children, infants, inapamVisitors,
        snapshotLang:     lang,
        snapshotName:     trans?.name ?? pkg.slug,
        couponCode:       couponCode ?? null,
        subtotalMXN, inapamDiscountMXN, couponDiscountMXN, totalMXN,
        extrasMXN:        0,
        currency:         pkg.currency,
        status:           "DRAFT",
      },
    });

    // ── Asignar folio = número consecutivo de 5 dígitos ────────────────────
    const folio = String(reservation.folioNumber).padStart(5, "0");
    await prisma.reservation.update({
      where: { id: reservation.id },
      data: { folio },
    });

    return NextResponse.json({
      success: true,
      message: "Reservación creada",
      data: {
        id:           reservation.id,
        folio,
        folioNumber:  reservation.folioNumber,
        status:       reservation.status,
        packageId:    pkg.id,
        packageCode:  pkg.slug.toUpperCase(),
        packageName:  trans?.name ?? pkg.slug,
        visitDate:    reservation.visitDate.toISOString(),
        adults, children, infants, inapamVisitors,
        subtotalMXN:      Number(reservation.subtotalMXN),
        inapamDiscountMXN: Number(reservation.inapamDiscountMXN),
        couponDiscountMXN: Number(reservation.couponDiscountMXN),
        totalMXN:     totalMXN,
        currency:     reservation.currency,
        createdAt:    reservation.createdAt.toISOString(),
      },
    }, { status: 201 });
  } catch (error) {
    console.error("[booking/reservations POST]", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Error al crear reservación" }, { status: 500 });
  }
}
