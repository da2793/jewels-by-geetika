"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shippingCost = totalPrice >= 1999 ? 0 : 99;
  const orderTotal = totalPrice + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-16 text-center bg-cream-100 min-h-screen">
        <div className="text-5xl mb-4">✦</div>
        <h1 className="text-2xl font-serif text-charcoal-700 mb-3">
          Your bag is empty
        </h1>
        <p className="text-charcoal-400 font-light mb-6">
          Add some beautiful pieces before checking out.
        </p>
        <Link href="/collections">
          <motion.span
            whileHover={{ scale: 1.03 }}
            className="inline-block px-8 py-3 bg-charcoal-800 text-white font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full cursor-pointer"
          >
            Browse Collections
          </motion.span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 bg-cream-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            href="/collections"
            className="text-charcoal-400 text-sm hover:text-gold-600 transition-colors mb-4 inline-block"
          >
            ← Continue Shopping
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif text-charcoal-800">
            Checkout
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Shipping Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-xl text-charcoal-800 mb-6">
                Shipping Details
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full bg-cream-100 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full bg-cream-100 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-cream-100 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-cream-100 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="+91 99999 99999"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    className="w-full bg-cream-100 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors"
                    placeholder="House no., Street, Locality"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="city" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="w-full bg-cream-100 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">
                      State *
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      className="w-full bg-cream-100 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="AN">Andaman and Nicobar Islands</option>
                      <option value="AP">Andhra Pradesh</option>
                      <option value="AR">Arunachal Pradesh</option>
                      <option value="AS">Assam</option>
                      <option value="BR">Bihar</option>
                      <option value="CH">Chandigarh</option>
                      <option value="CT">Chhattisgarh</option>
                      <option value="DL">Delhi</option>
                      <option value="GA">Goa</option>
                      <option value="GJ">Gujarat</option>
                      <option value="HR">Haryana</option>
                      <option value="HP">Himachal Pradesh</option>
                      <option value="JK">Jammu and Kashmir</option>
                      <option value="JH">Jharkhand</option>
                      <option value="KA">Karnataka</option>
                      <option value="KL">Kerala</option>
                      <option value="MP">Madhya Pradesh</option>
                      <option value="MH">Maharashtra</option>
                      <option value="MN">Manipur</option>
                      <option value="ML">Meghalaya</option>
                      <option value="MZ">Mizoram</option>
                      <option value="NL">Nagaland</option>
                      <option value="OR">Odisha</option>
                      <option value="PB">Punjab</option>
                      <option value="RJ">Rajasthan</option>
                      <option value="SK">Sikkim</option>
                      <option value="TN">Tamil Nadu</option>
                      <option value="TG">Telangana</option>
                      <option value="TR">Tripura</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="UT">Uttarakhand</option>
                      <option value="WB">West Bengal</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      required
                      value={form.pincode}
                      onChange={handleChange}
                      className="w-full bg-cream-100 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="110001"
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm sticky top-28">
              <h2 className="font-serif text-xl text-charcoal-800 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-charcoal-700 text-sm font-medium truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-charcoal-400 text-xs font-light">
                        Qty: {item.quantity}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-charcoal-800 text-sm">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-charcoal-300 hover:text-red-400 text-xs transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-cream-300 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-400 font-light">Subtotal</span>
                  <span className="text-charcoal-700">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-400 font-light">Shipping</span>
                  <span className="text-charcoal-700">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-gold-600 font-light">
                    Free shipping on orders above ₹1,999
                  </p>
                )}
                <div className="flex justify-between pt-3 border-t border-cream-300">
                  <span className="text-charcoal-800 font-medium">Total</span>
                  <span className="text-charcoal-800 font-serif text-xl">
                    ₹{orderTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Pay Button — placeholder until Razorpay */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full mt-6 py-4 bg-charcoal-800 text-white font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full"
                onClick={() =>
                  alert(
                    "Payment gateway coming soon! We're setting up Razorpay for secure payments."
                  )
                }
              >
                Pay ₹{orderTotal.toLocaleString("en-IN")}
              </motion.button>

              <p className="text-center text-charcoal-300 text-[10px] mt-3 font-light">
                Secure payment powered by Razorpay (coming soon)
              </p>

              {/* Trust */}
              <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-cream-300">
                {["🔒 Secure", "📦 Tracked", "✦ Curated"].map((t) => (
                  <span key={t} className="text-charcoal-300 text-[10px] uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
