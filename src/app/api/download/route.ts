import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/** Releases the digital edition only for a paid Checkout Session. */
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("session_id");
  const stripe = getStripe();
  const file = process.env.BOOK_DIGITAL_URL;
  if (!id || !stripe) return NextResponse.json({ error: "Not available in demo mode" }, { status: 404 });

  try {
    const s = await stripe.checkout.sessions.retrieve(id);
    if (s.payment_status !== "paid" || s.metadata?.edition !== "digital") {
      return NextResponse.json({ error: "Payment not found" }, { status: 403 });
    }
    if (!file) return NextResponse.json({ error: "File not configured" }, { status: 503 });
    return NextResponse.redirect(file);
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
}
