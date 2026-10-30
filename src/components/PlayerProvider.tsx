"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Track } from "@/content/site";

type Ctx = {
  current: Track | null;
  playing: boolean;
  toggle: (t: Track) => void;
  stop: () => void;
};

const PlayerCtx = createContext<Ctx | null>(null);

export function usePlayer() {
  const c = useContext(PlayerCtx);
  if (!c) throw new Error("usePlayer outside provider");
  return c;
}

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    document.documentElement.style.setProperty("--player-h", current ? "4.25rem" : "0px");
  }, [current]);

  const toggle = useCallback((t: Track) => {
    const a = audio.current;
    if (!a) return;
    if (current?.id === t.id) {
      if (a.paused) void a.play();
      else a.pause();
      return;
    }
    a.src = t.src;
    setCurrent(t);
    setPos(0);
    void a.play().catch(() => setPlaying(false));
  }, [current]);

  const stop = useCallback(() => {
    audio.current?.pause();
    setCurrent(null);
    setPlaying(false);
  }, []);

  const value = useMemo(() => ({ current, playing, toggle, stop }), [current, playing, toggle, stop]);

  return (
    <PlayerCtx.Provider value={value}>
      {children}
      <audio
        ref={audio}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setPos(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
      />
      {current && (
        <div
          role="region"
          aria-label="Audio player"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-brass/40 bg-forest-950/95 backdrop-blur"
        >
          <div className="container-x flex h-[4.25rem] items-center gap-4">
            <button
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brass text-brass-lt hover:bg-brass hover:text-forest-950"
              onClick={() => toggle(current)}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3.5" height="12"/><rect x="8.5" y="1" width="3.5" height="12"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1l10 6-10 6z"/></svg>
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg leading-tight">{current.title}</p>
              <p className="truncate text-xs tracking-wider text-mute">{current.credit}</p>
            </div>
            <div className="hidden w-64 items-center gap-3 sm:flex">
              <span className="w-10 text-right text-xs tabular-nums text-mute">{fmt(pos)}</span>
              <input
                type="range"
                aria-label="Seek"
                min={0}
                max={dur || 1}
                step={0.1}
                value={pos}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (audio.current) audio.current.currentTime = v;
                  setPos(v);
                }}
                className="!h-1 !border-0 !bg-forest-600 !p-0 accent-[#c9a45c]"
              />
              <span className="w-10 text-xs tabular-nums text-mute">{fmt(dur)}</span>
            </div>
            <button className="text-xs uppercase tracking-[.2em] text-mute hover:text-cream" onClick={stop} aria-label="Close player">
              Close
            </button>
          </div>
        </div>
      )}
    </PlayerCtx.Provider>
  );
}
