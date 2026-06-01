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
  const [phone, setPhone] = useState("");
  const [phoneEmail, setPhoneEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp, signInWithGoogle, sendOtp, verifyOtp } = useAuth();
  const router = useRouter();

  const handlePhoneSignup = async () => {
    setError("");

    // Validate email before sending OTP
    if (!otpSent && !phoneEmail.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone.replace(/\s/g, "")}`;

    if (!otpSent) {
      const { error } = await sendOtp(formattedPhone);
      if (error) {
        setError(error);
      } else {
        setOtpSent(true);
      }
    } else {
      const { error } = await verifyOtp(formattedPhone, otp);
      if (error) {
        setError(error);
      } else {
        // Send welcome email
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "welcome",
            data: { name: "", email: phoneEmail },
          }),
        }).catch(() => {});
        router.push("/account");
      }
    }
    setLoading(false);
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
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

  const handleGoogleSignup = async () => {
    setError("");
    const { error } = await signInWithGoogle();
    if (error) setError(error);
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

        <div className="glass-card p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Google */}
          <motion.button
            onClick={handleGoogleSignup}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-cream-400 rounded-full text-charcoal-800 font-medium text-sm hover:border-charcoal-700 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[0.5px] bg-cream-400" />
            <span className="text-charcoal-700 text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-[0.5px] bg-cream-400" />
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-1 bg-cream-200 rounded-full p-1">
            <button
              onClick={() => { setMode("phone"); setError(""); }}
              className={`flex-1 py-2 text-xs uppercase tracking-[0.15em] rounded-full transition-all font-medium ${
                mode === "phone" ? "bg-charcoal-900 text-white" : "text-charcoal-700"
              }`}
            >
              Phone
            </button>
            <button
              onClick={() => { setMode("email"); setError(""); }}
              className={`flex-1 py-2 text-xs uppercase tracking-[0.15em] rounded-full transition-all font-medium ${
                mode === "email" ? "bg-charcoal-900 text-white" : "text-charcoal-700"
              }`}
            >
              Email
            </button>
          </div>

          {/* Phone OTP Signup */}
          {mode === "phone" && (
            <div className="space-y-4">
              {!otpSent ? (
                <>
                  <div>
                    <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={phoneEmail}
                      onChange={(e) => setPhoneEmail(e.target.value)}
                      className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                      Phone Number
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-cream-200 border border-r-0 border-cream-400 rounded-l-xl text-charcoal-700 text-sm">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="flex-1 bg-white border border-cream-400 rounded-r-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                        placeholder="99999 99999"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <motion.button
                    onClick={handlePhoneSignup}
                    disabled={loading || phone.length < 10 || !phoneEmail.trim()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full disabled:opacity-50"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </motion.button>
                </>
              ) : (
                <>
                  <p className="text-charcoal-700 text-sm text-center">
                    OTP sent to +91 {phone}
                  </p>
                  <div>
                    <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors text-center text-2xl tracking-[0.5em]"
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>
                  <motion.button
                    onClick={handlePhoneSignup}
                    disabled={loading || otp.length < 6}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify & Create Account"}
                  </motion.button>
                </>
              )}
            </div>
          )}

          {/* Email Signup */}
          {mode === "email" && (
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
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
            </form>
          )}

          <p className="text-center text-charcoal-700 text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gold-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
