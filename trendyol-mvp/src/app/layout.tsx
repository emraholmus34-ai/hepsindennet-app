import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "hepsinden – Trendyol benzeri basit alışveriş",
    template: "%s | hepsinden",
  },
  description: "Ürün listeleme, arama ve sepet özellikli minimal e-ticaret MVP",
  metadataBase: new URL("https://example.local"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Providers>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <footer className="border-t bg-white/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500">
              © {new Date().getFullYear()} hepsinden
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
