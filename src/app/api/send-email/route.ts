import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { type, data } = await request.json();

    let emailConfig: { from: string; to: string; replyTo?: string; subject: string; html: string } | null = null;

    switch (type) {
      case "welcome":
        emailConfig = buildWelcomeEmail(data);
        break;
      case "order-confirmation":
        emailConfig = buildOrderConfirmationEmail(data);
        break;
      case "order-shipped":
        emailConfig = buildOrderShippedEmail(data);
        break;
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    if (!emailConfig) {
      return NextResponse.json({ error: "Failed to build email" }, { status: 500 });
    }

    await resend.emails.send(emailConfig);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Send email error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── Welcome Email ──
function buildWelcomeEmail(data: { name: string; email: string }) {
  return {
    from: "Jewels by Geetika <hello@jewelsbygeetika.com>",
    to: data.email,
    replyTo: "contact@jewelsbygeetika.com",
    subject: "Welcome to Jewels by Geetika",
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FDFCFA; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #111; font-size: 24px; margin: 0;">Welcome to Jewels by Geetika</h1>
          <p style="color: #C8A84B; font-size: 13px; letter-spacing: 2px; margin-top: 4px;">LUXURY CURATED JEWELLERY</p>
        </div>
        
        <p style="color: #252525; font-size: 15px; line-height: 1.7;">
          Hi${data.name ? ` ${data.name}` : ""},
        </p>
        <p style="color: #252525; font-size: 15px; line-height: 1.7;">
          Thank you for joining us. We're thrilled to have you as part of the Jewels by Geetika family.
        </p>
        <p style="color: #252525; font-size: 15px; line-height: 1.7;">
          Every piece in our collection is thoughtfully curated with love — designed to make you feel extraordinary. From regal kundan sets to modern statement rings, there's something waiting just for you.
        </p>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://www.jewelsbygeetika.com/collections" style="display: inline-block; padding: 14px 32px; background: #111; color: #fff; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; border-radius: 50px;">
            Explore Collections
          </a>
        </div>

        <p style="color: #252525; font-size: 15px; line-height: 1.7;">
          With love,<br>
          <span style="color: #C8A84B; font-style: italic;">Geetika</span>
        </p>

        <div style="border-top: 1px solid #E8D9C5; margin-top: 32px; padding-top: 16px; text-align: center;">
          <p style="color: #787878; font-size: 11px; margin: 0;">
            <a href="https://www.jewelsbygeetika.com" style="color: #C8A84B; text-decoration: none;">www.jewelsbygeetika.com</a> · 
            <a href="https://www.instagram.com/jewelsbygeetika/" style="color: #C8A84B; text-decoration: none;">@jewelsbygeetika</a>
          </p>
        </div>
      </div>
    `,
  };
}

// ── Order Confirmation Email ──
function buildOrderConfirmationEmail(data: {
  email: string;
  name: string;
  orderId: string;
  total: number;
  shippingCost: number;
  paymentMethod: string;
  items: { name: string; quantity: number; price: number }[];
}) {
  const itemsHtml = data.items
    .map((item) => `<tr><td style="padding: 8px 0; color: #252525; font-size: 14px;">${item.name} × ${item.quantity}</td><td style="padding: 8px 0; color: #252525; font-size: 14px; text-align: right;">₹${(item.price * item.quantity).toLocaleString("en-IN")}</td></tr>`)
    .join("");

  const paymentLabel = data.paymentMethod === "cod" ? "Cash on Delivery" : "Paid Online";

  return {
    from: "Jewels by Geetika <orderconfirmation@jewelsbygeetika.com>",
    to: data.email,
    replyTo: "contact@jewelsbygeetika.com",
    subject: `Order Confirmed — Jewels by Geetika #${data.orderId.slice(0, 8)}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FDFCFA; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #111; font-size: 22px; margin: 0;">Order Confirmed! 🎉</h1>
          <p style="color: #3A3A3A; font-size: 14px; margin-top: 8px;">Thank you for your order, ${data.name}.</p>
        </div>

        <div style="background: white; border: 1px solid #E8D9C5; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
          <p style="color: #787878; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Order Details</p>
          <p style="color: #252525; font-size: 13px; margin: 4px 0;"><strong>Order ID:</strong> #${data.orderId.slice(0, 8)}</p>
          <p style="color: #252525; font-size: 13px; margin: 4px 0;"><strong>Payment:</strong> ${paymentLabel}</p>
        </div>

        <div style="background: white; border: 1px solid #E8D9C5; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
          <p style="color: #787878; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Items</p>
          <table style="width: 100%; border-collapse: collapse;">${itemsHtml}</table>
          <div style="border-top: 1px solid #E8D9C5; margin-top: 12px; padding-top: 12px;">
            <table style="width: 100%;">
              <tr><td style="color: #3A3A3A; font-size: 13px;">Shipping</td><td style="text-align: right; color: #3A3A3A; font-size: 13px;">${data.shippingCost === 0 ? "Free" : "₹" + data.shippingCost}</td></tr>
              <tr><td style="color: #111; font-size: 16px; font-weight: bold; padding-top: 8px;">Total</td><td style="text-align: right; color: #111; font-size: 16px; font-weight: bold; padding-top: 8px;">₹${data.total.toLocaleString("en-IN")}</td></tr>
            </table>
          </div>
        </div>

        <div style="background: #F9F6F1; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 16px;">
          <p style="color: #3A3A3A; font-size: 13px; margin: 0;">
            We're preparing your order with care. You'll receive a shipping confirmation once it's dispatched.
          </p>
        </div>

        <div style="text-align: center; margin: 24px 0;">
          <a href="https://www.jewelsbygeetika.com/account" style="display: inline-block; padding: 12px 28px; background: #111; color: #fff; text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; border-radius: 50px;">
            View My Orders
          </a>
        </div>

        <div style="border-top: 1px solid #E8D9C5; margin-top: 32px; padding-top: 16px; text-align: center;">
          <p style="color: #787878; font-size: 11px;">Need help? Contact us at <a href="mailto:contact@jewelsbygeetika.com" style="color: #C8A84B;">contact@jewelsbygeetika.com</a></p>
        </div>
      </div>
    `,
  };
}

// ── Order Shipped Email ──
function buildOrderShippedEmail(data: {
  email: string;
  name: string;
  orderId: string;
  trackingNumber: string;
  courierPartner: string;
  items: { name: string; quantity: number; price: number }[];
}) {
  const itemsList = data.items
    .map((item) => `• ${item.name} × ${item.quantity}`)
    .join("<br>");

  return {
    from: "Jewels by Geetika <orders@jewelsbygeetika.com>",
    to: data.email,
    replyTo: "contact@jewelsbygeetika.com",
    subject: `Your order has been shipped — #${data.orderId.slice(0, 8)}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FDFCFA; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #111; font-size: 22px; margin: 0;">Your Order is On Its Way! 📦</h1>
          <p style="color: #3A3A3A; font-size: 14px; margin-top: 8px;">Great news, ${data.name}! Your jewellery has been shipped.</p>
        </div>

        <div style="background: white; border: 1px solid #E8D9C5; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
          <p style="color: #787878; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Shipment Details</p>
          <p style="color: #252525; font-size: 13px; margin: 4px 0;"><strong>Order ID:</strong> #${data.orderId.slice(0, 8)}</p>
          <p style="color: #252525; font-size: 13px; margin: 4px 0;"><strong>Courier Partner:</strong> ${data.courierPartner}</p>
          <p style="color: #252525; font-size: 13px; margin: 4px 0;"><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
        </div>

        <div style="background: white; border: 1px solid #E8D9C5; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
          <p style="color: #787878; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Items in this shipment</p>
          <p style="color: #252525; font-size: 13px; line-height: 1.8;">${itemsList}</p>
        </div>

        <div style="background: #F9F6F1; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 16px;">
          <p style="color: #3A3A3A; font-size: 13px; margin: 0;">
            📍 Track your order using the tracking number above on your courier partner's website.
          </p>
        </div>

        <div style="text-align: center; margin: 24px 0;">
          <a href="https://www.jewelsbygeetika.com/account" style="display: inline-block; padding: 12px 28px; background: #111; color: #fff; text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; border-radius: 50px;">
            View My Orders
          </a>
        </div>

        <div style="border-top: 1px solid #E8D9C5; margin-top: 32px; padding-top: 16px; text-align: center;">
          <p style="color: #787878; font-size: 11px;">Need help? Contact us at <a href="mailto:contact@jewelsbygeetika.com" style="color: #C8A84B;">contact@jewelsbygeetika.com</a></p>
        </div>
      </div>
    `,
  };
}
