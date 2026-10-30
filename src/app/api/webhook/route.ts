import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Stripe calls this after payment. The success page is only a courtesy for the buyer;
 * fulfillment (receipt email, print order, bookkeeping) belongs here because this is
 * the one place a payment is confirmed even if the buyer closes the tab.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      // TODO(on signing): send receipt via Resend, record the order, notify Sebastian for print editions.
      console.info("book order paid", session.id, session.metadata?.edition);
    }
  }
  return NextResponse.json({ received: true });
}
