"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-block group ${className}`} aria-label="Jewels by Geetika - Home">
      <Image
        src="/logo.png"
        alt="Jewels by Geetika"
        width={200}
        height={60}
        className={`h-14 md:h-16 w-auto object-contain ${
          variant === "light" ? "brightness-0 invert" : ""
        }`}
        priority
      />
    </Link>
  );
}
