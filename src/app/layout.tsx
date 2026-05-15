import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramFloater from "@/components/InstagramFloater";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Analytics } from "@vercel/analytics/react";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
  title: "Jewels by Geetika | Hand-Curated Jewellery",
  description:
    "Discover exquisite hand-curated AD, kundan, and gold replica jewellery. Premium jewellery for every occasion — necklaces, earrings, bangles, rings, and bridal sets.",
  keywords: [
    "jewellery",
    "AD jewellery",
    "kundan jewellery",
    "gold replica",
    "bridal jewellery",
    "Indian jewellery online",
    "Jewels by Geetika",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Jewels by Geetika | Hand-Curated Jewellery",
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
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartSidebar />
            <InstagramFloater />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
