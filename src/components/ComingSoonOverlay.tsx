"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

// Particle data for the overlay
const particles = [
  { x: "10%", y: "15%", size: 3, delay: 0, duration: 7 },
  { x: "25%", y: "70%", size: 2, delay: 1, duration: 6 },
  { x: "40%", y: "20%", size: 4, delay: 0.5, duration: 8 },
  { x: "60%", y: "80%", size: 2, delay: 2, duration: 5 },
  { x: "75%", y: "30%", size: 3, delay: 0.8, duration: 7 },
  { x: "85%", y: "60%", size: 2, delay: 1.5, duration: 6 },
  { x: "50%", y: "45%", size: 3, delay: 0.3, duration: 8 },
  { x: "15%", y: "50%", size: 2, delay: 1.8, duration: 5.5 },
];

export default function ComingSoonOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Blurred background — the actual site shows through */}
      <div className="absolute inset-0 backdrop-blur-md bg-cream-100/70" />

      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold-400/20"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Subtle rotating ring */}
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-gold-400/[0.08] pointer-events-none"
        style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-2xl mx-auto"
      >
        {/* Diamond icon */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              className="mx-auto"
            >
              <path d="M16 14 L24 8 L32 14 L24 38 Z" fill="#B8941F" opacity="0.8" />
              <path d="M16 14 L24 8 L24 38 Z" fill="#C9A84C" opacity="0.6" />
              <circle cx="30" cy="10" r="2" fill="#D4AF37" opacity="0.5" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Brand name */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            <span className="text-gold-gradient italic">Jewels</span>
            <span className="text-charcoal-700 font-light ml-2 text-2xl md:text-3xl">
              by Geetika
            </span>
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-16 h-[1px] gold-shimmer mx-auto rounded-full" />
        </motion.div>

        {/* Main message */}
        <motion.p
          variants={itemVariants}
          className="text-charcoal-500 text-lg md:text-xl font-light leading-relaxed mb-3"
        >
          We&apos;re glad you stumbled across our page
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-serif text-charcoal-800 mb-4"
        >
          Something <span className="text-gold-gradient italic">Beautiful</span> is Brewing
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-charcoal-400 font-light mb-10 leading-relaxed"
        >
          Stay tuned — we&apos;re curating an exquisite collection of hand-picked
          jewellery just for you. Launching soon.
        </motion.p>

        {/* Instagram CTA */}
        <motion.div variants={itemVariants}>
          <a
            href="https://www.instagram.com/jewelsbygeetika/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.span
              whileHover={{ scale: 1.03, boxShadow: "0 10px 40px rgba(184, 148, 31, 0.15)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-charcoal-800 text-white font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors duration-500 cursor-pointer rounded-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>Follow @jewelsbygeetika</span>
            </motion.span>
          </a>
        </motion.div>

        {/* WhatsApp link */}
        <motion.div variants={itemVariants} className="mt-5">
          <a
            href="https://wa.me/919999999999?text=Hi%20Geetika!%20I%20saw%20your%20website%20and%20I%27d%20love%20to%20know%20when%20you%20launch!"
            target="_blank"
            rel="noopener noreferrer"
            className="text-charcoal-400 text-sm font-light hover:text-gold-600 transition-colors inline-flex items-center space-x-2"
          >
            <span>or say hi on WhatsApp</span>
            <span>→</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
