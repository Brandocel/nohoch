import type { ReservationAttributionPayload } from "@/features/booking/types/booking.types";

export function buildReservationAttributionPayload(): ReservationAttributionPayload {
  if (typeof window === "undefined") return {};

  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      utmContent: params.get("utm_content") ?? undefined,
      utmTerm: params.get("utm_term") ?? undefined,
      fbclid: params.get("fbclid") ?? undefined,
      ttclid: params.get("ttclid") ?? undefined,
      gclid: params.get("gclid") ?? undefined,
    };
  } catch {
    return {};
  }
}
