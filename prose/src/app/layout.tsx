import type { Metadata } from "next";
import { DM_Serif_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import BrandBar from "@/components/BrandBar";
import LegalBanner from "@/components/LegalBanner";
import BottomNav from "@/components/BottomNav";

const displayFont = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ProSe — Family Court Companion",
  description:
    "A self-representation companion for Washington family court with document organization, learning tools, and safe drafting assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <div className="min-h-screen bg-parchment text-ink">
          <div className="mx-auto w-full max-w-md px-4 pb-28 pt-6 lg:max-w-6xl lg:px-8 lg:pb-10">
            <BrandBar />
            <LegalBanner />
            <main className="mt-6 space-y-6">{children}</main>
          </div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
