"use client";

import type { Track } from "@/content/site";
import { usePlayer } from "./PlayerProvider";

export default function TrackRow({ track, index }: { track: Track; index?: number }) {
  const { current, playing, toggle } = usePlayer();
  const active = current?.id === track.id;
  const on = active && playing;
  return (
    <li className="border-b border-forest-600/70">
      <button
        onClick={() => toggle(track)}
        aria-pressed={on}
        aria-label={`${on ? "Pause" : "Play"} ${track.title}`}
        className="group flex w-full items-center gap-5 py-5 text-left"
      >
        <span className="w-8 shrink-0 font-display text-2xl text-brass/70 tabular-nums">
          {index !== undefined ? String(index + 1).padStart(2, "0") : ""}
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block font-display text-2xl leading-tight transition-colors md:text-3xl ${active ? "text-brass-lt" : "group-hover:text-brass-lt"}`}>
            {track.title}
          </span>
          <span className="mt-1 block text-sm tracking-wide text-mute">{track.credit}</span>
          {track.note && <span className="mt-2 block max-w-xl text-sm text-cream-dim">{track.note}</span>}
        </span>
        <span
          aria-hidden
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors ${on ? "border-brass bg-brass text-forest-950" : "border-brass/60 text-brass-lt group-hover:border-brass group-hover:bg-brass group-hover:text-forest-950"}`}
        >
          {on ? (
            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3.5" height="12"/><rect x="8.5" y="1" width="3.5" height="12"/></svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1l10 6-10 6z"/></svg>
          )}
        </span>
      </button>
    </li>
  );
}
