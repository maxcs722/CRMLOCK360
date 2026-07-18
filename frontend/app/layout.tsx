import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { AuthProvider } from "@/lib/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProviderWrapper } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LOCK360 CRM",
  description: "CRM para Seguridad Electrónica y Servicios Integrales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProviderWrapper>
          <AuthProvider>
            {children}

            <Toaster
              position="top-right"
              richColors
              closeButton
            />
          </AuthProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}