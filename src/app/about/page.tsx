"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const values = [
  { icon: "✦", title: "Hand Curated", description: "Every piece is personally selected and quality-checked to ensure it meets our standards of excellence." },
  { icon: "💎", title: "Premium Quality", description: "We use the finest AD stones, kundan, and gold plating to create jewellery that looks and feels luxurious." },
  { icon: "🎨", title: "Unique Designs", description: "From traditional to contemporary, our collection features designs you won't find anywhere else." },
  { icon: "💰", title: "Affordable Luxury", description: "Experience the beauty of fine jewellery without the fine jewellery price tag." },
];

const processSteps = [
  { step: "01", title: "Design & Source", description: "We scout the latest trends and traditional designs, sourcing the finest materials from trusted artisans." },
  { step: "02", title: "Quality Check", description: "Every piece undergoes rigorous quality inspection — checking stones, plating, finish, and durability." },
  { step: "03", title: "Curate & Style", description: "We photograph each piece beautifully and style it to help you envision how it completes your look." },
  { step: "04", title: "Deliver with Love", description: "Carefully packaged in premium boxes, your jewellery arrives ready to make you shine." },
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
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gold-700 font-medium uppercase tracking-[0.3em] text-xs font-light">Our Story</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl md:text-7xl font-serif mt-4 text-charcoal-800">
            About <span className="text-gold-gradient">Geetika</span>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <Image src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop" alt="Geetika" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-charcoal-800">
              A Passion Turned <span className="text-gold-gradient">Purpose</span>
            </h2>
            <div className="space-y-4 text-charcoal-800 leading-relaxed font-light">
              <p>Jewels by Geetika started with a simple belief — that every woman deserves to feel beautiful and confident, and that stunning jewellery shouldn&apos;t come with a stunning price tag.</p>
              <p>What began as a personal passion for collecting and styling jewellery has grown into a curated collection loved by hundreds of women across India.</p>
              <p>From AD diamond pieces that sparkle like the real thing, to kundan sets that carry the weight of tradition, to gold replicas that exude timeless elegance — every item tells a story.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-300">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-gold-700 font-medium uppercase tracking-[0.3em] text-xs font-light">What We Stand For</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-charcoal-800">Our <span className="text-gold-gradient">Values</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -4 }} className="bg-cream-100 rounded-2xl p-8 text-center transition-all duration-500">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-charcoal-700 font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-charcoal-800 text-sm leading-relaxed font-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-gold-700 font-medium uppercase tracking-[0.3em] text-xs font-light">Behind The Scenes</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-charcoal-800">Our <span className="text-gold-gradient">Process</span></h2>
          </motion.div>
          <div className="space-y-10">
            {processSteps.map((step, index) => (
              <motion.div key={step.step} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-start space-x-8">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white border border-gold-400/30 flex items-center justify-center shadow-sm">
                  <span className="text-gold-600 font-serif text-lg">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-charcoal-700 font-serif text-xl mb-2">{step.title}</h3>
                  <p className="text-charcoal-800 leading-relaxed font-light">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
