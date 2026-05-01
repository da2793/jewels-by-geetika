"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "dark" ? "text-charcoal-700" : "text-white/70";

  return (
    <Link href="/" className={`inline-block group ${className}`} aria-label="Jewels by Geetika - Home">
      <div className="tracking-wider">
        <span className="text-gold-gradient font-display text-2xl md:text-3xl font-semibold">
          Jewels
        </span>
        <span className={`${textColor} text-base md:text-lg font-sans font-light ml-1.5`}>
          by Geetika
        </span>
      </div>
    </Link>
  );
}
