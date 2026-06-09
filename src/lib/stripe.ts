import Stripe from "stripe";

const globalForStripe = globalThis as unknown as { stripe?: Stripe };

function createStripeClient() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(secret, { apiVersion: "2026-05-27.dahlia" });
}

export const stripe = globalForStripe.stripe ?? createStripeClient();

if (process.env.NODE_ENV !== "production") {
  globalForStripe.stripe = stripe;
}
