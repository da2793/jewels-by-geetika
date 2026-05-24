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

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-cream-50"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/20 to-white" />
        <div className="absolute inset-0 bg-white/25" />
      </motion.div>

      {/* Content — Centered */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="text-gold-600 font-semibold uppercase tracking-[0.4em] text-xs md:text-sm font-sans">
              Premium Hand-Curated Jewellery
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[1.1] tracking-wide"
          >
            <span className="text-charcoal-900">Where </span>
            <span className="text-gold-gradient">Elegance</span>
            <br />
            <span className="text-charcoal-900">Meets </span>
            <span className="text-gold-gradient">Craft</span>
          </motion.h1>

          {/* Divider */}
          <motion.div variants={itemVariants}>
            <div className="w-12 h-[1px] bg-gold-500 mx-auto mb-6" />
          </motion.div>

          {/* Value Proposition */}
          <motion.p
            variants={itemVariants}
            className="text-charcoal-700 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Thoughtfully curated luxury jewellery for women who love timeless elegance, modern glamour &amp; effortless sophistication.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/collections">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-10 py-4 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors duration-500 cursor-pointer rounded-full"
              >
                Explore Collection
              </motion.span>
            </Link>
            <Link href="/collections?filter=bestsellers">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-10 py-4 border-2 border-charcoal-800 text-charcoal-900 font-medium uppercase tracking-[0.2em] text-sm hover:border-gold-500 hover:text-gold-600 transition-all duration-500 cursor-pointer rounded-full"
              >
                Shop Bestsellers
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  );
}
