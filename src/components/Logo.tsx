"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-block ${className}`} aria-label="Jewels by Geetika - Home">
      <Image
        src="/logo.jpeg"
        alt="Jewels by Geetika"
        width={160}
        height={48}
        className={`h-10 md:h-12 w-auto object-contain ${
          variant === "light" ? "brightness-0 invert" : ""
        }`}
        priority
      />
    </Link>
  );
}
