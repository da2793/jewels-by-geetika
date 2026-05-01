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
      <div className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
        <span className="text-gold-gradient italic">Jewels</span>
        <span className={`${textColor} text-lg md:text-xl font-light ml-1`}>
          by Geetika
        </span>
      </div>
    </Link>
  );
}
