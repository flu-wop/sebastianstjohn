import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = { title: "About" };

const FACTS = [
  ["Born", "Lafayette, La."],
  ["Raised", "California, Florida, Louisiana, Ohio & Texas"],
  ["Educated", "Cincinnati Conservatory of Music, Tour Buses & Cadillacs"],
  ["Lived & worked", "United States, France & Greece"],
];

export default function About() {
  return (
    <>
      <PageHead eyebrow="Composer, arranger, orchestrator" title="About Sebastian" />

      <section className="container-x mt-16 grid gap-14 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-20">
        <div>
          <Image src="/img/portrait.jpg" alt="Black and white portrait of Sebastian St. John" width={524} height={698} className="h-auto w-full border border-forest-600/70" priority />
          <dl className="mt-8 space-y-4">
            {FACTS.map(([k, v]) => (
              <div key={k} className="border-t border-forest-600/70 pt-3">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-1 text-cream-dim">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-6 text-lg text-cream-dim">
          <p className="font-display text-3xl leading-snug text-cream md:text-4xl">Sebastian is a Louisiana-born composer with expertise spanning classical composition, music for media, contemporary and ancient genres, and cross-cultural musical projects.</p>
          <p>He works with artists across pop, rock, punk, hip-hop, R&amp;B, EDM, folk, theater, dance and film.</p>
          <p>After training at the Cincinnati Conservatory of Music, Sebastian moved to Los Angeles and built a career as a multi-instrumentalist, touring with diverse acts from theater pit orchestras to major touring artists.</p>
          <p>His next move was to Paris, where he founded an innovative social-solidarity project uniting communities through celebration and music. That work led to arranging music for a New Orleans-style parade through Central London and, ultimately, his first composition commission for a Parisian burlesque circus troupe.</p>
          <p>Following two decades focused on performance, Sebastian has recently returned to composition. His works have premiered in Europe and the U.S., and he has collaborated on scores for film, media, theater and dance.</p>
          <p className="font-display text-3xl text-brass-lt">He specializes in collaborative work.</p>
          <Link href="/contact" className="btn btn-primary">Work with Sebastian</Link>
        </div>
      </section>

      <section className="container-x mt-28 grid gap-6 md:grid-cols-2">
        <Image src="/img/parade-elvis.jpg" alt="A costumed parade crew in sequined jumpsuits" width={1600} height={1200} sizes="(min-width:768px) 50vw, 100vw" className="h-auto w-full border border-forest-600/70" />
        <Image src="/img/parade-red.jpg" alt="A parade crew in red jackets and blue shorts with a gold-painted performer" width={1600} height={1208} sizes="(min-width:768px) 50vw, 100vw" className="h-auto w-full border border-forest-600/70" />
      </section>

      <section className="container-narrow mt-28 border border-forest-600/70 bg-forest-800/50 p-8 md:p-12">
        <p className="eyebrow">Community</p>
        <h2 className="mt-3 text-4xl">New Orleans Ravel Study Group</h2>
        <p className="mt-4 text-cream-dim">On hiatus; contact Sebastian if you are interested. A free monthly gathering to talk about music and orchestration, beginning with Ravel’s Daphnis et Chloé Suites. Musicians, producers, engineers and curious listeners are all welcome. Ravel study groups exist in Los Angeles, New York, Chicago, Seattle, Tokyo, Toronto and New Orleans.</p>
        <Link href="/contact?subject=Ravel%20Study%20Group" className="btn btn-ghost mt-6">Ask about the group</Link>
      </section>
    </>
  );
}
