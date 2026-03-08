import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Cloud Certifications Prep",
  description: "La plataforma definitiva para preparar tus certificaciones en la nube: GCP Digital Leader, Azure AZ-900, SC-900 y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden w-full",
          inter.variable
        )}
      >
        <Header />
        <main className="flex-1 min-h-[calc(100vh-140px)] w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
