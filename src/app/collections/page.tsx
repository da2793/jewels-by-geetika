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
    <div className="pt-28 pb-16 bg-cream-100 min-h-screen">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 mb-12"
      >
        <span className="text-gold-600 uppercase tracking-[0.3em] text-xs font-light">
          Explore
        </span>
        <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-4 text-charcoal-800">
          Our <span className="italic text-gold-gradient">Collections</span>
        </h1>
        <p className="text-charcoal-400 max-w-lg mx-auto font-light">
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
              className={`px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-full ${
                activeCategory === "all"
                  ? "bg-charcoal-800 text-white"
                  : "bg-white text-charcoal-500 hover:bg-charcoal-50 border border-charcoal-100"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-full ${
                  activeCategory === cat.slug
                    ? "bg-charcoal-800 text-white"
                    : "bg-white text-charcoal-500 hover:bg-charcoal-50 border border-charcoal-100"
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
            className="bg-white border border-charcoal-100 text-charcoal-500 px-4 py-2 text-sm rounded-full focus:outline-none focus:border-gold-400"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
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
            <p className="text-charcoal-300 text-lg font-light">
              No products found in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
