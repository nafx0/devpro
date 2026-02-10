import type { Metadata } from "next";
import { Inter_Tight, Manrope } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/utils/SmoothScroll";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DeVPro | Institutional Knowledge Platform",
  description: "Bridging Development, Policy, and Sustainability.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={clsx(
          interTight.variable,
          manrope.variable,
          "antialiased bg-oxygen-white text-deep-forest font-sans selection:bg-growth-green selection:text-deep-forest"
        )}
      >
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}


