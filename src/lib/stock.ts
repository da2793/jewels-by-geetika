import { createClient } from "@/lib/supabase/client";

export async function getStock(productId: string): Promise<number> {
  const supabase = createClient();
  if (!supabase) return 0;

  const { data } = await supabase
    .from("stock")
    .select("quantity")
    .eq("product_id", productId)
    .single();

  return data?.quantity ?? 0;
}

export async function getAllStock(): Promise<Record<string, number>> {
  const supabase = createClient();
  if (!supabase) return {};

  const { data } = await supabase.from("stock").select("product_id, quantity");

  if (!data) return {};

  const stockMap: Record<string, number> = {};
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
