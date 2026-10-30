import Image from "next/image";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import TrackRow from "@/components/TrackRow";
import { SOLO_TRACKS } from "@/content/site";

export const metadata: Metadata = { title: "Works" };

export default function Works() {
  return (
    <>
      <PageHead eyebrow="Listen" title="Works">
        Compositions, arrangements and orchestral pieces. Press play and keep browsing: the player stays with you.
      </PageHead>

      <section className="container-x mt-16 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        <ul className="border-t border-forest-600/70">
          {SOLO_TRACKS.map((t, i) => <TrackRow key={t.id} track={t} index={i} />)}
        </ul>
        <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
          <div>
            <Image src="/img/mvt3-cover.jpg" alt="Score cover: Symphony No. 1, Movement 3 or 4, by Sebastian St. John" width={658} height={927} className="mx-auto w-64 border border-forest-600/70" />
          </div>
          <div>
            <h2 className="text-3xl">Symphony No. 1, Movement 3 or 4</h2>
            <p className="mt-3 text-cream-dim">Part of a 30-minute symphony in four movements that follows the soul of someone recently passed, from witnessing their own second line to arriving at a final resting place that is either very good or very, very bad. The last two movements are interchangeable, and the soul’s fate is in the hands of the ensemble.</p>
            <p className="mt-3 text-cream-dim">Each instrument family is featured in composed solo sections, set against the power of the full ensemble.</p>
          </div>
        </aside>
      </section>

      <section className="container-x mt-28">
        <p className="eyebrow">On the page</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Scores</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { src: "/img/score-symph.jpg", alt: "Symphony No. 1 full score, first page", w: 1549, h: 961 },
            { src: "/img/score-symph2.jpg", alt: "Symphony No. 1 full score, orchestral page", w: 1522, h: 942 },
            { src: "/img/score-danseur.jpg", alt: "Danseur du Vent score excerpt", w: 1480, h: 881 },
          ].map((s) => (
            <Image key={s.src} src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(min-width:768px) 33vw, 100vw" className="h-auto w-full border border-forest-600/70" />
          ))}
        </div>
      </section>
    </>
  );
}
