import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const INAPAM_DISCOUNT_PERCENT = 0.5;

/** Recalculate total from the package if the stored total is 0 (legacy reservations) */
async function recalculateTotal(reservation: {
  packageId: string;
  adults: number;
  children: number;
  inapamVisitors: number;
}): Promise<number> {
  const pkg = await prisma.package.findUnique({ where: { id: reservation.packageId } });
  if (!pkg) return 0;
  const adultPrice = Number(pkg.price);
  const childPrice = pkg.childPrice ? Number(pkg.childPrice) : adultPrice;
  const inapamPrice = Math.round(adultPrice * INAPAM_DISCOUNT_PERCENT * 100) / 100;
  const regularAdults = Math.max(reservation.adults - reservation.inapamVisitors, 0);
  return regularAdults * adultPrice + reservation.inapamVisitors * inapamPrice + reservation.children * childPrice;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { folio } = body;

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

    // Si el total guardado es 0 (reservación vieja), recalcular desde el paquete
    let totalMXN = Number(reservation.totalMXN);
    if (totalMXN <= 0) {
      totalMXN = await recalculateTotal(reservation);
      if (totalMXN > 0) {
        await prisma.reservation.update({
          where: { id: reservation.id },
          data: { totalMXN, subtotalMXN: totalMXN },
        });
      }
    }

    const amountCents = Math.round(totalMXN * 100);
    if (amountCents < 1000) {
      return NextResponse.json({
        success: false,
        message: `El monto mínimo de cobro es $10 MXN (calculado: $${totalMXN.toFixed(2)})`,
      }, { status: 400 });
    }

    // Reutilizar intent existente si no fue cancelado
    if (reservation.payment?.stripePaymentIntentId && reservation.payment.method === "card") {
      const existingIntent = await stripe.paymentIntents.retrieve(reservation.payment.stripePaymentIntentId);
      if (existingIntent.status !== "canceled") {
        return NextResponse.json({
          success: true,
          message: "PaymentIntent existente",
          data: {
            folio,
            stripe: { paymentIntentId: existingIntent.id, clientSecret: existingIntent.client_secret },
            amountMXN: totalMXN,
            currency: reservation.currency,
          },
        });
      }
    }

    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "mxn",
      payment_method_types: ["card"],
      metadata: {
        folio,
        reservationId: reservation.id,
        env: process.env.NODE_ENV ?? "development",
      },
      description: `Reservación Nohoch #${folio}`,
    });

    await prisma.payment.upsert({
      where: { reservationId: reservation.id },
      create: {
        reservationId: reservation.id,
        method: "card",
        status: "PENDING",
        stripePaymentIntentId: intent.id,
        stripeClientSecret: intent.client_secret,
        amountMXN: totalMXN,
        currency: reservation.currency,
      },
      update: {
        method: "card",
        status: "PENDING",
        stripePaymentIntentId: intent.id,
        stripeClientSecret: intent.client_secret,
        amountMXN: totalMXN,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "PaymentIntent creado",
      data: {
        folio,
        stripe: { paymentIntentId: intent.id, clientSecret: intent.client_secret },
        amountMXN: totalMXN,
        currency: reservation.currency,
      },
    });
  } catch (error) {
    console.error("[booking/payments/intent POST]", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Error al crear PaymentIntent" }, { status: 500 });
  }
}
