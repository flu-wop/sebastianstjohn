import { NextResponse } from "next/server";

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const subject = String(body.subject ?? "").trim().slice(0, 160);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  // Honeypot: bots fill the hidden field. Pretend success.
  if (body.company) return NextResponse.json({ ok: true });
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  // Demo mode: no mail provider configured yet, accept and log nothing sensitive.
  if (!key || !to || !from) return NextResponse.json({ ok: true, demo: true });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `[sebastianstjohn.com] ${subject || "New message"} — ${name}`,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p>${esc(subject)}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!r.ok) return NextResponse.json({ error: "Mail failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
