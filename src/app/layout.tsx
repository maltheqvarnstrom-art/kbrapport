import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fckSans = localFont({
  src: "./fonts/FCKSans-Bold.ttf",
  variable: "--font-fck-sans",
  weight: "700",
});

const fckSerif = localFont({
  src: "./fonts/FCKSerif-Bold.ttf",
  variable: "--font-fck-serif",
  weight: "700",
});

export const metadata: Metadata = {
  title: "KB Rapport",
  description: "KB Rapport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${inter.variable} ${fckSans.variable} ${fckSerif.variable} font-sans`}>
      <body>{children}</body>
    </html>
  );
}
