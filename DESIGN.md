# Sebastian St. John: design system and build notes

Prospect demo (pro bono). Next.js 16 App Router, Tailwind 4, Stripe Checkout. Built from the live Squarespace site.

## Palette
| Token | Hex | Use |
|---|---|---|
| forest-950 | #0b140e | hero, header, footer, player bar |
| forest-900 | #101c14 | page background (his #1a281e, deepened) |
| forest-800 | #16241b | cards, inputs |
| forest-600 | #2c4636 | hairlines |
| cream | #f1e9d6 | body text |
| cream-dim / mute | #c9c1ad / #8f9a8c | secondary text, credits |
| brass | #c9a45c (lt #dcbf82) | eyebrows, rules, focus, ghost buttons; sampled from the Greek Owl coin |
| burgundy | #8c1d2a (lt #a9293a) | primary CTAs only; a deepened form of his #cd1821 red |

## Type
- Display: Cormorant Garamond 400/500, tight leading (1.05). Home hero clamps up to 8rem.
- UI/body: Jost (closest free match to his Futura PT). Eyebrows 0.72rem, 0.32em tracking, uppercase.
- Body 17px / 1.7.

## Spacing and layout
- Container 72rem; narrow reading column 46rem; side gutters 1.25rem.
- Section rhythm 7rem (md 10rem) between major sections; cards padded 2rem (md 2.5rem).
- Square corners, 1px hairlines, no shadows except the book cover.
- Motion: one 0.9s rise on page heads; honors prefers-reduced-motion.

## Components
`Nav` (sticky, mobile sheet) · `Footer` (carries "Designed by IN-FLU-ENTIAL") · `PlayerProvider` (one audio element, persistent bottom bar across pages) · `TrackRow` · `BeforeAfterPlayer` (A/B for co-productions) · `ReelGrid` (lazy Instagram embeds with link fallback) · `BookCover` (placeholder) · `BuyPanel` · `ContactForm` · `PageHead`.

## Pages
- `/` hero on the live-stage photo, solo works, LPO feature, current projects, Have a Great Day reels, book teaser, Armstrong quote, CTA.
- `/works` six playable pieces, Symphony No. 1 story, score pages.
- `/collaborations` Before/After players for Dan Mess, Moo Latte, Marc Uddo, plus Insomnia Street.
- `/live` Alfred Banks & Sebastian with the LPO: format, rider, fee, booking CTA.
- `/about` bio, facts, parade photos, Ravel Study Group.
- `/book`, `/book/success` product page and order confirmation.
- `/contact` form (Resend when configured).

## Stripe Checkout
1. `BuyPanel` POSTs `{ edition }` to `/api/checkout`.
2. The route looks the edition up in the server-side catalog (`src/content/site.ts`), so the browser can never set a price, then creates a `mode: "payment"` Checkout Session with inline `price_data`. Print adds US shipping address and phone collection plus a fixed shipping rate.
3. The browser goes to Stripe's hosted page. `success_url` returns to `/book/success?session_id=...`; `cancel_url` returns to `/book?canceled=1`.
4. The success page retrieves the session server-side and only confirms if `payment_status === "paid"`.
5. `/api/webhook` verifies the Stripe signature and is where fulfilment belongs (receipt, print order). Do not rely on the success page for fulfilment.
6. `/api/download` releases `BOOK_DIGITAL_URL` only for a paid digital session.
7. With no `STRIPE_SECRET_KEY` the whole flow runs in demo mode and no money moves.

Go live: set the env vars in `.env.example`, add a webhook endpoint for `checkout.session.completed` pointing at `/api/webhook`, replace the placeholder title, cover and prices, upload the book PDF to private storage.

## Before launch
Remove `robots: noindex` in `src/app/layout.tsx` and `src/app/robots.ts`; self-host the audio (currently streamed from Squarespace's CDN); verify the Resend domain.
