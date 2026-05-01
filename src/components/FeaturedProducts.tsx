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
        <span className="text-gold-400 uppercase tracking-[0.3em] text-sm">
          Curated For You
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
          <span className="text-gold-gradient">Featured</span>{" "}
          <span className="text-white/90">Collection</span>
        </h2>
        <div className="w-20 h-[1px] bg-gold-500/50 mx-auto" />
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <Link href="/collections">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 border border-gold-500/50 text-gold-400 font-semibold uppercase tracking-widest text-sm hover:bg-gold-500/10 transition-colors duration-300 cursor-pointer"
          >
            View All Collections →
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
