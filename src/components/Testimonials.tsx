"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    text: "The kundan set I ordered was absolutely stunning! The quality is unbelievable for the price. Got so many compliments at my cousin's wedding.",
    rating: 5,
    location: "Delhi",
  },
  {
    name: "Ananya Reddy",
    text: "I've been ordering from Jewels by Geetika for months now. Every piece feels premium and the packaging is so beautiful. My go-to for festive jewellery!",
    rating: 5,
    location: "Hyderabad",
  },
  {
    name: "Meera Patel",
    text: "The bridal set exceeded all my expectations. Geetika personally helped me choose the perfect pieces for my engagement. Highly recommend!",
    rating: 5,
    location: "Mumbai",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 uppercase tracking-[0.3em] text-sm">
            Love Letters
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
            <span className="text-white/90">What Our </span>
            <span className="text-gold-gradient">Customers Say</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold-500/50 mx-auto" />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-lg p-8 relative"
            >
              {/* Quote mark */}
              <div className="text-gold-500/20 text-6xl font-serif absolute top-4 right-6">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-gold-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-white/60 leading-relaxed mb-6 text-sm">
                {testimonial.text}
              </p>

              <div>
                <p className="text-white/90 font-semibold">{testimonial.name}</p>
                <p className="text-gold-400/60 text-sm">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
