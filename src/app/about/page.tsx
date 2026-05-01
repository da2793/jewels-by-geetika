"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const values = [
  { icon: "✦", title: "Hand Curated", description: "Every piece is personally selected and quality-checked to ensure it meets our standards of excellence." },
  { icon: "💎", title: "Premium Quality", description: "We use the finest AD stones, kundan, and gold plating to create jewellery that looks and feels luxurious." },
  { icon: "🎨", title: "Unique Designs", description: "From traditional to contemporary, our collection features designs you won't find anywhere else." },
  { icon: "👑", title: "Luxury", description: "Jewellery that makes you feel extraordinary — crafted to look and feel like the real thing." },
];

const promises = [
  {
    title: "Anti-Tarnish Guarantee",
    description: "Every piece is treated to resist tarnishing, so your jewellery stays as beautiful as the day you received it.",
    icon: "🛡️",
  },
  {
    title: "Secure Packaging",
    description: "Each order is carefully wrapped in premium packaging — because the experience of unboxing should feel just as special.",
    icon: "🎁",
  },
  {
    title: "Curated, Not Mass-Produced",
    description: "We don't stock thousands of pieces. Every design is handpicked, ensuring exclusivity and attention to detail.",
    icon: "✦",
  },
  {
    title: "Made for Every Occasion",
    description: "From everyday elegance to bridal grandeur — our collection is designed to be with you through every moment that matters.",
    icon: "💫",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="pt-20 bg-cream-50">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=1920&h=1080&fit=crop" alt="About" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-white/50" />
        </motion.div>
        <div className="relative z-10 text-center px-4">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gold-600 font-bold uppercase tracking-[0.3em] text-xs">Our Story</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl md:text-7xl font-display font-bold mt-4 text-charcoal-900">
            About <span className="text-gold-gradient">Geetika</span>
          </motion.h1>
        </div>
      </section>

      {/* Story — Personal letter from Geetika */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <Image src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop" alt="Geetika" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-charcoal-900">
              A Letter from <span className="text-gold-gradient">Geetika</span>
            </h2>
            <div className="space-y-5 text-charcoal-800 leading-relaxed">
              <p>
                I started this brand with a simple belief — every woman deserves
                to feel beautifully adorned, without compromise.
              </p>
              <p>
                I understand the desire to wear gold at celebrations, to shine in
                diamonds, to feel special on your big day, and to carry elegance
                in everyday moments — without the limitations that often come
                with it.
              </p>
              <p>
                Every piece you see here is thoughtfully chosen with love,
                keeping you in mind — your style, your comfort, and your
                confidence.
              </p>
              <p>
                This isn&apos;t just jewellery, it&apos;s a feeling I want you to
                experience every time you wear it — because you deserve nothing
                less than feeling your absolute best.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-gold-500" />
              <span className="text-gold-600 font-serif text-lg italic">Geetika</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-300">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-gold-600 font-bold uppercase tracking-[0.3em] text-xs">What We Stand For</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 text-charcoal-900">Our <span className="text-gold-gradient">Values</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -4 }} className="bg-white rounded-2xl p-8 text-center transition-all duration-500 shadow-pearl-sm hover:shadow-pearl-md">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-charcoal-900 font-display text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-charcoal-700 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise — replaces Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-gold-600 font-bold uppercase tracking-[0.3em] text-xs">What You Can Expect</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 text-charcoal-900">Our <span className="text-gold-gradient">Promise</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promises.map((promise, index) => (
              <motion.div
                key={promise.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="flex gap-5 p-6 bg-cream-200 rounded-2xl transition-all duration-500 hover:shadow-pearl-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-gold-400/30 flex items-center justify-center text-xl shadow-sm">
                  {promise.icon}
                </div>
                <div>
                  <h3 className="text-charcoal-900 font-display text-lg font-semibold mb-2">{promise.title}</h3>
                  <p className="text-charcoal-700 text-sm leading-relaxed">{promise.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mb-4">
            Ready to Find Your <span className="text-gold-gradient">Perfect Piece</span>?
          </h2>
          <p className="text-charcoal-700 mb-8">
            Explore our hand-curated collection and discover jewellery that speaks to you.
          </p>
          <Link href="/collections">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-10 py-4 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors duration-500 cursor-pointer rounded-full"
            >
              Explore Collections
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
