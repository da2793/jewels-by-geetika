"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-cream-100">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/40 via-cream-100/20 to-cream-100" />
        <div className="absolute inset-0 bg-white/30" />
      </motion.div>

      {/* Floating decorative elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gold-400/20"
          style={{
            left: `${10 + i * 20}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7,
          }}
        />
      ))}

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <span className="text-gold-600 uppercase tracking-[0.4em] text-xs md:text-sm font-sans font-light">
            Hand-Curated Jewellery
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-[1.1]"
        >
          <span className="text-charcoal-800">Where </span>
          <span className="text-gold-gradient italic">Elegance</span>
          <br />
          <span className="text-charcoal-800">Meets </span>
          <span className="text-gold-gradient italic">Craft</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-charcoal-400 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light"
        >
          Exquisite AD, kundan &amp; gold replica jewellery — each piece
          hand-curated to bring timeless beauty to your everyday moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/collections">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-10 py-4 bg-charcoal-800 text-white font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors duration-500 cursor-pointer rounded-full"
            >
              Explore Collections
            </motion.span>
          </Link>
          <Link href="/about">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-10 py-4 border border-charcoal-300 text-charcoal-600 font-light uppercase tracking-[0.2em] text-sm hover:border-gold-500 hover:text-gold-600 transition-all duration-500 cursor-pointer rounded-full"
            >
              Our Story
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-charcoal-300 text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold-400/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
