import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SideNav from "@/components/SideNav";

const geistSans = GeistSans;

const fckSans = localFont({
  src: "./fonts/FCKSans-Bold.ttf",
  variable: "--font-fck-sans",
  weight: "700",
});

const fckText = localFont({
  src: [
    {
      path: "./fonts/FCKText-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/FCKText-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-fck-text",
});

export const metadata: Metadata = {
  title: "KB Rapport | FCK Scouting",
  description: "Advanced scouting and player evaluation platform for FC København",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className={`${fckSans.variable} ${fckText.variable} ${geistSans.variable} font-sans antialiased text-slate-900 bg-white`}>
        <div className="flex min-h-screen">
          <SideNav />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex flex-1 pt-10">
              <main className="flex-1 px-8 pb-12 overflow-y-auto w-full">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
