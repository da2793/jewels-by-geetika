"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="pt-28 pb-16 bg-cream-50 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-charcoal-700">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

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
              placeholder="••••••••"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-4 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>

          <p className="text-center text-charcoal-700 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-gold-600 font-medium hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
