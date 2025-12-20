import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google"; // Changed from Geist
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Double T Soft | Kafe POS, QR Menü & Özel Yazılım Çözümleri",
    template: "%s | Double T Soft"
  },
  description: "İşletmenize özel web yazılım, mobil uygulama, QR menü ve POS sistemleri. Türkiye'nin her yerine modern, hızlı ve güvenli yazılım çözümleri.",
  keywords: ["yazılım şirketi", "kafe pos sistemi", "qr menü yazılımı", "özel yazılım", "mobil uygulama geliştirme", "web tasarım", "kurumsal yazılım"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>
          {children}
          <Analytics />
          <SpeedInsights />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
