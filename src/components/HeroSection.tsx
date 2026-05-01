"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// Stagger container for cinematic entrance
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

// Particle data — varied sizes and positions for depth
const particles = [
  { x: "8%", y: "12%", size: 3, delay: 0, duration: 6 },
  { x: "15%", y: "65%", size: 2, delay: 1.2, duration: 7 },
  { x: "25%", y: "30%", size: 4, delay: 0.5, duration: 5 },
  { x: "35%", y: "75%", size: 2, delay: 2, duration: 8 },
  { x: "50%", y: "18%", size: 3, delay: 0.8, duration: 6 },
  { x: "60%", y: "55%", size: 2, delay: 1.5, duration: 7 },
  { x: "72%", y: "25%", size: 3, delay: 0.3, duration: 5.5 },
  { x: "80%", y: "70%", size: 4, delay: 1, duration: 6.5 },
  { x: "88%", y: "40%", size: 2, delay: 2.2, duration: 7.5 },
  { x: "45%", y: "85%", size: 3, delay: 0.7, duration: 6 },
  { x: "92%", y: "15%", size: 2, delay: 1.8, duration: 5 },
  { x: "5%", y: "45%", size: 3, delay: 0.4, duration: 7 },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -50]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-cream-100"
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
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/50 via-cream-100/20 to-cream-100" />
        <div className="absolute inset-0 bg-white/25" />
      </motion.div>

      {/* Animated gold particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold-400/25"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-8, 8, -8],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Subtle rotating gold ring — decorative, not distracting */}
      <motion.div
        className="absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-gold-400/[0.07] pointer-events-none"
        style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[520px] md:h-[520px] rounded-full border border-dashed border-gold-400/[0.05] pointer-events-none"
        style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      {/* Content with cinematic stagger */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-block text-gold-600 uppercase tracking-[0.4em] text-xs md:text-sm font-sans font-light border-b border-gold-400/30 pb-2">
              Hand-Curated Jewellery
            </span>
          </motion.div>

          {/* Heading — each line staggers in */}
          <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-[1.1]">
            <motion.span variants={itemVariants} className="block">
              <span className="text-charcoal-800">Where </span>
              <span className="text-gold-gradient italic">Elegance</span>
            </motion.span>
            <motion.span variants={itemVariants} className="block">
              <span className="text-charcoal-800">Meets </span>
              <span className="text-gold-gradient italic">Craft</span>
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-charcoal-400 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light"
          >
            Exquisite AD, kundan &amp; gold replica jewellery — each piece
            hand-curated to bring timeless beauty to your everyday moments.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/collections">
              <motion.span
                whileHover={{ scale: 1.03, boxShadow: "0 10px 40px rgba(184, 148, 31, 0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-10 py-4 bg-charcoal-800 text-white font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors duration-500 cursor-pointer rounded-full"
              >
                Explore Collections
              </motion.span>
            </Link>
            <Link href="/collections?category=bridal-sets">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-10 py-4 border border-gold-500/40 text-gold-700 font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-500/10 hover:border-gold-500 transition-all duration-500 cursor-pointer rounded-full"
              >
                Bridal Collection
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
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
