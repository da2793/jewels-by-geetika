"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-cream-100 grid grid-cols-1 lg:grid-cols-2"
    >
      {/* ── LEFT PANEL — Content ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[0.5px] bg-gold-500" />
            <span className="text-gold-600 uppercase tracking-[0.4em] text-[10px] font-light">
              Hand-Curated Jewellery
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.1] mb-5 text-charcoal-800"
          >
            Where{" "}
            <span className="text-gold-gradient italic">Elegance</span>
            <br />
            Meets{" "}
            <span className="text-gold-gradient italic">Craft</span>
          </motion.h1>

          {/* Divider */}
          <motion.div variants={itemVariants}>
            <div className="w-12 h-[0.5px] bg-gold-400/50 mb-5" />
          </motion.div>

          {/* Value Proposition — the missing piece */}
          <motion.p
            variants={itemVariants}
            className="text-charcoal-500 text-sm md:text-base max-w-sm leading-relaxed font-light mb-4"
          >
            Anti-tarnish, everyday jewellery designed for the modern woman —
            AD, kundan &amp; gold replicas that look luxurious without the
            luxury price tag.
          </motion.p>

          {/* Trust line */}
          <motion.p
            variants={itemVariants}
            className="text-charcoal-300 text-xs font-light mb-10 flex items-center gap-2"
          >
            <span className="text-gold-500">✦</span>
            Trusted by 500+ women across India
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Link href="/collections">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-9 py-3.5 bg-charcoal-800 text-white font-light uppercase tracking-[0.2em] text-xs hover:bg-gold-600 transition-colors duration-500 cursor-pointer rounded-full"
              >
                Explore Collection
              </motion.span>
            </Link>
            <Link href="/collections?filter=bestsellers">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-9 py-3.5 border border-charcoal-200 text-charcoal-600 font-light uppercase tracking-[0.2em] text-xs hover:border-gold-500 hover:text-gold-600 transition-all duration-500 cursor-pointer rounded-full"
              >
                Shop Bestsellers
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── RIGHT PANEL — Image ── */}
      <div className="relative hidden lg:block overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-[-5%]"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=1200&h=1400&fit=crop')",
            }}
          />
        </motion.div>

        {/* Left-edge fade to cream */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-100/10 to-transparent pointer-events-none z-10" />

        {/* Floating price badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-12 right-8 z-20 bg-white/90 backdrop-blur-md border border-gold-200/50 rounded-2xl px-5 py-4 shadow-sm"
        >
          <p className="text-[9px] uppercase tracking-[0.25em] text-charcoal-300 mb-1">
            Bestseller
          </p>
          <p className="font-serif text-xl text-charcoal-800 leading-none">
            ₹2,499
          </p>
          <p className="text-xs text-charcoal-400 mt-1 font-light">
            Kundan Choker Set
          </p>
        </motion.div>

        {/* New Arrivals tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute top-12 right-8 z-20"
        >
          <span className="bg-gold-600 text-white text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-full font-medium">
            New Arrivals
          </span>
        </motion.div>
      </div>

      {/* ── MOBILE BACKGROUND ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 lg:hidden -z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=1200&h=1400&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/70 via-cream-100/50 to-cream-100" />
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 lg:left-[25%]"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-charcoal-300 text-[9px] uppercase tracking-[0.35em]">
            Scroll
          </span>
          <div className="w-[0.5px] h-8 bg-gradient-to-b from-gold-400/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
