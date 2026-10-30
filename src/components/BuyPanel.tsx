"use client";

import { useState } from "react";
import { BOOK, fmt, type EditionId } from "@/content/site";

export default function BuyPanel() {
  const [edition, setEdition] = useState<EditionId>("digital");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const chosen = BOOK.editions.find((e) => e.id === edition)!;

  async function buy() {
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edition }),
      });
      const j = await r.json();
      if (!r.ok || !j.url) throw new Error();
      window.location.assign(j.url);
    } catch {
      setErr("Checkout could not start. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div>
      <fieldset>
        <legend className="eyebrow mb-4">Choose an edition</legend>
        <div className="space-y-3">
          {BOOK.editions.map((e) => (
            <label
              key={e.id}
              className={`!mb-0 flex cursor-pointer items-center justify-between gap-4 border p-5 !normal-case !tracking-normal transition-colors ${edition === e.id ? "border-brass bg-forest-800" : "border-forest-600 hover:border-brass/60"}`}
            >
              <span className="flex items-center gap-4">
                <input type="radio" name="edition" value={e.id} checked={edition === e.id} onChange={() => setEdition(e.id)} className="!h-4 !w-4 !p-0 accent-[#c9a45c]" />
                <span>
                  <span className="block font-display text-2xl text-cream">{e.label}</span>
                  <span className="block text-sm text-mute">{e.detail}{e.ships ? ` · + ${fmt(BOOK.shippingCents)} shipping` : ""}</span>
                </span>
              </span>
              <span className="font-display text-3xl text-brass-lt">{fmt(e.cents)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button onClick={buy} disabled={busy} className="btn btn-primary mt-8 w-full">
        {busy ? "Opening secure checkout…" : `Buy now · ${fmt(chosen.cents)}`}
      </button>
      {err && <p role="alert" className="mt-3 text-sm text-burgundy-lt">{err}</p>}
      <p className="mt-4 text-xs leading-relaxed text-mute">Payment is handled by Stripe. Card details never touch this site.{chosen.ships ? " Print editions ship within the US; your address is collected at checkout." : " The download link appears right after payment."}</p>
    </div>
  );
}
