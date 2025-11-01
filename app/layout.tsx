import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MagicBackground } from "@/components/wizard/magic-background";

export const metadata: Metadata = {
  title: "MathWiz Academy - Magical Math Learning for Kids",
  description: "An AI-powered wizard-themed math tutoring platform for elementary students. Learn, practice, and master math with adaptive AI tutoring!",
  keywords: ["math", "education", "AI tutoring", "elementary", "kids", "learning"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MathWiz Academy",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#8b5cf6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <MagicBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
