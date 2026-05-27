export interface PromoCode {
  code: string;
  type: "percentage" | "flat";
  value: number; // percentage (10 = 10%) or flat amount in ₹
  minOrder?: number;
  maxDiscount?: number; // cap for percentage discounts
  firstTimeOnly?: boolean;
  active: boolean;
}

const promoCodes: PromoCode[] = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrder: 0,
    maxDiscount: 500,
    firstTimeOnly: true,
    active: true,
  },
];

export function validatePromoCode(
  code: string,
  orderTotal: number,
  hasOrderHistory: boolean
): { valid: boolean; error?: string; discount?: number; promoCode?: PromoCode } {
  const promo = promoCodes.find(
    (p) => p.code.toUpperCase() === code.trim().toUpperCase() && p.active
  );

  if (!promo) {
    return { valid: false, error: "Invalid promo code" };
  }

  if (promo.firstTimeOnly && hasOrderHistory) {
    return { valid: false, error: "This code is only valid for first-time orders" };
  }

  if (promo.minOrder && orderTotal < promo.minOrder) {
    return { valid: false, error: `Minimum order of ₹${promo.minOrder} required` };
  }

  let discount = 0;
  if (promo.type === "percentage") {
    discount = Math.round((orderTotal * promo.value) / 100);
    if (promo.maxDiscount && discount > promo.maxDiscount) {
      discount = promo.maxDiscount;
    }
  } else {
    discount = promo.value;
  }

  return { valid: true, discount, promoCode: promo };
}
