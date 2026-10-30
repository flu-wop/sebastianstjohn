import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default async function Contact({ searchParams }: { searchParams: Promise<{ subject?: string }> }) {
  const { subject } = await searchParams;
  return (
    <>
      <PageHead eyebrow="You need music" title="Work with Sebastian">
        Tell him about the project. Stay in the loop for the vinyl release, upcoming shows and special events.
      </PageHead>
      <section className="container-x mt-16 grid gap-16 md:grid-cols-[1.4fr_1fr]">
        <ContactForm defaultSubject={subject} />
        <aside className="space-y-6 text-cream-dim">
          <div><p className="eyebrow">Based</p><p className="mt-1 font-display text-3xl text-cream">{SITE.base}</p></div>
          <div><p className="eyebrow">Follow</p>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="mt-1 block hover:text-brass-lt">Instagram @SpeedUpTheTV</a>
            <a href={SITE.spotify} target="_blank" rel="noopener noreferrer" className="block hover:text-brass-lt">Spotify</a>
          </div>
        </aside>
      </section>
    </>
  );
}
