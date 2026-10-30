export default function PageHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="relative border-b border-forest-600/50 bg-forest-950 pb-14 pt-20 md:pb-20 md:pt-28">
      <div className="container-x reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-cream-dim">{children}</div>}
      </div>
    </section>
  );
}
