"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-gold-700 font-medium uppercase tracking-[0.3em] text-xs font-light">
          Curated For You
        </span>
        <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-charcoal-800">
          Featured <span className="text-gold-gradient">Collection</span>
        </h2>
        <div className="w-16 h-[1px] bg-gold-400/40 mx-auto" />
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {featured.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-16"
      >
        <Link href="/collections">
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 border border-charcoal-400 text-charcoal-600 font-light uppercase tracking-[0.2em] text-sm hover:border-gold-500 hover:text-gold-600 transition-all duration-500 cursor-pointer rounded-full"
          >
            View All Collections →
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
