"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="product-card glass-card rounded-lg overflow-hidden group cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-500/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-dark-500 text-xs font-bold uppercase tracking-wider">
              {product.badge}
            </div>
          )}
          {product.isNew && !product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-dark-500 text-xs font-bold uppercase tracking-wider">
              New
            </div>
          )}

          {/* Quick View Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            <span className="block text-center py-3 bg-gold-500/90 text-dark-500 text-sm font-semibold uppercase tracking-wider backdrop-blur-sm">
              View Details
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-white/90 font-serif text-lg mb-2 group-hover:text-gold-400 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-gold-400 font-semibold text-lg">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-white/30 line-through text-sm">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
