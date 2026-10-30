"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/works", label: "Works" },
  { href: "/collaborations", label: "Collaborations" },
  { href: "/live", label: "Live" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-forest-600/60 bg-forest-950/85 backdrop-blur">
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3" aria-label="Sebastian St. John, home">
          <Image src="/img/owl.png" alt="" width={44} height={44} className="h-11 w-11 rounded-full" priority />
          <span className="font-display text-base tracking-[.12em] uppercase whitespace-nowrap sm:text-2xl sm:tracking-[.18em]">Sebastian St. John</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path.startsWith(l.href) ? "page" : undefined}
              className={`text-[.78rem] uppercase tracking-[.26em] transition-colors hover:text-brass-lt ${path.startsWith(l.href) ? "text-brass-lt" : "text-cream-dim"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-ghost !min-h-10 !px-5">Work with Sebastian</Link>
        </nav>

        <button
          className="grid h-11 w-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-6">
            <span className={`block h-px bg-cream transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`mt-[6px] block h-px bg-cream transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="fixed inset-x-0 top-[var(--nav-h)] bottom-0 z-40 overflow-y-auto bg-forest-950 px-8 pt-10 lg:hidden">
          <ul className="space-y-1">
            {[{ href: "/", label: "Home" }, ...LINKS, { href: "/contact", label: "Contact" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block border-b border-forest-600/60 py-4 font-display text-4xl hover:text-brass-lt">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
