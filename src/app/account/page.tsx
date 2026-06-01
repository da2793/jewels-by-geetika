"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface Profile {
  full_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
}

export default function AccountPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses">("profile");
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && supabase) {
      // Load profile
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
        .then(({ data }: any) => {
          if (data) {
            setProfile({
              full_name: data.full_name || user.user_metadata?.full_name || "",
              phone: data.phone || user.phone || "",
              email: data.email || user.email || "",
              address: data.address || "",
              city: data.city || "",
              state: data.state || "",
              pincode: data.pincode || "",
            });
          } else {
            setProfile((p) => ({
              ...p,
              full_name: user.user_metadata?.full_name || "",
              phone: user.phone || "",
              email: user.email || "",
            }));
          }
        });

      // Load orders
      supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }: any) => {
          if (data) setOrders(data as Order[]);
        });
    }
  }, [user, supabase]);

  const handleSaveProfile = async () => {
    if (!user || !supabase) return;
    setSaving(true);
    setSaved(false);

    await supabase.from("profiles").upsert({
      id: user.id,
      ...profile,
      updated_at: new Date().toISOString(),
    });

    // Send welcome email if phone user just added their email
    if (profile.email && user.phone && !user.email) {
      const welcomeSentKey = `jbg-welcome-sent-${user.id}`;
      if (!localStorage.getItem(welcomeSentKey)) {
        localStorage.setItem(welcomeSentKey, "true");
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "welcome",
            data: {
              name: profile.full_name || "",
              email: profile.email,
            },
          }),
        }).catch(() => {});
      }
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (authLoading || !user) {
    return (
      <div className="pt-32 pb-16 bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "profile" as const, label: "Profile" },
    { id: "orders" as const, label: "Orders" },
    { id: "addresses" as const, label: "Address" },
  ];

  return (
    <div className="pt-28 pb-16 bg-cream-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-charcoal-900">
              My Account
            </h1>
            <p className="text-charcoal-700 mt-1">{user.email || user.phone}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-charcoal-700 text-sm hover:text-red-500 transition-colors"
          >
            Sign Out
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-cream-200 rounded-full p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.15em] rounded-full transition-all duration-300 font-medium ${
                activeTab === tab.id
                  ? "bg-charcoal-900 text-white"
                  : "text-charcoal-700 hover:text-charcoal-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8"
          >
            <h2 className="font-display text-xl font-bold text-charcoal-900 mb-6">
              Personal Details
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                    Phone
                  </label>
                  {user.phone ? (
                    <input
                      type="tel"
                      value={user.phone}
                      disabled
                      className="w-full bg-cream-200 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 cursor-not-allowed"
                    />
                  ) : (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="+91 99999 99999"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                  Email
                </label>
                {user.email ? (
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full bg-cream-200 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 cursor-not-allowed"
                  />
                ) : (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="Add your email (optional)"
                    className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                )}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <motion.button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="px-8 py-3 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </motion.button>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-sm font-medium"
                  >
                    ✓ Saved
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {orders.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <div className="text-4xl mb-4">✦</div>
                <h3 className="text-xl font-display font-bold text-charcoal-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-charcoal-700 mb-6">
                  Your order history will appear here once you make a purchase.
                </p>
                <Link href="/collections">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    className="inline-block px-8 py-3 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full cursor-pointer"
                  >
                    Start Shopping
                  </motion.span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-charcoal-800 font-medium text-sm">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-charcoal-700 text-xs mt-1">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                          order.status === "delivered"
                            ? "bg-green-50 text-green-700"
                            : order.status === "shipped"
                            ? "bg-blue-50 text-blue-700"
                            : order.status === "confirmed"
                            ? "bg-gold-100 text-gold-700"
                            : "bg-cream-200 text-charcoal-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="border-t border-cream-300 pt-3 flex justify-between items-center">
                      <p className="text-charcoal-700 text-sm">
                        {order.items?.length || 0} item(s)
                      </p>
                      <p className="text-charcoal-900 font-display font-bold text-lg">
                        ₹{order.total?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Address Tab */}
        {activeTab === "addresses" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8"
          >
            <h2 className="font-display text-xl font-bold text-charcoal-900 mb-6">
              Saved Address
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                  placeholder="House no., Street, Locality"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                    State
                  </label>
                  <input
                    type="text"
                    value={profile.state}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-charcoal-800 text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={profile.pincode}
                    onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                    className="w-full bg-white border border-cream-400 rounded-xl px-4 py-3 text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors"
                    maxLength={6}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <motion.button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="px-8 py-3 bg-charcoal-900 text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Address"}
                </motion.button>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-sm font-medium"
                  >
                    ✓ Saved
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
