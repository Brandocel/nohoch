import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const INAPAM_DISCOUNT_PERCENT = 0.5; // 50 %

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageCode, adults = 0, children = 0, infants = 0, inapamVisitors = 0, couponCode } = body;

    if (!packageCode) {
      return NextResponse.json({ success: false, message: "packageCode es requerido" }, { status: 400 });
    }

    const pkg = await prisma.package.findFirst({
      where: { slug: packageCode.toLowerCase(), isActive: true },
      include: { translations: true },
    });

    if (!pkg) {
      return NextResponse.json({ success: false, message: "Paquete no encontrado" }, { status: 404 });
    }

    // ── Precios en PESOS (como están en la DB) ───────────────────────────────
    const adultPriceMXN  = Number(pkg.price);                                           // e.g. 300.00
    const childPriceMXN  = pkg.childPrice ? Number(pkg.childPrice) : adultPriceMXN;     // e.g. 300.00
    const infantPriceMXN = 0;
    const inapamUnitMXN  = Math.round(adultPriceMXN * INAPAM_DISCOUNT_PERCENT * 100) / 100;

    const regularAdults     = Math.max(adults - inapamVisitors, 0);
    const adultTotal        = regularAdults * adultPriceMXN;
    const inapamTotal       = inapamVisitors * inapamUnitMXN;
    const childTotal        = children * childPriceMXN;
    const subtotalMXN       = adultTotal + inapamTotal + childTotal;
    const inapamDiscountMXN = inapamVisitors * (adultPriceMXN - inapamUnitMXN);

    // Cupón simple: termina en "10" = 10% dto
    let couponDiscountMXN = 0;
    let couponApplied = null;
    if (couponCode && String(couponCode).toUpperCase().endsWith("10")) {
      couponDiscountMXN = Math.round(subtotalMXN * 0.1 * 100) / 100;
      couponApplied = { code: String(couponCode).toUpperCase(), type: "percent", value: 10, scope: "total" };
    }

    const totalMXN = Math.max(subtotalMXN - couponDiscountMXN, 0);
    const locale   = body.lang || "es";
    const trans    = pkg.translations.find((t) => t.locale === locale) ?? pkg.translations[0];

    return NextResponse.json({
      success: true,
      message: "Cotización calculada",
      data: {
        package: {
          id: pkg.id,
          code: pkg.slug.toUpperCase(),
          currency: pkg.currency,
          coverMedia: pkg.coverImage ? { id: pkg.id, url: pkg.coverImage, mimeType: "image/webp" } : null,
        },
        pricing: {
          adultPriceMXN,
          childPriceMXN,
          infantPriceMXN,
          inapamUnitPriceMXN: inapamUnitMXN,
          effectiveAdultUnitPriceMXN: adultPriceMXN,
          inapamPercent: INAPAM_DISCOUNT_PERCENT * 100,
          inapamVisitors,
          inapamDiscountMXN,
          campaignAdultTotalMXN: adultTotal + inapamTotal,
          campaignChildTotalMXN: childTotal,
          campaignInfantTotalMXN: 0,
          campaignDiscountMXN: 0,
          peopleSubtotalMXN: subtotalMXN,
          peopleSubtotalWithCampaignMXN: subtotalMXN,
          extrasMXN: 0,
          subtotalMXN,
          couponDiscountMXN,
          discountMXN: inapamDiscountMXN + couponDiscountMXN,
          totalMXN,
        },
        passengers: {
          adults, children, infants, inapamVisitors,
          payableAdults: adults, payableChildren: children, payableInfants: 0,
        },
        extras: [],
        campaigns: { primaryCampaignCode: null, appliedCampaignCodes: [], appliedCampaigns: [] },
        coupon: couponApplied,
        rules: { order: [], campaignResolvedByBackend: false, couponValidatedAgainstCampaign: false },
        breakdown: {
          basePeopleSubtotalMXN: subtotalMXN,
          peopleSubtotalWithCampaignMXN: subtotalMXN,
          extrasMXN: 0,
          subtotalBeforeDiscountsMXN: subtotalMXN,
          subtotalAfterInapamMXN: subtotalMXN - inapamDiscountMXN,
          totalMXN,
        },
        snapshot: {
          lang: locale,
          name: trans?.name ?? pkg.slug,
          description: trans?.description ?? null,
          includes: trans?.includes ?? [],
          excludes: [], notes: [], ageRules: null,
        },
      },
    });
  } catch (error) {
    console.error("[booking/quote]", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Error al cotizar" }, { status: 500 });
  }
}
