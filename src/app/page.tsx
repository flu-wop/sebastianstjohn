import Image from "next/image";
import Link from "next/link";
import TrackRow from "@/components/TrackRow";
import ReelGrid from "@/components/ReelGrid";
import { BOOK, SITE, SOLO_TRACKS, fmt } from "@/content/site";

const PROJECTS = [
  {
    title: "Live with the Louisiana Philharmonic",
    body: "Mixing and mastering the live recording with rapper Alfred Banks and the Louisiana Philharmonic Orchestra, featuring Pell, Kaye the Beast and DJ Novi. Sebastian produced, composed, arranged, orchestrated and performed. Planned for limited-run vinyl.",
  },
  { title: "New music with Pell", body: "A new collaboration in progress." },
  {
    title: "Mid City Sound sessions",
    body: "Co-production with producers Donald Markowitz and James Afflu (Flu) at Mid City Sound, for artists such as Curren$y and Cyril Neville.",
  },
  { title: "Film and ballet", body: "Scoring an independent short film, with music for a French ballet company to follow." },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-var(--nav-h))] items-end overflow-hidden bg-forest-950">
        <Image src="/img/stage.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/80 via-transparent to-transparent" />
        <div className="container-x reveal pb-16 pt-32 md:pb-24">
          <p className="eyebrow">{SITE.tagline}</p>
          <h1 className="mt-5 text-[clamp(3.25rem,10vw,8rem)]">Sebastian<br />St. John</h1>
          <p className="mt-6 max-w-xl text-lg text-cream-dim md:text-xl">{SITE.lede}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/works" className="btn btn-primary">Listen</Link>
            <Link href="/contact" className="btn btn-ghost">Work with Sebastian</Link>
          </div>
        </div>
      </section>

      <section className="container-x pt-24 md:pt-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 className="mt-3 text-4xl md:text-6xl">Solo works</h2>
            <p className="mt-5 text-cream-dim">From a piece for violin and piano that premiered in Paris, to a symphony movement played by an orchestra and a Beethoven arrangement. Press play.</p>
            <Link href="/works" className="btn btn-ghost mt-8">All works</Link>
          </div>
          <ul className="border-t border-forest-600/70">
            {SOLO_TRACKS.slice(0, 4).map((t, i) => <TrackRow key={t.id} track={t} index={i} />)}
          </ul>
        </div>
      </section>

      <section className="container-x pt-28 md:pt-40">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative aspect-[16/9] overflow-hidden border border-forest-600/70">
            <Image src="/img/crowd.jpg" alt="Audience on their feet at the Alfred Banks and Sebastian St. John concert with the Louisiana Philharmonic" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">Orchestra × hip-hop</p>
            <h2 className="mt-3 text-4xl md:text-6xl">Alfred Banks &amp; Sebastian St. John with the Louisiana Philharmonic</h2>
            <p className="mt-5 text-cream-dim">A New Orleans rapper, a composer and a full orchestra on one stage, twice. For many in the room it was the first time hearing an orchestra live.</p>
            <Link href="/live" className="btn btn-primary mt-8">Book the show</Link>
          </div>
        </div>
      </section>

      <section className="container-x pt-28 md:pt-40">
        <p className="eyebrow">In motion</p>
        <h2 className="mt-3 text-4xl md:text-6xl">Current projects</h2>
        <ul className="mt-12 grid gap-px border border-forest-600/70 bg-forest-600/70 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <li key={p.title} className="bg-forest-900 p-8 md:p-10">
              <h3 className="text-3xl">{p.title}</h3>
              <p className="mt-3 text-cream-dim">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-28 border-y border-forest-600/50 bg-forest-950 py-20 md:mt-40 md:py-28">
        <div className="container-x">
          <p className="eyebrow">Video series with Josh Starkman</p>
          <h2 className="mt-3 text-4xl md:text-6xl">Have a Great Day!</h2>
          <p className="mb-12 mt-4 max-w-2xl text-cream-dim">Sebastian (@SpeedUpTheTV) arranges, composes and performs, from Rage Against the Machine to Berlioz.</p>
          <ReelGrid />
        </div>
      </section>

      <section className="container-x pt-28 md:pt-40">
        <div className="grid items-center gap-12 border border-brass/40 bg-forest-800/50 p-8 md:grid-cols-[auto_1fr_auto] md:gap-14 md:p-14">
          <div className="mx-auto w-44 md:w-52">
            <div className="aspect-[2/3] border border-brass/60 bg-forest-950 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)]">
              <div className="flex h-full flex-col items-center justify-between border border-brass/40 py-5 text-center">
                <Image src="/img/owl.png" alt="" width={56} height={56} className="h-14 w-14 rounded-full" />
                <p className="px-2 font-display text-xl leading-tight">{BOOK.title}</p>
                <p className="eyebrow !text-[.55rem]">{BOOK.author}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow">New</p>
            <h2 className="mt-2 text-4xl md:text-5xl">The book</h2>
            <p className="mt-3 max-w-lg text-cream-dim">{BOOK.blurb}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="font-display text-4xl">from {fmt(BOOK.editions[0].cents)}</p>
            <Link href="/book" className="btn btn-primary mt-4">View book</Link>
          </div>
        </div>
      </section>

      <section className="container-narrow pt-28 text-center md:pt-40">
        <div className="rule mb-12" />
        <blockquote>
          <p className="font-display text-3xl italic leading-snug md:text-5xl">“{SITE.quote}”</p>
          <footer className="eyebrow mt-6">{SITE.quoteBy}</footer>
        </blockquote>
        <p className="mt-16 font-display text-5xl md:text-7xl">You need music.</p>
        <Link href="/contact" className="btn btn-primary mt-8">Work with Sebastian</Link>
      </section>
    </>
  );
}
