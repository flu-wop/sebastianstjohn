import { REELS } from "@/content/site";

export default function ReelGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {REELS.map((r) => (
        <li key={r.id}>
          <div className="aspect-[9/14] w-full overflow-hidden border border-forest-600/70 bg-forest-950">
            <iframe
              src={`https://www.instagram.com/reel/${r.id}/embed`}
              title={r.label}
              loading="lazy"
              className="h-full w-full"
              allow="encrypted-media; fullscreen"
            />
          </div>
          <p className="mt-3 text-sm leading-snug text-cream-dim">{r.label}</p>
          <a href={`https://www.instagram.com/reel/${r.id}/`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs uppercase tracking-[.2em] text-brass hover:text-brass-lt">Watch on Instagram</a>
        </li>
      ))}
    </ul>
  );
}
