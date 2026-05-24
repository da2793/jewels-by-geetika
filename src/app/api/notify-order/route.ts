import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["da.2793@yahoo.com", "geetikatyagi75@gmail.com"];

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { order } = await request.json();

    const itemsList = order.items
      .map((item: any) => `• ${item.name} × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString("en-IN")}`)
      .join("\n");

    const paymentMethod = order.payment_method === "cod" ? "Cash on Delivery" : "Prepaid (Razorpay)";

    const emailHtml = `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FDFCFA; border-radius: 12px;">
        <h1 style="color: #111; font-size: 22px; margin-bottom: 4px;">🎉 New Order Received!</h1>
        <p style="color: #3A3A3A; font-size: 14px; margin-bottom: 24px;">A customer just placed an order on Jewels by Geetika.</p>
        
        <div style="background: white; border: 1px solid #E8D9C5; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
          <h2 style="color: #111; font-size: 16px; margin: 0 0 12px;">Order Details</h2>
          <p style="color: #3A3A3A; font-size: 13px; margin: 4px 0;"><strong>Order ID:</strong> ${order.payment_id || "N/A"}</p>
          <p style="color: #3A3A3A; font-size: 13px; margin: 4px 0;"><strong>Payment:</strong> ${paymentMethod}</p>
          <p style="color: #3A3A3A; font-size: 13px; margin: 4px 0;"><strong>Total:</strong> ₹${order.total?.toLocaleString("en-IN")}</p>
          <p style="color: #3A3A3A; font-size: 13px; margin: 4px 0;"><strong>Shipping:</strong> ₹${order.shipping_cost || 0}</p>
        </div>

        <div style="background: white; border: 1px solid #E8D9C5; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
          <h2 style="color: #111; font-size: 16px; margin: 0 0 12px;">Items</h2>
          <pre style="color: #3A3A3A; font-size: 13px; white-space: pre-wrap; margin: 0;">${itemsList}</pre>
        </div>

        <div style="background: white; border: 1px solid #E8D9C5; border-radius: 8px; padding: 20px;">
          <h2 style="color: #111; font-size: 16px; margin: 0 0 12px;">Shipping Address</h2>
          <p style="color: #3A3A3A; font-size: 13px; margin: 4px 0;"><strong>${order.shipping_name}</strong></p>
          <p style="color: #3A3A3A; font-size: 13px; margin: 4px 0;">📞 ${order.shipping_phone}</p>
          <p style="color: #3A3A3A; font-size: 13px; margin: 4px 0;">✉️ ${order.shipping_email || "Not provided"}</p>
          <p style="color: #3A3A3A; font-size: 13px; margin: 4px 0;">${order.shipping_address}</p>
          <p style="color: #3A3A3A; font-size: 13px; margin: 4px 0;">${order.shipping_city}, ${order.shipping_state} - ${order.shipping_pincode}</p>
        </div>

        <p style="color: #787878; font-size: 11px; margin-top: 20px; text-align: center;">
          Manage this order at <a href="https://www.jewelsbygeetika.com/admin" style="color: #C8A84B;">Admin Dashboard</a>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: "Jewels by Geetika <notification@jewelsbygeetika.com>",
      to: ADMIN_EMAILS,
      subject: `🛍️ New Order — ₹${order.total?.toLocaleString("en-IN")} from ${order.shipping_name}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email notification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
