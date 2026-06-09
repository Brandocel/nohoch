import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BOOKING_API_URL = process.env.BOOKING_API_URL ?? "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${BOOKING_API_URL}/booking/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Error al crear reservación" }, { status: 500 });
  }
}
