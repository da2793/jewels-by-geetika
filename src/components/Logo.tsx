"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const subColor = variant === "dark" ? "text-charcoal-800" : "text-white/90";

  return (
    <Link href="/" className={`inline-block group ${className}`} aria-label="Jewels by Geetika - Home">
      <div className="flex flex-col leading-none">
        <span className="text-gold-gradient font-display text-2xl md:text-3xl font-bold tracking-widest">
          JEWELS
        </span>
        <span className={`${subColor} text-[10px] md:text-xs font-sans font-medium tracking-[0.35em] uppercase mt-0.5`}>
          by Geetika
        </span>
      </div>
    </Link>
  );
}
