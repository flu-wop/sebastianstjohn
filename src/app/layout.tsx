import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PlayerProvider from "@/components/PlayerProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Sebastian St. John — Music Composer", template: "%s — Sebastian St. John" },
  description:
    "Sebastian St. John is a Louisiana-born composer, arranger and orchestrator working across orchestra, theater, dance, film and hip-hop from New Orleans and France.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0b140e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
        />
      </head>
      <body>
        <PlayerProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-brass focus:p-3 focus:text-forest-950">Skip to content</a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
