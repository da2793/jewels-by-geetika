import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const { amount, currency = "INR", receipt } = await request.json();

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: receipt || `order_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
