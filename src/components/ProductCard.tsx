"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { isInStock } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInStock(product.id)) return;
    addToCart(product);
  };

  const outOfStock = !isInStock(product.id);

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -6 }}
        className="group cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-200 mb-4 shadow-sm">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1.5 glass-subtle text-charcoal-800 text-[10px] font-semibold uppercase tracking-[0.15em]">
              {product.badge}
            </div>
          )}
          {product.isNew && !product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-gold-600 text-white text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full">
              New
            </div>
          )}

          {/* Quick View */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`block w-full text-center py-3 glass-subtle text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                outOfStock
                  ? "text-red-500 cursor-not-allowed"
                  : "text-charcoal-800 hover:bg-charcoal-800 hover:text-white"
              }`}
            >
              {outOfStock ? "Out of Stock" : "Add to Bag"}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="px-1">
          <h3 className="text-charcoal-700 font-serif text-lg mb-1 group-hover:text-gold-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-charcoal-800 font-medium">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-charcoal-700 line-through text-sm">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
