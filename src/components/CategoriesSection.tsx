"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";

export default function CategoriesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-600">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 uppercase tracking-[0.3em] text-sm">
            Browse By
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
            <span className="text-white/90">Our </span>
            <span className="text-gold-gradient">Categories</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold-500/50 mx-auto" />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/collections?category=${category.slug}`}>
                <div className="relative group overflow-hidden rounded-lg aspect-[3/4] cursor-pointer">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-700/90 via-dark-500/30 to-transparent" />
                  <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-serif text-xl md:text-2xl mb-1 group-hover:text-gold-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-white/50 text-sm hidden md:block">
                      {category.description}
                    </p>
                    <motion.div
                      className="mt-3 flex items-center text-gold-400 text-sm uppercase tracking-wider"
                      whileHover={{ x: 5 }}
                    >
                      Explore
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
