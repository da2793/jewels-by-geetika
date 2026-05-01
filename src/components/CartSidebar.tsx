"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-300">
              <h2 className="font-serif text-xl text-charcoal-800">
                Your Bag{" "}
                <span className="text-charcoal-500 text-sm font-sans font-light">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              </h2>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center text-charcoal-600 hover:text-charcoal-700 transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-4xl mb-4">✦</div>
                  <p className="text-charcoal-600 font-light mb-2">Your bag is empty</p>
                  <p className="text-charcoal-500 text-sm font-light mb-6">
                    Discover our curated collection
                  </p>
                  <button
                    onClick={closeCart}
                    className="text-gold-600 text-sm uppercase tracking-[0.15em] hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-charcoal-700 font-serif text-sm mb-1 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-charcoal-800 font-medium text-sm mb-3">
                          ₹{item.product.price.toLocaleString("en-IN")}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-cream-400 rounded-full">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-charcoal-600 hover:text-charcoal-700 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm text-charcoal-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-charcoal-600 hover:text-charcoal-700 transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-charcoal-500 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-300 px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-500 font-light">Subtotal</span>
                  <span className="text-charcoal-800 font-serif text-lg">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-charcoal-500 text-xs font-light">
                  Shipping calculated at checkout
                </p>
                <Link href="/checkout" onClick={closeCart}>
                  <motion.span
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="block w-full py-4 bg-charcoal-800 text-white text-center font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full cursor-pointer"
                  >
                    Checkout
                  </motion.span>
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-charcoal-600 text-sm font-light hover:text-gold-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
