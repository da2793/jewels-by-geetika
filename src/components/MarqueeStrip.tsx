"use client";

const items = [
  "✦ Hand Curated",
  "✦ AD Diamonds",
  "✦ Kundan",
  "✦ Gold Replica",
  "✦ Bridal Sets",
  "✦ Free Shipping",
  "✦ Premium Quality",
  "✦ Hand Curated",
];

export default function MarqueeStrip() {
  return (
    <div className="gradient-gold-soft border-y border-gold-400/15 py-3 overflow-hidden">
      <div className="marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-gold-800 text-[11px] uppercase tracking-[0.3em] mx-8 font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
