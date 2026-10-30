import Image from "next/image";
import { BOOK } from "@/content/site";

/** Typographic placeholder cover. Replace with the real cover image when supplied. */
export default function BookCover() {
  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-sm bg-forest-950 p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)] ring-1 ring-brass/40">
      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/50 to-transparent" aria-hidden />
      <div className="flex h-full flex-col items-center justify-between border border-brass/50 px-6 py-10 text-center">
        <Image src="/img/owl.png" alt="" width={96} height={96} className="h-24 w-24 rounded-full" />
        <div>
          <p className="font-display text-4xl leading-[1.05]">{BOOK.title}</p>
          <p className="mx-auto mt-4 h-px w-16 bg-brass" />
          <p className="mt-4 text-xs uppercase tracking-[.3em] text-cream-dim">{BOOK.subtitle}</p>
        </div>
        <p className="eyebrow">{BOOK.author}</p>
      </div>
    </div>
  );
}
