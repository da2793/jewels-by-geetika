import { createClient } from "@/lib/supabase/client";
import { getStock as getLocalStock } from "@/data/products";

export async function getStock(productId: string): Promise<number> {
  const supabase = createClient();
  if (!supabase) return getLocalStock(productId);

  const { data } = await supabase
    .from("stock")
    .select("quantity")
    .eq("product_id", productId)
    .single();

  // Fall back to local stock if product not in database
  if (!data) return getLocalStock(productId);
  return data.quantity ?? 0;
}

export async function getAllStock(): Promise<Record<string, number>> {
  // Start with local stock as base
  const { products } = await import("@/data/products");
  const localStockLevels: Record<string, number> = {};
  products.forEach((p: any) => {
    localStockLevels[p.id] = getLocalStock(p.id);
  });

  const supabase = createClient();
  if (!supabase) return localStockLevels;

  const { data } = await supabase.from("stock").select("product_id, quantity");

  if (!data) return localStockLevels;

  // Merge: Supabase values override local
  const stockMap: Record<string, number> = { ...localStockLevels };
  data.forEach((item: any) => {
    stockMap[item.product_id] = item.quantity;
  });
  return stockMap;
}

export async function decrementStock(
  items: { productId: string; quantity: number }[]
): Promise<{ success: boolean; failedProduct?: string }> {
  const supabase = createClient();
  if (!supabase) return { success: false, failedProduct: "System error" };

  for (const item of items) {
    const { data } = await supabase.rpc("decrement_stock", {
      p_product_id: item.productId,
      p_quantity: item.quantity,
    });

    if (!data) {
      return { success: false, failedProduct: item.productId };
    }
  }

  return { success: true };
}

export async function validateStock(
  items: { productId: string; quantity: number }[]
): Promise<{ valid: boolean; insufficientProduct?: string; available?: number }> {
  const supabase = createClient();
  if (!supabase) return { valid: false };

  for (const item of items) {
    const { data } = await supabase
      .from("stock")
      .select("quantity")
      .eq("product_id", item.productId)
      .single();

    const available = data?.quantity ?? 0;
    if (available < item.quantity) {
      return { valid: false, insufficientProduct: item.productId, available };
    }
  }

  return { valid: true };
}
