import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ folio: string }> }
) {
  try {
    const { folio } = await params;
    const body = await req.json();
    const { firstName, lastName, email, phone, country, comments } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ success: false, message: "Nombre, apellido y email son requeridos" }, { status: 400 });
    }

    const updated = await prisma.reservation.update({
      where: { folio },
      data: {
        firstName: firstName.trim(),
        lastName:  lastName.trim(),
        email:     email.trim().toLowerCase(),
        phone:     phone?.trim()    ?? null,
        country:   country?.trim()  ?? null,
        comments:  comments?.trim() ?? null,
      },
      include: {
        package: { include: { translations: true } },
        payment: true,
      },
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Reservación no encontrada" }, { status: 404 });
    }

    const lang  = updated.snapshotLang ?? "es";
    const trans = updated.package.translations.find((t) => t.locale === lang) ?? updated.package.translations[0];

    return NextResponse.json({
      success: true,
      message: "Datos de contacto actualizados",
      data: {
        id:           updated.id,
        folio:        updated.folio,
        folioNumber:  updated.folioNumber,
        status:       updated.status,
        visitDate:    updated.visitDate.toISOString(),
        adults:       updated.adults,
        children:     updated.children,
        infants:      updated.infants,
        inapamVisitors: updated.inapamVisitors,
        firstName:    updated.firstName,
        lastName:     updated.lastName,
        email:        updated.email,
        phone:        updated.phone,
        country:      updated.country,
        comments:     updated.comments,
        subtotalMXN:       Number(updated.subtotalMXN),
        inapamDiscountMXN: Number(updated.inapamDiscountMXN),
        couponCode:        updated.couponCode,
        couponDiscountMXN: Number(updated.couponDiscountMXN),
        totalMXN:          Number(updated.totalMXN),
        extrasMXN:         Number(updated.extrasMXN),
        currency:          updated.currency,
        package: {
          id:           updated.package.id,
          code:         updated.package.slug.toUpperCase(),
          currency:     updated.package.currency,
          snapshotName: updated.snapshotName,
          snapshotLang: lang,
          name:         trans?.name ?? updated.package.slug,
        },
        payment: updated.payment ? {
          id:                    updated.payment.id,
          method:                updated.payment.method,
          status:                updated.payment.status,
          stripePaymentIntentId: updated.payment.stripePaymentIntentId,
          stripeClientSecret:    updated.payment.stripeClientSecret,
          oxxoReference:         updated.payment.oxxoReference,
          oxxoVoucherUrl:        updated.payment.oxxoVoucherUrl,
          oxxoExpiresAt:         updated.payment.oxxoExpiresAt?.toISOString() ?? null,
          amountMXN:             Number(updated.payment.amountMXN),
        } : null,
        createdAt:  updated.createdAt.toISOString(),
        updatedAt:  updated.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("[booking/reservations/[folio]/contact PATCH]", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Error al actualizar contacto" }, { status: 500 });
  }
}
