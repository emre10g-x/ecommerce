import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrendyShop - E-Ticaret",
  description: "Modern e-ticaret deneyimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-gray-50" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TrendyShop. Tüm hakları saklıdır.
        </footer>
      </body>
    </html>
  );
}
