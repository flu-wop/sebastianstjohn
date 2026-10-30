import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import BeforeAfterPlayer from "@/components/BeforeAfterPlayer";
import TrackRow from "@/components/TrackRow";
import { CO_PRODUCTIONS, INSOMNIA } from "@/content/site";

export const metadata: Metadata = { title: "Collaborations" };

export default function Collabs() {
  return (
    <>
      <PageHead eyebrow="Recent co-productions" title="Collaborations">
        Sebastian specializes in collaborative work. Hear a producer’s track as it arrived, then after Sebastian’s arrangement, orchestration and live parts.
      </PageHead>

      <section className="container-x mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CO_PRODUCTIONS.map((c) => <BeforeAfterPlayer key={c.id} item={c} />)}
      </section>

      <section className="container-x mt-16">
        <ul className="border-t border-forest-600/70"><TrackRow track={INSOMNIA} /></ul>
      </section>

      <section className="container-x mt-28 grid items-center gap-12 md:grid-cols-2">
        <Image src="/img/peaches.jpg" alt="Alfred Banks and Sebastian St. John outside Peaches Records, New Orleans" width={673} height={894} className="mx-auto h-auto w-full max-w-sm border border-forest-600/70" />
        <div>
          <p className="eyebrow">Hip-hop × orchestra</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Alfred Banks</h2>
          <p className="mt-4 text-cream-dim">Sebastian produced, composed, arranged, orchestrated and performed on the live recording with Alfred Banks and the Louisiana Philharmonic Orchestra, featuring Pell, Kaye the Beast and DJ Novi.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/live" className="btn btn-primary">The live show</Link>
            <Link href="/contact" className="btn btn-ghost">Work with Sebastian</Link>
          </div>
        </div>
      </section>
    </>
  );
}
