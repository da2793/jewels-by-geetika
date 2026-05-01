"use client";

const items = [
  "✦ Hand Curated",
  "✦ AD Diamonds",
  "✦ Kundan",
  "✦ Gold Replica",
  "✦ Bridal Sets",
  "✦ Free Shipping",
  "✦ Premium Quality",
  "✦ Imitation Jewellery",
];

export default function MarqueeStrip() {
  return (
    <div className="bg-charcoal-800 py-3 overflow-hidden">
      <div className="marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-cream-200/70 text-[11px] uppercase tracking-[0.3em] mx-8 font-light"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
