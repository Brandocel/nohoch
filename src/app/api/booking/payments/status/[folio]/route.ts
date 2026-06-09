import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BOOKING_API_URL = process.env.BOOKING_API_URL ?? "";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ folio: string }> }) {
  try {
    const { folio } = await params;
    const res = await fetch(`${BOOKING_API_URL}/booking/payments/status/${encodeURIComponent(folio)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Error al consultar estado de pago" }, { status: 500 });
  }
}
