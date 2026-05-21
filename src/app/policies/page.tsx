"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const sections = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "cancellation", label: "Cancellation & Refund" },
  { id: "tracking", label: "Order Tracking" },
  { id: "packaging", label: "Packaging" },
  { id: "unboxing", label: "Unboxing Policy" },
  { id: "security", label: "Payment Security" },
];

export default function PoliciesPage() {
  const [activeSection, setActiveSection] = useState("shipping");

  return (
    <div className="pt-28 pb-16 bg-cream-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-gold-600 font-bold uppercase tracking-[0.3em] text-xs">
            Transparency First
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-4 text-charcoal-900">
            Shipping &amp; <span className="text-gold-gradient">Payment</span> Policy
          </h1>
          <p className="text-charcoal-700 mt-4 max-w-xl mx-auto">
            We want every order to reach you perfectly. Here&apos;s everything you need to know about how we ship, charge, and handle your orders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sticky Table of Contents */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <div className="sticky top-28 space-y-1">
              <p className="text-charcoal-900 font-display font-semibold text-sm mb-4 uppercase tracking-wider">
                Contents
              </p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveSection(section.id)}
                  className={`block py-2 px-3 text-sm rounded-lg transition-all ${
                    activeSection === section.id
                      ? "bg-gold-100 text-gold-700 font-medium"
                      : "text-charcoal-700 hover:text-gold-600 hover:bg-cream-200"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </div>
          </motion.nav>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 space-y-16"
          >
            {/* ── SHIPPING ── */}
            <section id="shipping">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Shipping Across India
              </h2>
              <div className="space-y-4 text-charcoal-700 leading-relaxed">
                <p>
                  Every order is packed with care and shipped in our signature gift-ready packaging. We partner with trusted logistics providers to ensure secure and timely delivery across India.
                </p>
                <p className="text-charcoal-800 font-medium">
                  At present, we do not offer international shipping.
                </p>
              </div>

              {/* Delivery Timelines */}
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                Delivery Timelines
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-cream-200">
                      <th className="text-left py-3 px-4 text-charcoal-800 font-semibold">Order Type</th>
                      <th className="text-left py-3 px-4 text-charcoal-800 font-semibold">Processing</th>
                      <th className="text-left py-3 px-4 text-charcoal-800 font-semibold">Delivery</th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal-700">
                    <tr className="border-b border-cream-300">
                      <td className="py-3 px-4">Standard Orders</td>
                      <td className="py-3 px-4">1–2 business days</td>
                      <td className="py-3 px-4">4–7 business days</td>
                    </tr>
                    <tr className="border-b border-cream-300">
                      <td className="py-3 px-4">Bridal / Custom Orders</td>
                      <td className="py-3 px-4">2–4 business days</td>
                      <td className="py-3 px-4">7–12 business days</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Metro Cities</td>
                      <td className="py-3 px-4">1–2 business days</td>
                      <td className="py-3 px-4">2–4 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="mt-4 space-y-2 text-charcoal-700 text-sm">
                <li>• Business days exclude Sundays and public holidays.</li>
                <li>• Orders placed after 3 PM may be processed on the next business day.</li>
                <li>• During festive periods or wedding season, deliveries may take slightly longer.</li>
              </ul>

              {/* Shipping Charges */}
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                Shipping Charges
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-cream-200">
                      <th className="text-left py-3 px-4 text-charcoal-800 font-semibold">Order Value</th>
                      <th className="text-left py-3 px-4 text-charcoal-800 font-semibold">Shipping Fee</th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal-700">
                    <tr className="border-b border-cream-300">
                      <td className="py-3 px-4">Below ₹799</td>
                      <td className="py-3 px-4">₹79</td>
                    </tr>
                    <tr className="border-b border-cream-300">
                      <td className="py-3 px-4">₹799 – ₹999</td>
                      <td className="py-3 px-4">₹49</td>
                    </tr>
                    <tr className="border-b border-cream-300">
                      <td className="py-3 px-4">₹999 &amp; Above</td>
                      <td className="py-3 px-4 text-gold-700 font-medium">Free Shipping</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Express Shipping</td>
                      <td className="py-3 px-4">₹149 (additional)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="mt-4 space-y-2 text-charcoal-700 text-sm">
                <li>• Free shipping applies automatically at checkout.</li>
                <li>• Express shipping is available for select pincodes and prepaid orders only.</li>
                <li>• Bridal and premium collection orders always qualify for free shipping.</li>
              </ul>

              {/* Address & Delivery Attempts */}
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                Address &amp; Delivery Attempts
              </h3>
              <div className="space-y-3 text-charcoal-700 text-sm">
                <p>Customers are responsible for providing accurate name, mobile number, shipping address, and pincode. Once shipped, address modifications may not always be possible.</p>
                <p>Courier partners generally make 2–3 delivery attempts. Undelivered orders may be returned, and additional shipping charges may apply for re-dispatch.</p>
              </div>

              {/* Delays */}
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                Delays Beyond Our Control
              </h3>
              <p className="text-charcoal-700 text-sm">
                While we strive to deliver within estimated timelines, delays may occur due to weather, logistics disruptions, public holidays, government restrictions, or high order volumes. Jewels by Geetika shall not be held responsible for delays caused by circumstances beyond our control.
              </p>
            </section>

            {/* ── PAYMENT ── */}
            <section id="payment">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Payment Policy
              </h2>
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-4">
                Accepted Payment Methods
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  "Credit Cards (Visa, Mastercard, RuPay, Amex)",
                  "Debit Cards",
                  "UPI (Google Pay, PhonePe, Paytm, BHIM)",
                  "Net Banking",
                  "Wallets",
                ].map((method) => (
                  <div key={method} className="flex items-center gap-2 text-charcoal-700 text-sm">
                    <span className="text-gold-500">✦</span>
                    {method}
                  </div>
                ))}
              </div>
              <p className="text-charcoal-700 text-sm">
                All payments are processed securely through Razorpay-supported payment methods.
              </p>
            </section>

            {/* ── CANCELLATION & REFUND ── */}
            <section id="cancellation">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Order Cancellation &amp; Refund Policy
              </h2>

              <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-4">
                Cancellation Window
              </h3>
              <div className="space-y-3 text-charcoal-700 text-sm">
                <p>
                  Orders can only be cancelled <span className="text-charcoal-900 font-medium">before they are shipped</span>. Once your order has been dispatched and a tracking ID is generated, cancellation is no longer possible.
                </p>
                <div className="bg-cream-200 rounded-xl p-5 mt-4">
                  <p className="text-charcoal-900 font-semibold mb-2">To request a cancellation:</p>
                  <ul className="space-y-1 text-charcoal-700">
                    <li>• Contact us immediately via email at <a href="mailto:contact@jewelsbygeetika.com" className="text-gold-600 font-medium hover:underline">contact@jewelsbygeetika.com</a></li>
                    <li>• Include your Order ID and reason for cancellation</li>
                    <li>• Cancellation requests are processed within 24 hours</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                No Returns or Replacements
              </h3>
              <div className="space-y-3 text-charcoal-700 text-sm">
                <p>
                  Due to the nature of our products, we do <span className="text-charcoal-900 font-medium">not accept returns, exchanges, or replacements</span> once the order has been delivered. All sales are final after dispatch.
                </p>
                <p>
                  We encourage customers to review product details, images, and descriptions carefully before placing an order.
                </p>
              </div>

              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                Refund Timelines
              </h3>
              <div className="space-y-3 text-charcoal-700 text-sm">
                <p>If your cancellation is approved, refunds will be processed as follows:</p>
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-cream-200">
                        <th className="text-left py-3 px-4 text-charcoal-800 font-semibold">Payment Method</th>
                        <th className="text-left py-3 px-4 text-charcoal-800 font-semibold">Refund Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="text-charcoal-700">
                      <tr className="border-b border-cream-300">
                        <td className="py-3 px-4">UPI (Google Pay, PhonePe, etc.)</td>
                        <td className="py-3 px-4">1–3 business days</td>
                      </tr>
                      <tr className="border-b border-cream-300">
                        <td className="py-3 px-4">Debit Card</td>
                        <td className="py-3 px-4">5–7 business days</td>
                      </tr>
                      <tr className="border-b border-cream-300">
                        <td className="py-3 px-4">Credit Card</td>
                        <td className="py-3 px-4">7–10 business days</td>
                      </tr>
                      <tr className="border-b border-cream-300">
                        <td className="py-3 px-4">Net Banking</td>
                        <td className="py-3 px-4">5–7 business days</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Wallets</td>
                        <td className="py-3 px-4">1–3 business days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3">
                  Refunds are credited back to the original payment source. Actual timelines may vary depending on your bank or payment provider.
                </p>
              </div>
            </section>

            {/* ── TRACKING ── */}
            <section id="tracking">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Order Tracking
              </h2>
              <div className="space-y-3 text-charcoal-700 text-sm">
                <p>Once your order is dispatched, you will receive:</p>
                <ul className="space-y-2">
                  <li>• A shipping confirmation email</li>
                  <li>• WhatsApp tracking updates</li>
                  <li>• A live tracking link</li>
                </ul>
                <p className="mt-3">
                  If you do not receive tracking details within 48 hours of placing your order, please contact our support team.
                </p>
              </div>

              {/* Order Confirmation */}
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                Order Confirmation
              </h3>
              <div className="space-y-3 text-charcoal-700 text-sm">
                <p>Once payment is completed, you receive:</p>
                <ul className="space-y-1">
                  <li>• Order confirmation email</li>
                  <li>• WhatsApp confirmation</li>
                  <li>• Invoice/receipt</li>
                </ul>
                <p className="mt-3">
                  If you do not receive confirmation within 1 hour despite payment being deducted, please contact us before placing another order.
                </p>
              </div>
            </section>

            {/* ── PACKAGING ── */}
            <section id="packaging">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Packaging
              </h2>
              <div className="space-y-3 text-charcoal-700 text-sm">
                <p>Every Jewels by Geetika order is carefully packed in:</p>
                <ul className="space-y-2">
                  <li>• Protective jewellery-safe packaging</li>
                  <li>• Tamper-resistant outer packaging</li>
                  <li>• Signature branded box</li>
                </ul>
                <p className="mt-3">
                  Our packaging is designed to ensure your jewellery reaches you safely while also making the experience perfect for gifting.
                </p>
              </div>

              {/* Tampered Packages */}
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                Tampered or Damaged Packages
              </h3>
              <div className="space-y-3 text-charcoal-700 text-sm">
                <p>If your package appears tampered with, damaged, or resealed:</p>
                <ul className="space-y-1">
                  <li>• Please do not accept the delivery</li>
                  <li>• Take photos/videos of the package</li>
                  <li>• Contact us immediately via WhatsApp or email</li>
                </ul>
                <p className="mt-3">
                  Jewels by Geetika is not liable for products accepted in visibly tampered packaging.
                </p>
              </div>
            </section>

            {/* ── UNBOXING POLICY ── */}
            <section id="unboxing">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Unboxing Video Policy
              </h2>
              <div className="space-y-4 text-charcoal-700 text-sm">
                <p>
                  To help us resolve any delivery concerns quickly, we request an unboxing video for all claims related to transit damage, wrong item delivery, or missing products.
                </p>
                <div className="bg-cream-200 rounded-xl p-5">
                  <p className="text-charcoal-900 font-semibold mb-3">The video should:</p>
                  <ul className="space-y-1 text-charcoal-700">
                    <li>• Start before opening the outer package</li>
                    <li>• Clearly show the shipping label</li>
                    <li>• Show all sides of the sealed package</li>
                    <li>• Continue without cuts or pauses</li>
                    <li>• Clearly display the product and contents</li>
                  </ul>
                </div>
                <p>
                  Claims raised without a proper unboxing video may not be eligible for replacement or refund processing. This policy helps us protect customers against courier-related issues.
                </p>
              </div>
            </section>

            {/* ── PAYMENT SECURITY ── */}
            <section id="security">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Payment Security
              </h2>
              <div className="space-y-4 text-charcoal-700 text-sm">
                <p>
                  All transactions are processed through secure and PCI-DSS compliant payment gateways powered by Razorpay. We do not store card details, CVV information, or banking credentials.
                </p>

                <h3 className="text-base font-display font-semibold text-charcoal-900 mt-6">
                  Failed Transactions &amp; Refunds
                </h3>
                <p>
                  If payment is deducted but the order is not confirmed, the amount is generally auto-refunded within 5–7 business days depending on your bank. If delayed, contact us with your Transaction ID and payment screenshot.
                </p>

                <h3 className="text-base font-display font-semibold text-charcoal-900 mt-6">
                  Fraud Prevention
                </h3>
                <p>
                  Jewels by Geetika reserves the right to hold suspicious transactions for verification, request identity confirmation, or cancel orders flagged as high-risk. In such cases, the full amount will be refunded to the original payment source.
                </p>
              </div>

              {/* Pricing */}
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                Pricing
              </h3>
              <p className="text-charcoal-700 text-sm">
                All prices displayed on the website are inclusive of all charges unless stated otherwise. Shipping fees or COD charges, where applicable, will be clearly displayed during checkout.
              </p>

              {/* Bulk Orders */}
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mt-8 mb-4">
                Bulk &amp; Corporate Orders
              </h3>
              <p className="text-charcoal-700 text-sm">
                For wedding gifting, return favours, corporate gifting, or bulk purchases — please contact our support team at{" "}
                <a href="mailto:contact@jewelsbygeetika.com" className="text-gold-600 font-medium hover:underline">
                  contact@jewelsbygeetika.com
                </a>{" "}
                for customized pricing and payment assistance.
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
