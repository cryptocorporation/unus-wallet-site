"use client";

const outlets = [
  "TechCrunch",
  "Bloomberg",
  "Forbes",
  "CoinDesk",
  "The Block",
  "Decrypt",
  "Wired",
  "Fortune",
  "Reuters",
  "Cointelegraph",
];

export default function FeaturedIn() {
  const loop = [...outlets, ...outlets];

  return (
    <section className="relative py-16 border-y border-fg/8 bg-bg-2/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center text-[11px] uppercase tracking-[0.3em] text-fg-dim mb-8">
          Featured in
        </div>

        <div
          className="relative"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex gap-12 animate-marquee w-max items-center">
            {loop.map((o, i) => (
              <div
                key={`${o}-${i}`}
                className="font-display text-2xl lg:text-3xl font-bold text-fg-dim/80 hover:text-deep transition-colors whitespace-nowrap tracking-tight"
              >
                {o}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
