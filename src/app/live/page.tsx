import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ReelGrid from "@/components/ReelGrid";

export const metadata: Metadata = { title: "Live with Alfred Banks" };

const RIDER = [
  "Flute / Piccolo",
  "Contrabassoon",
  "French Horn",
  "Strings: 6. 6. 4. 4. 2",
];

export default function Live() {
  return (
    <>
      <PageHead eyebrow="Book Alfred & Sebastian" title="An experience your audience will talk about">
        What happens when a New Orleans composer and a GRAMMY-nominated New Orleans rapper team up with an orchestra?
      </PageHead>

      <section className="relative mt-0 aspect-[16/7] min-h-64 w-full overflow-hidden">
        <Image src="/img/stage.jpg" alt="Alfred Banks, Sebastian St. John and the Louisiana Philharmonic taking a bow" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 to-transparent" />
      </section>

      <section className="container-narrow mt-16 space-y-6 text-lg text-cream-dim">
        <p>Composer Sebastian St. John and GRAMMY-nominated rapper Alfred Banks have teamed up twice with the GRAMMY-winning Louisiana Philharmonic Orchestra for performances that shattered expectations from the opening note.</p>
        <p>The audience brings together fans of hip-hop, rock, pop, R&amp;B, soundtracks and classical music, many experiencing an orchestra live for the first time. The evenings feel as much like concerts as contemporary orchestral programs: fun, fresh, accessible without compromise.</p>
      </section>

      <section className="container-x mt-20"><ReelGrid /></section>

      <section className="container-x mt-28 grid gap-px border border-forest-600/70 bg-forest-600/70 md:grid-cols-3">
        <div className="bg-forest-900 p-8">
          <p className="eyebrow">Duration</p>
          <p className="mt-3 font-display text-3xl">Flexible, 30 to 45 minutes</p>
          <p className="mt-3 text-sm text-cream-dim">School, community and other outreach initiatives can be discussed. The show is appropriate for all ages.</p>
        </div>
        <div className="bg-forest-900 p-8">
          <p className="eyebrow">Music rental</p>
          <p className="mt-3 font-display text-3xl">Waived with this instrumentation</p>
          <ul className="mt-3 text-sm text-cream-dim">{RIDER.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
        <div className="bg-forest-900 p-8">
          <p className="eyebrow">Artist fee</p>
          <p className="mt-3 font-display text-3xl">Negotiable</p>
          <p className="mt-3 text-sm text-cream-dim">Fees for Alfred, Sebastian, a DJ and an MC. Custom arrangements are welcome.</p>
        </div>
      </section>

      <section className="container-x mt-16 grid items-start gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-4xl">On stage</h2>
          <p className="mt-4 text-cream-dim">Sebastian performs on the glockenspiel, mark tree and a tam-tam (or gong) provided by the orchestra. The DJ brings their own equipment. Tech requirements and a sample stage plot are available on request.</p>
          <Link href="/contact?subject=Book%20Alfred%20%26%20Sebastian" className="btn btn-primary mt-8">Book Alfred &amp; Sebastian</Link>
        </div>
        <div>
          <h2 className="text-4xl">About Alfred Banks</h2>
          <p className="mt-4 text-cream-dim">Multi-award-winning, GRAMMY-nominated New Orleans rapper and singer Alfred Banks has been featured in The Fader, HipHopDX and Okayplayer. His collaboration with The Soul Rebels, “Greatness,” was the televised NCAA tournament anthem in 2019, and “G-Wagon” was selected for Peloton’s 2025 commercial and international campaign. In May 2024 he became the first rapper to play a full set with the LPO.</p>
        </div>
      </section>
    </>
  );
}
