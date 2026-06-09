import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ folio: string }> }
) {
  try {
    const { folio } = await params;

    const reservation = await prisma.reservation.findUnique({
      where: { folio },
      include: { package: { include: { translations: true } }, payment: true },
    });

    if (!reservation) {
      return NextResponse.json({ success: false, message: "Reservación no encontrada" }, { status: 404 });
    }

    const lang = reservation.snapshotLang ?? "es";
    const trans = reservation.package.translations.find((t) => t.locale === lang) ?? reservation.package.translations[0];

    return NextResponse.json({
      success: true,
      data: {
        id: reservation.id,
        folio: reservation.folio,
        status: reservation.status,
        visitDate: reservation.visitDate.toISOString(),
        adults: reservation.adults,
        children: reservation.children,
        infants: reservation.infants,
        inapamVisitors: reservation.inapamVisitors,
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        email: reservation.email,
        phone: reservation.phone,
        country: reservation.country,
        comments: reservation.comments,
        subtotalMXN: Number(reservation.subtotalMXN),
        inapamDiscountMXN: Number(reservation.inapamDiscountMXN),
        couponCode: reservation.couponCode,
        couponDiscountMXN: Number(reservation.couponDiscountMXN),
        totalMXN: Number(reservation.totalMXN),
        extrasMXN: Number(reservation.extrasMXN),
        currency: reservation.currency,
        package: {
          id: reservation.package.id,
          code: reservation.package.slug.toUpperCase(),
          currency: reservation.package.currency,
          snapshotName: reservation.snapshotName,
          snapshotLang: lang,
          name: trans?.name ?? reservation.package.slug,
        },
        payment: reservation.payment
          ? {
              id: reservation.payment.id,
              method: reservation.payment.method,
              status: reservation.payment.status,
              stripePaymentIntentId: reservation.payment.stripePaymentIntentId,
              stripeClientSecret: reservation.payment.stripeClientSecret,
              oxxoReference: reservation.payment.oxxoReference,
              oxxoVoucherUrl: reservation.payment.oxxoVoucherUrl,
              oxxoExpiresAt: reservation.payment.oxxoExpiresAt?.toISOString() ?? null,
              amountMXN: Number(reservation.payment.amountMXN),
            }
          : null,
        createdAt: reservation.createdAt.toISOString(),
        updatedAt: reservation.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("[booking/reservations/[folio] GET]", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Error al obtener reservación" }, { status: 500 });
  }
}
