"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";

export default function CategoriesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold-600 uppercase tracking-[0.3em] text-xs font-light">
            Browse By
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-charcoal-800">
            Our <span className="italic text-gold-gradient">Categories</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold-400/40 mx-auto" />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link href={`/collections?category=${category.slug}`}>
                <div className="relative group overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/10 transition-colors duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="text-white font-serif text-xl md:text-2xl mb-1 drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm hidden md:block font-light">
                      {category.description}
                    </p>
                    <div className="mt-3 flex items-center text-white/80 text-xs uppercase tracking-[0.15em] font-light">
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
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
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
