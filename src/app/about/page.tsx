"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const values = [
  {
    icon: "✦",
    title: "Hand Curated",
    description:
      "Every piece is personally selected and quality-checked to ensure it meets our standards of excellence.",
  },
  {
    icon: "💎",
    title: "Premium Quality",
    description:
      "We use the finest AD stones, kundan, and gold plating to create jewellery that looks and feels luxurious.",
  },
  {
    icon: "🎨",
    title: "Unique Designs",
    description:
      "From traditional to contemporary, our collection features designs you won't find anywhere else.",
  },
  {
    icon: "💰",
    title: "Affordable Luxury",
    description:
      "Experience the beauty of fine jewellery without the fine jewellery price tag.",
  },
];

const process = [
  {
    step: "01",
    title: "Design & Source",
    description:
      "We scout the latest trends and traditional designs, sourcing the finest materials from trusted artisans.",
  },
  {
    step: "02",
    title: "Quality Check",
    description:
      "Every piece undergoes rigorous quality inspection — checking stones, plating, finish, and durability.",
  },
  {
    step: "03",
    title: "Curate & Style",
    description:
      "We photograph each piece beautifully and style it to help you envision how it completes your look.",
  },
  {
    step: "04",
    title: "Deliver with Love",
    description:
      "Carefully packaged in premium boxes, your jewellery arrives ready to make you shine.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=1920&h=1080&fit=crop"
            alt="About Jewels by Geetika"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark-500/75" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold-400 uppercase tracking-[0.3em] text-sm"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-serif font-bold mt-4"
          >
            <span className="text-white/90">About </span>
            <span className="text-gold-gradient">Geetika</span>
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop"
                alt="Geetika - Founder"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-500/50 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                <span className="text-gold-gradient">A Passion</span>
                <br />
                <span className="text-white/90">Turned Purpose</span>
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  Jewels by Geetika started with a simple belief — that every
                  woman deserves to feel beautiful and confident, and that
                  stunning jewellery shouldn&apos;t come with a stunning price tag.
                </p>
                <p>
                  What began as a personal passion for collecting and styling
                  jewellery has grown into a curated collection loved by hundreds
                  of women across India. Each piece is handpicked for its
                  craftsmanship, design, and ability to make you feel special.
                </p>
                <p>
                  From AD diamond pieces that sparkle like the real thing, to
                  kundan sets that carry the weight of tradition, to gold
                  replicas that exude timeless elegance — every item in our
                  collection tells a story.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold-400 uppercase tracking-[0.3em] text-sm">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">
              <span className="text-white/90">Our </span>
              <span className="text-gold-gradient">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-lg p-8 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-white/90 font-serif text-xl mb-3">
                  {value.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold-400 uppercase tracking-[0.3em] text-sm">
              Behind The Scenes
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">
              <span className="text-white/90">Our </span>
              <span className="text-gold-gradient">Process</span>
            </h2>
          </motion.div>

          <div className="space-y-12">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-start space-x-8"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full border border-gold-500/30 flex items-center justify-center">
                  <span className="text-gold-400 font-serif text-xl font-bold">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-white/90 font-serif text-2xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
