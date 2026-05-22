"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { wishlistIds, loading: wishlistLoading } = useWishlist();

  if (authLoading || wishlistLoading) {
    return (
      <div className="pt-32 pb-16 bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-32 pb-16 text-center bg-cream-50 min-h-screen">
        <div className="text-5xl mb-4">♡</div>
        <h1 className="text-2xl font-serif text-charcoal-800 mb-3">
          Sign in to view your Wishlist
        </h1>
        <p className="text-charcoal-700 font-light mb-6">
          Save your favourite pieces and come back to them anytime.
        </p>
        <Link href="/auth/login">
          <motion.span
            whileHover={{ scale: 1.03 }}
            className="inline-block px-8 py-3 bg-charcoal-800 text-white font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full cursor-pointer"
          >
            Sign In
          </motion.span>
        </Link>
      </div>
    );
  }

  const wishlistProducts = wishlistIds
    .map((id) => getProductById(id))
    .filter(Boolean);

  return (
    <div className="pt-28 pb-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-gold-700 font-medium uppercase tracking-[0.3em] text-xs">
            Your Favourites
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mt-4 mb-4 text-charcoal-800">
            My <span className="text-gold-gradient">Wishlist</span>
          </h1>
          <p className="text-charcoal-800 font-light">
            {wishlistProducts.length} piece{wishlistProducts.length !== 1 ? "s" : ""} saved
          </p>
        </motion.div>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-5xl mb-4">♡</div>
            <h2 className="text-xl font-serif text-charcoal-800 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-charcoal-700 font-light mb-6">
              Browse our collections and tap the heart to save pieces you love.
            </p>
            <Link href="/collections">
              <motion.span
                whileHover={{ scale: 1.03 }}
                className="inline-block px-8 py-3 bg-charcoal-800 text-white font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full cursor-pointer"
              >
                Browse Collections
              </motion.span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product!.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product!} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
