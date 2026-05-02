"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="pt-28 pb-16 bg-cream-50 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-md mx-4"
        >
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-3">
            Account Created!
          </h2>
          <p className="text-charcoal-700 mb-6">
            Check your email for a confirmation link to activate your account.
          </p>
          <Link href="/auth/login">
            <motion.span
              whileHover={{ scale: 1.03 }}
              className="inline-block px-8 py-3 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full cursor-pointer"
            >
              Go to Login
            </motion.span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 bg-cream-50 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Create Account
          </h1>
          <p className="text-charcoal-700">
            Join Jewels by Geetika
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
              placeholder="Min 6 characters"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-4 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </motion.button>

          <p className="text-center text-charcoal-700 text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gold-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
