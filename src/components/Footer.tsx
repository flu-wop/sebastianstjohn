import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-forest-600/60 bg-forest-950 pb-[calc(2.5rem+var(--player-h))] pt-16">
      <div className="container-x grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image src="/img/owl.png" alt="" width={72} height={72} className="h-[72px] w-[72px] rounded-full" />
          <p className="mt-5 font-display text-3xl">{SITE.name}</p>
          <p className="mt-1 text-sm text-mute">{SITE.tagline} · {SITE.base}</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2 text-sm text-cream-dim">
          <Link href="/works" className="hover:text-brass-lt">Works</Link>
          <Link href="/collaborations" className="hover:text-brass-lt">Collaborations</Link>
          <Link href="/live" className="hover:text-brass-lt">Live with Alfred Banks</Link>
          <Link href="/about" className="hover:text-brass-lt">About</Link>
          <Link href="/book" className="hover:text-brass-lt">Book</Link>
          <Link href="/contact" className="hover:text-brass-lt">Contact</Link>
        </nav>
        <div className="text-sm text-cream-dim">
          <p className="eyebrow mb-3">Elsewhere</p>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-brass-lt">Instagram @SpeedUpTheTV</a>
          <a href={SITE.spotify} target="_blank" rel="noopener noreferrer" className="block hover:text-brass-lt">Spotify</a>
        </div>
      </div>
      <div className="container-x mt-14 flex flex-col gap-3 border-t border-forest-600/40 pt-6 text-xs tracking-wide text-mute sm:flex-row sm:justify-between">
        <span>&copy; {new Date().getFullYear()} Sebastian St. John</span>
        <a href="https://in-flu-ential.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-brass-lt">
          Designed by IN-FLU-ENTIAL
        </a>
      </div>
    </footer>
  );
}
