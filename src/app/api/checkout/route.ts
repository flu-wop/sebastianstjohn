import { NextResponse } from "next/server";
import { BOOK } from "@/content/site";
import { getStripe, siteOrigin } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let edition: unknown;
  try {
    ({ edition } = await req.json());
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Price and shipping rules come from the server's catalog, never from the browser.
  const item = BOOK.editions.find((e) => e.id === edition);
  if (!item) return NextResponse.json({ error: "Unknown edition" }, { status: 400 });

  const origin = siteOrigin(req);
  const stripe = getStripe();

  // Demo mode: no Stripe key yet. Walk the whole flow without moving money.
  if (!stripe) {
    return NextResponse.json({ url: `${origin}/book/success?demo=1&edition=${item.id}` });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: item.cents,
          product_data: {
            name: `${BOOK.title} — ${item.label}`,
            description: item.detail,
            metadata: { edition: item.id },
          },
        },
      },
    ],
    ...(item.ships
      ? {
          shipping_address_collection: { allowed_countries: ["US"] as ("US")[] },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount" as const,
                fixed_amount: { amount: BOOK.shippingCents, currency: "usd" },
                display_name: "Standard shipping (US)",
              },
            },
          ],
          phone_number_collection: { enabled: true },
        }
      : {}),
    metadata: { edition: item.id, product: BOOK.slug },
    success_url: `${origin}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/book?canceled=1`,
  });

  return NextResponse.json({ url: session.url });
}
