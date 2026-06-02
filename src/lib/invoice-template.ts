export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  orderId: string;
  paymentMethod: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  shipping: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  discount?: number;
  promoCode?: string;
  shippingCost: number;
  codFee?: number;
  total: number;
}

export function generateInvoiceHTML(data: InvoiceData): string {
  const itemsRows = data.items
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>₹${item.price.toLocaleString("en-IN")}</td>
          <td>₹${(item.price * item.quantity).toLocaleString("en-IN")}</td>
        </tr>`
    )
    .join("");

  const paymentBadge =
    data.paymentMethod === "cod"
      ? '<span class="payment-badge badge-cod">COD</span>'
      : '<span class="payment-badge badge-paid">PAID ONLINE</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice ${data.invoiceNumber} - Jewels by Geetika</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Jost', sans-serif; background: #f9f6f1; padding: 40px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .invoice {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      position: relative;
    }
    .invoice::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      height: 350px;
      background-image: url('/logo.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0.15;
      pointer-events: none;
    }
    .header {
      background: linear-gradient(135deg, #FDFCFA, #F9F6F1);
      padding: 32px 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #E8D9C5;
    }
    .brand h1 { font-family: 'Cinzel', serif; font-size: 20px; color: #111; letter-spacing: 2px; }
    .brand p { font-size: 10px; color: #C8A84B; text-transform: uppercase; letter-spacing: 2px; margin-top: 2px; }
    .brand .address { font-size: 11px; color: #3A3A3A; margin-top: 8px; line-height: 1.6; letter-spacing: 0; text-transform: none; }
    .invoice-meta { text-align: right; }
    .invoice-meta h2 { font-family: 'Cinzel', serif; font-size: 24px; color: #C8A84B; letter-spacing: 1px; }
    .invoice-meta .details { margin-top: 8px; font-size: 12px; color: #3A3A3A; line-height: 1.8; }
    .invoice-meta .details strong { color: #111; }
    .body { padding: 32px 40px; position: relative; z-index: 1; }
    .customer-section { display: flex; justify-content: space-between; margin-bottom: 28px; gap: 40px; }
    .customer-section .block h3 { font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: #787878; margin-bottom: 8px; }
    .customer-section .block p { font-size: 13px; color: #252525; line-height: 1.7; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .items-table thead tr { background: rgba(249, 246, 241, 0.7); }
    .items-table th { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #787878; padding: 12px 16px; text-align: left; border-bottom: 1px solid #E8D9C5; }
    .items-table th:last-child, .items-table td:last-child { text-align: right; }
    .items-table td { font-size: 13px; color: #252525; padding: 12px 16px; border-bottom: 1px solid #F3E9DC; }
    .totals { width: 280px; margin-left: auto; margin-bottom: 24px; }
    .totals .row { display: flex; justify-content: space-between; padding: 7px 0; font-size: 13px; color: #3A3A3A; }
    .totals .row.discount { color: #16a34a; }
    .totals .row.total { border-top: 1.5px solid #111; margin-top: 8px; padding-top: 12px; font-size: 16px; font-weight: 600; color: #111; }
    .footer { background: #F9F6F1; padding: 24px 40px; border-top: 1px solid #E8D9C5; text-align: center; position: relative; z-index: 1; }
    .footer p { font-size: 11px; color: #787878; line-height: 1.8; }
    .footer .thankyou { font-family: 'Cinzel', serif; font-size: 14px; color: #C8A84B; margin-bottom: 8px; }
    .payment-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; }
    .badge-paid { background: #dcfce7; color: #166534; }
    .badge-cod { background: #fef3c7; color: #92400e; }
    @media print {
      body { background: white; padding: 0; }
      .invoice { box-shadow: none; border-radius: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="header">
      <div class="brand">
        <h1>JEWELS BY GEETIKA</h1>
        <p>Premium Hand-Curated Jewellery</p>
      </div>
      <div class="invoice-meta">
        <h2>INVOICE</h2>
        <div class="details">
          <strong>Invoice No:</strong> ${data.invoiceNumber}<br>
          <strong>Date:</strong> ${data.date}<br>
          <strong>Order ID:</strong> #${data.orderId.slice(0, 8)}<br>
          ${paymentBadge}
        </div>
      </div>
    </div>
    <div class="body">
      <div class="customer-section">
        <div class="block">
          <h3>Bill To</h3>
          <p>
            <strong>${data.customer.name}</strong><br>
            ${data.customer.phone}<br>
            ${data.customer.email || ""}
          </p>
        </div>
        <div class="block">
          <h3>Ship To</h3>
          <p>
            ${data.shipping.address}<br>
            ${data.shipping.city}, ${data.shipping.state} - ${data.shipping.pincode}<br>
            India
          </p>
        </div>
      </div>
      <table class="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>
      <div class="totals">
        <div class="row">
          <span>Subtotal</span>
          <span>₹${data.subtotal.toLocaleString("en-IN")}</span>
        </div>
        ${data.discount ? `<div class="row discount"><span>Promo (${data.promoCode || "Discount"})</span><span>-₹${data.discount.toLocaleString("en-IN")}</span></div>` : ""}
        <div class="row">
          <span>Shipping</span>
          <span>${data.shippingCost === 0 ? "Free" : "₹" + data.shippingCost}</span>
        </div>
        ${data.codFee ? `<div class="row"><span>COD Fee</span><span>₹${data.codFee}</span></div>` : ""}
        <div class="row total">
          <span>Total</span>
          <span>₹${data.total.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <p class="thankyou">Thank You for Shopping with Us</p>
      <p>
        This is a computer-generated invoice and does not require a signature.<br>
        For queries, contact us at contact@jewelsbygeetika.com<br>
        www.jewelsbygeetika.com
      </p>
    </div>
  </div>
</body>
</html>`;
}
