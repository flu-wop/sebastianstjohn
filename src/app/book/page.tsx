import type { Metadata } from "next";
import BookCover from "@/components/BookCover";
import BuyPanel from "@/components/BuyPanel";
import { BOOK } from "@/content/site";

export const metadata: Metadata = { title: "The Book" };

export default async function Book({ searchParams }: { searchParams: Promise<{ canceled?: string }> }) {
  const { canceled } = await searchParams;
  return (
    <section className="container-x pb-8 pt-16 md:pt-24">
      {canceled && (
        <p role="status" className="mb-10 border border-brass/40 bg-forest-800 p-4 text-sm text-cream-dim">
          Checkout was canceled and you have not been charged. Your selection is still here whenever you are ready.
        </p>
      )}
      <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
        <div className="md:sticky md:top-28 md:self-start"><BookCover /></div>
        <div>
          <p className="eyebrow">Demo listing</p>
          <h1 className="mt-4 text-5xl md:text-7xl">{BOOK.title}</h1>
          <p className="mt-2 font-display text-2xl italic text-cream-dim">by {BOOK.author}</p>
          <p className="mt-8 max-w-xl text-lg text-cream-dim">{BOOK.blurb}</p>
          <ul className="mt-8 space-y-2 text-cream-dim">
            {BOOK.bullets.map((b) => (
              <li key={b} className="flex gap-3"><span className="mt-[.7em] h-px w-5 shrink-0 bg-brass" aria-hidden />{b}</li>
            ))}
          </ul>
          <div className="rule my-10" />
          <BuyPanel />
        </div>
      </div>
    </section>
  );
}
