"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const primaryColor = variant === "dark" ? "#1a1a1a" : "#ffffff";
  const accentColor = "#B8941F";

  return (
    <Link href="/" className={`inline-block ${className}`} aria-label="Jewels by Geetika - Home">
      <svg
        width="200"
        height="48"
        viewBox="0 0 200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Diamond icon */}
        <path
          d="M16 8 L24 4 L32 8 L24 28 Z"
          fill={accentColor}
          opacity="0.9"
        />
        <path
          d="M16 8 L24 4 L24 28 Z"
          fill={accentColor}
          opacity="0.7"
        />
        {/* Small sparkle */}
        <circle cx="28" cy="6" r="1" fill={accentColor} opacity="0.6" />
        
        {/* "Jewels" text - elegant serif */}
        <text
          x="40"
          y="22"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="20"
          fontWeight="700"
          fontStyle="italic"
          fill={accentColor}
          letterSpacing="1"
        >
          Jewels
        </text>
        
        {/* "by Geetika" text - light sans */}
        <text
          x="40"
          y="38"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="11"
          fontWeight="300"
          fill={primaryColor}
          opacity="0.7"
          letterSpacing="3"
        >
          by Geetika
        </text>

        {/* Decorative line */}
        <line
          x1="40"
          y1="26"
          x2="105"
          y2="26"
          stroke={accentColor}
          strokeWidth="0.5"
          opacity="0.4"
        />
      </svg>
    </Link>
  );
}
