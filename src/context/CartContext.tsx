"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { Product } from "@/data/products";
import { createClient } from "@/lib/supabase/client";
import { getAllStock } from "@/lib/stock";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  markCartRecovered: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [stockLevels, setStockLevels] = useState<Record<string, number>>({});
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load stock levels from database
  useEffect(() => {
    getAllStock().then(setStockLevels);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const availableStock = stockLevels[product.id] ?? 0;

      // Don't add if out of stock or at limit
      if (currentQty >= availableStock) {
        return prev;
      }

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsOpen(true);
  }, [stockLevels]);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    const availableStock = stockLevels[productId] ?? 0;
    const cappedQuantity = Math.min(quantity, availableStock);
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: cappedQuantity } : item
      )
    );
  }, [stockLevels]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // ── Abandoned Cart Tracking ──
  // Save cart to database 5 seconds after last change (debounced)
  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    if (items.length === 0) return;

    saveTimeout.current = setTimeout(() => {
      saveCartToDatabase();
    }, 5000);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [items]);

  const saveCartToDatabase = async () => {
    const supabase = createClient();
    if (!supabase) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return; // Only track logged-in users

    const cartData = {
      user_id: session.user.id,
      user_phone: session.user.phone || null,
      user_email: session.user.email || null,
      items: items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      })),
      total: totalPrice,
      last_updated: new Date().toISOString(),
      recovered: false,
    };

    // Upsert — update existing cart or create new one
    const { data: existing } = await supabase
      .from("abandoned_carts")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("recovered", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (existing) {
      await supabase
        .from("abandoned_carts")
        .update(cartData)
        .eq("id", existing.id);
    } else {
      await supabase.from("abandoned_carts").insert(cartData);
    }
  };

  // Mark cart as recovered (called after successful checkout)
  const markCartRecovered = useCallback(async () => {
    const supabase = createClient();
    if (!supabase) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    await supabase
      .from("abandoned_carts")
      .update({ recovered: true })
      .eq("user_id", session.user.id)
      .eq("recovered", false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        markCartRecovered,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
