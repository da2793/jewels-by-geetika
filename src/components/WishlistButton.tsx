"use client";

import { motion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface WishlistButtonProps {
  productId: string;
  size?: "sm" | "md";
  className?: string;
}

export default function WishlistButton({ productId, size = "md", className = "" }: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();
  const active = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push("/auth/login");
      return;
    }
    toggleWishlist(productId);
  };

  const sizeClasses = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      className={`${sizeClasses} rounded-full flex items-center justify-center transition-all duration-300 ${
        active
          ? "bg-red-50 text-red-500"
          : "glass-subtle text-charcoal-700 hover:text-red-400"
      } ${className}`}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        className={iconSize}
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={active ? 0 : 1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </motion.button>
  );
}
