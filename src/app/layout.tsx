import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramFloater from "@/components/InstagramFloater";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";
import { Analytics } from "@vercel/analytics/react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jewels by Geetika | Hand-Curated Imitation Jewellery",
  description:
    "Discover exquisite hand-curated AD, kundan, and gold replica jewellery. Premium imitation jewellery for every occasion — necklaces, earrings, bangles, rings, and bridal sets.",
  keywords: [
    "imitation jewellery",
    "AD jewellery",
    "kundan jewellery",
    "gold replica",
    "bridal jewellery",
    "Indian jewellery online",
    "Jewels by Geetika",
  ],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Jewels by Geetika | Hand-Curated Imitation Jewellery",
    description:
      "Exquisite hand-curated AD, kundan, and gold replica jewellery for every occasion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
          <InstagramFloater />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
