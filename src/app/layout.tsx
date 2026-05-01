import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
