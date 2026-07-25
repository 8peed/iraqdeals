import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "IraqDeals — أكبر مجتمع للعروض والخصومات في العراق",
  description: "شارك، صوّت، ووفّر فلوسك مع مجتمع IraqDeals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-body">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
