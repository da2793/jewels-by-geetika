"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { href: "/collections", label: "Collections", dropdown: [
    { href: "/collections", label: "All Collections" },
    { href: "/collections?category=necklaces", label: "Necklaces" },
    { href: "/collections?category=earrings", label: "Earrings" },
    { href: "/collections?category=rings", label: "Rings" },
    { href: "/collections?category=bracelets", label: "Bracelets" },
    { href: "/collections?category=bridal-sets", label: "Bridal Sets" },
    { href: "/collections?category=anti-tarnish", label: "Anti Tarnish" },
    { href: "/collections?filter=new", label: "New Arrivals" },
  ]},
  { href: "/collections?filter=new", label: "New In" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCart, totalItems } = useCart();
  const { user } = useAuth();
  const { wishlistIds } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-sm"
          : "bg-white/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo variant="dark" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <div key={link.href + link.label} className="relative group">
                <Link
                  href={link.href}
                  className="relative text-charcoal-700 hover:text-gold-600 transition-colors duration-300 text-[13px] uppercase tracking-[0.2em]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-600 transition-all duration-300 group-hover:w-full" />
                </Link>
                {link.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="glass-strong rounded-xl py-3 px-2 min-w-[180px] shadow-lg">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-[12px] uppercase tracking-[0.15em] text-charcoal-700 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <a
              href="/collections"
              className="ml-2 px-6 py-2.5 bg-charcoal-800 text-white text-[12px] uppercase tracking-[0.2em] hover:bg-gold-600 transition-all duration-300 rounded-full"
            >
              Shop Now
            </a>
            <Link
              href={user ? "/account" : "/auth/login"}
              className="relative group ml-2 p-2 text-charcoal-700 hover:text-gold-600 transition-colors"
              aria-label={user ? "My account" : "Sign in"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-charcoal-800 text-white text-[9px] uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Account
              </span>
            </Link>
            <Link
              href="/wishlist"
              className="relative group ml-2 p-2 text-charcoal-700 hover:text-red-400 transition-colors"
              aria-label="Wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistIds.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 text-white text-[10px] font-medium rounded-full flex items-center justify-center"
                >
                  {wishlistIds.length}
                </motion.span>
              )}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-charcoal-800 text-white text-[9px] uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Wishlist
              </span>
            </Link>
            <button
              onClick={openCart}
              className="relative group ml-2 p-2 text-charcoal-700 hover:text-gold-600 transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gold-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-charcoal-800 text-white text-[9px] uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Bag
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col space-y-1.5 p-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-charcoal-700"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[1.5px] bg-charcoal-700"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-charcoal-700"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/98 backdrop-blur-lg border-t border-cream-400"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href + link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-charcoal-800 hover:text-gold-600 text-lg uppercase tracking-[0.15em] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                href="/collections"
                className="block text-center py-3 bg-charcoal-800 text-white uppercase tracking-[0.15em] rounded-full hover:bg-gold-600 transition-all"
              >
                Shop Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
