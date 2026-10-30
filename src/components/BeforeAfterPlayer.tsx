"use client";

import type { BeforeAfter, Track } from "@/content/site";
import { usePlayer } from "./PlayerProvider";

function Btn({ t, label }: { t: Track; label: string }) {
  const { current, playing, toggle } = usePlayer();
  const on = current?.id === t.id && playing;
  return (
    <button
      onClick={() => toggle(t)}
      aria-pressed={on}
      className={`btn flex-1 !px-4 ${on ? "bg-brass text-forest-950 border-brass" : label === "After" ? "btn-primary" : "btn-ghost"}`}
    >
      <span aria-hidden>{on ? "❚❚" : "▶"}</span> {label}
    </button>
  );
}

export default function BeforeAfterPlayer({ item }: { item: BeforeAfter }) {
  return (
    <article className="border border-forest-600/70 bg-forest-800/60 p-6 md:p-8">
      <p className="eyebrow">{item.artist}</p>
      <h3 className="mt-2 text-3xl md:text-4xl">{item.song}</h3>
      <div className="mt-6 flex gap-3">
        <Btn t={item.before} label="Before" />
        <Btn t={item.after} label="After" />
      </div>
      <p className="mt-4 text-xs tracking-wide text-mute">Tap Before, then After, to hear what the co-production adds.</p>
    </article>
  );
}
