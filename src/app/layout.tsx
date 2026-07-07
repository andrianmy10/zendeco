import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// Inisialisasi font Outfit
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "Zendeco - Dekorasi Estetik & Custom",
  description: "Menjual aneka jam dinding kayu, plastik, dan produk custom estetik pilihan.",
  icons: {
    icon: '/assets/img/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans bg-[#ffffff] text-[#c08457] antialiased`}>
        {children}
      </body>
    </html>
  );
}