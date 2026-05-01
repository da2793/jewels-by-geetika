"use client";

const items = [
  "✦ Hand Curated",
  "✦ AD Diamonds",
  "✦ Kundan",
  "✦ Gold Replica",
  "✦ Bridal Sets",
  "✦ Free Shipping",
  "✦ Premium Quality",
  "✦ Anti-Tarnish",
];

export default function MarqueeStrip() {
  return (
    <div className="bg-cream-300 border-y border-gold-400/15 py-3 overflow-hidden">
      <div className="marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-gold-700 text-[11px] uppercase tracking-[0.3em] mx-8 font-light"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
