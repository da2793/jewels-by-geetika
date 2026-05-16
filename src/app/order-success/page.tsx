"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");

  return (
    <div className="pt-28 pb-16 bg-cream-50 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-3">
          Order Confirmed!
        </h1>
        <p className="text-charcoal-700 mb-2">
          Thank you for shopping with Jewels by Geetika.
        </p>
        <p className="text-charcoal-700 mb-6">
          Your order has been placed successfully and will be processed shortly.
        </p>

        {paymentId && (
          <p className="text-charcoal-700 text-sm mb-8 bg-cream-200 rounded-xl px-4 py-3">
            Payment ID: <span className="font-mono text-xs">{paymentId}</span>
          </p>
        )}

        <div className="space-y-3">
          <Link href="/account">
            <motion.span
              whileHover={{ scale: 1.03 }}
              className="block w-full py-4 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full cursor-pointer"
            >
              View My Orders
            </motion.span>
          </Link>
          <Link href="/collections">
            <motion.span
              whileHover={{ scale: 1.03 }}
              className="block w-full py-4 border-2 border-charcoal-800 text-charcoal-900 font-medium uppercase tracking-[0.2em] text-sm hover:bg-charcoal-900 hover:text-white transition-all rounded-full cursor-pointer"
            >
              Continue Shopping
            </motion.span>
          </Link>
        </div>

        <p className="text-charcoal-700 text-xs mt-8">
          You&apos;ll receive an order confirmation email shortly.
        </p>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-16 bg-cream-50 min-h-screen flex items-center justify-center">
          <div className="inline-block w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
