"use client";

import { useState } from "react";

export default function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setState(r.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="border border-brass/50 bg-forest-800/60 p-8">
        <p className="font-display text-4xl">Thank you.</p>
        <p className="mt-3 text-cream-dim">Your message is on its way to Sebastian.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div><label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" /></div>
        <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div>
        <label htmlFor="subject">What are you working on?</label>
        <select id="subject" name="subject" defaultValue={defaultSubject ?? "Composition or arranging"}>
          <option>Composition or arranging</option>
          <option>Orchestration or music direction</option>
          <option>Film, media or theater score</option>
          <option>Co-production</option>
          <option>Book Alfred &amp; Sebastian</option>
          <option>Ravel Study Group</option>
          <option>Vinyl release updates</option>
          <option>Something else</option>
        </select>
      </div>
      <div><label htmlFor="message">Message</label><textarea id="message" name="message" rows={6} required /></div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="!absolute !-left-[9999px] !h-0 !w-0 !p-0 !opacity-0" />
      <button className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
      {state === "error" && <p role="alert" className="text-sm text-burgundy-lt">Something went wrong. Please try again.</p>}
    </form>
  );
}
