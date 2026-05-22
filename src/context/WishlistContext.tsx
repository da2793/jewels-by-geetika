"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load wishlist from Supabase
  useEffect(() => {
    if (!user) {
      setWishlistIds([]);
      setLoading(false);
      return;
    }

    const loadWishlist = async () => {
      const supabase = createClient();
      if (!supabase) { setLoading(false); return; }

      const { data } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", user.id);

      if (data) {
        setWishlistIds(data.map((item: any) => item.product_id));
      }
      setLoading(false);
    };

    loadWishlist();
  }, [user]);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (!user) return;

      const supabase = createClient();
      if (!supabase) return;

      if (wishlistIds.includes(productId)) {
        // Remove
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
        await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
      } else {
        // Add
        setWishlistIds((prev) => [...prev, productId]);
        await supabase
          .from("wishlist")
          .insert({ user_id: user.id, product_id: productId });
      }
    },
    [user, wishlistIds]
  );

  return (
    <WishlistContext.Provider value={{ wishlistIds, isInWishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
