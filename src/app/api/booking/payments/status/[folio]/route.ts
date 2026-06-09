import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ folio: string }> }
) {
  try {
    const { folio } = await params;

    const reservation = await prisma.reservation.findUnique({
      where: { folio },
      include: { payment: true },
    });

    if (!reservation) {
      return NextResponse.json({ success: false, message: "Reservación no encontrada" }, { status: 404 });
    }

    const payment = reservation.payment;
    if (!payment) {
      return NextResponse.json({
        success: true,
        data: { folio, reservationStatus: reservation.status, paymentStatus: null, method: null },
      });
    }

    // Sync with Stripe for latest status
    let stripeStatus = payment.status;
    if (payment.stripePaymentIntentId) {
      try {
        const intent = await stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);
        const mappedStatus =
          intent.status === "succeeded"  ? "PAID"
          : intent.status === "canceled" ? "CANCELLED"
          : intent.status === "processing" ? "PROCESSING"
          : "PENDING";

        if (mappedStatus !== payment.status) {
          await prisma.payment.update({
            where: { id: payment.id },
            data: { status: mappedStatus },
          });
          if (mappedStatus === "PAID" && reservation.status === "DRAFT") {
            await prisma.reservation.update({
              where: { folio },
              data: { status: "CONFIRMED" },
            });
          }
          stripeStatus = mappedStatus;
        }
      } catch (stripeErr) {
        console.warn("[booking/payments/status] Stripe sync failed:", stripeErr);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        folio,
        reservationStatus: reservation.status,
        paymentStatus: stripeStatus,
        method: payment.method,
        amountMXN: Number(payment.amountMXN),
        stripePaymentIntentId: payment.stripePaymentIntentId,
        oxxoReference: payment.oxxoReference,
        oxxoVoucherUrl: payment.oxxoVoucherUrl,
        oxxoExpiresAt: payment.oxxoExpiresAt?.toISOString() ?? null,
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("[booking/payments/status/[folio] GET]", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Error al obtener estado del pago" }, { status: 500 });
  }
}
