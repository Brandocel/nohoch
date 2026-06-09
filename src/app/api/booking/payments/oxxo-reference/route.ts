import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { folio, email, name } = body;

    if (!folio) {
      return NextResponse.json({ success: false, message: "folio es requerido" }, { status: 400 });
    }

    const reservation = await prisma.reservation.findUnique({
      where: { folio },
      include: { payment: true },
    });

    if (!reservation) {
      return NextResponse.json({ success: false, message: "Reservación no encontrada" }, { status: 404 });
    }

    // Return still-valid existing OXXO reference
    if (
      reservation.payment?.oxxoReference &&
      reservation.payment.method === "oxxo" &&
      reservation.payment.oxxoExpiresAt &&
      reservation.payment.oxxoExpiresAt > new Date()
    ) {
      return NextResponse.json({
        success: true,
        message: "Referencia OXXO existente",
        data: {
          folio,
          reference: reservation.payment.oxxoReference,
          hostedVoucherUrl: reservation.payment.oxxoVoucherUrl,
          expiresAt: reservation.payment.oxxoExpiresAt?.toISOString() ?? null,
          amountMXN: Number(reservation.payment.amountMXN),
        },
      });
    }

    const amountCents = Math.round(Number(reservation.totalMXN) * 100);
    if (amountCents < 1000) {
      return NextResponse.json({ success: false, message: "El monto mínimo de cobro es $10 MXN" }, { status: 400 });
    }

    const customerEmail = email || reservation.email;
    const customerName  = name  || `${reservation.firstName ?? ""} ${reservation.lastName ?? ""}`.trim() || "Cliente";

    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "mxn",
      payment_method_types: ["oxxo"],
      payment_method_data: {
        type: "oxxo",
        billing_details: {
          name: customerName,
          email: customerEmail ?? undefined,
        },
      },
      confirm: true,
      metadata: {
        folio,
        reservationId: reservation.id,
        env: process.env.NODE_ENV ?? "development",
      },
    });

    const oxxoNext       = intent.next_action?.oxxo_display_details;
    const oxxoReference  = oxxoNext?.number ?? null;
    const oxxoVoucherUrl = oxxoNext?.hosted_voucher_url ?? null;
    const oxxoExpiresAt  = oxxoNext?.expires_after ? new Date(oxxoNext.expires_after * 1000) : null;

    await prisma.payment.upsert({
      where: { reservationId: reservation.id },
      create: {
        reservationId: reservation.id,
        method: "oxxo",
        status: "PENDING",
        stripePaymentIntentId: intent.id,
        stripeClientSecret: intent.client_secret,
        oxxoReference,
        oxxoVoucherUrl,
        oxxoExpiresAt,
        amountMXN: reservation.totalMXN,
        currency: reservation.currency,
      },
      update: {
        method: "oxxo",
        status: "PENDING",
        stripePaymentIntentId: intent.id,
        stripeClientSecret: intent.client_secret,
        oxxoReference,
        oxxoVoucherUrl,
        oxxoExpiresAt,
        amountMXN: reservation.totalMXN,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Referencia OXXO generada",
      data: {
        folio,
        reference: oxxoReference,
        hostedVoucherUrl: oxxoVoucherUrl,
        expiresAt: oxxoExpiresAt?.toISOString() ?? null,
        amountMXN: Number(reservation.totalMXN),
        clientSecret: intent.client_secret,
      },
    });
  } catch (error) {
    console.error("[booking/payments/oxxo-reference POST]", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Error al generar referencia OXXO" }, { status: 500 });
  }
}
