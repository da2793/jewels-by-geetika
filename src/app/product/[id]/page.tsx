"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getProductById, getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="pt-32 pb-16 text-center bg-cream-50 min-h-screen">
        <h1 className="text-3xl font-serif text-charcoal-700 mb-4">
          Product Not Found
        </h1>
        <Link href="/collections" className="text-gold-600 hover:underline">
          ← Back to Collections
        </Link>
      </div>
    );
  }

  const related = getFeaturedProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hi Geetika! I'm interested in the "${product.name}" (₹${product.price.toLocaleString("en-IN")}). Is it available?`
  );

  return (
    <div className="pt-28 pb-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 text-sm text-charcoal-300 mb-8"
        >
          <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-gold-600 transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-charcoal-600">{product.name}</span>
        </motion.div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white shadow-sm">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm text-charcoal-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full">
                  {product.badge}
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex space-x-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-gold-500 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {product.isNew && (
              <span className="inline-block px-3 py-1 bg-gold-600 text-white text-[10px] uppercase tracking-[0.15em] rounded-full mb-4">
                New Arrival
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-serif text-charcoal-800 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-medium text-charcoal-800">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-charcoal-300 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                    {Math.round(
                      ((product.originalPrice - product.price) / product.originalPrice) * 100
                    )}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-charcoal-400 leading-relaxed mb-8 font-light">
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="text-charcoal-700 font-medium uppercase tracking-[0.15em] text-xs mb-4">
                Product Details
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start space-x-3 text-charcoal-400 text-sm font-light">
                    <span className="text-gold-500 mt-0.5">✦</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                onClick={() => product && addToCart(product)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-charcoal-800 text-white font-light uppercase tracking-[0.15em] text-sm hover:bg-gold-600 transition-colors rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Add to Bag</span>
              </motion.button>

              <Link href="/checkout" className="flex-1">
                <motion.span
                  onClick={() => product && addToCart(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-3 px-8 py-4 border border-gold-500 text-gold-700 font-light uppercase tracking-[0.15em] text-sm hover:bg-gold-500/10 transition-all rounded-full cursor-pointer"
                >
                  <span>Buy Now</span>
                </motion.span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-cream-400">
              {[
                { icon: "✦", label: "Hand Curated" },
                { icon: "📦", label: "Secure Packaging" },
                { icon: "💎", label: "Premium Quality" },
              ].map((badge) => (
                <div key={badge.label} className="text-center">
                  <div className="text-xl mb-1">{badge.icon}</div>
                  <div className="text-charcoal-300 text-[10px] uppercase tracking-[0.15em]">
                    {badge.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-serif text-center mb-12 text-charcoal-800"
            >
              You May Also <span className="text-gold-gradient">Love</span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
