import Link from "next/link";
import type { Metadata } from "next";
import { BOOK, fmt } from "@/content/site";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Order confirmed" };

type Params = { session_id?: string; demo?: string; edition?: string };

async function load(p: Params) {
  const edition = BOOK.editions.find((e) => e.id === p.edition);
  if (p.demo && edition) {
    return { demo: true as const, edition, email: null, amount: edition.cents + (edition.ships ? BOOK.shippingCents : 0), shipTo: null, sessionId: null };
  }
  const stripe = getStripe();
  if (!stripe || !p.session_id) return null;
  try {
    const s = await stripe.checkout.sessions.retrieve(p.session_id);
    if (s.payment_status !== "paid") return null;
    const ed = BOOK.editions.find((e) => e.id === s.metadata?.edition);
    if (!ed) return null;
    const ship = s.collected_information?.shipping_details;
    return {
      demo: false as const,
      edition: ed,
      email: s.customer_details?.email ?? null,
      amount: s.amount_total ?? ed.cents,
      shipTo: ship ? { name: ship.name, city: ship.address.city, state: ship.address.state } : null,
      sessionId: s.id,
    };
  } catch {
    return null;
  }
}

export default async function Success({ searchParams }: { searchParams: Promise<Params> }) {
  const order = await load(await searchParams);

  if (!order) {
    return (
      <section className="container-narrow py-28 text-center">
        <h1 className="text-5xl">We could not find that order.</h1>
        <p className="mt-4 text-cream-dim">If you were charged, a Stripe receipt is on its way to your email.</p>
        <Link href="/book" className="btn btn-ghost mt-8">Back to the book</Link>
      </section>
    );
  }

  return (
    <section className="container-narrow py-24 text-center md:py-32">
      <p className="eyebrow">{order.demo ? "Demo order" : "Order confirmed"}</p>
      <h1 className="mt-4 text-5xl md:text-7xl">Thank you.</h1>
      <p className="mx-auto mt-6 max-w-lg text-lg text-cream-dim">
        {order.demo
          ? "This is the confirmation buyers see. In the live site this page only appears after Stripe confirms payment."
          : order.email
            ? `A receipt is on its way to ${order.email}.`
            : "A receipt is on its way to your email."}
      </p>

      <dl className="mx-auto mt-12 max-w-md border border-forest-600/70 bg-forest-800/50 text-left">
        <div className="flex justify-between gap-6 border-b border-forest-600/70 p-5"><dt className="text-cream-dim">{BOOK.title}</dt><dd>{order.edition.label}</dd></div>
        <div className="flex justify-between gap-6 border-b border-forest-600/70 p-5"><dt className="text-cream-dim">Total</dt><dd className="font-display text-2xl text-brass-lt">{fmt(order.amount)}</dd></div>
        {order.edition.ships && (
          <div className="p-5 text-sm text-cream-dim">
            {order.shipTo ? `Shipping to ${order.shipTo.name}, ${order.shipTo.city}, ${order.shipTo.state}. ` : ""}
            Shipping updates will arrive by email.
          </div>
        )}
      </dl>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {order.edition.id === "digital" && (
          order.demo
            ? <span className="btn btn-primary cursor-default opacity-70">Download appears here</span>
            : <a href={`/api/download?session_id=${order.sessionId}`} className="btn btn-primary">Download your copy</a>
        )}
        <Link href="/works" className="btn btn-ghost">Keep listening</Link>
      </div>
    </section>
  );
}
