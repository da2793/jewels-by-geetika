"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, Category } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high">("default");

  const filteredProducts = useMemo(() => {
    let filtered =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [activeCategory, sortBy]);

  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 mb-12"
      >
        <span className="text-gold-400 uppercase tracking-[0.3em] text-sm">
          Explore
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold mt-4 mb-4">
          <span className="text-white/90">Our </span>
          <span className="text-gold-gradient">Collections</span>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto">
          Each piece is hand-curated to bring you the finest in imitation
          jewellery. Find your perfect match.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 rounded-sm ${
                activeCategory === "all"
                  ? "bg-gold-500 text-dark-500 font-semibold"
                  : "border border-gold-500/30 text-gold-400/70 hover:border-gold-400 hover:text-gold-400"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 rounded-sm ${
                  activeCategory === cat.slug
                    ? "bg-gold-500 text-dark-500 font-semibold"
                    : "border border-gold-500/30 text-gold-400/70 hover:border-gold-400 hover:text-gold-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-dark-300 border border-gold-500/20 text-white/70 px-4 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-400"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + sortBy}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">
              No products found in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
